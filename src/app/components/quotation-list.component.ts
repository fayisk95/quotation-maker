import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationService } from '../services/quotation.service';
import { QuotationDisplayComponent } from './quotation-display.component';
import { Quotation } from '../models/quotation.model';

@Component({
  selector: 'app-quotation-list',
  standalone: true,
  imports: [CommonModule, QuotationDisplayComponent],
  template: `
    <div class="quotation-list-container">
      <div class="header">
        <h1 class="page-title">Project Quotations</h1>
        <p class="page-subtitle">Professional project quotation management system</p>
      </div>

      <div class="quotation-grid" *ngIf="quotations.length > 0">
        <div *ngFor="let quotation of quotations" class="quotation-card">
          <div class="card-header">
            <h3 class="quotation-title">{{ quotation.projectTitle }}</h3>
            <div class="quotation-meta">
              <span class="client">{{ quotation.clientName }}</span>
              <span class="date">{{ quotation.date | date:'MMM d, yyyy' }}</span>
            </div>
          </div>
          
          <div class="card-content">
            <div class="cost-summary">
              <div class="cost-item">
                <span class="cost-label">Total Cost:</span>
                <span class="cost-value">{{ quotation.totalCost | number:'1.0-0' }} {{ quotation.currency }}</span>
              </div>
              <div class="cost-item optional">
                <span class="cost-label">With Optional:</span>
                <span class="cost-value">{{ quotation.totalWithOptional | number:'1.0-0' }} {{ quotation.currency }}</span>
              </div>
            </div>
            
            <div class="timeline-info">
              <span class="timeline-label">Timeline:</span>
              <span class="timeline-value">{{ quotation.timeline }}</span>
            </div>
          </div>
          
          <div class="card-actions">
            <button class="view-btn" (click)="selectQuotation(quotation)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              View Details
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="selectedQuotation" class="quotation-detail">
        <div class="detail-header">
          <button class="back-btn" (click)="selectedQuotation = null">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back to List
          </button>
        </div>
        <app-quotation-display [quotation]="selectedQuotation"></app-quotation-display>
      </div>

      <div *ngIf="quotations.length === 0" class="empty-state">
        <div class="empty-icon">📋</div>
        <h3>No Quotations Found</h3>
        <p>Create your first project quotation to get started.</p>
      </div>
    </div>
  `,
  styles: [`
    .quotation-list-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
      padding: 2rem;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .page-title {
      font-size: 3rem;
      font-weight: 700;
      color: #1e40af;
      margin-bottom: 0.5rem;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .page-subtitle {
      font-size: 1.2rem;
      color: #64748b;
      margin: 0;
    }

    .quotation-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .quotation-card {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      border: 1px solid #e2e8f0;
    }

    .quotation-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    .card-header {
      margin-bottom: 1.5rem;
    }

    .quotation-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.75rem;
      line-height: 1.4;
    }

    .quotation-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
      color: #64748b;
    }

    .client {
      font-weight: 500;
      color: #3b82f6;
    }

    .date {
      background: #f1f5f9;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
    }

    .card-content {
      margin-bottom: 1.5rem;
    }

    .cost-summary {
      background: #f8fafc;
      padding: 1rem;
      border-radius: 12px;
      margin-bottom: 1rem;
    }

    .cost-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .cost-item:last-child {
      margin-bottom: 0;
    }

    .cost-item.optional {
      padding-top: 0.5rem;
      border-top: 1px solid #e2e8f0;
    }

    .cost-label {
      font-weight: 500;
      color: #64748b;
    }

    .cost-value {
      font-weight: 700;
      color: #1e40af;
      font-size: 1.1rem;
    }

    .timeline-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: #fef3c7;
      border-radius: 8px;
    }

    .timeline-label {
      font-weight: 500;
      color: #92400e;
    }

    .timeline-value {
      font-weight: 600;
      color: #92400e;
    }

    .card-actions {
      display: flex;
      justify-content: center;
    }

    .view-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
      justify-content: center;
    }

    .view-btn:hover {
      background: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .quotation-detail {
      max-width: 1000px;
      margin: 0 auto;
    }

    .detail-header {
      margin-bottom: 2rem;
    }

    .back-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: #6b7280;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .back-btn:hover {
      background: #4b5563;
      transform: translateY(-2px);
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      max-width: 500px;
      margin: 0 auto;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .empty-state h3 {
      font-size: 1.5rem;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .empty-state p {
      color: #64748b;
      font-size: 1.1rem;
    }

    @media (max-width: 768px) {
      .quotation-list-container {
        display: none;
      }
      
      .quotation-detail {
        display: block;
      }
      
      .detail-header {
        display: none;
      }
    }
    
    @media print {
      .quotation-list-container {
        padding: 1rem;
      }

      .page-title {
        font-size: 2rem;
      }

      .quotation-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .quotation-card {
        padding: 1rem;
      }

      .quotation-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
      
      /* Hide list view elements when printing */
      .quotation-grid,
      .header,
      .empty-state {
        display: none !important;
      }
      
      /* Show only quotation detail when printing */
      .quotation-detail {
        display: block !important;
      }
    }
  `]
})
export class QuotationListComponent implements OnInit {
  quotations: Quotation[] = [];
  selectedQuotation: Quotation | null = null;

  constructor(private quotationService: QuotationService) {}

  ngOnInit() {
    this.quotationService.getQuotations().subscribe(quotations => {
      this.quotations = quotations;
    });
  }

  selectQuotation(quotation: Quotation) {
    this.selectedQuotation = quotation;
  }
}