import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="converter-container">
      <div class="converter-row">
        <input
          [(ngModel)]="amount1"
          (input)="convertFromAmount1()"
          type="number"
          class="converter-input"
        />
        <select
          [(ngModel)]="currency1"
          (change)="convertFromAmount1()"
          class="converter-select"
        >
          <option *ngFor="let currency of currencies" [value]="currency">
            {{ currency }}
          </option>
        </select>
      </div>
      <div class="converter-row">
        <input
          [(ngModel)]="amount2"
          (input)="convertFromAmount2()"
          type="number"
          class="converter-input"
        />
        <select
          [(ngModel)]="currency2"
          (change)="convertFromAmount2()"
          class="converter-select"
        >
          <option *ngFor="let currency of currencies" [value]="currency">
            {{ currency }}
          </option>
        </select>
      </div>
    </div>
  `,
  styles: [
    `
      .converter-container {
        max-width: 600px;
        margin: 20px auto;
        padding: 1rem;
        background-color: #ffeb3b;
        border: 2px solid #fff;
        border-radius: 10px;
        text-align: center;
      }

      .converter-row {
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .converter-input {
        width: 150px;
        padding: 0.5rem;
        border: 1px solid #000;
        border-radius: 5px;
        text-align: center;
      }

      .converter-input:focus {
        outline: none;
        border-color: #ffc107;
      }

      .converter-select {
        padding: 0.5rem;
        border: 1px solid #000;
        border-radius: 5px;
      }

      .converter-select:hover {
        cursor: pointer;
        border-color: #ffc107;
      }
    `,
  ],
})
export class ConverterComponent {
  currency1: 'UAH' | 'USD' | 'EUR' = 'USD';
  currency2: 'UAH' | 'USD' | 'EUR' = 'UAH';
  amount1 = 1;
  amount2 = 0;
  rates = { UAH: 1, USD: 1, EUR: 1 };
  currencies = ['UAH', 'USD', 'EUR'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchRates();
  }

  fetchRates() {
    const url = 'https://api.exchangerate-api.com/v4/latest/UAH';

    this.http.get<any>(url).subscribe(
      (data) => {
        this.rates = {
          UAH: 1,
          USD: data.rates.USD,
          EUR: data.rates.EUR,
        };
        this.convertFromAmount1();
      },
      (error) => {
        console.error('Error fetching rates:', error);
      }
    );
  }

  convertFromAmount1() {
    this.amount2 = +(
      (this.amount1 * this.rates[this.currency2]) /
      this.rates[this.currency1]
    ).toFixed(2);
  }

  convertFromAmount2() {
    this.amount1 = +(
      (this.amount2 * this.rates[this.currency1]) /
      this.rates[this.currency2]
    ).toFixed(2);
  }
}
