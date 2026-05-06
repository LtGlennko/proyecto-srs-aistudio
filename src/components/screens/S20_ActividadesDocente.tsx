import React, { useState } from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';

export const S20_ActividadesDocente: React.FC<ScreenProps> = ({ 
  onNavigate, 
  courses, 
  activitiesByCourse, 
  onSelectActivity,
  isActivityFinishedMap = {},
  questionsByActivity = {},
  responseCounts = {}
}) => {
  const [expandidos, setExpandidos] = useState<{ [key: string]: boolean }>({});

  const toggleAcordeon = (code: string) => {
    setExpandidos(prev => ({
      ...prev,
      [code]: !prev[code]
    }));
  };

  const renderActivityCard = (activity: any) => {
    if (!activity) return null;
    const isFinished = !!isActivityFinishedMap[activity.id];
    const qList = questionsByActivity[activity.id] || [];
    const interactionCount = qList.length;

    return (
      <div 
        key={activity.id}
        onClick={() => {
          if (onSelectActivity) onSelectActivity(activity);
        }}
        className="bg-white p-4 rounded-xl border border-[#c1c6d6]/20 shadow-sm flex items-start gap-4 transition-transform active:scale-[0.98] cursor-pointer mb-3"
      >
        <div className="flex-grow flex flex-col gap-1">
          <h3 className="text-sm font-bold font-manrope leading-tight">{activity.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isFinished ? 'bg-[#ecedf7] text-[#414754]' : 'bg-[#e6f4ea] text-[#1e8e3e]'}`}>
              {isFinished ? 'Finalizada' : 'Activa'}
            </span>
            <span className="text-[10px] text-[#727785]">{interactionCount} interacciones</span>
          </div>
          <div className="text-[10px] text-[#727785] mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">calendar_today</span>
            Fecha: {activity.startDate} - {activity.endDate}
          </div>
        </div>
        <span className="material-symbols-outlined text-[#005bbf] self-center">chevron_right</span>
      </div>
    );
  };

  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header sinBack={true} sinRight={true} />
      
      <main className="flex-grow pt-[72px] pb-[80px] px-6">
        <div className="space-y-4">
          {courses && courses.length > 0 ? (
            courses.map((course) => {
              const courseActivities = activitiesByCourse ? (activitiesByCourse[course.code] || []) : [];
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
                        {courseActivities.length}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-[#727785]">
                      {expandidos[course.code] ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {expandidos[course.code] && (
                    <div className="bg-white py-2 animate-in fade-in slide-in-from-top-1 duration-200">
                      {courseActivities.length > 0 ? (
                        courseActivities.map(activity => renderActivityCard(activity))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-6 text-[#727785] border border-dashed border-[#c1c6d6]/20 rounded-lg mt-2">
                          <span className="material-symbols-outlined text-3xl mb-2 opacity-20">assignment</span>
                          <p className="text-[10px]">No hay actividades registradas</p>
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
