import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ConverterComponent } from './components/converter/converter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent, ConverterComponent],
})
export class AppComponent {
  title = 'currency-converter';
}
