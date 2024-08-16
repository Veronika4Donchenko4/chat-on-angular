import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { CurrencyService } from './app/servises/currency.service';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), CurrencyService],
});
