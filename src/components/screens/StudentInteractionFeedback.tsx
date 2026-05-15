import React, { useState, useEffect } from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNavAlumno } from '../common/BottomNavAlumno';

export const StudentInteractionFeedback: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [segundos, setSegundos] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setSegundos(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (segundos === 0) {
      onNavigate('S22b_p2');
    }
  }, [segundos, onNavigate]);

  const options = [
    { id: 1, text: 'Option 1', selected: true },
    { id: 2, text: 'Option 2', selected: false },
    { id: 3, text: 'Option 3', selected: false },
  ];

  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Volver a Mis Actividades" 
        onBack={() => onNavigate('S01_1')} 
      />
      <Breadcrumb 
        items={[
          { label: 'Lenguajes de Programación', onClick: () => onNavigate('S01') },
          { label: 'H386-A', onClick: () => onNavigate('S01_Detail') },
          'Introducción a la Programación'
        ]} 
      />
      
      <main className="flex-grow pt-[92px] pb-[80px] px-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-[#191c23] font-bold text-xl">Pregunta 1</span>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
            <span className="material-symbols-outlined text-[#727785] text-lg">group</span>
            <span className="text-[#727785] font-semibold text-sm">20</span>
          </div>
        </div>

        <p className="text-[#727785] text-sm mb-6">Seleccione una de las opciones listadas</p>

        <div className="space-y-3 mb-8">
          {options.map((option) => (
            <div 
              key={option.id}
              className={`flex items-center p-5 rounded-xl border-2 transition-all ${
                option.selected ? 'bg-[#f2f3fd] border-[#005bbf] opacity-100' : 'bg-white border-transparent opacity-50'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                option.selected ? 'border-[#005bbf]' : 'border-[#c1c6d6]'
              }`}>
                {option.selected && <div className="w-3 h-3 rounded-full bg-[#005bbf]"></div>}
              </div>
              <span className={`ml-4 font-medium ${option.selected ? 'text-[#005bbf]' : 'text-[#191c23]'}`}>
                {option.text}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 pt-4">
          <button 
            disabled
            className="w-full py-4 border-2 border-[#005bbf] text-[#005bbf] font-bold rounded-xl flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined font-bold">check_circle</span>
            Enviado
          </button>
          <p className="text-[#727785] text-xs font-medium">
            Espere a las indicaciones del docente
          </p>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '16px',
          padding: '12px 16px',
          background: '#E8F0FE',
          borderRadius: '8px'
        }}>
          <p style={{ color: '#005bbf', fontSize: '13px', fontWeight: 500, margin: '0 0 4px' }}>
            El docente ha cambiado a otra pregunta
          </p>
          <p style={{ color: '#727785', fontSize: '12px', margin: '0 0 8px' }}>
            Será visible en breve
          </p>
          <p style={{ color: '#005bbf', fontSize: '28px', fontWeight: 700, margin: '0' }}>
            {segundos}s
          </p>
        </div>
      </main>

      <BottomNavAlumno activeTab="Mis actividades" onNavigate={onNavigate} />
    </div>
  );
};
