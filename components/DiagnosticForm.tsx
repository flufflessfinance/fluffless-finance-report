'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DiagnosticFormData } from '@/lib/types';
import LoadingState from './LoadingState';

export default function DiagnosticForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<DiagnosticFormData>({
    // Company Information
    companyName: '',
    companyDescription: '',
    yearsInBusiness: '',
    industry: '',
    customIndustry: '',
    
    // Financial Metrics
    annualRevenue: '',
    grossMargin: '',
    netMargin: '',
    isProfitable: '',
    
    // Competitive Context
    competitionLevel: '',
    mainCompetitors: '',
    competingOn: [],
    marketDemand: '',
    competitivePressure: '',
    disruptionThreats: [],
    entryBarriers: '',
    
    // Strategic Foundation
    canArticulateDifference: '',
    hasWrittenPlan: '',
    successIn3Years: '',
    reactingOrAnticipating: '',
    
    // Revenue & Customer Health
    revenueTrend: '',
    activeCustomers: '',
    top3CustomerPercentage: '',
    whyCustomersChoose: '',
    customerChurn: '',
    salesCycle: '',
    
    // Cash Flow Reality - UPDATED
    daysOfCash: '',
    struggledWithPayroll: '',
    customerPaymentTerms: '',  // NEW
    vendorPaymentTerms: '',    // NEW
    hasLineOfCredit: '',       // NEW
    lineOfCreditUsage: '',     // NEW
    cashCrunchCauses: '',
    
    // Operational Bottlenecks
    whatWouldBreak: '',
    timeInVsOn: '',
    couldRunWithoutOwner: '',
    reworkTime: '',
    biggestBottleneck: '',
    
    // Growth Capacity - UPDATED
    stoppingGrowthReasons: [], // NEW
    stoppingGrowthOther: '',   // NEW
    operatingAtCapacity: '',
    investIfHadMoney: '',
    turnedDownOpportunities: '',
    
    // Risk & Dependency
    biggestCustomerLeaving: '',
    keepsOwnerAwake: '',
    hasInsurance: '',
    
    // Market Position
    isMarketGrowing: '',
    competitivePressureChange: '',
  });

  const handleCheckboxChange = (field: 'competingOn' | 'disruptionThreats' | 'stoppingGrowthReasons', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v: string) => v !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const data = await response.json();
      
      // Store report in sessionStorage
      sessionStorage.setItem('diagnosticReport', JSON.stringify(data.report));
      
      // Navigate to report page
      router.push('/report');
      
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate report. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Business Health Diagnostic
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Get your personalized competitive intelligence report
          </p>
          <p className="text-sm text-gray-500">
            Takes 5-10 minutes • Generates in 2-3 minutes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          
          {/* Company Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b">
              Company Information
            </h2>
            <div className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  placeholder="Your company name"
                />
                <p className="text-xs text-gray-400 mt-1">
                  We'll research your company to provide industry-specific insights
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What does your company do? * (1-2 sentences)
                </label>
                <textarea
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  rows={3}
                  value={formData.companyDescription}
                  onChange={(e) => setFormData({...formData, companyDescription: e.target.value})}
                  placeholder="E.g., We operate 3 bubble tea outlets in suburban malls, targeting young professionals..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How long has the business been operating? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.yearsInBusiness}
                  onChange={(e) => setFormData({...formData, yearsInBusiness: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1 year">1 year</option>
                  <option value="2 years">2 years</option>
                  <option value="3 years">3 years</option>
                  <option value="4 years">4 years</option>
                  <option value="5 years">5 years</option>
                  <option value="6 years">6 years</option>
                  <option value="7 years">7 years</option>
                  <option value="8 years">8 years</option>
                  <option value="9 years">9 years</option>
                  <option value="10 years">10 years</option>
                  <option value="11-15 years">11-15 years</option>
                  <option value="16-20 years">16-20 years</option>
                  <option value="Over 20 years">Over 20 years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Industry *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value, customIndustry: ''})}
                >
                  <option value="">Select industry...</option>
                  
                  <optgroup label="Food & Beverage">
                    <option value="F&B - Restaurant/Cafe">Restaurant/Cafe</option>
                    <option value="F&B - QSR/Fast Food">QSR/Fast Food</option>
                    <option value="F&B - Catering/Events">Catering/Events</option>
                    <option value="F&B - Food Court/Hawker">Food Court/Hawker</option>
                    <option value="F&B - Bar/Nightlife">Bar/Nightlife</option>
                    <option value="F&B - Food Manufacturing">Food Manufacturing/Processing</option>
                    <option value="F&B - Food Distribution">Food Distribution/Supply</option>
                    <option value="F&B - Bakery/Pastry">Bakery/Pastry</option>
                  </optgroup>
                  
                  <optgroup label="Retail">
                    <option value="Retail - Fashion/Apparel">Fashion/Apparel</option>
                    <option value="Retail - Electronics">Electronics</option>
                    <option value="Retail - Home/Furniture">Home/Furniture</option>
                    <option value="Retail - Beauty/Cosmetics">Beauty/Cosmetics</option>
                    <option value="Retail - Grocery/Supermarket">Grocery/Supermarket</option>
                    <option value="Retail - E-commerce">E-commerce/Online</option>
                    <option value="Retail - General Merchandise">General Merchandise</option>
                  </optgroup>
                  
                  <optgroup label="Professional Services">
                    <option value="Professional Services - Accounting">Accounting/Bookkeeping</option>
                    <option value="Professional Services - Legal">Legal Services</option>
                    <option value="Professional Services - Consulting">Business Consulting</option>
                    <option value="Professional Services - Marketing">Marketing/Advertising</option>
                    <option value="Professional Services - HR">HR/Recruitment</option>
                    <option value="Professional Services - Financial Advisory">Financial Advisory</option>
                    <option value="Professional Services - IT Services">IT Services/Consulting</option>
                  </optgroup>
                  
                  <optgroup label="Healthcare & Wellness">
                    <option value="Healthcare - Clinic/Medical">Clinic/Medical Practice</option>
                    <option value="Healthcare - Dental">Dental Services</option>
                    <option value="Healthcare - TCM">Traditional Chinese Medicine</option>
                    <option value="Healthcare - Wellness/Spa">Wellness/Spa</option>
                    <option value="Healthcare - Fitness">Fitness/Gym</option>
                    <option value="Healthcare - Pharmacy">Pharmacy</option>
                  </optgroup>
                  
                  <optgroup label="Construction & Engineering">
                    <option value="Construction - General Contractor">General Contracting</option>
                    <option value="Construction - Renovation">Renovation/Interior</option>
                    <option value="Construction - MEP">MEP (Mechanical/Electrical/Plumbing)</option>
                    <option value="Construction - Civil Engineering">Civil Engineering</option>
                    <option value="Construction - Specialized Trade">Specialized Trade</option>
                  </optgroup>
                  
                  <optgroup label="Manufacturing">
                    <option value="Manufacturing - Electronics">Electronics Manufacturing</option>
                    <option value="Manufacturing - Machinery">Machinery/Equipment</option>
                    <option value="Manufacturing - Chemicals">Chemicals/Pharmaceuticals</option>
                    <option value="Manufacturing - Metal Fabrication">Metal Fabrication</option>
                    <option value="Manufacturing - Plastic/Rubber">Plastic/Rubber Products</option>
                    <option value="Manufacturing - Consumer Goods">Consumer Goods</option>
                  </optgroup>
                  
                  <optgroup label="Logistics & Transportation">
                    <option value="Logistics - Freight/Shipping">Freight/Shipping</option>
                    <option value="Logistics - Warehousing">Warehousing/Storage</option>
                    <option value="Logistics - Last Mile">Last Mile Delivery</option>
                    <option value="Logistics - 3PL">Third-Party Logistics (3PL)</option>
                    <option value="Transportation - Private Hire">Private Hire/Taxi</option>
                    <option value="Transportation - Commercial Vehicles">Commercial Vehicles</option>
                  </optgroup>
                  
                  <optgroup label="Technology">
                    <option value="Technology - Software Development">Software Development</option>
                    <option value="Technology - SaaS">SaaS/Cloud Services</option>
                    <option value="Technology - E-commerce Platform">E-commerce Platform</option>
                    <option value="Technology - Cybersecurity">Cybersecurity</option>
                    <option value="Technology - Hardware">Hardware/Electronics</option>
                  </optgroup>
                  
                  <optgroup label="Education & Training">
                    <option value="Education - Tuition/Enrichment">Tuition/Enrichment</option>
                    <option value="Education - Training Provider">Corporate Training</option>
                    <option value="Education - Childcare/Preschool">Childcare/Preschool</option>
                    <option value="Education - Online Learning">Online Learning</option>
                  </optgroup>
                  
                  <optgroup label="Hospitality & Tourism">
                    <option value="Hospitality - Hotel/Accommodation">Hotel/Accommodation</option>
                    <option value="Hospitality - Travel Agency">Travel Agency</option>
                    <option value="Hospitality - Event Management">Event Management</option>
                    <option value="Hospitality - Tourism Services">Tourism Services</option>
                  </optgroup>
                  
                  <optgroup label="Other Services">
                    <option value="Services - Cleaning">Cleaning/Facilities Management</option>
                    <option value="Services - Security">Security Services</option>
                    <option value="Services - Pest Control">Pest Control</option>
                    <option value="Services - Maintenance">Maintenance/Repair</option>
                    <option value="Services - Laundry">Laundry/Dry Cleaning</option>
                    <option value="Services - Beauty/Salon">Beauty Salon/Barbershop</option>
                  </optgroup>
                  
                  <optgroup label="Trading & Import/Export">
                    <option value="Trading - General">General Trading</option>
                    <option value="Trading - Import/Export">Import/Export</option>
                    <option value="Trading - Wholesale">Wholesale Distribution</option>
                  </optgroup>
                  
                  <optgroup label="Creative & Media">
                    <option value="Creative - Advertising Agency">Advertising Agency</option>
                    <option value="Creative - Design Studio">Design Studio</option>
                    <option value="Creative - Photography/Video">Photography/Videography</option>
                    <option value="Creative - Printing">Printing Services</option>
                  </optgroup>
                  
                  <optgroup label="Automotive">
                    <option value="Automotive - Workshop/Repair">Workshop/Repair</option>
                    <option value="Automotive - Car Rental">Car Rental/Leasing</option>
                    <option value="Automotive - Parts/Accessories">Parts/Accessories</option>
                  </optgroup>
                  
                  <optgroup label="Real Estate">
                    <option value="Real Estate - Property Management">Property Management</option>
                    <option value="Real Estate - Agency">Real Estate Agency</option>
                  </optgroup>
                  
                  <option value="Other">Other (Please specify)</option>
                </select>
                
                {formData.industry === 'Other' && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Please specify your industry *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                      value={formData.customIndustry}
                      onChange={(e) => setFormData({...formData, customIndustry: e.target.value})}
                      placeholder="Enter your industry"
                    />
                  </div>
                )}
              </div>

            </div>
          </section>

          {/* Financial Metrics */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b">
              Financial Metrics
            </h2>
            <div className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approximate Annual Revenue *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.annualRevenue}
                  onChange={(e) => setFormData({...formData, annualRevenue: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="<$100K">Less than $100K</option>
                  <option value="$100K-$500K">$100K - $500K</option>
                  <option value="$500K-$1M">$500K - $1M</option>
                  <option value="$1M-$3M">$1M - $3M</option>
                  <option value="$3M-$5M">$3M - $5M</option>
                  <option value="$5M-$10M">$5M - $10M</option>
                  <option value=">$10M">Over $10M</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approximate Gross Margin *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.grossMargin}
                  onChange={(e) => setFormData({...formData, grossMargin: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="<10%">Less than 10%</option>
                  <option value="10-20%">10-20%</option>
                  <option value="20-30%">20-30%</option>
                  <option value="30-40%">30-40%</option>
                  <option value="40-50%">40-50%</option>
                  <option value=">50%">Over 50%</option>
                  <option value="Not sure">Not sure</option>
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Gross margin = (Revenue - Direct Costs) / Revenue
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approximate Net Margin *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.netMargin}
                  onChange={(e) => setFormData({...formData, netMargin: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Negative (losing money)">Negative (losing money)</option>
                  <option value="<5%">Less than 5%</option>
                  <option value="5-10%">5-10%</option>
                  <option value="10-15%">10-15%</option>
                  <option value="15-20%">15-20%</option>
                  <option value=">20%">Over 20%</option>
                  <option value="Not sure">Not sure</option>
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Net margin = What's left after ALL expenses
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is your business currently profitable? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.isProfitable}
                  onChange={(e) => setFormData({...formData, isProfitable: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Yes, consistently profitable">Yes, consistently profitable</option>
                  <option value="Yes, but margins are thin">Yes, but margins are thin</option>
                  <option value="Breaking even">Breaking even</option>
                  <option value="No, operating at a loss">No, operating at a loss</option>
                  <option value="Not sure">Not sure</option>
                </select>
              </div>

            </div>
          </section>

          {/* Competitive Landscape */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b">
              Competitive Landscape
            </h2>
            <div className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How competitive is your market? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.competitionLevel}
                  onChange={(e) => setFormData({...formData, competitionLevel: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Very competitive (many similar players)">Very competitive (many similar players)</option>
                  <option value="Moderately competitive">Moderately competitive</option>
                  <option value="Limited competition">Limited competition</option>
                  <option value="Near monopoly (very few competitors)">Near monopoly (very few competitors)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Who are your 3 main competitors? *
                </label>
                <textarea
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  rows={3}
                  value={formData.mainCompetitors}
                  onChange={(e) => setFormData({...formData, mainCompetitors: e.target.value})}
                  placeholder="List your main competitors..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What do you compete on? * (Select all that apply)
                </label>
                <div className="space-y-2">
                  {['Price', 'Quality', 'Service', 'Speed/Convenience', 'Brand/Reputation', 'Innovation/Technology', 'Location', 'Other'].map(option => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.competingOn.includes(option)}
                        onChange={() => handleCheckboxChange('competingOn', option)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How would you describe market demand? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.marketDemand}
                  onChange={(e) => setFormData({...formData, marketDemand: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Growing rapidly">Growing rapidly</option>
                  <option value="Growing steadily">Growing steadily</option>
                  <option value="Stable">Stable</option>
                  <option value="Declining">Declining</option>
                  <option value="Highly seasonal">Highly seasonal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How has competitive pressure changed recently? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.competitivePressure}
                  onChange={(e) => setFormData({...formData, competitivePressure: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Getting much more competitive">Getting much more competitive</option>
                  <option value="Getting slightly more competitive">Getting slightly more competitive</option>
                  <option value="Staying the same">Staying the same</option>
                  <option value="Getting less competitive">Getting less competitive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What threatens to disrupt your business? * (Select all that apply)
                </label>
                <div className="space-y-2">
                  {['New technology', 'Changing regulations', 'New competitors', 'Changing customer preferences', 'Economic downturn', 'Supply chain issues', 'None currently', 'Other'].map(option => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.disruptionThreats.includes(option)}
                        onChange={() => handleCheckboxChange('disruptionThreats', option)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What are the barriers to entry in your industry? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.entryBarriers}
                  onChange={(e) => setFormData({...formData, entryBarriers: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Very high (significant capital, licenses, expertise)">Very high (significant capital, licenses, expertise)</option>
                  <option value="High">High</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Low (easy for new players to enter)">Low (easy for new players to enter)</option>
                </select>
              </div>

            </div>
          </section>

          {/* Strategic Foundation */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b">
              Strategic Foundation
            </h2>
            <div className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Can you clearly articulate how you're different from competitors? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.canArticulateDifference}
                  onChange={(e) => setFormData({...formData, canArticulateDifference: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Yes, very clearly">Yes, very clearly</option>
                  <option value="Somewhat">Somewhat</option>
                  <option value="Not really">Not really</option>
                  <option value="No, we're quite similar to others">No, we're quite similar to others</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have a written business plan? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.hasWrittenPlan}
                  onChange={(e) => setFormData({...formData, hasWrittenPlan: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Yes, detailed and updated regularly">Yes, detailed and updated regularly</option>
                  <option value="Yes, but outdated">Yes, but outdated</option>
                  <option value="Informal plan (not written)">Informal plan (not written)</option>
                  <option value="No plan">No plan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What does success look like in 3 years? *
                </label>
                <textarea
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  rows={3}
                  value={formData.successIn3Years}
                  onChange={(e) => setFormData({...formData, successIn3Years: e.target.value})}
                  placeholder="Describe your vision..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Are you mostly reacting to problems or anticipating them? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.reactingOrAnticipating}
                  onChange={(e) => setFormData({...formData, reactingOrAnticipating: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Mostly anticipating (proactive)">Mostly anticipating (proactive)</option>
                  <option value="Mix of both">Mix of both</option>
                  <option value="Mostly reacting (firefighting)">Mostly reacting (firefighting)</option>
                </select>
              </div>

            </div>
          </section>

          {/* Revenue & Customers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b">
              Revenue & Customers
            </h2>
            <div className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How has revenue trended over the past 12 months? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.revenueTrend}
                  onChange={(e) => setFormData({...formData, revenueTrend: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Growing rapidly (20%+)">Growing rapidly (20%+)</option>
                  <option value="Growing steadily (10-20%)">Growing steadily (10-20%)</option>
                  <option value="Growing slowly (<10%)">Growing slowly (&lt;10%)</option>
                  <option value="Flat/Stable">Flat/Stable</option>
                  <option value="Declining">Declining</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How many active customers do you have? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.activeCustomers}
                  onChange={(e) => setFormData({...formData, activeCustomers: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="<10">Less than 10</option>
                  <option value="10-50">10-50</option>
                  <option value="50-100">50-100</option>
                  <option value="100-500">100-500</option>
                  <option value="500-1000">500-1000</option>
                  <option value=">1000">Over 1000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What % of revenue comes from your top 3 customers? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.top3CustomerPercentage}
                  onChange={(e) => setFormData({...formData, top3CustomerPercentage: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="<20%">Less than 20%</option>
                  <option value="20-40%">20-40%</option>
                  <option value="40-60%">40-60%</option>
                  <option value="60-80%">60-80%</option>
                  <option value=">80%">Over 80%</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why do customers choose you over competitors? *
                </label>
                <textarea
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  rows={3}
                  value={formData.whyCustomersChoose}
                  onChange={(e) => setFormData({...formData, whyCustomersChoose: e.target.value})}
                  placeholder="What makes you their preferred choice?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How often do customers stop buying from you? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.customerChurn}
                  onChange={(e) => setFormData({...formData, customerChurn: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Rarely (high retention)">Rarely (high retention)</option>
                  <option value="Sometimes">Sometimes</option>
                  <option value="Often">Often</option>
                  <option value="Very often (high churn)">Very often (high churn)</option>
                  <option value="Not sure">Not sure</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How long does it take to convert a lead to paying customer? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.salesCycle}
                  onChange={(e) => setFormData({...formData, salesCycle: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Less than a week">Less than a week</option>
                  <option value="Less than a month">Less than a month</option>
                  <option value="One quarter (3 months)">One quarter (3 months)</option>
                  <option value="Half a year (6 months)">Half a year (6 months)</option>
                  <option value="Slightly less than a year">Slightly less than a year</option>
                  <option value="More than a year">More than a year</option>
                </select>
              </div>

            </div>
          </section>

          {/* Cash Flow Reality */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b">
              Cash Flow Reality
            </h2>
            <div className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How many days of cash do you have on hand? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.daysOfCash}
                  onChange={(e) => setFormData({...formData, daysOfCash: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="<30 days">Less than 30 days</option>
                  <option value="30-90 days">30-90 days</option>
                  <option value="90-180 days">90-180 days</option>
                  <option value=">180 days">Over 180 days</option>
                  <option value="Not sure">Not sure</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Have you struggled to make payroll in the past year? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.struggledWithPayroll}
                  onChange={(e) => setFormData({...formData, struggledWithPayroll: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Never">Never</option>
                  <option value="Once or twice">Once or twice</option>
                  <option value="Several times">Several times</option>
                  <option value="Regularly">Regularly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What are your customer payment terms? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.customerPaymentTerms}
                  onChange={(e) => setFormData({...formData, customerPaymentTerms: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="On the spot">On the spot (cash/immediate)</option>
                  <option value="<30 days">Less than 30 days</option>
                  <option value="30-45 days">30-45 days</option>
                  <option value="45-60 days">45-60 days</option>
                  <option value="60-90 days">60-90 days</option>
                  <option value=">90 days">More than 90 days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What are your vendor payment terms? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.vendorPaymentTerms}
                  onChange={(e) => setFormData({...formData, vendorPaymentTerms: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="On the spot">On the spot (cash/immediate)</option>
                  <option value="<30 days">Less than 30 days</option>
                  <option value="30-45 days">30-45 days</option>
                  <option value="45-60 days">45-60 days</option>
                  <option value="60-90 days">60-90 days</option>
                  <option value=">90 days">More than 90 days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have a line of credit from banks to manage cash flow? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.hasLineOfCredit}
                  onChange={(e) => setFormData({...formData, hasLineOfCredit: e.target.value, lineOfCreditUsage: ''})}
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                
                {formData.hasLineOfCredit === 'Yes' && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How often do you use this line of credit? *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                      value={formData.lineOfCreditUsage}
                      onChange={(e) => setFormData({...formData, lineOfCreditUsage: e.target.value})}
                    >
                      <option value="">Select...</option>
                      <option value="Regularly">Regularly</option>
                      <option value="Occasionally">Occasionally</option>
                      <option value="Never used it">Never used it</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What typically causes cash crunches? *
                </label>
                <textarea
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  rows={3}
                  value={formData.cashCrunchCauses}
                  onChange={(e) => setFormData({...formData, cashCrunchCauses: e.target.value})}
                  placeholder="E.g., Slow-paying customers, seasonal dips, inventory purchases..."
                />
              </div>

            </div>
          </section>

          {/* Operational Bottlenecks */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b">
              Operational Bottlenecks
            </h2>
            <div className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  If volume increased 50%, what would break first? *
                </label>
                <textarea
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  rows={3}
                  value={formData.whatWouldBreak}
                  onChange={(e) => setFormData({...formData, whatWouldBreak: e.target.value})}
                  placeholder="E.g., Production capacity, delivery logistics, staff..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What percentage of your time is spent working IN vs ON the business? *
                </label>
                <p className="text-xs text-gray-400 mb-3">
                  <strong>IN the business:</strong> Doing the daily work (serving customers, making products, handling operations)<br/>
                  <strong>ON the business:</strong> Strategic planning, improving systems, business development
                </p>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.timeInVsOn}
                  onChange={(e) => setFormData({...formData, timeInVsOn: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Mostly IN (90%+)">Mostly IN the business (90%+ of time)</option>
                  <option value="Mostly IN (70%)">Mostly IN (70% of time)</option>
                  <option value="Balanced">Balanced 50/50</option>
                  <option value="Mostly ON (70%)">Mostly ON (70% of time)</option>
                  <option value="Mostly ON (90%+)">Mostly ON the business (90%+ of time)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Could the business run without you for a month? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.couldRunWithoutOwner}
                  onChange={(e) => setFormData({...formData, couldRunWithoutOwner: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Yes, easily">Yes, easily</option>
                  <option value="Probably, with some issues">Probably, with some issues</option>
                  <option value="Would struggle significantly">Would struggle significantly</option>
                  <option value="No, would collapse">No, would collapse</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How much time do you spend redoing work or fixing mistakes? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.reworkTime}
                  onChange={(e) => setFormData({...formData, reworkTime: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Rarely (good systems)">Rarely (good systems)</option>
                  <option value="Sometimes (5-10%)">Sometimes (5-10%)</option>
                  <option value="Often (10-20%)">Often (10-20%)</option>
                  <option value="Constantly (20%+)">Constantly (20%+)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's your biggest operational bottleneck? *
                </label>
                <textarea
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  rows={3}
                  value={formData.biggestBottleneck}
                  onChange={(e) => setFormData({...formData, biggestBottleneck: e.target.value})}
                  placeholder="What slows you down the most?"
                />
              </div>

            </div>
          </section>

          {/* Growth Capacity */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b">
              Growth Capacity
            </h2>
            <div className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's stopping you from growing faster? * (Select all that apply)
                </label>
                <div className="space-y-2">
                  {[
                    'Cash flow constraints',
                    'Lack of skilled staff',
                    'Production/capacity limits',
                    'Market competition',
                    'Customer acquisition challenges',
                    'Operational bottlenecks',
                    'Regulatory/compliance issues',
                    'Other'
                  ].map(option => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.stoppingGrowthReasons.includes(option)}
                        onChange={() => handleCheckboxChange('stoppingGrowthReasons', option)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                
                {formData.stoppingGrowthReasons.includes('Other') && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Please specify other growth barriers *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                      value={formData.stoppingGrowthOther}
                      onChange={(e) => setFormData({...formData, stoppingGrowthOther: e.target.value})}
                      placeholder="Describe the specific barriers..."
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Are you operating at capacity? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.operatingAtCapacity}
                  onChange={(e) => setFormData({...formData, operatingAtCapacity: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="No, significant capacity available">No, significant capacity available</option>
                  <option value="Some capacity available">Some capacity available</option>
                  <option value="Near capacity">Near capacity</option>
                  <option value="At or over capacity">At or over capacity</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  If you had more capital, where would you invest it? *
                </label>
                <textarea
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  rows={3}
                  value={formData.investIfHadMoney}
                  onChange={(e) => setFormData({...formData, investIfHadMoney: e.target.value})}
                  placeholder="E.g., Hiring, marketing, equipment, expansion..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Have you turned down opportunities due to capacity constraints? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.turnedDownOpportunities}
                  onChange={(e) => setFormData({...formData, turnedDownOpportunities: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Never">Never</option>
                  <option value="Rarely">Rarely</option>
                  <option value="Sometimes">Sometimes</option>
                  <option value="Often">Often</option>
                </select>
              </div>

            </div>
          </section>

          {/* Risk & Dependency */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b">
              Risk & Dependency
            </h2>
            <div className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  If your biggest customer left tomorrow, what would happen? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.biggestCustomerLeaving}
                  onChange={(e) => setFormData({...formData, biggestCustomerLeaving: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Minimal impact">Minimal impact</option>
                  <option value="Noticeable but manageable">Noticeable but manageable</option>
                  <option value="Significant problem">Significant problem</option>
                  <option value="Business would be in serious trouble">Business would be in serious trouble</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What keeps you awake at night? *
                </label>
                <textarea
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  rows={3}
                  value={formData.keepsOwnerAwake}
                  onChange={(e) => setFormData({...formData, keepsOwnerAwake: e.target.value})}
                  placeholder="Your biggest business concerns..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have adequate business insurance? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.hasInsurance}
                  onChange={(e) => setFormData({...formData, hasInsurance: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Yes, comprehensive coverage">Yes, comprehensive coverage</option>
                  <option value="Yes, basic coverage">Yes, basic coverage</option>
                  <option value="Minimal coverage">Minimal coverage</option>
                  <option value="No insurance">No insurance</option>
                </select>
              </div>

            </div>
          </section>

          {/* Market Dynamics */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b">
              Market Dynamics
            </h2>
            <div className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is your overall market growing or shrinking? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.isMarketGrowing}
                  onChange={(e) => setFormData({...formData, isMarketGrowing: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Growing rapidly">Growing rapidly</option>
                  <option value="Growing steadily">Growing steadily</option>
                  <option value="Stable">Stable</option>
                  <option value="Declining slowly">Declining slowly</option>
                  <option value="Declining rapidly">Declining rapidly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How is competitive pressure changing? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  value={formData.competitivePressureChange}
                  onChange={(e) => setFormData({...formData, competitivePressureChange: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Increasing significantly">Increasing significantly</option>
                  <option value="Increasing somewhat">Increasing somewhat</option>
                  <option value="Staying the same">Staying the same</option>
                  <option value="Decreasing">Decreasing</option>
                </select>
              </div>

            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Generating Report...' : 'Generate My Business Health Report'}
            </button>
            <p className="text-xs text-gray-500 text-center mt-3">
              This usually takes 2-3 minutes as we research your market and analyze your responses
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}