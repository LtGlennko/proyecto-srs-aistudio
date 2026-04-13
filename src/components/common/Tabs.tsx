import React from 'react';
import { ScreenId } from '../../types';

interface TabsProps {
  activeTab: 'Consultas' | 'Actividades';
  onNavigate: (screen: ScreenId) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onNavigate }) => {
  return (
    <div className="bg-white border-b border-[#e0e0e0] flex w-full fixed top-[92px] left-0 z-[999]">
      <button
        onClick={() => onNavigate('S20d')}
        className={`flex-1 py-[12px] px-[16px] text-[14px] font-medium transition-all border-b-2 ${
          activeTab === 'Consultas'
            ? 'text-[#005bbf] border-[#005bbf]'
            : 'text-[#727785] border-transparent'
        }`}
      >
        Consultas de clase
      </button>
      <button
        onClick={() => onNavigate('S20e')}
        className={`flex-1 py-[12px] px-[16px] text-[14px] font-medium transition-all border-b-2 ${
          activeTab === 'Actividades'
            ? 'text-[#005bbf] border-[#005bbf]'
            : 'text-[#727785] border-transparent'
        }`}
      >
        Actividades
      </button>
    </div>
  );
};
