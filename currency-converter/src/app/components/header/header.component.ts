import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../servises/currency.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private http = inject(HttpClient);
  private currencyService = inject(CurrencyService);
  rates: { USD: number; EUR: number } | undefined;

  ngOnInit() {
    this.http
    this.currencyService.getRates().subscribe((data) => {
        this.rates = {
          USD: 1 / data.rates.USD,
          EUR: 1 / data.rates.EUR,
        };
      });
  }
}
