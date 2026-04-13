import React, { useState, useEffect, useRef } from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNavAlumno } from '../common/BottomNavAlumno';
import { FABButton } from '../common/FABButton';

export const S01_Detail: React.FC<ScreenProps> = ({ onNavigate, hasConsultation, isAnonimo }) => {
  const [activeTab, setActiveTab] = useState<'consultas' | 'actividades'>('consultas');
  const [estadoConsulta, setEstadoConsulta] = useState({
    label: 'Recibida',
    color: '#1A73E8',
    bg: '#E8F0FE'
  });

  const [mostrarSnackbar, setMostrarSnackbar] = useState(false);
  const [snackbar, setSnackbar] = useState({
    msg: 'Se ha publicado su consulta',
    color: '#005bbf'
  });

  const [progreso, setProgreso] = useState(0);

  const [isRespondida, setIsRespondida] = useState(false);

  const [showTooltip, setShowTooltip] = useState(false);

  const tabActivoRef = useRef<'consultas' | 'actividades'>('consultas');
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

  const cambiarTab = (nuevoTab: 'consultas' | 'actividades') => {
    tabActivoRef.current = nuevoTab;
    setActiveTab(nuevoTab);
  };

  useEffect(() => {
    if (hasConsultation) {
      mostrarSnackbarMsg('Se ha publicado su consulta', '#005bbf');
    }
  }, [hasConsultation]);

  useEffect(() => {
    if (!hasConsultation || isRespondida) return;

    const interval = setInterval(() => {
      if (tabActivoRef.current === 'consultas') {
        setProgreso(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hasConsultation, isRespondida]);

  useEffect(() => {
    if (progreso === 4 && estadoRef.current === 'Recibida') {
      estadoRef.current = 'Pendiente de respuesta';
      setEstadoConsulta({
        label: 'Pendiente de respuesta',
        color: '#F29900',
        bg: '#FEF7E0'
      });
    }
    if (progreso === 12 && estadoRef.current === 'Pendiente de respuesta') {
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
  }, [progreso]);

  const responder = () => {
    setIsRespondida(true);
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
        backLabel="Lenguajes de Programación" 
        onBack={() => onNavigate('S01')} 
        showSettings={true}
      />
      <Breadcrumb items={['Cursos', 'Lenguajes de Programación', 'H386-A']} />
      
      {/* TabBar - FUERA y ENCIMA del contenido */}
      <div className="fixed top-[92px] left-0 right-0 z-50 bg-white border-b border-slate-100 flex px-6">
        <button 
          onClick={() => cambiarTab('consultas')}
          className={`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'consultas' ? 'text-[#005bbf] border-[#005bbf]' : 'text-[#727785] border-transparent'
          }`}
        >
          Consultas de clase
        </button>
        <button 
          onClick={() => cambiarTab('actividades')}
          className={`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'actividades' ? 'text-[#005bbf] border-[#005bbf]' : 'text-[#727785] border-transparent'
          }`}
        >
          Actividades
        </button>
      </div>

      <main className="flex-grow pt-[148px] pb-[80px]">
        {activeTab === 'consultas' ? (
          <div className="px-6">
            {!hasConsultation ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-32 h-32 mb-8 bg-[#f2f3fd] rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#727785] text-6xl">forum</span>
                </div>
                <h2 className="font-manrope text-xl font-bold text-[#727785] mb-2">No hay consultas</h2>
                <p className="text-[#727785] font-medium text-sm">Ingresar nueva consulta</p>
              </div>
            ) : (
              <div className="space-y-4 pt-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4 transition-all active:scale-[0.98]">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isAnonimo ? 'bg-[#f2f3fd]' : 'bg-[#005bbf]'}`}>
                    <span className={`material-symbols-outlined text-3xl ${isAnonimo ? 'text-[#727785]' : 'text-white'}`}>person</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-[#191c23] text-sm">
                          {isAnonimo ? 'Anónimo' : 'Juan Pérez (2019000)'}
                        </span>
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
            )}
            <FABButton onClick={() => onNavigate('S03')} />
          </div>
        ) : (
          <div className="px-6 pt-6 space-y-4">
            <div 
              onClick={() => onNavigate('S22a')}
              className="bg-white rounded-xl p-5 shadow-sm border border-[#e0e0e0] active:scale-[0.98] transition-all cursor-pointer flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-[#191c23]">Introducción a la Programación</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-[#e6f4ea] text-[#1e8e3e] text-[10px] font-bold rounded-full">Activa</span>
                  <span className="text-[10px] text-[#727785]">1 interacción</span>
                </div>
                <p className="text-[10px] text-[#727785] mt-1">Fecha: 10/01/26 - 11/01/26</p>
              </div>
              <span className="material-symbols-outlined text-[#005bbf]">chevron_right</span>
            </div>

            <div 
              className="bg-white rounded-xl p-5 shadow-sm border border-[#e0e0e0] opacity-60 cursor-not-allowed flex justify-between items-center relative"
              onClick={() => {
                setShowTooltip(true);
                setTimeout(() => setShowTooltip(false), 2000);
              }}
            >
              <div>
                <h3 className="font-bold text-[#191c23]">Estructuras de Control</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-[#f1f3f4] text-[#727785] text-[10px] font-bold rounded-full">Programada</span>
                  <span className="text-[10px] text-[#727785]">0 interacciones</span>
                </div>
                <p className="text-[10px] text-[#727785] mt-1">Fecha: 15/01/26 - 16/01/26</p>
              </div>
              {/* Sin chevron o chevron gris */}
              {showTooltip && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#323232] text-white text-[10px] px-3 py-1.5 rounded shadow-lg z-[100] animate-in fade-in slide-in-from-bottom-2">
                  Esta actividad aún no está activa
                </div>
              )}
            </div>
          </div>
        )}
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

      <BottomNavAlumno activeTab="Mis horarios" onNavigate={onNavigate} />
    </div>
  );
};
