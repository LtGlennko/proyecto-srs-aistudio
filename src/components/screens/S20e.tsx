import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';
import { Tabs } from '../common/Tabs';
import { FABButton } from '../common/FABButton';

export const S20e: React.FC<ScreenProps> = ({ 
  onNavigate, 
  interactionCount, 
  isActivityFinished, 
  isActivityFinishedMap = {},
  selectedCourse,
  activities = [],
  onSelectActivity,
  questionsByActivity = {},
  responseCounts = {}
}) => {
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
      <Breadcrumb items={['Mis Cursos', selectedCourse?.name || 'Curso']} />
      <Tabs activeTab="Actividades" onNavigate={onNavigate} />
 
      <main className="flex-grow pt-[140px] pb-[80px] px-6">
        <div className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity, index) => {
              const qList = questionsByActivity[activity.id] || [];
              const totalQ = qList.length;
              const completedQ = qList.filter(q => (responseCounts[q.id] || 0) > 0).length;
              const percentage = totalQ > 0 ? Math.round((completedQ / totalQ) * 100) : 0;
              const activityFinished = !!isActivityFinishedMap[activity.id];
              const dashoffset = 175.9 - (175.9 * (activityFinished ? 100 : percentage)) / 100;

              return (
                <div 
                  key={index}
                  onClick={() => {
                    if (onSelectActivity) onSelectActivity(activity);
                  }}
                  className="bg-white p-5 rounded-lg border border-[#c1c6d6]/20 shadow-sm flex items-start gap-5 transition-transform active:scale-[0.98] cursor-pointer"
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
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${activityFinished ? 'bg-[#ecedf7] text-[#414754]' : 'bg-[#e0e2ec] text-[#414754]'}`}>
                        {activityFinished ? 'Finalizada' : 'Activa'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <section className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative mb-8">
                <div className="w-48 h-48 bg-[#f2f3fd] rounded-full flex items-center justify-center relative overflow-hidden">
                  <span className="material-symbols-outlined text-[#727785] text-7xl opacity-40">assignment</span>
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#d8e2ff] rounded-full opacity-30 blur-xl"></div>
                <div className="absolute -bottom-6 -left-4 w-16 h-16 bg-[#b2c9fe] rounded-full opacity-20 blur-xl"></div>
              </div>
              <h2 className="font-manrope text-2xl font-bold text-[#191c23] mb-3">No hay actividades</h2>
              <p className="text-[#727785] max-w-[280px] leading-relaxed">
                Añade actividades para verlas aquí
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
