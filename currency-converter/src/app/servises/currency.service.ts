import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ExchangeRates {
    base: string;
    date: string;
    rates: {
      UAH: number;
      EUR: number;
      USD: number;
    };
}

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/UAH';

  constructor(private http: HttpClient) {}

  getRates(): Observable<ExchangeRates> {
    return this.http.get<ExchangeRates>(this.apiUrl);
  }
}
