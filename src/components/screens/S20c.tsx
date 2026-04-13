import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';

export const S20c: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Volver" 
        onBack={() => onNavigate('S20b')} 
      />
      <Breadcrumb items={['Cursos', 'Lenguajes de Programación', 'Nuevo Horario']} />

      <main className="flex-grow pt-[92px] pb-[80px] px-6 w-full">

        <section className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#414754] ml-1">Nombre</label>
              <input className="w-full bg-[#f2f3fd] border-none rounded-lg p-4 text-[#191c23] focus:ring-2 focus:ring-[#005bbf] transition-all font-medium" type="text" defaultValue="H386-A" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#414754] ml-1">Semestre</label>
              <input className="w-full bg-[#f2f3fd] border-none rounded-lg p-4 text-[#191c23] focus:ring-2 focus:ring-[#005bbf] transition-all font-medium" type="text" defaultValue="2026 I" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#414754] ml-1">Descripción</label>
            <textarea className="w-full bg-[#f2f3fd] border-none rounded-lg p-4 text-[#191c23] focus:ring-2 focus:ring-[#005bbf] transition-all resize-none" placeholder="Ingresa una descripción para este horario..." rows={6}></textarea>
          </div>

          <div className="pt-4 flex justify-center">
            <button 
              onClick={() => onNavigate('S20a')}
              className="w-full py-4 bg-[#005bbf] text-white font-bold rounded-xl shadow-lg shadow-[#005bbf]/20 active:scale-[0.98] transition-all flex items-center justify-center"
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
