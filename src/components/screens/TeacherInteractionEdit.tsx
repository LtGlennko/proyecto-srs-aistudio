import React from 'react';
import { ScreenProps, Interaction } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';

export const TeacherInteractionEdit: React.FC<ScreenProps> = ({ onNavigate, onSelectInteractionType, selectedCourse, selectedActivity }) => {
  const handleTypeSelect = (type: Interaction['type']) => {
    if (onSelectInteractionType) onSelectInteractionType(type);
    onNavigate('S21f');
  };

  return (
    <div className="bg-[#f9f9ff] font-inter text-[#191c23] min-h-screen relative overflow-hidden">
      {/* Background Content (Dimmed) */}
      <div className="flex flex-col h-screen w-full opacity-40">
        <Header 
          backLabel={selectedCourse?.code || 'Actividad'} 
          onBack={() => onNavigate('S21c')} 
        />
        <Breadcrumb 
          items={[
            { label: 'Mis Cursos', onClick: () => onNavigate('S19c') },
            { label: selectedCourse?.name || 'Curso', onClick: () => onNavigate('S20e') },
            selectedActivity?.name || 'Actividad'
          ]} 
        />
        <main className="flex-1 pt-[92px] px-6 py-4">
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-8 border-b border-[#e0e0e0] pb-3">
              <h2 className="text-[#005bbf] font-manrope font-bold text-sm border-b-2 border-[#005bbf] pb-3 -mb-[13px]">
                Interacciones
              </h2>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Overlay */}
      <div className="absolute inset-0 bg-[#191c23]/40 backdrop-blur-[4px] z-40"></div>

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 h-[75%] bg-white z-50 rounded-t-xl flex flex-col shadow-2xl">
        <div className="w-full flex justify-center py-3">
          <div className="w-12 h-1.5 bg-[#c1c6d6]/40 rounded-full"></div>
        </div>
        
        <div className="px-6 pb-6">
          <h2 className="font-manrope font-bold text-xl text-[#191c23]">Tipo de interacción</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-8 pb-32">
          <div>
            <h3 className="text-[10px] font-semibold text-[#727785] uppercase tracking-widest mb-4">Evaluaciones</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleTypeSelect('opcion_multiple')}
                className="bg-[#f2f3fd] p-6 rounded-lg flex flex-col items-center justify-center gap-3 active:bg-[#e6e8f2] transition-colors outline-none group"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#005bbf] shadow-sm group-active:scale-95 transition-transform">
                  <span className="material-symbols-outlined text-2xl">list</span>
                </div>
                <span className="text-sm font-semibold text-[#191c23] text-center">Opción múltiple</span>
              </button>
              <button 
                onClick={() => handleTypeSelect('verdadero_falso')}
                className="bg-[#f2f3fd] p-6 rounded-lg flex flex-col items-center justify-center gap-3 active:bg-[#e6e8f2] transition-colors outline-none group"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#005bbf] shadow-sm group-active:scale-95 transition-transform">
                  <span className="material-symbols-outlined text-2xl">toggle_on</span>
                </div>
                <span className="text-sm font-semibold text-[#191c23] text-center">Verdadero o falso</span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold text-[#727785] uppercase tracking-widest mb-4">Opiniones</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleTypeSelect('nube_palabras')}
                className="bg-[#f2f3fd] p-6 rounded-lg flex flex-col items-center justify-center gap-3 active:bg-[#e6e8f2] transition-colors outline-none group"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#005bbf] shadow-sm group-active:scale-95 transition-transform">
                  <span className="material-symbols-outlined text-2xl">cloud</span>
                </div>
                <span className="text-sm font-semibold text-[#191c23] text-center">Nube de palabras</span>
              </button>
              <button 
                onClick={() => handleTypeSelect('ranking')}
                className="bg-[#f2f3fd] p-6 rounded-lg flex flex-col items-center justify-center gap-3 active:bg-[#e6e8f2] transition-colors outline-none group"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#005bbf] shadow-sm group-active:scale-95 transition-transform">
                  <span className="material-symbols-outlined text-2xl">bar_chart</span>
                </div>
                <span className="text-sm font-semibold text-[#191c23] text-center">Ranking</span>
              </button>
              <button 
                onClick={() => handleTypeSelect('texto_libre')}
                className="bg-[#f2f3fd] p-6 rounded-lg flex flex-col items-center justify-center gap-3 col-span-2 active:bg-[#e6e8f2] transition-colors outline-none group"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#005bbf] shadow-sm group-active:scale-95 transition-transform">
                  <span className="material-symbols-outlined text-2xl">chat_bubble</span>
                </div>
                <span className="text-sm font-semibold text-[#191c23] text-center">Texto libre</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-[#c1c6d6]/10">
          <button 
            onClick={() => onNavigate('S21c')}
            className="w-full py-4 rounded-lg border border-[#727785] font-manrope font-bold text-[#191c23] hover:bg-[#f2f3fd] active:bg-[#e6e8f2] transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};
