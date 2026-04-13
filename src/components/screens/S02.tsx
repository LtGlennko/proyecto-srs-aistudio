import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNavAlumno } from '../common/BottomNavAlumno';
import { FABButton } from '../common/FABButton';

export const S02: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Volver" 
        onBack={() => onNavigate('S01')} // Volver a Mis Horarios
      />
      <Breadcrumb items={['Lenguajes de Programación', 'H386-A']} />
      
      <main className="flex-grow pt-[92px] pb-[80px] px-6 flex flex-col items-center justify-center">
        <div className="w-32 h-32 mb-8 bg-[#f2f3fd] rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-[#727785] text-6xl">forum</span>
        </div>
        <h2 className="font-manrope text-xl font-bold text-[#727785] mb-2">No hay consultas</h2>
        <p className="text-[#727785] font-medium text-sm">Ingresar nueva consulta</p>
      </main>

      <FABButton onClick={() => onNavigate('S03')} />

      <BottomNavAlumno activeTab="Mis horarios" onNavigate={onNavigate} />
    </div>
  );
};
