import React from 'react';

interface BreadcrumbProps {
  items: string[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="fixed top-[56px] left-0 w-full h-[36px] px-4 flex items-center gap-1 text-[12px] text-[#727785] bg-[#f9f9ff] font-inter z-[1000] border-b border-slate-100/50">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className={index === items.length - 1 ? "text-[#005bbf]" : ""}>
            {item}
          </span>
          {index < items.length - 1 && (
            <span className="text-slate-300 mx-1 select-none">{'>'}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
