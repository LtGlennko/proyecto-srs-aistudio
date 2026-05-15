import React, { useState } from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';

export const TeacherActivityDashboard: React.FC<ScreenProps> = ({ 
  onNavigate, 
  courses, 
  activitiesByCourse, 
  onSelectActivity,
  onSelectCourse,
  isActivityFinishedMap = {},
  questionsByActivity = {},
  responseCounts = {}
}) => {
  const [expandidos, setExpandidos] = useState<{ [key: string]: boolean }>({});
  const [activeFilters, setActiveFilters] = useState<string[]>(['EN_CURSO']);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const getStatus = (activity: any) => {
    const today = new Date().toISOString().split('T')[0];
    const isFinished = !!isActivityFinishedMap[activity.id];
    
    if (isFinished || activity.endDate < today) return 'FINALIZADA';
    if (activity.startDate <= today && activity.endDate >= today) return 'EN_CURSO';
    if (activity.startDate > today) return 'PROXIMA';
    return 'FINALIZADA';
  };

  const toggleAcordeon = (code: string) => {
    setExpandidos(prev => ({
      ...prev,
      [code]: !prev[code]
    }));
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const sortActivities = (acts: any[]) => {
    return [...acts].sort((a, b) => {
      const valA = a.startDate;
      const valB = b.startDate;
      return sortOrder === 'asc' 
        ? valA.localeCompare(valB) 
        : valB.localeCompare(valA);
    });
  };

  const renderActivityCard = (activity: any) => {
    if (!activity) return null;
    const status = getStatus(activity);
    const statusLabel = status === 'EN_CURSO' ? 'En curso' : status === 'PROXIMA' ? 'Próxima' : 'Finalizada';
    const statusColor = status === 'EN_CURSO' ? 'bg-[#e6f4ea] text-[#1e8e3e]' : status === 'PROXIMA' ? 'bg-[#e8f0fe] text-[#1a73e8]' : 'bg-[#f1f3f4] text-[#5f6368]';
    
    const qList = questionsByActivity[activity.id] || [];
    const interactionCount = qList.length;

    return (
      <div 
        key={activity.id}
        onClick={() => {
          if (onSelectActivity) onSelectActivity(activity);
        }}
        className="group bg-white p-4 rounded-xl border border-[#c1c6d6]/20 shadow-sm flex items-start gap-4 transition-all hover:shadow-md active:scale-[0.98] cursor-pointer mb-3"
      >
        <div className="flex-grow flex flex-col gap-1">
          <h3 className="text-sm font-bold font-manrope leading-tight">{activity.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusColor}`}>
              {statusLabel}
            </span>
            <span className="text-[10px] text-[#727785]">{interactionCount} interacciones</span>
          </div>
          <div className="text-[10px] text-[#727785] mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">calendar_today</span>
            Fecha: {activity.startDate} - {activity.endDate}
          </div>
        </div>
        <div className="self-center flex items-center justify-center w-8 h-8 rounded-full bg-[#f2f3fd] text-[#005bbf] group-hover:bg-[#005bbf] group-hover:text-white group-hover:scale-110 transition-all duration-300">
          <span className="material-symbols-outlined text-[20px] group-hover:translate-x-0.5 transition-transform">chevron_right</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header sinBack={true} sinRight={true} />
      
      <main className="flex-grow pt-[72px] pb-[80px] px-6">
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
          {courses && courses.length > 0 ? (
            courses.map((course) => {
              const allCourseActivities = activitiesByCourse ? (activitiesByCourse[course.code] || []) : [];
              const courseActivities = sortActivities(
                allCourseActivities.filter(a => activeFilters.includes(getStatus(a)))
              );
              
              return (
                <div key={course.id} className="flex flex-col">
                  <button 
                    onClick={() => toggleAcordeon(course.code)}
                    className="w-full flex items-center justify-between bg-[#F8F9FA] p-[14px] px-[16px] rounded-lg border border-[#e0e0e0] transition-colors active:bg-slate-100"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-[14px] text-[#191c23]">{course.name}</span>
                        <span className="text-[10px] text-[#727785]">{course.code}</span>
                      </div>
                      <span className="bg-[#ecedf7] text-[#414754] text-[10px] font-bold px-2 py-0.5 rounded-md min-w-[20px] text-center">
                        {allCourseActivities.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#727785]">
                        {expandidos[course.code] ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>
                  </button>
                  {expandidos[course.code] && (
                    <div className="bg-transparent pt-1 pb-4 animate-in fade-in slide-in-from-top-1 duration-200">
                      {courseActivities.length > 0 ? (
                        <>
                          {courseActivities.map(activity => renderActivityCard(activity))}
                          <button 
                            onClick={() => {
                              if (onSelectCourse) onSelectCourse(course);
                              if (onSelectActivity) onSelectActivity(null as any);
                              onNavigate('S21b');
                            }}
                            className="w-full py-3 border-2 border-dashed border-[#005bbf]/20 rounded-xl flex items-center justify-center gap-2 text-[#005bbf] font-bold text-xs hover:bg-[#f2f3fd] transition-colors mt-1"
                          >
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            Añadir nueva actividad
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-[#727785] border border-dashed border-[#c1c6d6]/20 rounded-lg mt-2 bg-slate-50/30">
                          <span className="material-symbols-outlined text-4xl mb-2 opacity-20">assignment</span>
                          <p className="text-[11px] font-medium mb-3">
                            {allCourseActivities.length > 0 ? 'No hay actividades con los filtros seleccionados' : 'No hay actividades registradas'}
                          </p>
                          <button 
                            onClick={() => {
                              if (onSelectCourse) onSelectCourse(course);
                              if (onSelectActivity) onSelectActivity(null as any);
                              onNavigate('S21b');
                            }}
                            className="text-[#005bbf] text-[11px] font-bold flex items-center gap-1 hover:underline"
                          >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                            Crear primera actividad
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-[#727785]">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-20">assignment_late</span>
              <p className="text-sm font-medium">Crea un curso para gestionar sus actividades</p>
            </div>
          )}
        </div>
      </main>

      <BottomNav activeTab="Actividades" onNavigate={onNavigate} />
    </div>
  );
};
