import React from 'react';

interface BarChartProps {
  data: {
    label: string;
    value: number;
    percentage: string;
    color: string;
    height: string;
  }[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const maxBarHeight = 180;

  return (
    <div className="flex items-end justify-center gap-2 sm:gap-4 h-[260px] p-2 sm:p-4 bg-white rounded-xl border border-[#c1c6d6]/20 shadow-sm overflow-hidden w-full">
      {data.map((item, index) => {
        const barHeight = (item.value / maxValue) * maxBarHeight;
        
        return (
          <div key={index} className="flex-1 flex flex-col items-center gap-1 min-w-0">
            <span className="text-[10px] sm:text-sm font-bold" style={{ color: item.color }}>{item.value}</span>
            <div 
              className="w-full max-w-[40px] rounded-t-[4px] transition-all duration-700 ease-out" 
              style={{ height: `${barHeight}px`, backgroundColor: item.color }}
            ></div>
            <span className="text-[9px] sm:text-[11px] text-[#727785] mt-1 truncate w-full text-center">{item.label}</span>
            <span className="text-[8px] sm:text-[10px] text-[#727785]">{item.percentage}</span>
          </div>
        );
      })}
    </div>
  );
};
