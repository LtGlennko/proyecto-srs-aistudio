import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';

export const TeacherCourseCreate: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Mis Cursos" 
        onBack={() => onNavigate('S19c')} 
        showSettings={true}
      />
      <Breadcrumb items={['Cursos', 'Lenguajes de Programación']} />

      <main className="flex-grow pt-[92px] pb-[80px] flex flex-col px-6">

        <div className="flex-grow flex flex-col items-center justify-center text-center -mt-12">
          <div className="w-24 h-24 mb-6 rounded-full bg-[#f2f3fd] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#005bbf] text-5xl">school</span>
          </div>
          <h2 className="font-manrope font-bold text-lg mb-2">No hay horarios</h2>
          <p className="text-[#414754] text-sm">Añade horarios para verlos aquí</p>
        </div>
      </main>

      <button 
        onClick={() => onNavigate('S20c')}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#005bbf] text-white rounded-full flex items-center justify-center shadow-[0px_12px_32px_rgba(25,28,35,0.06)] active:scale-90 transition-transform z-40"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      <BottomNav activeTab="Cursos" onNavigate={onNavigate} />
    </div>
  );
};
