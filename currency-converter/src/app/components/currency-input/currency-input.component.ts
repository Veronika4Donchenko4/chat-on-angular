import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-currency-input',
  standalone: true,
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, FormsModule],
})
export class CurrencyInputComponent implements ControlValueAccessor {
  @Input() amount = 0;
  @Input() currency: 'UAH' | 'USD' | 'EUR' = 'USD';
  @Output() convert = new EventEmitter<{
    amount: number;
    currency: 'UAH' | 'USD' | 'EUR';
  }>();

  currencies = ['UAH', 'USD', 'EUR'];

  private onChange: (value: {
    amount: number;
    currency: 'UAH' | 'USD' | 'EUR';
  }) => void = () => {};
  private onTouched: () => void = () => {};

  onInputChange() {
    this.convert.emit({ amount: this.amount, currency: this.currency });
    this.onChange({ amount: this.amount, currency: this.currency });
  }

  writeValue(value: { amount: number; currency: 'UAH' | 'USD' | 'EUR' }): void {
    if (value) {
      this.amount = value.amount || this.amount;
      this.currency = value.currency || this.currency;
    }
  }

  registerOnChange(
    fn: (value: { amount: number; currency: 'UAH' | 'USD' | 'EUR' }) => void
  ): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
