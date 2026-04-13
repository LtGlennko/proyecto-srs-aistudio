import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';
import { Tabs } from '../common/Tabs';
import { DonutChart } from '../common/DonutChart';

export const S26: React.FC<ScreenProps> = ({ onNavigate, interactionCount }) => {
  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Mis Cursos" 
        onBack={() => onNavigate('S20a')} 
        showSettings={true}
      />

      <main className="pt-24 px-6 pb-24 w-full">
        <Breadcrumb items={['Cursos', 'Lenguajes de Programación', 'H386-A']} />

        <div className="flex gap-8 mb-8 border-b border-[#c1c6d6]/20 mt-4">
          <button className="pb-3 text-[#414754] font-medium text-sm">Consultas de clase</button>
          <button className="pb-3 text-[#005bbf] font-bold text-sm border-b-4 border-[#005bbf] rounded-t-sm">Actividades</button>
        </div>

        <div 
          onClick={() => onNavigate('S18')}
          className="bg-white border border-[#c1c6d6]/20 rounded-lg p-6 shadow-sm flex items-center gap-6 cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="flex-shrink-0">
            <DonutChart 
              percentage={100}
              size={96}
              thickness={12}
              showLegend={false}
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-manrope font-bold text-lg leading-tight mb-2 text-[#191c23]">Introducción a la Programación</h3>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 text-[#414754] text-sm">
                <span>#SA12D</span>
                <span className="w-1 h-1 bg-[#c1c6d6] rounded-full"></span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">forum</span>
                  <span>{interactionCount} Interacc</span>
                </div>
              </div>
              <p className="text-[#414754] text-sm">Fecha: 10/01/26 - 11/01/26</p>
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ecedf7] text-[#414754] text-xs font-semibold">
                  Finalizada
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <button className="fixed bottom-24 right-6 w-14 h-14 bg-[#005bbf] text-white rounded-full shadow-2xl flex items-center justify-center transition-transform active:scale-90 z-40">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      <BottomNav activeTab="Resultados" onNavigate={onNavigate} />
    </div>
  );
};
