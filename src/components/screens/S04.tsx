import React, { useState, useEffect, useRef } from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNavAlumno } from '../common/BottomNavAlumno';
import { FABButton } from '../common/FABButton';

export const S04: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [estadoConsulta, setEstadoConsulta] = useState({
    label: 'Recibida',
    color: '#1A73E8',
    bg: '#E8F0FE'
  });

  const [mostrarSnackbar, setMostrarSnackbar] = useState(true);
  const [snackbar, setSnackbar] = useState({
    msg: 'Se ha publicado su consulta',
    color: '#005bbf'
  });

  const estadoRef = useRef('Recibida');
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const limpiarTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const mostrarSnackbarMsg = (msg: string, color: string) => {
    setSnackbar({ msg, color });
    setMostrarSnackbar(true);
    setTimeout(() => setMostrarSnackbar(false), 3000);
  };

  useEffect(() => {
    const t = setTimeout(() => setMostrarSnackbar(false), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Timer 1: Recibida → Pendiente de respuesta
    timersRef.current.push(
      setTimeout(() => {
        if (estadoRef.current === 'Recibida') {
          estadoRef.current = 'Pendiente de respuesta';
          setEstadoConsulta({
            label: 'Pendiente de respuesta',
            color: '#F29900',
            bg: '#FEF7E0'
          });
        }
      }, 4000)
    );
    // Timer 2: Pendiente → Pendiente fuera de clase
    timersRef.current.push(
      setTimeout(() => {
        if (estadoRef.current === 'Pendiente de respuesta') {
          estadoRef.current = 'Pendiente fuera de clase';
          setEstadoConsulta({
            label: 'Pendiente fuera de clase',
            color: '#D93025',
            bg: '#FCE8E6'
          });
          mostrarSnackbarMsg(
            'Consulta pendiente de clase. Será respondida en la siguiente sesión.',
            '#D93025'
          );
        }
      }, 8000)
    );
    return () => limpiarTimers();
  }, []);

  const responder = () => {
    // Cancela todos los timers pendientes
    limpiarTimers();
    
    const nuevoEstado = estadoRef.current === 'Pendiente fuera de clase'
      ? {
          label: 'Respondida fuera de clase',
          color: '#00897B',
          bg: '#E0F2F1',
          msg: 'Tu consulta fue respondida fuera de la clase'
        }
      : {
          label: 'Respondida durante clase',
          color: '#34A853',
          bg: '#E6F4EA',
          msg: 'Tu consulta fue respondida durante la clase'
        };
    
    estadoRef.current = nuevoEstado.label;
    setEstadoConsulta({
      label: nuevoEstado.label,
      color: nuevoEstado.color,
      bg: nuevoEstado.bg
    });
    mostrarSnackbarMsg(nuevoEstado.msg, nuevoEstado.color);
  };

  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter relative">
      <Header 
        backLabel="Volver" 
        onBack={() => onNavigate('S02')} 
      />
      <Breadcrumb items={['Lenguajes de Programación', 'H386-A']} />
      
      {/* TabBar - FUERA y ENCIMA del contenido */}
      <div className="fixed top-[92px] left-0 right-0 z-50 bg-white border-b border-slate-100 flex px-6">
        <button 
          className="flex-1 py-4 text-sm font-bold transition-all border-b-2 text-[#005bbf] border-[#005bbf]"
        >
          Consultas de clase
        </button>
        <button 
          onClick={() => onNavigate('S01_Detail')}
          className="flex-1 py-4 text-sm font-bold transition-all border-b-2 text-[#727785] border-transparent"
        >
          Actividades
        </button>
      </div>

      <main className="flex-grow pt-[148px] pb-[80px] px-6">

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4 transition-all active:scale-[0.98]">
            <div className="w-12 h-12 rounded-full bg-[#f2f3fd] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#727785] text-3xl">person</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-[#191c23] text-sm">Anónimo</span>
                  <div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      padding: '3px 10px',
                      borderRadius: '20px',
                      background: estadoConsulta.bg,
                      color: estadoConsulta.color,
                    }}>
                      {estadoConsulta.label}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#727785] font-medium">13:05</span>
              </div>
              <p className="text-sm text-[#414754] leading-relaxed mt-2">
                ¿Podría repetir el ejemplo de matrices?
              </p>
            </div>
          </div>

          {(estadoConsulta.label === 'Pendiente de respuesta' || 
            estadoConsulta.label === 'Pendiente fuera de clase') && (
            <button 
              onClick={responder}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px dashed #c1c6d6',
                borderRadius: '8px',
                background: 'transparent',
                color: '#727785',
                fontSize: '12px',
                marginTop: '16px'
              }}
            >
              ⚡ Simular respuesta del docente
            </button>
          )}
        </div>
      </main>

      {mostrarSnackbar && (
        <div 
          style={{
            position: 'fixed',
            bottom: '72px',
            left: '24px',
            right: '24px',
            background: snackbar.color,
            color: 'white',
            borderRadius: '8px',
            padding: '12px 16px',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '14px',
            fontWeight: 500,
            textAlign: 'center'
          }}
        >
          {snackbar.msg}
        </div>
      )}

      <FABButton onClick={() => onNavigate('S03')} />

      <BottomNavAlumno activeTab="Mis horarios" onNavigate={onNavigate} />
    </div>
  );
};
