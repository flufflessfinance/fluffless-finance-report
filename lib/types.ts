// Type definitions for Fluffless Finance Diagnostic Tool

export interface DiagnosticFormData {
  // Company Information
  companyName: string;
  companyDescription: string;
  yearsInBusiness: string;
  industry: string;
  customIndustry?: string;
  
  // Financial Metrics
  annualRevenue: string;
  grossMargin: string;
  netMargin: string;
  isProfitable: string;
  
  // Competitive Context
  competitionLevel: string;
  mainCompetitors: string;
  competingOn: string[];
  marketDemand: string;
  competitivePressure: string;
  disruptionThreats: string[];
  entryBarriers: string;
  
  // Strategic Foundation
  canArticulateDifference: string;
  hasWrittenPlan: string;
  successIn3Years: string;
  reactingOrAnticipating: string;
  
  // Revenue & Customer Health
  revenueTrend: string;
  activeCustomers: string;
  top3CustomerPercentage: string;
  whyCustomersChoose: string;
  customerChurn: string;
  salesCycle: string;
  
  // Cash Flow Reality - UPDATED
  daysOfCash: string;
  struggledWithPayroll: string;
  customerPaymentTerms: string;  // NEW - split from paymentTerms
  vendorPaymentTerms: string;    // NEW - split from paymentTerms
  hasLineOfCredit: string;       // NEW - replaces usesLineOfCredit
  lineOfCreditUsage?: string;    // NEW - conditional
  cashCrunchCauses: string;
  paymentTerms?: string;         // OLD - kept for backward compatibility
  usesLineOfCredit?: string;     // OLD - kept for backward compatibility
  
  // Operational Bottlenecks
  whatWouldBreak: string;
  timeInVsOn: string;
  couldRunWithoutOwner: string;
  reworkTime: string;
  biggestBottleneck: string;
  
  // Growth Capacity - UPDATED
  stoppingGrowthReasons: string[];  // NEW - checkboxes
  stoppingGrowthOther?: string;     // NEW - conditional
  operatingAtCapacity: string;
  investIfHadMoney: string;
  turnedDownOpportunities: string;
  stoppingGrowth?: string;          // OLD - kept for backward compatibility
  
  // Risk & Dependency
  biggestCustomerLeaving: string;
  keepsOwnerAwake: string;
  hasInsurance: string;
  
  // Market Position
  isMarketGrowing: string;
  competitivePressureChange: string;
}

export interface RedFlag {
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium';
}

export interface CompetitiveIntelligence {
  marketReality: string;
  industryBenchmarks: string;
  competitiveSet: string;
  researchSources: string[];
}

export interface DiagnosticReport {
  companyName: string;
  healthScore: number;
  competitiveIntelligence: CompetitiveIntelligence;
  redFlags: RedFlag[];
  hiddenPattern: string;
  implications: {
    shortTerm: string;
    longTerm: string;
  };
  recommendations: string[];
  nextSteps: string;
  generatedAt: string;
}