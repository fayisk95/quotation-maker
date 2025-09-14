export interface QuotationItem {
  id: string;
  description: string;
  cost: number;
  category: 'development' | 'hosting' | 'integration' | 'support' | 'other';
}

export interface PaymentTerm {
  percentage: number;
  description: string;
  amount: number;
}

export interface Quotation {
  id: string;
  projectTitle: string;
  clientName: string;
  date: Date;
  scopeOfWork: {
    keyFeatures: string[];
    technologyStack: { [key: string]: string };
  };
  timeline: string;
  items: QuotationItem[];
  paymentTerms: PaymentTerm[];
  exclusions: string[];
  amcDetails: {
    percentage: number;
    annualCost: number;
    includes: string[];
    excludes: string[];
  };
  validityDays: number;
  totalCost: number;
  totalWithOptional: number;
  currency: string;
  vendorInfo: {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    address: string;
  };
  signatures: {
    clientSignature?: {
      name: string;
      title: string;
      date: Date;
      signed: boolean;
    };
    vendorSignature?: {
      name: string;
      title: string;
      date: Date;
      signed: boolean;
    };
  };
}