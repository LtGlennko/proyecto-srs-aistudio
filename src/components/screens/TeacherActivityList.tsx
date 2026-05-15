import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';
import { Tabs } from '../common/Tabs';
import { FABButton } from '../common/FABButton';

export const TeacherActivityList: React.FC<ScreenProps> = ({ 
  onNavigate, 
  interactionCount, 
  isActivityFinished, 
  isActivityFinishedMap = {},
  selectedCourse,
  activities = [],
  onSelectActivity,
  questionsByActivity = {},
  responseCounts = {},
  consultas = []
}) => {
  const [activeFilters, setActiveFilters] = React.useState<string[]>(['EN_CURSO']);
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

  const getStatus = (activity: any) => {
    const today = new Date().toISOString().split('T')[0];
    const isFinished = !!isActivityFinishedMap[activity.id];
    
    if (isFinished || activity.endDate < today) return 'FINALIZADA';
    if (activity.startDate <= today && activity.endDate >= today) return 'EN_CURSO';
    if (activity.startDate > today) return 'PROXIMA';
    return 'FINALIZADA';
  };

  const filteredAndSortedActivities = React.useMemo(() => {
    return activities
      .filter(activity => activeFilters.includes(getStatus(activity)))
      .sort((a, b) => {
        const valA = a.startDate;
        const valB = b.startDate;
        return sortOrder === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      });
  }, [activities, isActivityFinishedMap, activeFilters, sortOrder]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const currentConsultas = consultas.filter(c => !c.activityId); // Global queries or non-activity specific
  const unreadCount = currentConsultas.filter(c => !c.respondida).length;

  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
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
      <Tabs activeTab="Actividades" onNavigate={onNavigate} consultas={consultas} />
 
      <main className="flex-grow pt-[140px] pb-[80px] px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'EN_CURSO', label: 'En curso', color: 'bg-[#e6f4ea] text-[#1e8e3e] border-[#1e8e3e]' },
              { id: 'PROXIMA', label: 'Próximas', color: 'bg-[#e8f0fe] text-[#1a73e8] border-[#1a73e8]' },
              { id: 'FINALIZADA', label: 'Finalizadas', color: 'bg-[#f1f3f4] text-[#5f6368] border-[#5f6368]' }
            ].map(filter => {
              const isActive = activeFilters.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isActive ? filter.color : 'bg-white text-[#727785] border-[#c1c6d6]/30 opacity-60'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
          <button 
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-1.5 text-[#727785] hover:text-[#005bbf] transition-colors bg-[#ecedf7]/50 px-2 rounded-lg py-1"
            title="Ordenar por fecha"
          >
            <span className="material-symbols-outlined text-[16px]">
              calendar_today
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Fecha</span>
            <span className="material-symbols-outlined text-[14px]">
              {sortOrder === 'asc' ? 'expand_more' : 'expand_less'}
            </span>
          </button>
        </div>

        <div className="space-y-4">
          {filteredAndSortedActivities.length > 0 ? (
            filteredAndSortedActivities.map((activity, index) => {
              const qList = questionsByActivity[activity.id] || [];
              const totalQ = qList.length;
              const completedQ = qList.filter(q => (responseCounts[q.id] || 0) > 0).length;
              const percentage = totalQ > 0 ? Math.round((completedQ / totalQ) * 100) : 0;
              const activityFinished = !!isActivityFinishedMap[activity.id];
              const dashoffset = 175.9 - (175.9 * (activityFinished ? 100 : percentage)) / 100;
              const status = getStatus(activity);
              const statusLabel = status === 'EN_CURSO' ? 'En curso' : status === 'PROXIMA' ? 'Próxima' : 'Finalizada';
              const statusColor = status === 'EN_CURSO' ? 'bg-[#e6f4ea] text-[#1e8e3e]' : status === 'PROXIMA' ? 'bg-[#e8f0fe] text-[#1a73e8]' : 'bg-[#f1f3f4] text-[#5f6368]';

              return (
                <div 
                  key={activity.id}
                  onClick={() => {
                    if (onSelectActivity) onSelectActivity(activity);
                  }}
                  className="group bg-white p-5 rounded-lg border border-[#c1c6d6]/20 shadow-sm flex items-start gap-5 transition-all hover:shadow-md active:scale-[0.98] cursor-pointer"
                >
                  <div className="relative flex-shrink-0">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle className="text-[#ecedf7]" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="6"></circle>
                      <circle className="text-[#005bbf]" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="175.9" strokeDashoffset={dashoffset} strokeLinecap="round" strokeWidth="6"></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold font-manrope">{activityFinished ? '100%' : `${percentage}%`}</span>
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col gap-1 text-left">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold font-manrope leading-tight pr-4">{activity.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-[#414754] text-xs font-medium">
                      <span className="bg-[#ecedf7] px-2 py-0.5 rounded-full">#SA12D</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">group</span>
                        {totalQ} Interacc
                      </span>
                    </div>
                    <div className="mt-2 text-[#414754] text-xs flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      Fecha: {activity.startDate} - {activity.endDate}
                    </div>
                    <div className="mt-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${statusColor}`}>
                        {statusLabel}
                      </span>
                    </div>
                  </div>
                  <div className="self-center flex items-center justify-center w-10 h-10 rounded-full bg-[#f2f3fd] text-[#005bbf] group-hover:bg-[#005bbf] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm border border-[#005bbf]/10">
                    <span className="material-symbols-outlined text-[28px] group-hover:translate-x-0.5 transition-transform">chevron_right</span>
                  </div>
                </div>
              );
            })
          ) : (
            <section className="flex flex-col items-center justify-center py-12 text-center px-4">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-[#f2f3fd] rounded-full flex items-center justify-center relative overflow-hidden">
                  <span className="material-symbols-outlined text-[#727785] text-5xl opacity-40">assignment</span>
                </div>
              </div>
              <h2 className="font-manrope text-xl font-bold text-[#191c23] mb-4">Aún no tienes actividades</h2>
              
              <div className="bg-[#f2f3fd] p-6 rounded-2xl border border-dashed border-[#005bbf]/20 max-w-[320px] mx-auto animate-in zoom-in duration-500">
                <p className="text-[#414754] text-xs leading-relaxed">
                  <span className="font-bold text-[#005bbf]">¡Empieza ahora!</span><br /><br />
                  Recuerda que una <span className="font-bold">actividad</span> es el espacio donde agruparás las interacciones (preguntas, evaluaciones, etc.) que usarás en tu clase o tema.
                </p>
              </div>

              <p className="text-[#727785] text-[11px] mt-6 leading-relaxed italic">
                Presiona el botón "+" para crear tu primera actividad
              </p>
            </section>
          )}
        </div>
      </main>

      <FABButton onClick={() => {
        if (onSelectActivity) onSelectActivity(null as any);
        onNavigate('S21b');
      }} />
      <BottomNav activeTab="Cursos" onNavigate={onNavigate} />
    </div>
  );
};
