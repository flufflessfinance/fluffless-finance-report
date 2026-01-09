import { NextRequest, NextResponse } from 'next/server';
import { generateDiagnosticReport } from '../../../lib/claude';
import { DiagnosticFormData } from '../../../lib/type';
import { supabase } from '../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const formData: DiagnosticFormData = await request.json();
    
    if (!formData.companyName || !formData.companyDescription) {
      return NextResponse.json(
        { success: false, error: 'Company name and description are required' },
        { status: 400 }
      );
    }
    
    const report = await generateDiagnosticReport(formData);
    
    try {
      const { data, error } = await supabase
        .from('submissions')
        .insert([
          {
            company_name: formData.companyName,
            industry: formData.industry === 'Other' && formData.customIndustry 
              ? formData.customIndustry 
              : formData.industry,
            annual_revenue: formData.annualRevenue,
            health_score: report.healthScore,
            form_data: formData,
            report_data: report,
            status: 'new'
          }
        ])
        .select();

      if (error) {
        console.error('Database save error:', error);
      } else {
        console.log('✅ Saved to database:', data);
      }
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
    }
    
    return NextResponse.json({ 
      success: true, 
      report 
    });
    
  } catch (error) {
    console.error('Report generation error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate report';
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export const maxDuration = 60;