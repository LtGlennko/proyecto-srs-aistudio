import React from 'react';

interface DonutChartProps {
  percentage?: number; // For simple progress (like S26)
  segments?: { label: string; value: number; color: string; textColor?: string }[];
  size?: number;
  thickness?: number;
  showLegend?: boolean;
}

export const DonutChart: React.FC<DonutChartProps> = ({ 
  percentage, 
  segments, 
  size = 160, 
  thickness = 40,
  showLegend = true 
}) => {
  if (percentage !== undefined) {
    // Simple 100% or progress chart
    return (
      <div className="flex flex-col items-center">
        <div 
          className="rounded-full relative shadow-lg flex items-center justify-center ring-4 ring-white" 
          style={{ 
            width: size, 
            height: size,
            background: `conic-gradient(#005bbf 0% ${percentage}%, #e0e2ec ${percentage}% 100%)` 
          }}
        >
          <div className="bg-white rounded-full flex items-center justify-center" style={{ width: size - thickness, height: size - thickness }}>
            <span className="font-manrope font-extrabold text-[#005bbf]" style={{ fontSize: size * 0.15 }}>{percentage}%</span>
          </div>
        </div>
      </div>
    );
  }

  if (segments) {
    // Multi-segment chart (SÍ/NO or others)
    const totalValue = segments.reduce((acc, s) => acc + s.value, 0);
    let cumulative = 0;
    
    const processedSegments = segments.map(s => {
      const percentage = totalValue > 0 ? (s.value / totalValue) * 100 : 0;
      const start = cumulative;
      cumulative += percentage;
      return { 
        ...s, 
        percentage, 
        start, 
        end: cumulative 
      };
    });

    const gradientParts = processedSegments.map(s => {
      return `${s.color} ${s.start}% ${s.end}%`;
    }).join(', ');

    const isYesNo = segments.length === 2 && segments[0].label === 'SÍ' && segments[1].label === 'NO';

    return (
      <div className="flex flex-col items-center w-full">
        <div 
          className="rounded-full relative shadow-lg flex items-center justify-center ring-4 ring-white overflow-hidden" 
          style={{ 
            width: size, 
            height: size,
            background: totalValue === 0 ? '#e5e7eb' : `conic-gradient(${gradientParts})` 
          }}
        >
          {/* Text labels inside segments (only for SÍ/NO case) */}
          {isYesNo && totalValue > 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="relative w-full h-full">
                  <span className="absolute top-[25%] left-[60%] text-[10px] font-bold text-white">SÍ</span>
                  <span className="absolute top-[60%] left-[25%] text-[10px] font-bold text-[#414754]">NO</span>
               </div>
            </div>
          )}

          <div className="bg-white rounded-full" style={{ width: size - thickness, height: size - thickness }}></div>
        </div>

        {showLegend && (
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
            {processedSegments.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }}></div>
                <span className="text-[10px] font-bold text-[#191c23] whitespace-nowrap">
                  {s.label} ({totalValue > 0 ? Math.round(s.percentage) : 0}%)
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};
