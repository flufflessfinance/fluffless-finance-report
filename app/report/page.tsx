'use client';

import { useEffect, useState } from 'react';
import { DiagnosticReport } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function ReportPage() {
  const router = useRouter();
  const [report, setReport] = useState<DiagnosticReport | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('diagnosticReport');
    if (stored) {
      setReport(JSON.parse(stored));
    } else {
      // No report found, redirect to home
      router.push('/');
    }
  }, [router]);

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading report...</p>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Healthy';
    if (score >= 40) return 'At Risk';
    return 'Critical';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{report.companyName}</h1>
              <p className="text-sm text-gray-500 mt-1">
                Generated: {new Date(report.generatedAt).toLocaleDateString('en-SG', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Business Health Score */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">BUSINESS HEALTH SCORE</p>
            <div className={`text-7xl font-bold ${getScoreColor(report.healthScore)} mb-2`}>
              {report.healthScore}
              <span className="text-3xl text-gray-400">/100</span>
            </div>
            <p className={`text-xl font-semibold ${getScoreColor(report.healthScore)}`}>
              {getScoreLabel(report.healthScore)}
            </p>
          </div>
        </div>

        {/* Competitive Intelligence */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
            Competitive Intelligence
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">📊</span> Market Reality
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {report.competitiveIntelligence.marketReality}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">📈</span> Industry Benchmarks
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {report.competitiveIntelligence.industryBenchmarks}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">🎯</span> Competitive Set
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {report.competitiveIntelligence.competitiveSet}
              </p>
            </div>

            {report.competitiveIntelligence.researchSources && 
             report.competitiveIntelligence.researchSources.length > 0 && (
              <div className="pt-4 border-t">
                <p className="text-xs text-gray-500 mb-2">Research Sources:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {report.competitiveIntelligence.researchSources.map((source, idx) => (
                    <li key={idx}>• {source}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Red Flags */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
            Critical Red Flags Identified
          </h2>
          
          <div className="space-y-4">
            {report.redFlags.map((flag, idx) => (
              <div 
                key={idx} 
                className={`border-l-4 ${getSeverityColor(flag.severity)} p-6 rounded-r-lg`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {flag.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {flag.description}
                    </p>
                    <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      flag.severity === 'critical' ? 'bg-red-200 text-red-800' :
                      flag.severity === 'high' ? 'bg-orange-200 text-orange-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}>
                      {flag.severity} Priority
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hidden Pattern */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">🔍</span> The Hidden Pattern
          </h2>
          <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
            {report.hiddenPattern}
          </p>
        </section>

        {/* Implications */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
            What This Means
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-orange-600">⏱️</span> Short-Term (6-12 Months)
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {report.implications.shortTerm}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-red-600">📉</span> Long-Term (2-3 Years)
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {report.implications.longTerm}
              </p>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
            Recommended Actions
          </h2>
          
          <div className="space-y-3">
            {report.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </span>
                <p className="text-gray-700 leading-relaxed flex-1">
                  {rec}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl shadow-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready for the Deep Dive?</h2>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto leading-relaxed">
            {report.nextSteps}
          </p>
          <button 
            onClick={() => window.location.href = 'mailto:kelvin@flufflessfinance.sg?subject=Deep Dive Consultation Request'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
          >
            Book Your Consultation →
          </button>
          <p className="text-sm text-blue-200 mt-4">
            Or email: kelvin@flufflessfinance.sg
          </p>
        </section>

        {/* Disclaimer */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600 text-center leading-relaxed">
            <strong>Disclaimer:</strong> This diagnostic report is based on the information you provided and publicly available market research. 
            It is intended for informational purposes and does not constitute financial, legal, or professional advice. 
            For a comprehensive analysis with access to your financial documents, book a consultation.
          </p>
        </div>
      </div>
    </div>
  );
}