import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNavAlumno } from '../common/BottomNavAlumno';

export const S22a: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter cursor-pointer" onClick={() => onNavigate('S22b')}>
      <Header 
        backLabel="Volver a Mis Actividades" 
        onBack={(e) => {
          e?.stopPropagation();
          onNavigate('S01_1');
        }} 
      />
      <Breadcrumb items={['Lenguajes de Programación', 'H386-A', 'Introducción a la Programación']} />
      
      <main className="flex-grow pt-[92px] pb-[80px] px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-[#d8e2ff] p-8 rounded-full mb-6">
          <span className="material-symbols-outlined text-[#005bbf] text-6xl animate-pulse">schedule</span>
        </div>
        <h2 className="text-[#191c23] font-bold text-2xl mb-2">Esperando al docente</h2>
        <p className="text-[#727785] font-medium text-sm leading-relaxed max-w-xs">
          La interacción comenzará cuando el docente la inicie
        </p>
      </main>

      <BottomNavAlumno activeTab="Mis actividades" onNavigate={onNavigate} />
    </div>
  );
};
