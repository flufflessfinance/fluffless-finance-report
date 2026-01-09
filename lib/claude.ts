import Anthropic from '@anthropic-ai/sdk';
import { DiagnosticFormData, DiagnosticReport, RedFlag } from './types';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Function to strip citation markers from text
function stripCitations(text: string): string {
  if (!text) return text;
  
  // Remove citation indices like [1], [2], etc.
  text = text.replace(/\[\d+\]/g, '');
  
  // Remove  tags
  text = text.replace(/]*>/g, '');
  text = text.replace(/<\/antml:cite>/g, '');
  
  // Clean up any double spaces left behind
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

// Clean all text fields in the report
function cleanReport(report: DiagnosticReport): DiagnosticReport {
  if (report.competitiveIntelligence) {
    report.competitiveIntelligence.marketReality = stripCitations(report.competitiveIntelligence.marketReality);
    report.competitiveIntelligence.industryBenchmarks = stripCitations(report.competitiveIntelligence.industryBenchmarks);
    report.competitiveIntelligence.competitiveSet = stripCitations(report.competitiveIntelligence.competitiveSet);
  }

  if (report.redFlags) {
    report.redFlags = report.redFlags.map((flag: RedFlag) => ({
      ...flag,
      title: stripCitations(flag.title),
      description: stripCitations(flag.description)
    }));
  }

  if (report.hiddenPattern) {
    report.hiddenPattern = stripCitations(report.hiddenPattern);
  }

  if (report.implications) {
    report.implications.shortTerm = stripCitations(report.implications.shortTerm);
    report.implications.longTerm = stripCitations(report.implications.longTerm);
  }

  if (report.recommendations) {
    report.recommendations = report.recommendations.map((rec: string) => stripCitations(rec));
  }

  if (report.nextSteps) {
    report.nextSteps = stripCitations(report.nextSteps);
  }

  return report;
}

export async function generateDiagnosticReport(
  formData: DiagnosticFormData
): Promise<DiagnosticReport> {
  
  const systemPrompt = `You are a business diagnostic analyst for Fluffless Finance, evaluating Singapore SMEs.

YOUR METHODOLOGY:
1. Research the company and their specific market segment using web_search
2. Gather industry-specific intelligence and competitive benchmarks
3. Analyze their responses with macro-to-micro context:
   - Macro: Singapore economy, consumer trends, regulatory environment
   - Meso: Industry trends and dynamics
   - Micro: Their specific niche and competitive position
4. Generate insights that reveal blind spots they don't see

YOUR PHILOSOPHY (Kelvin's voice):
- "The brutal truth is the kindest thing I can give you"
- Direct, no sugarcoating
- Industry-specific insights (not generic business advice)
- Show deep understanding of their market reality
- Position problems as solvable but requiring intervention

**CRITICAL LANGUAGE REQUIREMENTS:**

When writing the Competitive Intelligence section, you MUST:

1. **Avoid Financial Jargon:**
   - NEVER use: CAGR, ROI, EBITDA, P&L, OPEX, CAPEX, YoY, QoQ, TTM, LTV, CAC, ARR, MRR without explanation
   - Write for someone with NO business education

2. **Simplify Market Reality:**
   Instead of: "Market shows 3.85% CAGR with seasonal volatility tied to BTO cycles"
   Write: "The market is growing about 4% per year (that means a $100 market becomes $104 next year). Sales spike when new HDB flats are completed because new homeowners need mattresses."

3. **Explain Industry Benchmarks in Plain Terms:**
   Instead of: "Typical gross margins range 35-45% with CAC of 15-25% of transaction value"
   Write: "Most companies keep about 35-45 cents of profit from every dollar of sales before paying for rent and salaries. They typically spend $15-25 to get a customer who spends $100."

4. **Use Everyday Language:**
   - "Growing" not "Experiencing positive momentum"
   - "Sales" not "Revenue generation"
   - "Profit" not "Margin optimization"
   - "Customers leaving" not "Churn rate"

5. **When You Must Use Terms, Explain Them:**
   Example: "Your gross margin (that's what you keep after paying for materials and direct costs) is 18%. The industry standard is 35-45%, which means..."

CRITICAL: After completing your research and analysis, respond with ONLY a JSON object (no markdown formatting, no code blocks, no explanation) matching this EXACT structure:

**IMPORTANT - NO CITATION MARKERS:**
- Do NOT include any citation indices like [1], [2], [3] in your text
- Do NOT include  tags or any citation markup
- Write all text as clean, readable prose without citation markers
- The researchSources array is sufficient for attribution

{
  "healthScore": <number 0-100>,
  "competitiveIntelligence": {
    "marketReality": "<string: PLAIN LANGUAGE market state - NO citations>",
    "industryBenchmarks": "<string: SIMPLE PERCENTAGES - NO citations>",
    "competitiveSet": "<string: NAME actual competitors - NO citations>",
    "researchSources": ["<array of sources used>"]
  },
  "redFlags": [
    {
      "title": "<string: PLAIN LANGUAGE title - NO citations>",
      "description": "<string: SIMPLE explanation - NO citations>",
      "severity": "<critical|high|medium>"
    }
  ],
  "hiddenPattern": "<string: SIMPLE explanation - NO citations>",
  "implications": {
    "shortTerm": "<string: PLAIN language - NO citations>",
    "longTerm": "<string: PLAIN language - NO citations>"
  },
  "recommendations": ["<array of ACTIONABLE steps - NO citations>"],
  "nextSteps": "<string: DIRECT reason to book - NO citations>"
}`;

  const userPrompt = `COMPANY TO ANALYZE:
Name: ${formData.companyName}
Description: ${formData.companyDescription}
Industry: ${formData.industry === 'Other' && formData.customIndustry ? formData.customIndustry : formData.industry}
Years Operating: ${formData.yearsInBusiness}

FINANCIALS (Self-Reported):
Annual Revenue: ${formData.annualRevenue}
Gross Margin: ${formData.grossMargin}
Net Margin: ${formData.netMargin}
Currently Profitable: ${formData.isProfitable}

COMPETITIVE CONTEXT:
Competition Level: ${formData.competitionLevel}
Main Competitors: ${formData.mainCompetitors}
Competing On: ${formData.competingOn.join(', ')}
Market Demand: ${formData.marketDemand}
Competitive Pressure Trend: ${formData.competitivePressure}
Disruption Threats: ${formData.disruptionThreats.join(', ')}
Entry Barriers: ${formData.entryBarriers}

STRATEGIC FOUNDATION:
Can Articulate Difference: ${formData.canArticulateDifference}
Has Written Plan: ${formData.hasWrittenPlan}
Success in 3 Years: ${formData.successIn3Years}
Reacting or Anticipating: ${formData.reactingOrAnticipating}

REVENUE & CUSTOMERS:
Revenue Trend: ${formData.revenueTrend}
Active Customers: ${formData.activeCustomers}
Top 3 Customers %: ${formData.top3CustomerPercentage}
Why Customers Choose Them: ${formData.whyCustomersChoose}
Customer Churn: ${formData.customerChurn}
Sales Cycle: ${formData.salesCycle}

CASH FLOW:
Days of Cash: ${formData.daysOfCash}
Struggled with Payroll: ${formData.struggledWithPayroll}
Customer Payment Terms: ${formData.customerPaymentTerms || formData.paymentTerms || 'Not specified'}
Vendor Payment Terms: ${formData.vendorPaymentTerms || 'Not specified'}
Has Line of Credit: ${formData.hasLineOfCredit || formData.usesLineOfCredit || 'Not specified'}
${formData.lineOfCreditUsage ? `Line of Credit Usage: ${formData.lineOfCreditUsage}` : ''}
Cash Crunch Causes: ${formData.cashCrunchCauses}

OPERATIONS:
What Would Break at 50% More Volume: ${formData.whatWouldBreak}
Time IN vs ON Business: ${formData.timeInVsOn}
Could Run Without Owner: ${formData.couldRunWithoutOwner}
Rework Time: ${formData.reworkTime}
Biggest Bottleneck: ${formData.biggestBottleneck}

GROWTH:
What's Stopping Growth: ${formData.stoppingGrowthReasons ? formData.stoppingGrowthReasons.join(', ') : formData.stoppingGrowth || 'Not specified'}
${formData.stoppingGrowthOther ? `Other Growth Barriers: ${formData.stoppingGrowthOther}` : ''}
Operating at Capacity: ${formData.operatingAtCapacity}
Would Invest If Had Money: ${formData.investIfHadMoney}
Turned Down Opportunities: ${formData.turnedDownOpportunities}

RISK:
Biggest Customer Leaving Impact: ${formData.biggestCustomerLeaving}
What Keeps Owner Awake: ${formData.keepsOwnerAwake}
Has Insurance: ${formData.hasInsurance}

MARKET:
Market Growth: ${formData.isMarketGrowing}
Competitive Pressure Change: ${formData.competitivePressureChange}

INSTRUCTIONS:
1. Use web_search extensively to research:
   - This specific company (if public info available)
   - Their exact market niche in Singapore
   - Industry benchmarks and standards
   - Competitive landscape
   - Recent market trends and disruptions

2. Connect the dots between their competitive context, financial metrics, and operational responses

3. Identify patterns specific to businesses in their situation

4. Generate the diagnostic report as pure JSON (no markdown, no backticks, NO CITATION MARKERS)`;

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: userPrompt
      }],
      tools: [{
        type: 'web_search_20250305' as const,
        name: 'web_search'
      }]
    });

    // Extract text content from Claude's response
    const textContent = message.content
      .filter(block => block.type === 'text')
      .map(block => block.type === 'text' ? block.text : '')
      .join('\n');

    if (!textContent) {
      throw new Error('No text response from Claude');
    }

    // Clean up response and parse JSON
    const cleanedResponse = textContent
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    let report = JSON.parse(cleanedResponse);
    
    // Clean all citation markers from the report
    report = cleanReport(report);
    
    return {
      companyName: formData.companyName,
      generatedAt: new Date().toISOString(),
      ...report
    };
  } catch (error) {
    console.error('Error generating report:', error);
    throw new Error('Failed to generate diagnostic report');
  }
}