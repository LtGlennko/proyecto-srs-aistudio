import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { BottomNavAlumno } from '../common/BottomNavAlumno';

export const StudentWelcome: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [tooltipId, setTooltipId] = React.useState<number | null>(null);

  const showTooltip = (id: number) => {
    setTooltipId(id);
    setTimeout(() => setTooltipId(null), 2000);
  };

  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header />
      
      <main className="flex-grow pt-[72px] pb-[80px] px-6">
        <h1 className="text-xl font-extrabold text-[#005bbf] font-manrope mb-6 text-center">Mis Actividades</h1>
        
        <div className="space-y-4">
          <div 
            onClick={() => onNavigate('S22a')}
            className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 active:scale-[0.98] transition-all cursor-pointer flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-[#191c23]">Introducción a la Programación</h3>
              <p className="text-[10px] text-[#727785] mt-0.5">Lenguajes de Programación • H386-A</p>
              <p className="text-[10px] text-[#727785] mt-1">10/01/26 - 11/01/26</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="px-3 py-1 bg-[#e6f4ea] text-[#1e8e3e] text-[10px] font-bold rounded-full uppercase">Activa</span>
              <span className="material-symbols-outlined text-[#005bbf]">chevron_right</span>
            </div>
          </div>

          <div 
            className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 opacity-60 cursor-not-allowed flex justify-between items-center relative"
            onClick={() => showTooltip(2)}
          >
            <div>
              <h3 className="font-bold text-[#191c23]">Estructuras de Control</h3>
              <p className="text-[10px] text-[#727785] mt-0.5">Lenguajes de Programación • H386-A</p>
              <p className="text-[10px] text-[#727785] mt-1">15/01/26 - 16/01/26</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="px-3 py-1 bg-[#f1f3f4] text-[#727785] text-[10px] font-bold rounded-full uppercase">Programada</span>
              {/* Sin chevron o chevron gris */}
            </div>
            {tooltipId === 2 && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#323232] text-white text-[10px] px-3 py-1.5 rounded shadow-lg z-[100] animate-in fade-in slide-in-from-bottom-2">
                Esta actividad aún no está activa
              </div>
            )}
          </div>

          <div 
            className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 opacity-60 cursor-not-allowed flex justify-between items-center relative"
            onClick={() => showTooltip(3)}
          >
            <div>
              <h3 className="font-bold text-[#191c23]">Fundamentos de Base de Datos</h3>
              <p className="text-[10px] text-[#727785] mt-0.5">Informática • H201-B</p>
              <p className="text-[10px] text-[#727785] mt-1">20/01/26 - 21/01/26</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="px-3 py-1 bg-[#f1f3f4] text-[#727785] text-[10px] font-bold rounded-full uppercase">Programada</span>
              {/* Sin chevron o chevron gris */}
            </div>
            {tooltipId === 3 && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#323232] text-white text-[10px] px-3 py-1.5 rounded shadow-lg z-[100] animate-in fade-in slide-in-from-bottom-2">
                Esta actividad aún no está activa
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNavAlumno activeTab="Mis actividades" onNavigate={onNavigate} />
    </div>
  );
};
