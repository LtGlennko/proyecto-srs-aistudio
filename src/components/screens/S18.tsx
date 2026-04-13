import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';
import { BarChart } from '../common/BarChart';
import { DonutChart } from '../common/DonutChart';

export const S18: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [showToast, setShowToast] = React.useState(false);

  const handleExport = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

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
              <p className="font-manrope font-bold text-[#191c23] text-lg mb-3 leading-tight">15 de 18 estudiantes participaron</p>
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

          <div className="grid grid-cols-3 gap-2 mt-8">
            <div className="bg-[#f2f3fd] p-3 rounded-lg text-center">
              <div className="text-xl font-manrope font-extrabold text-[#005bbf]">25</div>
              <div className="text-[9px] text-[#727785] font-bold leading-tight mt-1 uppercase">Estudiantes conectados</div>
            </div>
            <div className="bg-[#fff8f1] p-3 rounded-lg text-center">
              <div className="text-xl font-manrope font-extrabold text-[#9e4300]">83%</div>
              <div className="text-[9px] text-[#727785] font-bold leading-tight mt-1 uppercase">% de participación</div>
            </div>
            <div className="bg-[#fff8f1] p-3 rounded-lg text-center">
              <div className="text-xl font-manrope font-extrabold text-[#9e4300]">17</div>
              <div className="text-[9px] text-[#727785] font-bold leading-tight mt-1 uppercase">Cantidad de respuestas</div>
            </div>
          </div>
        </section>

        <div className="mt-6 mb-2">
          <button 
            onClick={handleExport}
            className="w-full bg-[#1A73E8] text-white py-3 px-6 rounded-lg font-semibold text-sm shadow-md active:scale-[0.98] transition-all"
          >
            Exportar resultados
          </button>
        </div>

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

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#191c23] text-white px-6 py-3 rounded-full text-sm font-medium shadow-2xl z-[100] animate-in slide-in-from-bottom-4 duration-300 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">download</span>
          Exportando resultados...
        </div>
      )}
    </div>
  );
};
