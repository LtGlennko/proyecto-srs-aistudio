import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';
import { FABButton } from '../common/FABButton';

export const TeacherDashboard: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header />
      <Breadcrumb items={['Mis Cursos']} />

      <main className="flex-grow flex flex-col items-center justify-center px-8 pt-[92px] pb-[80px]">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative mx-auto w-64 h-64 bg-[#f2f3fd] rounded-full flex items-center justify-center">
            <div className="bg-white p-8 rounded-3xl shadow-[0px_12px_32px_rgba(25,28,35,0.06)] relative overflow-hidden">
              <span className="material-symbols-outlined text-[#005bbf]/20 text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-manrope">No hay cursos</h2>
            <p className="text-[#727785] font-medium">Añade cursos para verlos aquí</p>
          </div>
        </div>
      </main>

      <FABButton onClick={() => onNavigate('S19b')} />

      <BottomNav activeTab="Cursos" onNavigate={onNavigate} />
    </div>
  );
};
