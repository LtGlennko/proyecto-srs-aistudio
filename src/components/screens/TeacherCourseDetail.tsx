import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';
import { FABButton } from '../common/FABButton';

export const TeacherCourseDetail: React.FC<ScreenProps> = ({ onNavigate, isActivityFinished }) => {
  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Mis Cursos" 
        onBack={() => onNavigate('S19c')} 
        showSettings={true}
      />
      <Breadcrumb items={['Cursos', 'Lenguajes de Programación']} />

      <main className="flex-grow pt-[92px] pb-[80px] px-4 w-full">

        <div 
          onClick={() => onNavigate('S20e')}
          className="group relative bg-white rounded-xl border border-[#c1c6d6]/30 shadow-sm p-4 flex items-center justify-between hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <div className="flex flex-col gap-1">
            <span className="font-manrope text-lg font-bold">H386-A</span>
            <div className="flex flex-col gap-0.5">
              <p className="text-[#414754] text-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">assignment</span>
                Nº actividades: 0
              </p>
              <p className="text-[#414754] text-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                Semestre: 2026 I
              </p>
              <p className="text-[#414754] text-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">history</span>
                Modificado hace 1 min
              </p>
              {isActivityFinished && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('S26');
                  }}
                  className="mt-2 text-[#005bbf] font-bold text-xs flex items-center gap-1 hover:underline"
                >
                  Ver resultados
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center text-[#c1c6d6] group-hover:text-[#005bbf] transition-colors">
            <span className="material-symbols-outlined text-2xl">chevron_right</span>
          </div>
        </div>
      </main>

      <FABButton onClick={() => onNavigate('S20c')} />

      <BottomNav activeTab="Cursos" onNavigate={onNavigate} />
    </div>
  );
};
