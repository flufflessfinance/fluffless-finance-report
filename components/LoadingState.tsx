'use client';

export default function LoadingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-md text-center">
        {/* Animated Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute top-0 left-0 w-full h-full border-8 border-blue-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-8 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* Status Messages */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Analyzing Your Business
        </h2>
        
        <div className="space-y-3 text-left bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-gray-700">Researching your industry and market segment...</p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-gray-700">Gathering competitive intelligence...</p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-gray-700">Analyzing against industry benchmarks...</p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-gray-700">Identifying blind spots and patterns...</p>
          </div>
        </div>
        
        <p className="mt-6 text-sm text-gray-600">
          This typically takes 2-3 minutes
        </p>
        <p className="text-xs text-gray-500 mt-2">
          We're conducting real market research for your specific business
        </p>
      </div>
    </div>
  );
}