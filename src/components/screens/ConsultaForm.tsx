import React, { useState } from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNavAlumno } from '../common/BottomNavAlumno';
import { FABButton } from '../common/FABButton';

export const ConsultaForm: React.FC<ScreenProps> = ({ onNavigate, onSent, onAddConsultation, selectedActivity }) => {
  const [esAnonimo, setEsAnonimo] = useState(true);
  const [text, setText] = useState('');

  const handleEnviar = () => {
    if (!text.trim()) return;

    if (onAddConsultation) {
      onAddConsultation({
        id: Date.now(),
        nombre: esAnonimo ? 'Anónimo' : 'Humberto López', // Mocking student name if not anon
        texto: text,
        tiempo: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // I'll use a real current time
        avatar: esAnonimo ? null : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
        estado: 'Pendiente de respuesta',
        respondida: false,
        activityId: selectedActivity?.id
      });
    }

    if (onSent) {
      onSent(esAnonimo);
    } else {
      if (esAnonimo) {
        onNavigate('S04');
      } else {
        onNavigate('S06');
      }
    }
  };

  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Volver" 
        onBack={() => onNavigate('S02')} 
      />
      <Breadcrumb items={['Lenguajes de Programación', 'H386-A']} />
      
      <main className="flex-grow pt-[92px] pb-[80px] px-6">
        <div className="mb-8 mt-6">
          <h2 className="font-manrope font-bold text-xl text-[#191c23] mb-2">Escribir Consulta</h2>
          <p className="text-[#727785] text-sm leading-relaxed">
            Envía tu duda al docente para que sea resuelta durante la sesión.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#191c23]">Mensaje de la consulta</label>
            <textarea 
              className="w-full min-h-[160px] p-4 bg-[#f2f3fd] border-none focus:ring-2 focus:ring-[#005bbf] rounded-lg text-sm resize-none" 
              placeholder="Escribe tu consulta aquí..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex flex-col">
              <span className="font-bold text-sm">Publicar como anónimo</span>
            </div>
            <div 
              onClick={() => setEsAnonimo(!esAnonimo)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
                esAnonimo ? 'bg-[#005bbf]' : 'bg-slate-300'
              }`}
            >
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  esAnonimo ? 'translate-x-6' : 'translate-x-1'
                }`} 
              />
            </div>
          </div>

          {!esAnonimo && (
            <div className="bg-[#ffdbcb] rounded-xl p-4 flex items-start gap-3 border border-[#783100]/10">
              <span className="material-symbols-outlined text-[#783100] mt-0.5">warning</span>
              <p className="text-[#783100] text-sm font-medium leading-relaxed">
                Aviso: Tu nombre será visible en el foro.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-4">
            <button 
              onClick={handleEnviar}
              className="w-full py-4 bg-[#005bbf] text-white font-bold rounded-lg shadow-md active:scale-95 transition-all"
            >
              Enviar Consulta
            </button>
            <button 
              onClick={() => onNavigate('S02')}
              className="w-full py-4 bg-[#e0e2ec] text-[#191c23] font-bold rounded-lg active:scale-95 transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      </main>

      <FABButton onClick={() => {}} />

      <BottomNavAlumno activeTab="Mis horarios" onNavigate={onNavigate} />
    </div>
  );
};
