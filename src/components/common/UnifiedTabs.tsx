import React from 'react';
import { ScreenId } from '../../types';

export interface TabItem {
  id: string;
  label: string;
  icon: string;
  screen?: ScreenId;
  onClick?: () => void;
  badge?: number;
  color?: string; // Optional custom color for active state
}

interface UnifiedTabsProps {
  tabs: TabItem[];
  activeTabId: string;
}

export const UnifiedTabs: React.FC<UnifiedTabsProps> = ({ tabs, activeTabId }) => {
  return (
    <div className="bg-white border-b border-[#e0e0e0] flex w-full fixed top-[92px] left-0 z-[999]">
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        const activeColor = tab.color || '#005bbf';
        
        return (
          <button
            key={tab.id}
            onClick={() => tab.onClick ? tab.onClick() : null}
            className={`flex-1 py-[14px] px-[4px] text-[12px] font-bold transition-all border-b-[3px] flex items-center justify-center gap-1.5 ${
              isActive
                ? `text-[${activeColor}] border-[${activeColor}] bg-[${activeColor}]/5`
                : 'text-[#727785] border-transparent hover:bg-gray-50'
            }`}
            style={isActive ? { 
              color: activeColor, 
              borderColor: activeColor,
              backgroundColor: `${activeColor}10` // 10 is ~6% opacity in hex
            } : {}}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            <div className="relative">
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <div className="absolute -top-1.5 -right-6 min-w-[15px] h-[15px] bg-[#6200ee] rounded-full flex items-center justify-center px-1 text-[8px] font-black text-white border border-white shadow-sm">
                  {tab.badge > 9 ? '9+' : tab.badge}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
