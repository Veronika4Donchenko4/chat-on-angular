import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header-container">
      <h1>Курс валют</h1>
      <div *ngIf="rates" class="currency-rates">
        <p>USD/UAH: {{ rates.USD }}</p>
        <p>EUR/UAH: {{ rates.EUR }}</p>
      </div>
    </header>
  `,
  styles: [
    `
      .header-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 1rem;
        background-color: #ffeb3b;
        border: 2px solid #fff;
        border-radius: 10px;
        text-align: center;
      }

      .currency-rates p {
        font-weight: bold;
        color: #000;
      }
    `,
  ],
})
export class HeaderComponent {
  private http = inject(HttpClient);
  rates: any;

  ngOnInit() {
    this.http
      .get('https://api.exchangerate-api.com/v4/latest/UAH')
      .subscribe((data: any) => {
        this.rates = {
          USD: data.rates.USD,
          EUR: data.rates.EUR,
        };
      });
  }
}
