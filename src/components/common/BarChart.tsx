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
    <div className="flex items-end justify-center gap-6 h-[260px] p-4 bg-white rounded-xl border border-[#c1c6d6]/20 shadow-sm">
      {data.map((item, index) => {
        const barHeight = (item.value / maxValue) * maxBarHeight;
        
        return (
          <div key={index} className="flex flex-col items-center gap-1">
            <span className="text-sm font-bold" style={{ color: item.color }}>{item.value}</span>
            <div 
              className="w-12 rounded-t-[4px] transition-all duration-700 ease-out" 
              style={{ height: `${barHeight}px`, backgroundColor: item.color }}
            ></div>
            <span className="text-[12px] text-[#727785] mt-1 whitespace-nowrap">{item.label}</span>
            <span className="text-[11px] text-[#727785]">{item.percentage}</span>
          </div>
        );
      })}
    </div>
  );
};
