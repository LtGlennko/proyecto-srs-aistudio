import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';
import { BarChart } from '../common/BarChart';
import { DonutChart } from '../common/DonutChart';
import { FABButton } from '../common/FABButton';

import { SummaryContent } from '../common/SummaryContent';

export const S21h: React.FC<ScreenProps> = ({ onNavigate, hasInteraction, onActivityFinished, questions = [], selectedCourse, selectedActivity, onSetEditingInteraction, activeInteractionId, onToggleActiveInteraction, responseCounts }) => {
  const [activeTab, setActiveTab] = React.useState<'interacciones' | 'resultados'>('interacciones');
  const [selectedQuestion, setSelectedQuestion] = React.useState(1);
  const [showToast, setShowToast] = React.useState(false);
  const [showConfirmBack, setShowConfirmBack] = React.useState(false);
  const [resultsView, setResultsView] = React.useState<'individual' | 'total'>('individual');

  const handleBack = () => {
    const hasEmpty = questions.some(q => (responseCounts?.[q.id] || 0) === 0);
    if (hasEmpty) {
      setShowConfirmBack(true);
    } else {
      onNavigate('S20e');
    }
  };

  const handlePlayToggle = (id: number) => {
    if (onToggleActiveInteraction) {
      onToggleActiveInteraction(id);
    }
  };

  const getStatusText = (id: number) => {
    const count = responseCounts?.[id] || 0;
    return `${count} respuestas`;
  };

  const handleExport = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleEdit = (q: any) => {
    if (onSetEditingInteraction) {
      onSetEditingInteraction(q);
      onNavigate('S21f');
    }
  };

  const [showConfirmFinish, setShowConfirmFinish] = React.useState(false);

  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter relative overflow-hidden">
      <Header 
        backLabel={selectedActivity?.name || 'Actividad'} 
        onBack={handleBack} 
        showSettings={true}
        onSettingsClick={() => onNavigate('S21b')}
      />
      <Breadcrumb items={['Mis Cursos', selectedCourse?.name || 'Curso', selectedActivity?.name || 'Actividad']} />
 
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
                {questions.length > 0 && (
                  <div className="mb-2 flex items-center justify-between bg-[#f2f3fd] px-3 py-1.5 rounded-full">
                    <button 
                       onClick={() => {
                        const url = new URL(window.location.href);
                        url.searchParams.set('mode', 'live');
                        window.open(url.toString(), '_blank');
                      }}
                      className="inline-flex items-center gap-2 text-[#005bbf] font-semibold text-xs hover:underline"
                    >
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      Ver presentación en vivo
                    </button>
                    <div className="flex items-center gap-1.5 text-[#727785]">
                      <span className="material-symbols-outlined text-[16px]">group</span>
                      <span className="text-[11px] font-bold">20</span>
                    </div>
                  </div>
                )}
                {questions.map((q, idx) => (
                  <div key={q.id} className="bg-white p-4 rounded-xl border border-[#c1c6d6]/20 shadow-sm flex items-center gap-4 transition-all hover:shadow-md relative group">
                    <div className="w-10 h-10 flex items-center justify-center bg-[#f2f3fd] rounded-full flex-shrink-0">
                      <span className="material-symbols-outlined text-[#475e8c]">
                        {q.type === 'opcion_multiple' ? 'list_alt' :
                         q.type === 'verdadero_falso' ? 'check_circle' :
                         q.type === 'nube_palabras' ? 'cloud' :
                         q.type === 'ranking' ? 'format_list_numbered' :
                         q.type === 'texto_libre' ? 'notes' : 'format_list_bulleted'}
                      </span>
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-manrope font-bold text-[#191c23] truncate">{q.text}</h3>
                      <p className="text-xs text-[#727785]">{getStatusText(q.id)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(q)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#727785] hover:bg-[#f2f3fd] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button 
                        onClick={() => handlePlayToggle(q.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 ${
                          activeInteractionId === q.id 
                            ? 'bg-[#EA4335] text-white shadow-lg shadow-[#EA4335]/20' 
                            : 'bg-[#34A853] text-white shadow-lg shadow-[#34A853]/20'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {activeInteractionId === q.id ? 'pause' : 'play_arrow'}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* View Selector */}
                <div className="flex bg-[#ecedf7] p-1 rounded-xl">
                  <button 
                    onClick={() => setResultsView('individual')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${resultsView === 'individual' ? 'bg-white text-[#005bbf] shadow-sm' : 'text-[#727785]'}`}
                  >
                    Por interacción
                  </button>
                  <button 
                    onClick={() => setResultsView('total')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${resultsView === 'total' ? 'bg-white text-[#005bbf] shadow-sm' : 'text-[#727785]'}`}
                  >
                    Resumen total
                  </button>
                </div>

                {resultsView === 'individual' ? (
                  <>
                    {/* Interactivity Counts Metrics */}
                    {questions[selectedQuestion - 1] && (
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white p-3 rounded-lg border border-[#c1c6d6]/30 shadow-sm text-center">
                          <div className="text-xl font-manrope font-extrabold text-[#005bbf]">25</div>
                          <div className="text-[9px] text-[#727785] font-medium leading-tight mt-1 uppercase">Estudiantes conectados</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-[#c1c6d6]/30 shadow-sm text-center">
                          <div className="text-xl font-manrope font-extrabold text-[#9e4300]">
                            {(() => {
                               const q = questions[selectedQuestion - 1];
                               if (!q) return '0%';
                               return `${Math.round(((responseCounts?.[q.id] || 0) / 20) * 100)}%`;
                            })()}
                          </div>
                          <div className="text-[9px] text-[#727785] font-medium leading-tight mt-1 uppercase">% de participación</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-[#c1c6d6]/30 shadow-sm text-center">
                          <div className="text-xl font-manrope font-extrabold text-[#9e4300]">
                            {(() => {
                               const q = questions[selectedQuestion - 1];
                               if (!q) return 0;
                               return responseCounts?.[q.id] || 0;
                            })()}
                          </div>
                          <div className="text-[9px] text-[#727785] font-medium leading-tight mt-1 uppercase">Respuestas</div>
                        </div>
                      </div>
                    )}

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
                          <option key={i} value={i + 1}>Interacción {i + 1}</option>
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
                      {(() => {
                        const q = questions[selectedQuestion - 1];
                        if (!q) return null;

                        const total = responseCounts?.[q.id] || 0;

                        // Stable distribution helper: assigns each response index to an option index
                        const getDistribution = (totalCount: number, optionsCount: number) => {
                          const counts = new Array(optionsCount).fill(0);
                          for (let i = 0; i < totalCount; i++) {
                            // Use a stable but somewhat random-looking sequence based on question ID and index
                            const targetIdx = (Math.abs(Math.sin(q.id + i) * 10000)) % optionsCount;
                            counts[Math.floor(targetIdx)]++;
                          }
                          return counts;
                        };

                        const getInteractionIcon = (type: string) => {
                          switch (type) {
                            case 'opcion_multiple': return 'list_alt';
                            case 'verdadero_falso': return 'check_circle';
                            case 'ranking': return 'format_list_numbered';
                            case 'nube_palabras': return 'cloud';
                            default: return 'notes';
                          }
                        };

                        if (q.type === 'opcion_multiple') {
                          const distribution = getDistribution(total, q.options?.length || 1);
                          const barData = (q.options || []).map((opt: string, i: number) => {
                            const colors = ['#E24B4A', '#1A73E8', '#34A853', '#F9AB00', '#9334E6', '#FF6D00'];
                            const val = distribution[i];
                            const isCorrect = q.correctOptions?.includes(i);
                            return {
                              label: opt,
                              value: val,
                              percentage: total > 0 ? `${Math.round((val / total) * 100)}%` : '0%',
                              color: colors[i % colors.length],
                              height: total > 0 ? `${(val / total) * 100}%` : '5%',
                              isCorrect
                            };
                          });
                          return (
                            <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-bold tracking-widest text-[#727785]">Resultados: {q.text}</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-[#005bbf]">{total} total</span>
                                  <span className="material-symbols-outlined text-sm text-[#727785]">{getInteractionIcon(q.type)}</span>
                                </div>
                              </div>
                              <BarChart data={barData} />
                              {/* Legend with specific counts and correct indicator */}
                              <div className="grid grid-cols-2 gap-2 mt-4">
                                {barData.map((d: any, i: number) => (
                                  <div key={i} className={`flex items-center gap-2 bg-white/50 p-2 rounded-lg relative overflow-hidden ${d.isCorrect ? 'border border-[#34A853]/50' : ''}`}>
                                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                                    <span className="text-[10px] font-bold text-[#414754] truncate flex-1">{d.label}</span>
                                    <div className="flex items-center gap-1 shrink-0">
                                      <span className="text-[10px] font-black text-[#005bbf]">{d.value}</span>
                                      {d.isCorrect && (
                                        <span className="material-symbols-outlined text-[#34A853] text-[14px]">verified</span>
                                      )}
                                    </div>
                                    {d.isCorrect && <div className="absolute top-0 right-0 w-1 h-full bg-[#34A853]" />}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }

                        if (q.type === 'verdadero_falso') {
                          const distribution = getDistribution(total, 2);
                          const trueVal = distribution[0];
                          const falseVal = distribution[1];
                          const correctIdx = q.correctOptions?.[0]; // 0 for True, 1 for False

                          return (
                            <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-bold tracking-widest text-[#727785]">Resultados: {q.text}</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-[#005bbf]">{total} total</span>
                                  <span className="material-symbols-outlined text-sm text-[#727785]">{getInteractionIcon(q.type)}</span>
                                </div>
                              </div>
                              <DonutChart 
                                segments={total === 0 ? [
                                  { label: 'Sin respuestas', value: 1, color: '#e0e0e0' }
                                ] : [
                                  { label: 'Verdadero', value: trueVal, color: '#34A853' },
                                  { label: 'Falso', value: falseVal, color: '#EA4335' }
                                ]}
                              />
                              <div className="flex justify-center gap-8 mt-4">
                                <div className={`text-center p-2 rounded-lg ${correctIdx === 0 ? 'bg-[#34A853]/10 border border-[#34A853]/20 shadow-sm' : ''}`}>
                                  <div className="flex items-center justify-center gap-1">
                                    <span className="text-xs font-bold text-[#34A853]">Verdadero</span>
                                    {correctIdx === 0 && <span className="material-symbols-outlined text-[#34A853] text-[14px]">verified</span>}
                                  </div>
                                  <div className="text-lg font-black text-[#191c23]">{trueVal}</div>
                                </div>
                                <div className={`text-center p-2 rounded-lg ${correctIdx === 1 ? 'bg-[#EA4335]/10 border border-[#EA4335]/20 shadow-sm' : ''}`}>
                                  <div className="flex items-center justify-center gap-1">
                                    <span className="text-xs font-bold text-[#EA4335]">Falso</span>
                                    {correctIdx === 1 && <span className="material-symbols-outlined text-[#EA4335] text-[14px]">verified</span>}
                                  </div>
                                  <div className="text-lg font-black text-[#191c23]">{falseVal}</div>
                                </div>
                              </div>
                            </div>
                          );
                        }

                        if (q.type === 'nube_palabras') {
                           const allWords = ['Interesante', 'Innovador', 'Dinámico', 'Útil', 'Genial', 'Importante', 'Clave', 'Creatividad', 'IA', 'Educación', 'Aprendizaje', 'Docencia', 'Interacción', 'Futuro', 'Moderno', 'Eficaz', 'Reto', 'Cambio', 'Solución', 'Mundo', 'Progreso', 'Colaboración', 'Red', 'Sinergia'];
                           const visibleWords = allWords.slice(0, total);
                           return (
                            <div className="space-y-6">
                               <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-bold tracking-widest text-[#727785]">Nube de Palabras: {q.text}</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-[#005bbf]">{total} respuestas</span>
                                  <span className="material-symbols-outlined text-sm text-[#727785]">{getInteractionIcon(q.type)}</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 p-4 bg-white/50 rounded-xl min-h-[160px] max-h-[200px] overflow-hidden align-middle">
                                {visibleWords.length === 0 ? (
                                  <div className="text-[11px] text-[#727785] font-medium italic text-center pt-12 w-full">Esperando respuestas...</div>
                                ) : (
                                  visibleWords.map((w, i) => {
                                    // Spiral logic: small index = center = large size
                                    const size = Math.max(9, 28 - (i * 1.8));
                                    // Order words to pseudo-spiral: central words (early) get central orders
                                    const order = i % 2 === 0 ? 50 + i : 50 - i;
                                    return (
                                      <span 
                                        key={i} 
                                        style={{ 
                                          fontSize: `${size}px`, 
                                          opacity: 1 - (i * 0.05),
                                          order: order
                                        }}
                                        className="font-bold text-[#005bbf] transition-all animate-in zoom-in duration-500 whitespace-nowrap px-1"
                                      >
                                        {w}
                                      </span>
                                    );
                                  })
                                )}
                              </div>
                            </div>
                          );
                        }

                        if (q.type === 'ranking') {
                          const distribution = getDistribution(total, q.options?.length || 1);
                          const rankingData = (q.options || []).map((opt: string, i: number) => {
                            return { label: opt, value: distribution[i] };
                          }).sort((a: any, b: any) => b.value - a.value);

                          return (
                            <div className="space-y-6">
                               <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-bold tracking-widest text-[#727785]">Ranking: {q.text}</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-[#005bbf]">{total} total</span>
                                  <span className="material-symbols-outlined text-sm text-[#727785]">{getInteractionIcon(q.type)}</span>
                                </div>
                              </div>
                              <div className="space-y-3">
                                {rankingData.map((item: any, i: number) => (
                                  <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-[11px] font-bold text-[#414754]">
                                      <span className="truncate flex-1 pr-2">{item.label}</span>
                                      <span className="text-[#005bbf] mr-2">{item.value} rpta.</span>
                                      <span>{total > 0 && item.value > 0 ? (i + 1) : '-'}°</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/50 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-[#005bbf] transition-all duration-1000" 
                                        style={{ width: total > 0 ? `${(item.value / Math.max(...distribution, 1)) * 100}%` : '0%' }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }

                        if (q.type === 'texto_libre') {
                          const allResponses = [
                            "Excelente explicación de los temas complejos.",
                            "Me gustaría ver más ejemplos prácticos.",
                            "La interacción con la clase fue genial.",
                            "Todo muy claro, muchas gracias.",
                            "Interesantes las nuevas herramientas mostradas.",
                            "La sesión de hoy fue muy productiva.",
                            "¿Cómo podemos aplicar esto en otras áreas?",
                            "Gracias por resolver mis dudas.",
                            "El material de apoyo es excelente.",
                            "Muy buen ritmo en la sesión.",
                          ];
                          const visibleResponses = allResponses.slice(0, total);
                          return (
                            <div className="space-y-6">
                               <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-bold tracking-widest text-[#727785]">Respuestas: {q.text}</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-[#005bbf]">{total} respuestas</span>
                                  <span className="material-symbols-outlined text-sm text-[#727785]">{getInteractionIcon(q.type)}</span>
                                </div>
                              </div>
                              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar min-h-[160px]">
                                {visibleResponses.length === 0 ? (
                                   <div className="text-[11px] text-[#727785] font-medium italic text-center pt-12">No hay respuestas aún...</div>
                                ) : (
                                   visibleResponses.map((resp, i) => (
                                    <div key={i} className="bg-white p-3 rounded-lg border border-[#c1c6d6]/20 shadow-sm animate-in fade-in slide-in-from-right-4">
                                      <p className="text-[11px] text-[#414754] font-medium leading-relaxed">{resp}</p>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          );
                        }

                        return null;
                      })()}
                    </div>
                  </>
                ) : (
                  <SummaryContent questions={questions} responseCounts={responseCounts} handleExport={() => setShowToast(true)} />
                )}

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
                    onClick={() => setShowConfirmFinish(true)}
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

      {/* Confirmation Back Modal */}
      {showConfirmBack && (
        <>
          <div 
            className="absolute inset-0 bg-[#191c23]/40 backdrop-blur-[2px] z-[2000]"
            onClick={() => setShowConfirmBack(false)}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center z-[2001] px-6">
            <div className="bg-white rounded-2xl p-6 w-full max-w-[320px] shadow-2xl animate-in zoom-in duration-200">
              <h2 className="font-manrope font-bold text-xl text-[#191c23] mb-3 text-center">Confirmación</h2>
              <p className="text-[#414754] text-sm leading-relaxed mb-8 text-center px-2">
                Existen interacciones sin respuestas. ¿Desea continuar?
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setShowConfirmBack(false);
                    onNavigate('S20e');
                  }}
                  className="w-full py-3 rounded-xl font-bold text-white bg-[#005bbf] hover:opacity-90 transition-all"
                >
                  Sí, continuar
                </button>
                <button 
                  onClick={() => setShowConfirmBack(false)}
                  className="w-full py-3 rounded-xl font-bold text-[#727785] bg-[#f2f3fd] hover:bg-[#e6e8f2] transition-colors"
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#191c23] text-white px-6 py-3 rounded-full text-sm font-medium shadow-2xl z-[100] animate-in slide-in-from-bottom-4 duration-300 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">download</span>
          Exportando resultados...
        </div>
      )}


      {/* Activity Finish Confirmation Modal */}
      {showConfirmFinish && (
        <>
          <div 
            className="absolute inset-0 bg-[#191c23]/40 backdrop-blur-[2px] z-[2000]"
            onClick={() => setShowConfirmFinish(false)}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center z-[2001] px-6">
            <div className="bg-white rounded-2xl p-6 w-full max-w-[320px] shadow-2xl animate-in zoom-in duration-200">
              <h2 className="font-manrope font-bold text-xl text-[#191c23] mb-3 text-center">¿Finalizar actividad?</h2>
              <p className="text-[#414754] text-sm leading-relaxed mb-8 text-center">
                La actividad se cerrará y no se recibirán nuevas respuestas.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setShowConfirmFinish(false);
                    if (onActivityFinished) onActivityFinished();
                    onNavigate('S20e');
                  }}
                  className="w-full py-3 rounded-xl font-bold text-white bg-[#ba1a1a] hover:opacity-90 transition-all"
                >
                  Sí, finalizar
                </button>
                <button 
                  onClick={() => setShowConfirmFinish(false)}
                  className="w-full py-3 rounded-xl font-bold text-[#727785] bg-[#f2f3fd] hover:bg-[#e6e8f2] transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
