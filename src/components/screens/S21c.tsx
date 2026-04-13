import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';
import { BarChart } from '../common/BarChart';
import { DonutChart } from '../common/DonutChart';
import { FABButton } from '../common/FABButton';

export const S21c: React.FC<ScreenProps> = ({ onNavigate, hasInteraction, onActivityFinished, questions = [] }) => {
  const [activeTab, setActiveTab] = React.useState<'interacciones' | 'resultados'>('interacciones');
  const [selectedQuestion, setSelectedQuestion] = React.useState(1);
  const [showMenu, setShowMenu] = React.useState<number | null>(null);
  const [showToast, setShowToast] = React.useState(false);
  const [playState, setPlayState] = React.useState<'idle' | 'active' | 'finished'>('idle');

  const handlePlayToggle = () => {
    if (playState === 'idle') {
      setPlayState('active');
    } else if (playState === 'active') {
      setPlayState('finished');
    } else {
      setPlayState('active');
    }
  };

  const getStatusText = () => {
    if (playState === 'active') return 'En curso';
    if (playState === 'finished') return '17 respuestas';
    return '0 respuestas';
  };

  const handleExport = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter relative overflow-hidden">
      <Header 
        backLabel="H386-A" 
        onBack={() => onNavigate('S20e')} 
        showSettings={true}
      />
      <Breadcrumb items={['Cursos', 'Lenguajes de Programación', 'H386-A', 'Introducción a la Programación']} />
 
      <main className="flex-grow pt-[92px] pb-[80px] px-6">
        {hasInteraction ? (
          <>
            {/* Tabs */}
            <div className="flex border-b border-[#c1c6d6]/20 mb-6 mt-4">
              <button 
                onClick={() => setActiveTab('interacciones')}
                className={`relative px-4 py-3 font-inter text-sm font-medium transition-colors ${activeTab === 'interacciones' ? 'text-[#005bbf]' : 'text-[#727785]'}`}
              >
                Interacciones
                {activeTab === 'interacciones' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#005bbf] rounded-full"></div>}
              </button>
              <button 
                onClick={() => setActiveTab('resultados')}
                className={`relative px-4 py-3 font-inter text-sm font-medium transition-colors ${activeTab === 'resultados' ? 'text-[#005bbf]' : 'text-[#727785]'}`}
              >
                Resultados
                {activeTab === 'resultados' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#005bbf] rounded-full"></div>}
              </button>
            </div>

            {activeTab === 'interacciones' ? (
              <div className="space-y-4">
                {questions.map((q, idx) => (
                  <div key={q.id} className="bg-white p-4 rounded-xl border border-[#c1c6d6]/20 shadow-sm flex items-center gap-4 transition-all hover:shadow-md relative">
                    <div className="w-10 h-10 flex items-center justify-center bg-[#f2f3fd] rounded-full flex-shrink-0">
                      <span className="material-symbols-outlined text-[#475e8c]">format_list_bulleted</span>
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-manrope font-bold text-[#191c23] truncate">Pregunta {idx + 1}</h3>
                      <p className="text-xs text-[#727785]">{getStatusText()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={handlePlayToggle}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 ${
                          playState === 'active' 
                            ? 'bg-[#EA4335] text-white shadow-lg shadow-[#EA4335]/20' 
                            : 'bg-[#34A853] text-white shadow-lg shadow-[#34A853]/20'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {playState === 'active' ? 'pause' : 'play_arrow'}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white p-3 rounded-lg border border-[#c1c6d6]/30 shadow-sm text-center">
                    <div className="text-xl font-manrope font-extrabold text-[#005bbf]">25</div>
                    <div className="text-[9px] text-[#727785] font-medium leading-tight mt-1 uppercase">Estudiantes conectados</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-[#c1c6d6]/30 shadow-sm text-center">
                    <div className="text-xl font-manrope font-extrabold text-[#9e4300]">83%</div>
                    <div className="text-[9px] text-[#727785] font-medium leading-tight mt-1 uppercase">% de participación</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-[#c1c6d6]/30 shadow-sm text-center">
                    <div className="text-xl font-manrope font-extrabold text-[#9e4300]">17</div>
                    <div className="text-[9px] text-[#727785] font-medium leading-tight mt-1 uppercase">Respuestas</div>
                  </div>
                </div>

                {/* Question Navigation */}
                <div className="flex items-center justify-between py-3 border-y border-[#e0e0e0] mb-6">
                  <button 
                    disabled={selectedQuestion === 1}
                    onClick={() => setSelectedQuestion(selectedQuestion - 1)}
                    className="px-3 py-1.5 border border-[#e0e0e0] rounded-lg text-xs font-bold text-[#727785] disabled:opacity-30 flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Anterior
                  </button>
                  <select 
                    value={selectedQuestion}
                    onChange={(e) => setSelectedQuestion(Number(e.target.value))}
                    className="bg-transparent font-manrope font-bold text-sm text-[#191c23] focus:outline-none"
                  >
                    {questions.map((_, i) => (
                      <option key={i} value={i + 1}>PREGUNTA {i + 1}</option>
                    ))}
                  </select>
                  <button 
                    disabled={selectedQuestion === questions.length}
                    onClick={() => setSelectedQuestion(selectedQuestion + 1)}
                    className="px-3 py-1.5 border border-[#e0e0e0] rounded-lg text-xs font-bold text-[#727785] disabled:opacity-30 flex items-center gap-1"
                  >
                    Siguiente
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>

                {/* Visualizations */}
                <div className="bg-[#f2f3fd] p-6 rounded-2xl">
                  {selectedQuestion === 1 ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[10px] font-bold tracking-widest text-[#727785] uppercase">Resultados Pregunta 1</h4>
                        <span className="material-symbols-outlined text-sm text-[#727785]">bar_chart</span>
                      </div>
                      <BarChart 
                        data={[
                          { label: 'Opción 1', value: 5, percentage: '40%', color: '#E24B4A', height: '62.5%' },
                          { label: 'Opción 2', value: 8, percentage: '15%', color: '#1A73E8', height: '100%' },
                          { label: 'Opción 3', value: 3, percentage: '45%', color: '#34A853', height: '37.5%' }
                        ]}
                      />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[10px] font-bold tracking-widest text-[#727785] uppercase">Resultados Pregunta 2</h4>
                        <span className="material-symbols-outlined text-sm text-[#727785]">pie_chart</span>
                      </div>
                      <DonutChart 
                        segments={[
                          { label: 'SÍ', value: 60, color: '#2d3038' },
                          { label: 'NO', value: 40, color: '#d8d9e3' }
                        ]}
                      />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-4">
                  <div className="p-4">
                    <button 
                      onClick={() => onNavigate('S18')}
                      className="w-full py-3 border border-[#005bbf] text-[#005bbf] font-bold text-sm rounded-xl hover:bg-[#f2f3fd] transition-all"
                    >
                      Ver resumen completo
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      if (onActivityFinished) onActivityFinished();
                      onNavigate('S20e');
                    }}
                    className="w-full py-3 bg-[#ba1a1a] text-white font-bold text-sm rounded-xl shadow-md hover:opacity-90 transition-all active:scale-95"
                  >
                    Finalizar Actividad
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 mb-6 rounded-full bg-[#f2f3fd] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#005bbf] text-5xl">touch_app</span>
            </div>
            <h3 className="font-manrope font-bold text-lg mb-2 text-[#191c23]">No hay interacciones</h3>
            <p className="text-[#414754] text-sm max-w-[240px]">Añade interacciones para verlas aquí</p>
          </div>
        )}
      </main>

      <FABButton onClick={() => onNavigate('S21e')} />

      <BottomNav activeTab="Cursos" onNavigate={onNavigate} />

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#191c23] text-white px-6 py-3 rounded-full text-sm font-medium shadow-2xl z-[100] animate-in slide-in-from-bottom-4 duration-300 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">download</span>
          Exportando resultados...
        </div>
      )}
    </div>
  );
};
