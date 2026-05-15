import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { BottomNavAlumno } from '../common/BottomNavAlumno';

export const StudentHome: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header />
      
      <main className="flex-grow pt-[72px] pb-[80px] px-6">
        <h1 className="text-xl font-extrabold text-[#005bbf] font-manrope mb-6 text-center">Mis Horarios</h1>
        
        <div className="space-y-0">
          <div 
            onClick={() => onNavigate('S01_Detail')}
            className="flex items-center py-5 cursor-pointer active:scale-[0.98] transition-all border-b border-slate-100"
          >
            <div className="mr-4 w-12 h-12 rounded-xl bg-[#f2f3fd] flex items-center justify-center text-[#005bbf]">
              <span className="material-symbols-outlined">event_note</span>
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-[#191c23]">H386-A</h3>
              <p className="text-[#727785] text-sm">Lenguajes de Programación</p>
            </div>
            <span className="material-symbols-outlined text-[#c1c6d6]">chevron_right</span>
          </div>

          <div 
            className="flex items-center py-5 cursor-pointer active:scale-[0.98] transition-all border-b border-slate-100"
          >
            <div className="mr-4 w-12 h-12 rounded-xl bg-[#f2f3fd] flex items-center justify-center text-[#005bbf]">
              <span className="material-symbols-outlined">event_note</span>
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-[#191c23]">562-B</h3>
              <p className="text-[#727785] text-sm">Sistemas Operativos</p>
            </div>
            <span className="material-symbols-outlined text-[#c1c6d6]">chevron_right</span>
          </div>
        </div>
      </main>

      <BottomNavAlumno activeTab="Mis horarios" onNavigate={onNavigate} />
    </div>
  );
};
