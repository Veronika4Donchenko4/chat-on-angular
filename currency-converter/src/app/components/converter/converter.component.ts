import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyInputComponent } from '../currency-input/currency-input.component';
import { CurrencyService } from '../../servises/currency.service';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyInputComponent],
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent {
  currency1: 'UAH' | 'USD' | 'EUR' = 'USD';
  currency2: 'UAH' | 'USD' | 'EUR' = 'UAH';
  amount1 = 1;
  amount2 = 0;
  rates = { UAH: 1, USD: 1, EUR: 1 };
  currencies: ('UAH' | 'USD' | 'EUR')[] = ['UAH', 'USD', 'EUR'];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.fetchRates();
  }

  fetchRates(): void {
    this.currencyService.getRates().subscribe(
      (data) => {
        this.rates = {
          UAH: 1,
          USD: data.rates.USD,
          EUR: data.rates.EUR,
        };
        this.convert();
      },
      (error) => {
        console.error('Error fetching rates:', error);
      }
    );
  }

  convert(): void {
    if (this.currency1 && this.currency2) {
      this.amount2 = this.calculateConvertedAmount(this.amount1, this.currency1, this.currency2);
    }
  }

  calculateConvertedAmount(amount: number, fromCurrency: 'UAH' | 'USD' | 'EUR', toCurrency: 'UAH' | 'USD' | 'EUR'): number {
    return +((amount * this.rates[toCurrency]) / this.rates[fromCurrency]).toFixed(2);
  }

  onAmountChange(newValue: { amount: number; currency: 'UAH' | 'USD' | 'EUR'; }, isAmount1: boolean): void {
    const amountKey = isAmount1 ? 'amount1' : 'amount2';
    const currencyKey = isAmount1 ? 'currency1' : 'currency2';
    this[amountKey] = newValue.amount;
    this[currencyKey] = newValue.currency;
    this.convert();
  }
}