import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quotation } from '../models/quotation.model';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-quotation-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./quotation-display.component.html`,
  styles: [`
    .quotation-wrapper {
      background: #f5f5f5;
      min-height: 100vh;
      padding: 2rem 1rem;
    }

    .action-bar {
      max-width: 210mm;
      margin: 0 auto 2rem auto;
      display: flex;
      justify-content: center;
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .action-btn.primary {
      background: #1e40af;
      color: white;
    }

    .action-btn.primary:hover:not(:disabled) {
      background: #1e3a8a;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
    }

    .action-btn.primary:disabled {
      background: #9ca3af;
      cursor: not-allowed;
      transform: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .action-btn.secondary {
      background: #059669;
      color: white;
    }

    .action-btn.secondary:hover {
      background: #047857;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
    }

    .action-btn.tertiary {
      background: #7c3aed;
      color: white;
    }

    .action-btn.tertiary:hover {
      background: #6d28d9;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
    }

    /* A4 Document Styles */
    .a4-container {
      max-width: 210mm;
      margin: 0 auto;
      background: white;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .a4-page {
      width: 210mm;
      height: 297mm;
      padding: 10mm;
      box-sizing: border-box;
      background: white;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      margin:5px 0px;
    }

    .a4-page:last-child {
      page-break-after: auto;
    }

    /* Header Styles */
    .quotation-header {
      text-align: center;
      margin-bottom: 20mm;
      padding-bottom: 10mm;
      border-bottom: 3px solid #1e40af;
    }

    /* Page Header with Logo */
    .page-header {
      text-align: center;
      margin-bottom: 8mm;
      padding-bottom: 4mm;
      border-bottom: 1px solid #e5e7eb;
    }

    .header-logo {
      max-height: 12mm;
      max-width: 60mm;
      object-fit: contain;
    }

    .main-title {
      font-size: 28pt;
      font-weight: 700;
      color: #1e40af;
      margin-bottom: 8mm;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .project-title {
      font-size: 16pt;
      font-weight: 600;
      color: #374151;
      margin-bottom: 8mm;
      line-height: 1.3;
    }

    .client-info {
      display: flex;
      justify-content: center;
      gap: 20mm;
      font-size: 12pt;
    }

    .info-row {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2mm;
    }

    .label {
      font-weight: 600;
      color: #6b7280;
    }

    .value {
      font-weight: 500;
      color: #1f2937;
    }

    /* Section Styles */
    .section {
      margin-bottom: 15mm;
    }

    .section-title {
      font-size: 16pt;
      font-weight: 700;
      color: #1e40af;
      margin-bottom: 6mm;
      padding-bottom: 2mm;
      border-bottom: 2px solid #e5e7eb;
    }

    .subsection {
      margin-bottom: 8mm;
    }

    .subsection-title {
      font-size: 13pt;
      font-weight: 600;
      color: #374151;
      margin-bottom: 4mm;
    }

    /* Feature List */
    .feature-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .feature-item {
      padding: 3mm 0 3mm 8mm;
      position: relative;
      border-left: 3px solid #1e40af;
      margin-bottom: 2mm;
      background: #f8fafc;
      border-radius: 0 4mm 4mm 0;
      font-size: 11pt;
      line-height: 1.4;
    }

    .feature-item::before {
      content: '✓';
      position: absolute;
      left: -6mm;
      top: 50%;
      transform: translateY(-50%);
      background: #1e40af;
      color: white;
      width: 10mm;
      height: 10mm;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 8pt;
      font-weight: bold;
    }

    /* Tech Stack */
    .tech-stack {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(60mm, 1fr));
      gap: 4mm;
    }

    .tech-item {
      padding: 4mm;
      background: #f1f5f9;
      border-radius: 4mm;
      border-left: 3mm solid #1e40af;
      font-size: 11pt;
    }

    /* Timeline */
    .timeline {
      font-size: 12pt;
      padding: 4mm;
      background: #fef3c7;
      border-radius: 4mm;
      border-left: 3mm solid #f59e0b;
    }

    /* Cost Table */
    .cost-table {
      background: white;
      border-radius: 4mm;
      overflow: hidden;
      box-shadow: 0 2mm 4mm rgba(0, 0, 0, 0.1);
      border: 1px solid #e5e7eb;
      margin-bottom: 8mm;
    }

    .table-header {
      display: grid;
      grid-template-columns: 2fr 1fr;
      background: #1e40af;
      color: white;
      font-weight: 600;
      padding: 4mm;
      font-size: 12pt;
    }

    .table-row {
      display: grid;
      grid-template-columns: 2fr 1fr;
      padding: 4mm;
      border-bottom: 1px solid #e5e7eb;
      font-size: 11pt;
    }

    .table-row:hover {
      background: #f8fafc;
    }

    .table-footer {
      background: #f8fafc;
    }

    .total-row {
      display: grid;
      grid-template-columns: 2fr 1fr;
      padding: 4mm;
      font-size: 12pt;
      font-weight: 600;
    }

    .total-row.optional {
      background: #fef3c7;
      border-top: 1px solid #f59e0b;
    }

    .col-item {
      display: flex;
      align-items: center;
      gap: 2mm;
    }

    .col-cost {
      text-align: right;
      font-weight: 600;
    }

    .item-icon {
      font-size: 12pt;
    }

    /* Payment Terms */
    .payment-terms {
      background: #f0f9ff;
      padding: 6mm;
      border-radius: 4mm;
      border: 1px solid #0ea5e9;
    }

    .payment-term {
      padding: 2mm 0;
      font-size: 12pt;
      line-height: 1.4;
    }

    /* Exclusions */
    .exclusions-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .exclusion-item {
      padding: 3mm;
      margin-bottom: 2mm;
      background: #fef2f2;
      border-left: 3mm solid #ef4444;
      border-radius: 0 4mm 4mm 0;
      font-size: 11pt;
      line-height: 1.4;
    }

    /* AMC Details */
    .amc-details {
      background: #f0fdf4;
      padding: 6mm;
      border-radius: 4mm;
      border: 1px solid #22c55e;
    }

    .amc-cost {
      font-size: 12pt;
      margin-bottom: 4mm;
      font-weight: 600;
    }

    .amc-row {
      margin: 2mm 0;
      font-size: 11pt;
      line-height: 1.4;
    }

    /* Validity Section */
    .validity-section {
      background: #fef3c7;
      padding: 6mm;
      border-radius: 4mm;
      border: 1px solid #f59e0b;
      text-align: center;
    }

    .validity-text {
      font-size: 12pt;
      margin: 0;
    }

    /* Document Footer */
    .document-footer {
      margin-top: auto;
      padding-top: 10mm;
    }

    .footer-line {
      height: 1px;
      background: #e5e7eb;
      margin-bottom: 4mm;
    }

    .footer-text {
      text-align: center;
      font-size: 10pt;
      color: #6b7280;
    }

    /* Signature Page Styles */
    .signature-page {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .signature-title {
      font-size: 20pt;
      font-weight: 700;
      color: #1e40af;
      text-align: center;
      margin-bottom: 8mm;
      padding-bottom: 3mm;
      border-bottom: 2px solid #e5e7eb;
    }

    .agreement-section {
      margin-bottom: 6mm;
    }

    .agreement-title {
      font-size: 14pt;
      font-weight: 600;
      color: #374151;
      margin-bottom: 3mm;
    }

    .agreement-text {
      font-size: 10pt;
      line-height: 1.5;
      color: #1f2937;
    }

    .agreement-points {
      margin: 3mm 0;
      padding: 3mm;
      background: #f8fafc;
      border-radius: 3mm;
      line-height: 1.4;
    }

    .validity-notice {
      background: #fef3c7;
      padding: 3mm;
      border-radius: 3mm;
      border-left: 2mm solid #f59e0b;
      margin-top: 3mm;
      font-size: 10pt;
    }

    .vendor-info-section {
      margin-bottom: 8mm;
    }

    .info-section-title {
      font-size: 12pt;
      font-weight: 600;
      color: #1e40af;
      margin-bottom: 3mm;
      padding-bottom: 1mm;
      border-bottom: 1px solid #e5e7eb;
    }

    .vendor-details {
      background: #f8fafc;
      padding: 4mm;
      border-radius: 3mm;
      border: 1px solid #e2e8f0;
    }

    .vendor-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2mm;
      font-size: 10pt;
      margin-bottom: 2mm;
    }

    .vendor-address {
      font-size: 10pt;
      grid-column: 1 / -1;
    }

    .signatures-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6mm;
      margin-bottom: 8mm;
    }

    .signature-block {
      border: 2px solid #e5e7eb;
      border-radius: 4mm;
      padding: 5mm;
      background: #fafafa;
    }

    .signature-block-title {
      font-size: 11pt;
      font-weight: 600;
      color: #1e40af;
      margin-bottom: 4mm;
      text-align: center;
      padding-bottom: 2mm;
      border-bottom: 1px solid #d1d5db;
    }

    .signature-content {
      display: flex;
      flex-direction: column;
      gap: 4mm;
    }

    .signature-line {
      text-align: center;
    }

    .signature-area {
      height: 20mm;
      border: 2px dashed #9ca3af;
      border-radius: 3mm;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
    }

    .signature-placeholder {
      color: #6b7280;
      font-size: 12pt;
      font-style: italic;
    }

    .signature-details {
      display: flex;
      flex-direction: column;
      gap: 4mm;
    }

    .detail-row {
      display: flex;
      align-items: center;
      gap: 2mm;
      font-size: 10pt;
    }

    .detail-label {
      font-weight: 600;
      color: #374151;
      min-width: 12mm;
    }

    .detail-line {
      flex: 1;
      border-bottom: 1px solid #9ca3af;
      padding-bottom: 2mm;
      min-height: 4mm;
      color: #1f2937;
    }

    .signature-footer {
      margin-top: auto;
      text-align: center;
      padding-top: 6mm;
      border-top: 1px solid #e5e7eb;
    }

    .footer-logo {
      margin-bottom: 2mm;
    }

    .footer-logo-image {
      max-height: 8mm;
      max-width: 40mm;
      object-fit: contain;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .quotation-wrapper {
        padding: 1rem 0.5rem;
      }

      .a4-container {
        transform: scale(0.7);
        transform-origin: top center;
        margin-bottom: -20vh;
      }

      .action-buttons {
        flex-direction: column;
        width: 100%;
        max-width: 300px;
        margin: 0 auto;
      }

      .action-btn {
        justify-content: center;
        width: 100%;
      }

      .client-info {
        flex-direction: column;
        gap: 4mm;
      }

      .tech-stack {
        grid-template-columns: 1fr;
      }

      .signatures-container {
        grid-template-columns: 1fr;
        gap: 6mm;
      }

      .logo-image,
      .footer-logo-image {
        max-height: 12mm;
        max-width: 50mm;
      }
    }

    /* Print Styles */
    @media print {
      .quotation-wrapper {
        background: white;
        padding: 0;
      }

      .action-bar,
      .no-print {
        display: none !important;
      }

      .a4-container {
        max-width: none;
        box-shadow: none;
        margin: 0;
      }

      .a4-page {
        width: 210mm;
        height: 297mm;
        padding: 10mm;
        margin: 0;
        box-shadow: none;
        page-break-after: always;
      }

      .a4-page:last-child {
        page-break-after: auto;
      }

      @page {
        size: A4;
        margin: 0;
      }

      /* Ensure proper page breaks */
      .section {
        page-break-inside: avoid;
      }

      .cost-table {
        page-break-inside: avoid;
      }
    }
  `]
})
export class QuotationDisplayComponent {
  @Input() quotation!: Quotation;
  isGeneratingPDF = false;

  getTechStackEntries() {
    return Object.entries(this.quotation.scopeOfWork.technologyStack).map(([key, value]) => ({
      key,
      value
    }));
  }

  getItemIcon(category: string): string {
    const icons = {
      development: '🧩',
      hosting: '🌐',
      integration: '🖨️',
      support: '🔧',
      other: '📋'
    };
    return icons[category as keyof typeof icons] || '📋';
  }

  async downloadPDF() {
    try {
      this.isGeneratingPDF = true;

      const element = document.getElementById('quotation-document') as HTMLElement;
      if (!element) {
        throw new Error('Quotation document not found');
      }

      // Generate canvas with high quality
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
        logging: false
      });

      // Create PDF with A4 dimensions
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Calculate how many pages we need
      const ratio = pdfWidth / imgWidth;
      const scaledHeight = imgHeight * ratio;
      const pagesNeeded = Math.ceil(scaledHeight / pdfHeight);

      const imgData = canvas.toDataURL('image/png', 1.0);

      for (let i = 0; i < pagesNeeded; i++) {
        if (i > 0) {
          pdf.addPage();
        }

        const yOffset = -(i * pdfHeight);
        pdf.addImage(imgData, 'PNG', 0, yOffset, pdfWidth, scaledHeight);
      }

      // Generate filename
      const filename = `${this.quotation.clientName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_quotation.pdf`;
      pdf.save(filename);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      this.isGeneratingPDF = false;
    }
  }

  printQuotation() {
    window.print();
  }

  shareQuotation() {
    const text = `Project Quotation for ${this.quotation.projectTitle} - Total: ${this.quotation.totalCost} ${this.quotation.currency}`;
    if (navigator.share) {
      navigator.share({
        title: 'Project Quotation',
        text: text
      });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert('Quotation details copied to clipboard!');
      });
    }
  }
}