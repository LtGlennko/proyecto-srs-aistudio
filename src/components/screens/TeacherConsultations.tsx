import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';
import { BarChart } from '../common/BarChart';
import { DonutChart } from '../common/DonutChart';

import { SummaryContent } from '../common/SummaryContent';

export const TeacherConsultations: React.FC<ScreenProps> = ({ onNavigate, selectedCourse, selectedActivity, questions = [], responseCounts = {} }) => {
  const [showToast, setShowToast] = React.useState(false);

  const handleExport = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter relative overflow-hidden">
      <Header 
        backLabel={selectedCourse?.code || 'Actividad'} 
        onBack={() => onNavigate('S20e')} 
      />

      <main className="pt-20 px-6 pb-32 w-full">
        <Breadcrumb 
          items={[
            { label: 'Mis Cursos', onClick: () => onNavigate('S19c') },
            { label: selectedCourse?.name || 'Curso', onClick: () => onNavigate('S20e') },
            selectedActivity?.name || 'Actividad'
          ]} 
        />

        <div className="mt-8">
          <SummaryContent 
            questions={questions} 
            responseCounts={responseCounts} 
            handleExport={handleExport} 
          />
        </div>
      </main>

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
