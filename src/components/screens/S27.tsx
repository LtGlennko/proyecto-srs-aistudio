import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';
import { BarChart } from '../common/BarChart';
import { DonutChart } from '../common/DonutChart';

export const S27: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter relative overflow-hidden">
      <Header 
        backLabel="Actividad" 
        onBack={() => onNavigate('S20e')} 
      />

      <main className="pt-20 px-6 pb-32 w-full">
        <Breadcrumb items={['Cursos', 'Lenguajes de Programación', 'H386-A', 'Introducción a la Programación']} />

        <section className="mt-8 bg-white p-6 rounded-xl border border-[#c1c6d6]/20 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="font-manrope font-bold text-[#191c23] text-lg mb-3 leading-tight">15 de 18 estudiantes participaron en encuestas o consultas</p>
              <ul className="space-y-2">
                <li className="flex items-center text-[#414754] text-sm">
                  <span className="w-1.5 h-1.5 bg-[#c1c6d6] rounded-full mr-2"></span>
                  Participantes en consultas: 13
                </li>
                <li className="flex items-center text-[#414754] text-sm">
                  <span className="w-1.5 h-1.5 bg-[#c1c6d6] rounded-full mr-2"></span>
                  Participantes en encuestas: 15
                </li>
              </ul>
            </div>
            <div className="text-4xl font-manrope font-extrabold text-[#2e7d32]">83%</div>
          </div>

          <button 
            onClick={() => onNavigate('S18')}
            className="w-full mt-8 py-3 border border-[#005bbf] text-[#005bbf] font-bold text-sm rounded-xl hover:bg-[#f2f3fd] transition-all"
          >
            Ver detalle de resultados
          </button>
        </section>

        <div className="h-px bg-[#c1c6d6]/20 my-8"></div>

        <section className="space-y-12">
          <div className="space-y-6">
            <h3 className="font-manrope font-bold text-[#191c23]">Pregunta 1</h3>
            <div className="bg-[#f2f3fd] p-6 rounded-2xl">
              <BarChart 
                data={[
                  { label: 'Opción 1', value: 5, percentage: '40%', color: '#E24B4A', height: '62.5%' },
                  { label: 'Opción 2', value: 8, percentage: '15%', color: '#1A73E8', height: '100%' },
                  { label: 'Opción 3', value: 3, percentage: '45%', color: '#34A853', height: '37.5%' }
                ]}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-manrope font-bold text-[#191c23]">Pregunta 2</h3>
            <div className="bg-[#f2f3fd] p-6 rounded-2xl">
              <DonutChart 
                segments={[
                  { label: 'SÍ', value: 60, color: '#2d3038' },
                  { label: 'NO', value: 40, color: '#d8d9e3' }
                ]}
              />
            </div>
          </div>
        </section>
      </main>

      <BottomNav activeTab="Resultados" onNavigate={onNavigate} />
    </div>
  );
};
