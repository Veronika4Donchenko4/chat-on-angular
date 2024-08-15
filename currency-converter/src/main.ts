import { bootstrapApplication } from '@angular/platform-browser';
import { HeaderComponent } from './app/header.component';
import { ConverterComponent } from './app/converter.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(HeaderComponent, {
  providers: [importProvidersFrom(HttpClientModule)],
}).catch((err) => console.error(err));

bootstrapApplication(ConverterComponent, {
  providers: [importProvidersFrom(HttpClientModule)],
}).catch((err) => console.error(err));
