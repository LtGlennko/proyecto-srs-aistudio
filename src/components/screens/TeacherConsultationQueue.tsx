import React, { useState } from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';
import { Tabs } from '../common/Tabs';

export const TeacherConsultationQueue: React.FC<ScreenProps> = ({ onNavigate, hasConsultationsDocente, onSimulate, selectedCourse, consultas = [], onUpdateConsultation }) => {
  const simularConsultas = () => {
    if (onSimulate) onSimulate();
  };

  const toggleRespondida = (consultation: any) => {
    if (onUpdateConsultation) {
      onUpdateConsultation({
        ...consultation,
        respondida: !consultation.respondida,
        estado: !consultation.respondida ? 'Respondida' : 'Pendiente de respuesta'
      });
    }
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
        backLabel="Mis Cursos" 
        onBack={() => onNavigate('S19c')} 
        showSettings={true}
        onSettingsClick={() => onNavigate('S19b')}
        title={selectedCourse?.name}
        subtitle={selectedCourse?.code}
      />
      <Breadcrumb 
        items={[
          { label: 'Mis Cursos', onClick: () => onNavigate('S19c') },
          selectedCourse?.name || 'Curso'
        ]} 
      />
      <Tabs activeTab="Consultas" onNavigate={onNavigate} consultas={consultas} />

      <main className="flex-grow pt-[140px] pb-[80px] px-6 w-full">
        {consultas.length === 0 ? (
          <section className="flex flex-col items-center justify-center py-24 px-6">
            <div className="mb-6 opacity-20">
              <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'wght' 200" }}>forum</span>
            </div>
            <h2 className="text-[#414754] font-manrope font-bold text-xl mb-2">No hay consultas</h2>
          </section>
        ) : (
          <div className="space-y-4 pt-4">
            {[...consultas]
              .sort((a, b) => {
                // Not responded first
                if (a.respondida !== b.respondida) {
                  return a.respondida ? 1 : -1;
                }
                // Older first (ascending time)
                return a.tiempo.localeCompare(b.tiempo);
              })
              .map(c => {
                const style = getEstadoStyle(c.estado);
                return (
                  <div key={c.id} className={`bg-white p-5 rounded-2xl shadow-sm border transition-all ${c.respondida ? 'opacity-60 grayscale-[0.3]' : 'border-[#6200ee]/10 hover:border-[#6200ee]/30 shadow-md transform hover:-translate-y-0.5'}`}>
                    <div className="flex items-start gap-4">
                      {c.avatar ? (
                        <img src={c.avatar} alt={c.nombre} className="w-11 h-11 rounded-full object-cover border-2 border-[#ecedf7]" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-[#f2f3fd] flex items-center justify-center border-2 border-[#ecedf7]">
                          <span className="material-symbols-outlined text-[#727785] text-xl">person</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-xs text-[#191c23] truncate pr-2">{c.nombre}</h3>
                          <span className="text-[10px] text-[#727785] whitespace-nowrap">{c.tiempo}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span 
                            className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
                            style={{ color: style.color, backgroundColor: `${style.bg}cc` }}
                          >
                            {c.estado}
                          </span>
                          {c.activityName && (
                            <span className="text-[9px] text-[#727785] font-medium hidden sm:inline">
                              • {c.activityName}
                            </span>
                          )}
                        </div>
                        <p className={`text-[13px] text-[#414754] mt-2 leading-relaxed ${c.respondida ? 'line-through' : ''}`}>"{c.texto}"</p>
                      </div>
                      <button 
                        onClick={() => toggleRespondida(c)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 transition-all active:scale-90 ${
                          c.respondida 
                            ? 'bg-[#34A853] border-[#34A853] text-white shadow-sm' 
                            : 'border-[#c1c6d6] text-transparent hover:bg-[#34A853]/10 hover:border-[#34A853]/30'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                      </button>
                    </div>
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
