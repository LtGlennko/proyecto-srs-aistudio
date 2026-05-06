import React from 'react';
import { BarChart } from './BarChart';
import { DonutChart } from './DonutChart';

interface SummaryContentProps {
  questions: any[];
  responseCounts: any;
  handleExport?: () => void;
}

export const SummaryContent: React.FC<SummaryContentProps> = ({ questions, responseCounts, handleExport }) => {
  const totalResponses = Object.values(responseCounts as Record<string, number>).reduce((a, b) => a + b, 0);
  const connectedStudents = 25;
  const participatingStudents = questions.length > 0 ? Math.max(...Object.values(responseCounts as Record<string, number>).map(v => Number(v)), 0) : 0;
  const participationPercentage = Math.round((participatingStudents / connectedStudents) * 100);

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'opcion_multiple': return 'list_alt';
      case 'verdadero_falso': return 'check_circle';
      case 'ranking': return 'format_list_numbered';
      case 'nube_palabras': return 'cloud';
      default: return 'notes';
    }
  };

  const getDistribution = (totalCount: number, optionsCount: number, qId: number) => {
    const counts = new Array(optionsCount).fill(0);
    for (let i = 0; i < totalCount; i++) {
      const targetIdx = (Math.abs(Math.sin(qId + i) * 10000)) % optionsCount;
      counts[Math.floor(targetIdx)]++;
    }
    return counts;
  };

  return (
    <div className="w-full space-y-8 pb-12 animate-in fade-in duration-500">
      <section className="bg-white p-6 rounded-xl border border-[#c1c6d6]/20 shadow-sm">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="font-manrope font-bold text-[#191c23] text-lg mb-3 leading-tight">
              {participatingStudents} de {connectedStudents} estudiantes participaron
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-[#414754] text-sm">
                <span className="w-1.5 h-1.5 bg-[#c1c6d6] rounded-full mr-2"></span>
                Participantes en consultas: 13
              </li>
              <li className="flex items-center text-[#414754] text-sm">
                <span className="w-1.5 h-1.5 bg-[#c1c6d6] rounded-full mr-2"></span>
                Participantes en encuestas: {participatingStudents}
              </li>
            </ul>
          </div>
          <div className="text-4xl font-manrope font-extrabold text-[#2e7d32]">{participationPercentage}%</div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-8">
          <div className="bg-[#f2f3fd] p-3 rounded-lg text-center">
            <div className="text-xl font-manrope font-extrabold text-[#005bbf]">{connectedStudents}</div>
            <div className="text-[9px] text-[#727785] font-bold leading-tight mt-1">Estudiantes conectados</div>
          </div>
          <div className="bg-[#fff8f1] p-3 rounded-lg text-center">
            <div className="text-xl font-manrope font-extrabold text-[#9e4300]">{participationPercentage}%</div>
            <div className="text-[9px] text-[#727785] font-bold leading-tight mt-1">% de participación</div>
          </div>
          <div className="bg-[#fff8f1] p-3 rounded-lg text-center">
            <div className="text-xl font-manrope font-extrabold text-[#9e4300]">{totalResponses}</div>
            <div className="text-[9px] text-[#727785] font-bold leading-tight mt-1">Cantidad de respuestas</div>
          </div>
        </div>
      </section>

      {handleExport && (
        <div className="mt-6 mb-2">
          <button 
            onClick={handleExport}
            className="w-full bg-[#1A73E8] text-white py-3 px-6 rounded-lg font-semibold text-sm shadow-md active:scale-[0.98] transition-all"
          >
            Exportar resultados
          </button>
        </div>
      )}

      <div className="h-px bg-[#c1c6d6]/20 my-8"></div>

      <section className="space-y-12">
        {questions.map((q, qIdx) => {
          const total = responseCounts[q.id] || 0;
          
          return (
            <div key={q.id} className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-manrope font-bold text-[#191c23]">Interacción {qIdx + 1}: {q.text}</h3>
                <div className="flex items-center gap-2 bg-[#f2f3fd] px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px] text-[#727785]">{getInteractionIcon(q.type)}</span>
                  <span className="text-[10px] font-bold text-[#005bbf]">{total} rpta.</span>
                </div>
              </div>

              <div className="bg-[#f2f3fd] p-6 rounded-2xl">
                {q.type === 'opcion_multiple' && (
                  <div className="space-y-4">
                    {(() => {
                      const dist = getDistribution(total, q.options?.length || 1, q.id);
                      const data = (q.options || []).map((opt: string, i: number) => {
                        const colors = ['#E24B4A', '#1A73E8', '#34A853', '#F9AB00', '#9334E6', '#FF6D00'];
                        return {
                          label: opt,
                          value: dist[i],
                          color: colors[i % colors.length],
                          height: total > 0 ? `${(dist[i] / total) * 100}%` : '5%',
                          isCorrect: q.correctOptions?.includes(i)
                        };
                      });
                      return (
                        <>
                          <BarChart data={data} />
                          <div className="grid grid-cols-2 gap-2 mt-4">
                            {data.map((d: any, i: number) => (
                              <div key={i} className={`flex items-center gap-2 bg-white/50 p-2 rounded-lg relative overflow-hidden ${d.isCorrect ? 'border border-[#34A853]/50' : ''}`}>
                                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                                <span className="text-[10px] font-bold text-[#414754] truncate flex-1">{d.label}</span>
                                <div className="flex items-center gap-1 shrink-0">
                                  <span className="text-[10px] font-black text-[#005bbf]">{d.value}</span>
                                  {d.isCorrect && <span className="material-symbols-outlined text-[#34A853] text-[14px]">verified</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}

                {q.type === 'verdadero_falso' && (
                  <div className="space-y-6">
                    {(() => {
                      const dist = getDistribution(total, 2, q.id);
                      const correctIdx = q.correctOptions?.[0];
                      return (
                        <>
                          <DonutChart 
                            segments={total === 0 ? [
                              { label: 'Sin respuestas', value: 1, color: '#e0e0e0' }
                            ] : [
                              { label: 'Verdadero', value: dist[0], color: '#34A853' },
                              { label: 'Falso', value: dist[1], color: '#EA4335' }
                            ]}
                          />
                          <div className="flex justify-center gap-8 mt-4">
                            <div className={`text-center p-2 rounded-lg ${correctIdx === 0 ? 'bg-[#34A853]/10 border border-[#34A853]/20 shadow-sm' : ''}`}>
                              <div className="flex items-center justify-center gap-1">
                                <span className="text-xs font-bold text-[#34A853]">Verdadero</span>
                                {correctIdx === 0 && <span className="material-symbols-outlined text-[#34A853] text-[14px]">verified</span>}
                              </div>
                              <div className="text-lg font-black text-[#191c23]">{dist[0]}</div>
                            </div>
                            <div className={`text-center p-2 rounded-lg ${correctIdx === 1 ? 'bg-[#EA4335]/10 border border-[#EA4335]/20 shadow-sm' : ''}`}>
                              <div className="flex items-center justify-center gap-1">
                                <span className="text-xs font-bold text-[#EA4335]">Falso</span>
                                {correctIdx === 1 && <span className="material-symbols-outlined text-[#EA4335] text-[14px]">verified</span>}
                              </div>
                              <div className="text-lg font-black text-[#191c23]">{dist[1]}</div>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}

                {q.type === 'nube_palabras' && (
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 p-4 bg-white/50 rounded-xl min-h-[120px]">
                    {(() => {
                      const allWords = ['Interesante', 'Innovador', 'Dinámico', 'Útil', 'Genial', 'Importante', 'Clave', 'Creatividad', 'IA', 'Educación', 'Aprendizaje', 'Docencia', 'Interacción', 'Futuro', 'Moderno', 'Eficaz', 'Reto', 'Cambio', 'Solución', 'Mundo'];
                      const visibleWords = allWords.slice(0, total);
                      if (visibleWords.length === 0) return <div className="text-[11px] text-[#727785] font-medium italic">No hay respuestas aún...</div>;
                      return visibleWords.map((w, i) => (
                        <span 
                          key={i} 
                          style={{ fontSize: `${Math.max(9, 24 - (i * 1.5))}px`, opacity: 1 - (i * 0.05) }}
                          className="font-bold text-[#005bbf]"
                        >
                          {w}
                        </span>
                      ));
                    })()}
                  </div>
                )}

                {q.type === 'ranking' && (
                  <div className="space-y-3">
                    {(() => {
                      const dist = getDistribution(total, q.options?.length || 1, q.id);
                      const rankingData = (q.options || []).map((opt: string, i: number) => ({ label: opt, value: dist[i] }))
                        .sort((a, b) => b.value - a.value);
                      return rankingData.map((item: any, i: number) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-[11px] font-bold text-[#414754]">
                            <span className="truncate flex-1 pr-2">{item.label}</span>
                            <span className="text-[#005bbf] mr-2">{item.value} rpta.</span>
                            <span>{total > 0 && item.value > 0 ? (i + 1) : '-'}°</span>
                          </div>
                          <div className="h-2 w-full bg-white/50 rounded-full overflow-hidden">
                            <div className="h-full bg-[#005bbf]" style={{ width: total > 0 ? `${(item.value / Math.max(...dist, 1)) * 100}%` : '0%' }} />
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                )}

                {q.type === 'texto_libre' && (
                  <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                    {(() => {
                      const responses = ["Excelente sesión", "Muy interesante", "Me gustaría más ejemplos", "Gracias por la clase", "Todo claro"].slice(0, total);
                      if (responses.length === 0) return <div className="text-[11px] text-[#727785] font-medium italic">No hay respuestas aún...</div>;
                      return responses.map((r, i) => (
                        <div key={i} className="bg-white p-2 rounded-lg border border-[#c1c6d6]/20">
                          <p className="text-[10px] text-[#414754] leading-tight">{r}</p>
                        </div>
                      ));
                    })()}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
