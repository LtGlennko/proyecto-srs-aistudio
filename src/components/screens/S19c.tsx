import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';
import { FABButton } from '../common/FABButton';

export const S19c: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-manrope">
      <Header />
      <Breadcrumb items={['Mis Cursos']} />

      <main className="flex-1 px-4 pt-[92px] pb-[80px] w-full">
        <div className="space-y-4">
          <div 
            onClick={() => onNavigate('S19d')}
            className="group relative bg-white rounded-lg border border-[#c1c6d6]/30 shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.99] cursor-pointer overflow-hidden"
          >
            <div className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-bold leading-tight">Lenguajes de Programación</h3>
                <p className="text-sm font-medium text-[#727785]">Código: INF011</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="material-symbols-outlined text-[16px] text-[#727785]">schedule</span>
                  <p className="text-xs text-[#727785] italic">Modificado hace 1 min</p>
                </div>
              </div>
              <div className="flex items-center text-[#727785] group-hover:text-[#1A73E8] transition-colors">
                <span className="material-symbols-outlined text-2xl">chevron_right</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FABButton onClick={() => onNavigate('S19b')} />

      <BottomNav activeTab="Cursos" onNavigate={onNavigate} />
    </div>
  );
};
