import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';

export const S21b: React.FC<ScreenProps> = ({ onNavigate, onActivityCreated }) => {
  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Lenguajes de Programación" 
        onBack={() => onNavigate('S20e')} 
      />
      <Breadcrumb items={['Cursos', 'Lenguajes de Programación', 'H386-A']} />

      <main className="flex-grow pt-[92px] pb-[80px] px-6 w-full">

        <section className="bg-transparent mt-6">
          <h2 className="font-manrope text-xl font-bold mb-8 text-[#191c23]">Nueva actividad</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#414754] ml-1">Nombre de actividad</label>
              <input 
                className="w-full bg-[#f2f3fd] border-none rounded-lg px-4 py-3 text-[#191c23] focus:ring-2 focus:ring-[#005bbf]/20 focus:bg-white transition-all outline-none font-medium" 
                type="text" 
                defaultValue="Introducción a la Programación" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#414754] ml-1">Descripción</label>
              <textarea 
                className="w-full bg-[#f2f3fd] border-none rounded-lg px-4 py-3 text-[#191c23] focus:ring-2 focus:ring-[#005bbf]/20 focus:bg-white transition-all outline-none font-medium min-h-[120px] resize-none" 
                placeholder="Escribe los detalles de la actividad..." 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#414754] ml-1">Día inicio</label>
                <div className="relative">
                  <input className="w-full bg-[#f2f3fd] border-none rounded-lg px-4 py-3 text-[#191c23] focus:ring-2 focus:ring-[#005bbf]/20 focus:bg-white transition-all outline-none font-medium" placeholder="mm/dd/yyyy" type="text" />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#727785] text-xl pointer-events-none">calendar_today</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#414754] ml-1">Día fin</label>
                <div className="relative">
                  <input className="w-full bg-[#f2f3fd] border-none rounded-lg px-4 py-3 text-[#191c23] focus:ring-2 focus:ring-[#005bbf]/20 focus:bg-white transition-all outline-none font-medium" placeholder="mm/dd/yyyy" type="text" />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#727785] text-xl pointer-events-none">calendar_month</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button 
                onClick={() => onNavigate('S20e')}
                className="flex-1 py-3 px-6 rounded-lg bg-[#414754] text-white font-bold text-sm active:scale-95 duration-150 transition-all hover:opacity-90" 
                type="button"
              >
                Volver
              </button>
              <button 
                onClick={() => {
                  if (onActivityCreated) onActivityCreated();
                  onNavigate('S20e');
                }}
                className="flex-[2] py-3 px-6 rounded-lg bg-gradient-to-br from-[#005bbf] to-[#1a73e8] text-white font-manrope font-bold text-sm active:scale-95 duration-150 transition-all hover:opacity-90 shadow-[0px_12px_32px_rgba(25,28,35,0.06)]" 
                type="button"
              >
                Crear actividad
              </button>
            </div>
          </form>
        </section>
      </main>

      <BottomNav activeTab="Cursos" onNavigate={onNavigate} />
    </div>
  );
};
