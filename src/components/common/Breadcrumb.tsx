import React from 'react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: (string | BreadcrumbItem)[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="fixed top-[56px] left-0 w-full h-[36px] px-4 flex items-center gap-1 text-[12px] text-[#727785] bg-[#f9f9ff] font-inter z-[1000] border-b border-slate-100/50">
      {items.map((item, index) => {
        const label = typeof item === 'string' ? item : item.label;
        const onClick = typeof item === 'string' ? undefined : item.onClick;
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <button
              onClick={onClick}
              disabled={!onClick || isLast}
              className={`${isLast ? "text-[#005bbf] font-bold" : onClick ? "hover:text-[#005bbf] hover:underline cursor-pointer" : ""} transition-colors text-left`}
            >
              {label}
            </button>
            {index < items.length - 1 && (
              <span className="text-slate-300 mx-1 select-none flex items-center">
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
