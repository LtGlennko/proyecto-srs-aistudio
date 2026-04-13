import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';

export const S21f: React.FC<ScreenProps> = ({ onNavigate, onInteractionCreated }) => {
  const [showSettings, setShowSettings] = React.useState(false);
  const [questionText, setQuestionText] = React.useState('');
  const [options, setOptions] = React.useState(['', '', '', '']);
  const [toggles, setToggles] = React.useState({
    description: false,
    multiple: true,
    results: true,
    time: false,
    leaderboard: false
  });

  const toggleOption = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    if (onInteractionCreated) {
      onInteractionCreated(questionText, options.filter(o => o.trim() !== ''));
    }
    onNavigate('S21h');
  };

  return (
    <div className="bg-[#f9f9ff] selection:bg-[#d8e2ff] selection:text-[#001a41] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Volver a Actividad" 
        onBack={() => onNavigate('S21c')} 
      />
      <Breadcrumb items={['Cursos', 'Lenguajes de Programación', 'H386-A', 'Introducción a la Programación']} />

      <main className="flex-grow pt-[92px] pb-[80px] px-6 w-full">
        <div className="space-y-8 mt-6">
          <section className="flex items-center justify-between">
            <label className="block font-manrope font-bold text-[#191c23]">Pregunta</label>
            <button 
              onClick={() => setShowSettings(true)}
              className="p-2 text-[#727785] hover:bg-[#f2f3fd] rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">settings</span>
            </button>
          </section>

          <section>
            <div className="relative group">
              <textarea 
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="w-full bg-white border-none rounded-lg p-4 text-[#191c23] placeholder:text-[#727785] ring-1 ring-[#c1c6d6]/30 focus:ring-2 focus:ring-[#005bbf] outline-none transition-all min-h-[100px] resize-none" 
                placeholder="Escribe tu pregunta aquí..."
              />
            </div>
          </section>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-bold tracking-[0.05em] text-[#727785] uppercase">Pregunta 1</span>
            <div className="h-px flex-grow bg-[#c1c6d6]/20"></div>
          </div>

          <section className="space-y-4">
            <label className="block font-manrope font-bold text-[#191c23]">Opciones</label>
            <div className="grid gap-3">
              {options.map((opt, idx) => (
                <div key={idx} className="flex items-center bg-white rounded-lg ring-1 ring-[#c1c6d6]/30 px-4 focus-within:ring-2 focus-within:ring-[#005bbf] transition-all">
                  <span className="text-[#727785] text-sm mr-3">{idx + 1}.</span>
                  <input 
                    value={opt}
                    onChange={(e) => {
                      const newOpts = [...options];
                      newOpts[idx] = e.target.value;
                      setOptions(newOpts);
                    }}
                    className="w-full py-4 border-none bg-transparent text-[#191c23] outline-none focus:ring-0" 
                    placeholder={`Opción ${idx + 1}`} 
                    type="text" 
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setOptions([...options, ''])}
                className="text-[#005bbf] font-semibold text-sm self-start flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Añadir opción
              </button>
              <p className="text-[#ba1a1a] text-xs mt-2">
                Nota: Debe completar las opciones para presentar la pregunta.
              </p>
            </div>
          </section>


          <section className="grid grid-cols-2 gap-4 pt-4">
            <button 
              onClick={() => onNavigate('S21c')}
              className="py-4 px-6 rounded-lg font-bold text-[#191c23] bg-[#e0e2ec] hover:bg-[#e6e8f2] transition-colors active:scale-95"
            >
              Volver
            </button>
            <button 
              onClick={handleSave}
              className="py-4 px-6 rounded-lg font-bold text-white bg-gradient-to-br from-[#005bbf] to-[#1a73e8] shadow-md hover:opacity-90 transition-all active:scale-95"
            >
              Guardar
            </button>
          </section>
        </div>
      </main>

      {/* S21g Modal - Bottom Sheet */}
      {showSettings && (
        <>
          <div 
            className="absolute inset-0 bg-[#191c23]/40 backdrop-blur-[2px] z-[2000] transition-opacity"
            onClick={() => setShowSettings(false)}
          ></div>
          <div className="absolute bottom-0 left-0 right-0 bg-white z-[2001] rounded-t-[16px] shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="w-full flex justify-center py-3">
              <div className="w-12 h-1.5 bg-[#c1c6d6]/40 rounded-full"></div>
            </div>
            
            <div className="px-6 pb-6 border-b border-[#c1c6d6]/10">
              <h2 className="font-manrope font-bold text-xl text-[#191c23]">Ajustes de interacción</h2>
            </div>

            <div className="px-6 py-6 space-y-6">
              {[
                { label: 'Incluir descripción', key: 'description' },
                { label: 'Múltiples respuestas', key: 'multiple' },
                { label: 'Mostrar resultados', key: 'results' },
                { label: 'Añadir tiempo', key: 'time' },
                { label: 'Tablero de puntuaciones', key: 'leaderboard' }
              ].map((item) => (
                <div key={item.key} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#414754]">{item.label}</span>
                    <button 
                      onClick={() => toggleOption(item.key as keyof typeof toggles)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${toggles[item.key as keyof typeof toggles] ? 'bg-[#005bbf]' : 'bg-[#c1c6d6]'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${toggles[item.key as keyof typeof toggles] ? 'left-7' : 'left-1'}`}></div>
                    </button>
                  </div>
                  {item.key === 'time' && toggles.time && (
                    <div className="pl-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                      <label className="text-[10px] font-bold text-[#727785] uppercase tracking-wider">Tiempo en segundos</label>
                      <input 
                        type="number" 
                        min="1" 
                        placeholder="Ej: 30"
                        className="w-full bg-[#f2f3fd] border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#005bbf]/20 outline-none"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-6 grid grid-cols-2 gap-4 border-t border-[#c1c6d6]/10">
              <button 
                onClick={() => setShowSettings(false)}
                className="py-4 px-6 rounded-lg font-bold text-[#191c23] bg-[#e0e2ec] hover:bg-[#e6e8f2] transition-colors"
              >
                Volver
              </button>
              <button 
                onClick={() => setShowSettings(false)}
                className="py-4 px-6 rounded-lg font-bold text-white bg-[#005bbf] hover:opacity-90 transition-all"
              >
                Guardar
              </button>
            </div>
          </div>
        </>
      )}

      <BottomNav activeTab="Cursos" onNavigate={onNavigate} />
    </div>
  );
};
