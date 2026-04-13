import React, { useState } from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';
import { Tabs } from '../common/Tabs';

export const S20d: React.FC<ScreenProps> = ({ onNavigate, hasConsultationsDocente, onSimulate }) => {
  const [consultas, setConsultas] = useState([
    {
      id: 1,
      nombre: "Anónimo",
      texto: "¿Para qué es el espacio antes del contenido de la selectiva?",
      tiempo: "13:05",
      avatar: null,
      estado: "Pendiente fuera de clase",
      respondida: false
    },
    {
      id: 2,
      nombre: "Juan Pérez (2119000)",
      texto: "¿Cuántas condiciones anidadas se pueden tener?",
      tiempo: "13:18",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1meWSRlToSDIgVWCnnTwp-e4UXu_8vbNs-KLkeRGmgzd2eMz_oHCg0zya6mOtL4_qjQdwgRvMngYPvXMbJKCh9lva7WTPnN__QGZWClXWtsrgGn7u2E5iepVAHR0zPAQJ6tWGIfMv2SZy3l_JoNJlWx39L1HYiGjoNvhTd7GYruJouOf9fF2mtkG7Uzhl12-GpQeanh0H7dHoM1C2UMtJxNnJNYc7QwVrMtIYCfeO3ZiJhv542oPAgJQgR7hK2dvqzU4cdik41jM",
      estado: "Pendiente fuera de clase",
      respondida: false
    },
    {
      id: 3,
      nombre: "María López (2219000)",
      texto: "¿Es necesario usar llaves cada vez que se utilice el if y else?",
      tiempo: "14:07",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZrsG9QrVFZZyDlYDZCer1tmaSLOCNhJ04iU3jriCLoizNZY634iabs1AMbtZSdoJsSnjbvYBDF_w6CK-O20wtWONaUVBFNN-6VPrO_m9Kj8rHIFfgm2Ojf5QiPxkrwn-fDCNm2MiadYp5BhRNTCdEFi4WVPwtwrveR05kq4flzx-j_-0FizZ1qRbAx65a9xUzyaYzgN5nga6PS2UlhU2ZqGDeNLu6-bVuxT5nwzNrgfQpYH0JwIw_xtr1TAmGipXEKrifo8YcTxg",
      estado: "Pendiente de respuesta",
      respondida: false
    }
  ]);

  const simularConsultas = () => {
    if (onSimulate) onSimulate();
  };

  const toggleRespondida = (id: number) => {
    setConsultas(prev => prev.map(c => 
      c.id === id ? { ...c, respondida: !c.respondida, estado: !c.respondida ? 'Respondida' : 'Pendiente de respuesta' } : c
    ));
  };

  const getEstadoStyle = (estado: string) => {
    switch (estado) {
      case 'Pendiente fuera de clase': return { color: '#D93025', bg: '#FCE8E6' };
      case 'Pendiente de respuesta': return { color: '#F29900', bg: '#FEF7E0' };
      case 'Recibida': return { color: '#1A73E8', bg: '#E8F0FE' };
      case 'Respondida': return { color: '#34A853', bg: '#E6F4EA' };
      default: return { color: '#727785', bg: '#f1f3f4' };
    }
  };

  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter relative">
      <Header 
        backLabel="Lenguajes de Programación" 
        onBack={() => onNavigate('S20a')} 
        showSettings={true}
      />
      <Breadcrumb items={['Cursos', 'Lenguajes de Programación', 'H386-A']} />
      <Tabs activeTab="Consultas" onNavigate={onNavigate} />

      <main className="flex-grow pt-[140px] pb-[80px] px-6 w-full">
        {!hasConsultationsDocente ? (
          <section className="flex flex-col items-center justify-center py-24 px-6">
            <div className="mb-6 opacity-20">
              <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'wght' 200" }}>forum</span>
            </div>
            <h2 className="text-[#414754] font-manrope font-bold text-xl mb-2">No hay consultas</h2>
            <button 
              onClick={simularConsultas}
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
              ⚡ Simular consultas de alumnos
            </button>
          </section>
        ) : (
          <div className="space-y-4 pt-4">
            {consultas.map(c => {
              const style = getEstadoStyle(c.estado);
              return (
                <div key={c.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
                  {c.avatar ? (
                    <img src={c.avatar} alt={c.nombre} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#ecedf7] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#727785]">person</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-sm text-[#191c23]">{c.nombre}</h3>
                      <span className="text-[10px] text-[#727785]">{c.tiempo}</span>
                    </div>
                    <div className="mt-1">
                      <span 
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                        style={{ color: style.color, backgroundColor: style.bg }}
                      >
                        {c.estado}
                      </span>
                    </div>
                    <p className="text-xs text-[#414754] mt-2 leading-relaxed">{c.texto}</p>
                  </div>
                  <button 
                    onClick={() => toggleRespondida(c.id)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      c.respondida ? 'bg-[#34A853] text-white' : 'border-2 border-[#c1c6d6] text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav activeTab="Cursos" onNavigate={onNavigate} />
    </div>
  );
};
