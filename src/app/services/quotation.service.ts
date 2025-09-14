import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Quotation, QuotationItem, PaymentTerm } from '../models/quotation.model';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  private quotationsSubject = new BehaviorSubject<Quotation[]>([]);
  public quotations$ = this.quotationsSubject.asObservable();

  constructor() {
    this.loadSampleData();
  }

  private loadSampleData() {
    const sampleQuotation: Quotation = {
      id: '1',
      projectTitle: 'Simple Certificate Management Application with Certificate & Card Printing (HID FARGO Compatible)',
      clientName: 'Bench Mark Technical Solution',
      date: new Date('2025-09-14'),
      scopeOfWork: {
        keyFeatures: [
          'Admin Panel - Secure admin login with multiple user access',
          'Admin management (add/edit/delete users)',
          'Certificate & Batch Management - Create batches and certificates',
          'Auto-generate Certificate Number, Batch Number, Validity Date',
          'Certificate Search & Filters by Name, Batch, Date, Certificate Number',
          'Certificate Expiry Tracking - Near expiry and expired certificates',
          'Excel Export Features - Certificate and Batch lists to Excel',
          'Certificate Printing - PDF Export for standard printers',
          'Card Printing with HID FARGO printer integration',
          'Document Upload - upload and keep users identity proof like EID/license'
        ],
        technologyStack: {
          'Frontend': 'Angular',
          'Backend': 'Node.js + .NET Web API',
          'Database': 'MS SQL / MySQL'
        }
      },
      timeline: '4 Weeks',
      items: [
        {
          id: '1',
          description: 'Software Development (Core System)',
          cost: 2400,
          category: 'development'
        },
        {
          id: '2',
          description: 'Domain & Hosting (1 Year)',
          cost: 300,
          category: 'hosting'
        },
        {
          id: '3',
          description: 'HID FARGO Card Printer Integration',
          cost: 1500,
          category: 'integration'
        },
        {
          id: '4',
          description: 'Optional: 1-Year Support',
          cost: 500,
          category: 'support'
        },
        {
          id: '5',
          description: 'Discount',
          cost: -500,
          category: 'support'
        }
      ],
      paymentTerms: [
        { percentage: 40, description: 'Advance (Start)', amount: 1680 },
        { percentage: 30, description: 'After Development Completion', amount: 1260 },
        { percentage: 30, description: 'On Final Delivery & Handover', amount: 1260 }
      ],
      exclusions: [
        'Domain & hosting renewal charges beyond Year 1',
        'Historical data migration or mass data entry',
        'Feature changes outside the listed scope'
      ],
      amcDetails: {
        percentage: 20,
        annualCost: 840,
        includes: ['Bug fixes', 'Minor UI improvements', 'Performance tuning'],
        excludes: ['New features', 'Redesigns', 'Third-party integrations']
      },
      validityDays: 15,
      totalCost: 4200,
      totalWithOptional: 4200,
      currency: 'AED',
      vendorInfo: {
        companyName: 'BrandnBytes',
        contactPerson: 'Project Manager',
        email: 'info@brandnbytes.com',
        phone: '+971-504099587',
        address: 'Abu Dhabi, UAE'
      },
      signatures: {
        vendorSignature: {
          name: 'Fayis Rahman',
          title: 'Project Manager - BrandnBytes',
          date: new Date(),
          signed: false
        }
      }
    };

    this.quotationsSubject.next([sampleQuotation]);
  }

  getQuotations(): Observable<Quotation[]> {
    return this.quotations$;
  }

  getQuotationById(id: string): Quotation | undefined {
    return this.quotationsSubject.value.find(q => q.id === id);
  }

  addQuotation(quotation: Quotation): void {
    const currentQuotations = this.quotationsSubject.value;
    this.quotationsSubject.next([...currentQuotations, quotation]);
  }

  updateQuotation(quotation: Quotation): void {
    const currentQuotations = this.quotationsSubject.value;
    const index = currentQuotations.findIndex(q => q.id === quotation.id);
    if (index !== -1) {
      currentQuotations[index] = quotation;
      this.quotationsSubject.next([...currentQuotations]);
    }
  }

  deleteQuotation(id: string): void {
    const currentQuotations = this.quotationsSubject.value.filter(q => q.id !== id);
    this.quotationsSubject.next(currentQuotations);
  }

  calculateTotal(items: QuotationItem[], includeOptional: boolean = false): number {
    return items
      .filter(item => includeOptional || item.category !== 'support')
      .reduce((total, item) => total + item.cost, 0);
  }

  generatePaymentTerms(totalCost: number): PaymentTerm[] {
    return [
      { percentage: 40, description: 'Advance (Start)', amount: Math.round(totalCost * 0.4) },
      { percentage: 30, description: 'After Development Completion', amount: Math.round(totalCost * 0.3) },
      { percentage: 30, description: 'On Final Delivery & Handover', amount: Math.round(totalCost * 0.3) }
    ];
  }
}