import React, { useState } from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';

export const S20_ActividadesDocente: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [expandidos, setExpandidos] = useState<{ [key: string]: boolean }>({
    'H386-A': true,
    'H201-B': false
  });

  const toggleAcordeon = (horario: string) => {
    setExpandidos(prev => ({
      ...prev,
      [horario]: !prev[horario]
    }));
  };

  const renderActivityCard = (title: string, status: 'Activa' | 'Programada', interactions: number, date: string) => (
    <div 
      onClick={() => onNavigate('S21c')}
      className="bg-white p-4 rounded-xl border border-[#c1c6d6]/20 shadow-sm flex items-start gap-4 transition-transform active:scale-[0.98] cursor-pointer mb-3"
    >
      <div className="flex-grow flex flex-col gap-1">
        <h3 className="text-sm font-bold font-manrope leading-tight">{title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
            status === 'Activa' ? 'bg-[#e6f4ea] text-[#1e8e3e]' : 'bg-[#f1f3f4] text-[#727785]'
          }`}>
            {status}
          </span>
          <span className="text-[10px] text-[#727785]">{interactions} interacción{interactions !== 1 ? 'es' : ''}</span>
        </div>
        <div className="text-[10px] text-[#727785] mt-1 flex items-center gap-1">
          <span className="material-symbols-outlined text-[12px]">calendar_today</span>
          Fecha: {date}
        </div>
      </div>
      <span className="material-symbols-outlined text-[#005bbf] self-center">chevron_right</span>
    </div>
  );

  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header sinBack={true} sinRight={true} />
      
      <main className="flex-grow pt-[72px] pb-[80px] px-6">
        <div className="space-y-2">
          {/* Acordeón 1 */}
          <div className="flex flex-col">
            <button 
              onClick={() => toggleAcordeon('H386-A')}
              className="w-full flex items-center justify-between bg-[#F8F9FA] p-[14px] px-[16px] rounded-lg border border-[#e0e0e0] transition-colors active:bg-slate-100"
            >
              <span className="font-semibold text-[14px] text-[#191c23]">Lenguajes de Programación — H386-A</span>
              <span className="material-symbols-outlined text-[#727785]">
                {expandidos['H386-A'] ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {expandidos['H386-A'] && (
              <div className="bg-white py-2 animate-in fade-in slide-in-from-top-1 duration-200">
                {renderActivityCard("Introducción a la Programación", "Activa", 1, "10/01/26 - 11/01/26")}
                {renderActivityCard("Estructuras de Control", "Programada", 0, "15/01/26 - 16/01/26")}
              </div>
            )}
          </div>

          {/* Acordeón 2 */}
          <div className="flex flex-col">
            <button 
              onClick={() => toggleAcordeon('H201-B')}
              className="w-full flex items-center justify-between bg-[#F8F9FA] p-[14px] px-[16px] rounded-lg border border-[#e0e0e0] transition-colors active:bg-slate-100"
            >
              <span className="font-semibold text-[14px] text-[#191c23]">Informática — H201-B</span>
              <span className="material-symbols-outlined text-[#727785]">
                {expandidos['H201-B'] ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {expandidos['H201-B'] && (
              <div className="bg-white py-2 animate-in fade-in slide-in-from-top-1 duration-200">
                {renderActivityCard("Fundamentos de Base de Datos", "Programada", 0, "20/01/26 - 21/01/26")}
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNav activeTab="Actividades" onNavigate={onNavigate} />
    </div>
  );
};
