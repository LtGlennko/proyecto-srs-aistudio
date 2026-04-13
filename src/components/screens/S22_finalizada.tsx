import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNavAlumno } from '../common/BottomNavAlumno';
import { BarChart } from '../common/BarChart';
import { DonutChart } from '../common/DonutChart';

export const S22_finalizada: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Volver a Mis Actividades" 
        onBack={() => onNavigate('S01_1')} 
      />
      <Breadcrumb items={['Lenguajes de Programación', 'H386-A', 'Introducción a la Programación']} />
      
      <main className="flex-grow pt-[92px] pb-[80px] px-6 overflow-y-auto">
        <div className="flex flex-col items-center justify-center py-8 mb-8">
          <span className="material-symbols-outlined text-[#34A853] text-7xl mb-4">check_circle</span>
          <h2 className="text-[#191c23] font-bold text-2xl text-center">¡Encuesta finalizada!</h2>
          <p className="text-[#727785] text-center mt-1">Gracias por participar</p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="font-bold text-lg mb-1">Resultados</h3>
            <p className="text-[#727785] text-sm mb-6">Así respondió el grupo:</p>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="font-bold text-[#191c23] mb-6">Pregunta 1</h4>
              <BarChart 
                data={[
                  { label: 'Opción 1', value: 5, color: '#E24B4A', percentage: '31%' },
                  { label: 'Opción 2', value: 8, color: '#1A73E8', percentage: '50%' },
                  { label: 'Opción 3', value: 3, color: '#34A853', percentage: '19%' },
                ]}
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="font-bold text-[#191c23] mb-6">Pregunta 2</h4>
              <div className="flex justify-center py-4">
                <DonutChart 
                  percentage={60} 
                  label="SÍ" 
                  subLabel="60%"
                  color="#2d3038"
                  size={160}
                />
              </div>
              <div className="flex justify-center gap-8 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#2d3038]"></div>
                  <span className="text-xs font-medium text-[#727785]">SÍ: 60%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#d8d9e3]"></div>
                  <span className="text-xs font-medium text-[#727785]">NO: 40%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 pb-8">
            <button 
              onClick={() => onNavigate('S01_1')}
              className="w-full py-4 bg-[#005bbf] text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all"
            >
              Volver a Mis Actividades
            </button>
          </div>
        </div>
      </main>

      <BottomNavAlumno activeTab="Mis actividades" onNavigate={onNavigate} />
    </div>
  );
};
