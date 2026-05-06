import React from 'react';
import { ScreenId } from '../../types';

interface BottomNavProps {
  activeTab: 'Cursos' | 'Actividades' | 'Perfil';
  onNavigate: (screen: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onNavigate }) => {
  const tabs = [
    { id: 'Cursos', icon: 'school', screen: 'S19c' as ScreenId },
    { id: 'Actividades', icon: 'assignment', screen: 'S20_ActividadesDocente' as ScreenId },
    { id: 'Perfil', icon: 'account_circle', screen: 'Perfil' as ScreenId },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full h-[64px] bg-white border-t border-slate-200 flex items-center justify-around z-[1000] px-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.screen)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive ? 'text-[#005bbf]' : 'text-[#727785]'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">
              {tab.icon}
            </span>
            <span className="text-[10px] font-semibold mt-1">
              {tab.id}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
