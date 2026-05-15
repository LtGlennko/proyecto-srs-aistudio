import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';
import { FABButton } from '../common/FABButton';

export const TeacherActivityAdd: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Mis Cursos" 
        onBack={() => onNavigate('S19c')} 
        showSettings={true}
      />
      <Breadcrumb items={['Cursos', 'Lenguajes de Programación']} />

      <main className="flex-grow pt-[92px] pb-[80px] flex flex-col px-6">

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-[#f2f3fd] rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-5xl text-[#c1c6d6]/60">school</span>
          </div>
          <h2 className="text-2xl font-bold font-manrope mb-2">No hay horarios</h2>
          <p className="text-[#414754] max-w-[240px] leading-relaxed">
            Añade horarios para verlos aquí
          </p>
        </div>
      </main>

      <FABButton onClick={() => onNavigate('S20c')} />

      <BottomNav activeTab="Cursos" onNavigate={onNavigate} />
    </div>
  );
};
