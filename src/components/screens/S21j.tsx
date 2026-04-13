import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';

export const S21j: React.FC<ScreenProps> = ({ onNavigate, isActivityFinished }) => {
  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Volver a Curso" 
        onBack={() => onNavigate('S20a')} 
      />
      <Breadcrumb items={['Cursos', 'Lenguajes de Programación', 'H386-A']} />

      <main className="flex-grow pt-[92px] pb-[80px] px-6 w-full">
        <div className="space-y-4 mt-6">
          <div 
            onClick={() => onNavigate('S14')}
            className="bg-white p-5 rounded-lg border border-[#c1c6d6]/20 shadow-sm flex items-start gap-5 transition-transform active:scale-[0.98] cursor-pointer"
          >
            <div className="relative flex-shrink-0">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle className="text-[#ecedf7]" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="6"></circle>
                <circle className="text-[#005bbf]" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="175.9" strokeDashoffset={isActivityFinished ? "0" : "175.9"} strokeLinecap="round" strokeWidth="6"></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold font-manrope">{isActivityFinished ? '100%' : '0%'}</span>
              </div>
            </div>
            <div className="flex-grow flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold font-manrope leading-tight pr-4">Introducción a la Programación</h3>
              </div>
              <div className="flex items-center gap-2 text-[#414754] text-xs font-medium">
                <span className="bg-[#ecedf7] px-2 py-0.5 rounded-full">#SA12D</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">group</span>
                  1 Interacc
                </span>
              </div>
              <div className="mt-2 text-[#414754] text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                Fecha: 10/01/26 - 11/01/26
              </div>
              <div className="mt-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${isActivityFinished ? 'bg-[#ecedf7] text-[#414754]' : 'bg-[#e0e2ec] text-[#414754]'}`}>
                  {isActivityFinished ? 'Finalizada' : 'Programado'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <button className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-[#005bbf] to-[#1a73e8] text-white rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-transform duration-150 z-50">
        <span className="material-symbols-outlined text-[28px]">add</span>
      </button>

      <BottomNav activeTab="Cursos" onNavigate={onNavigate} />
    </div>
  );
};
