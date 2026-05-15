import React from 'react';

interface HeaderProps {
  backLabel?: string;
  onBack?: () => void;
  showSettings?: boolean;
  onSettingsClick?: () => void;
  rightAction?: React.ReactNode;
  title?: string;
  subtitle?: string;
  hidePrefix?: boolean;
  sinBack?: boolean;
  sinRight?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  backLabel, 
  onBack, 
  showSettings, 
  onSettingsClick,
  rightAction,
  title,
  subtitle,
  hidePrefix,
  sinBack,
  sinRight
}) => {
  return (
    <header className="bg-white border-b border-slate-200 fixed top-0 left-0 w-full z-[1001] flex items-center px-4 h-[56px]">
      <div className="flex-1 flex items-center gap-2">
        {!sinBack && onBack && (
          <button 
            onClick={onBack} 
            className="text-[#005bbf] font-bold text-sm flex items-center gap-1 hover:opacity-80 transition-opacity whitespace-nowrap p-1"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
        )}
        {!sinBack && (title || subtitle) && (
          <div className="flex flex-col ml-2 truncate">
            {title && <h1 className="font-manrope font-bold text-base leading-tight text-[#191c23] truncate">{title}</h1>}
            {subtitle && <span className="text-[10px] text-[#727785] font-medium truncate">{subtitle}</span>}
          </div>
        )}
      </div>
      <div className="flex-1 flex justify-end items-center gap-2">
        {!sinRight && rightAction}
        {!sinRight && showSettings && (
          <button 
            onClick={onSettingsClick}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[#f2f3fd] text-[#005bbf] hover:bg-[#005bbf] hover:text-white transition-all group"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">edit</span>
            <span className="text-[11px] font-bold">Editar</span>
          </button>
        )}
      </div>
    </header>
  );
};
