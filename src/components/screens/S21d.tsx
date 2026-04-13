import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';

export const S21d: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Volver" 
        onBack={() => onNavigate('S21c')} 
      />
      <Breadcrumb items={['Cursos', 'Lenguajes de Programación', 'H386-A', 'Introducción a la Programación']} />

      <main className="flex-grow pt-[92px] pb-[80px] px-6 w-full">
        <div className="space-y-8 mt-6">
          <h2 className="text-xl font-bold font-manrope text-[#191c23]">Editar actividad</h2>
          
          <section>
            <label className="block font-manrope font-bold text-[#191c23] mb-3">Nombre de actividad</label>
            <div className="relative group">
              <input 
                className="w-full bg-white border-none rounded-lg p-4 text-[#191c23] placeholder:text-[#727785] ring-1 ring-[#c1c6d6]/30 focus:ring-2 focus:ring-[#005bbf] outline-none transition-all" 
                type="text" 
                defaultValue="Introducción a la Programación" 
              />
            </div>
          </section>

          <section>
            <label className="block font-manrope font-bold text-[#191c23] mb-3">Descripción</label>
            <div className="relative group">
              <textarea 
                className="w-full bg-white border-none rounded-lg p-4 text-[#191c23] placeholder:text-[#727785] ring-1 ring-[#c1c6d6]/30 focus:ring-2 focus:ring-[#005bbf] outline-none transition-all min-h-[120px] resize-none" 
                placeholder="Escribe la descripción de la actividad aquí..."
              />
            </div>
          </section>

          <div className="grid grid-cols-2 gap-4">
            <section>
              <label className="block font-manrope font-bold text-[#191c23] mb-3">Día inicio</label>
              <input className="w-full bg-white border-none rounded-lg p-4 text-[#191c23] ring-1 ring-[#c1c6d6]/30 focus:ring-2 focus:ring-[#005bbf] outline-none transition-all" type="date" defaultValue="2023-10-20" />
            </section>
            <section>
              <label className="block font-manrope font-bold text-[#191c23] mb-3">Día fin</label>
              <input className="w-full bg-white border-none rounded-lg p-4 text-[#191c23] ring-1 ring-[#c1c6d6]/30 focus:ring-2 focus:ring-[#005bbf] outline-none transition-all" type="date" defaultValue="2023-10-27" />
            </section>
          </div>

          <section className="grid grid-cols-2 gap-4 pt-4">
            <button 
              onClick={() => onNavigate('S21c')}
              className="py-4 px-6 rounded-lg font-bold text-[#191c23] bg-[#e0e2ec] hover:bg-[#e6e8f2] transition-colors active:scale-95"
            >
              Volver
            </button>
            <button 
              onClick={() => onNavigate('S21c')}
              className="py-4 px-6 rounded-lg font-bold text-white bg-gradient-to-br from-[#005bbf] to-[#1a73e8] shadow-md hover:opacity-90 transition-all active:scale-95"
            >
              Guardar
            </button>
          </section>
        </div>
      </main>

      <BottomNav activeTab="Cursos" onNavigate={onNavigate} />
    </div>
  );
};
