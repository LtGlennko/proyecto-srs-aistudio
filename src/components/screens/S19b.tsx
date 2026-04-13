import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';

export const S19b: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Mis Cursos" 
        onBack={() => onNavigate('S19a')} 
      />
      <Breadcrumb items={['Mis Cursos', 'Nuevo Curso']} />

      <main className="pt-[92px] pb-[80px] px-6 w-full">

        <section className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#414754]">Nombre de actividad</label>
            <input 
              className="w-full bg-[#f2f3fd] border-none rounded-lg p-4 text-[#191c23] focus:ring-2 focus:ring-[#005bbf]/20 transition-all text-md" 
              type="text" 
              defaultValue="Lenguajes de Programación" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#414754]">Código</label>
            <input 
              className="w-full bg-[#f2f3fd] border-none rounded-lg p-4 text-[#191c23] focus:ring-2 focus:ring-[#005bbf]/20 transition-all text-md" 
              type="text" 
              defaultValue="INF011" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#414754]">Descripción</label>
            <textarea 
              className="w-full bg-[#f2f3fd] border-none rounded-lg p-4 text-[#191c23] focus:ring-2 focus:ring-[#005bbf]/20 transition-all text-md resize-none" 
              placeholder="Ingresa una descripción..." 
              rows={4} 
            />
          </div>

          <div className="pt-8 flex justify-center">
            <button 
              onClick={() => onNavigate('S19c')}
              className="w-full max-w-xs bg-gradient-to-r from-[#005bbf] to-[#1a73e8] text-white font-manrope font-bold py-4 px-8 rounded-lg shadow-[0px_12px_32px_rgba(0,91,191,0.15)] active:scale-95 transition-all duration-200"
            >
              Guardar
            </button>
          </div>
        </section>
      </main>

      <BottomNav activeTab="Cursos" onNavigate={onNavigate} />
    </div>
  );
};
