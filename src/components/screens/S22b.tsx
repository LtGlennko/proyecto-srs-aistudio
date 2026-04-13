import React, { useState } from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNavAlumno } from '../common/BottomNavAlumno';

export const S22b: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const options = [
    { id: 1, text: 'Option 1' },
    { id: 2, text: 'Option 2' },
    { id: 3, text: 'Option 3' },
  ];

  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Volver a Mis Actividades" 
        onBack={() => onNavigate('S01_1')} 
      />
      <Breadcrumb items={['Lenguajes de Programación', 'H386-A', 'Introducción a la Programación']} />
      
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
            <label 
              key={option.id}
              className={`flex items-center p-5 bg-white rounded-xl cursor-pointer transition-all border-2 ${
                selectedOption === option.id ? 'border-[#005bbf]' : 'border-transparent'
              }`}
            >
              <input 
                type="radio" 
                name="survey" 
                className="hidden" 
                onChange={() => setSelectedOption(option.id)}
              />
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                selectedOption === option.id ? 'border-[#005bbf]' : 'border-[#c1c6d6]'
              }`}>
                {selectedOption === option.id && <div className="w-3 h-3 rounded-full bg-[#005bbf]"></div>}
              </div>
              <span className="ml-4 font-medium text-[#191c23]">{option.text}</span>
            </label>
          ))}
        </div>

        <div className="pt-4">
          <button 
            onClick={() => selectedOption !== null && onNavigate('S22c')}
            disabled={selectedOption === null}
            className={`w-full py-4 font-bold rounded-xl shadow-lg transition-all active:scale-95 ${
              selectedOption !== null ? 'bg-[#005bbf] text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Enviar
          </button>
        </div>
      </main>

      <BottomNavAlumno activeTab="Mis actividades" onNavigate={onNavigate} />
    </div>
  );
};
