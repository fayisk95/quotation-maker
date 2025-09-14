import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { QuotationListComponent } from './app/components/quotation-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuotationListComponent],
  template: `
    <app-quotation-list></app-quotation-list>
  `,
})
export class App {
  name = 'Professional Project Quotations';
}

bootstrapApplication(App);