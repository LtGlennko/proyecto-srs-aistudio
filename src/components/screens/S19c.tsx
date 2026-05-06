import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';
import { FABButton } from '../common/FABButton';

export const S19c: React.FC<ScreenProps> = ({ onNavigate, courses, onSelectCourse }) => {
  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-manrope">
      <Header />
      <Breadcrumb items={['Mis Cursos']} />

      <main className="flex-1 px-4 pt-[92px] pb-[80px] w-full">
        <div className="space-y-4">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <div 
                key={course.id}
                onClick={() => onSelectCourse && onSelectCourse(course)}
                className="group relative bg-white rounded-lg border border-[#c1c6d6]/30 shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.99] cursor-pointer overflow-hidden"
              >
                <div className="p-5 flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold leading-tight">{course.name}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <p className="text-sm font-medium text-[#727785]">Código: {course.code}</p>
                      <p className="text-sm font-medium text-[#727785]">Ciclo: {course.ciclo}</p>
                      <p className="text-sm font-medium text-[#727785]">Créditos: {course.creditos}</p>
                    </div>
                    <div className="flex items-center gap-1.5 mt-3">
                      <span className="material-symbols-outlined text-[16px] text-[#727785]">schedule</span>
                      <p className="text-xs text-[#727785] italic">Modificado hace un momento</p>
                    </div>
                  </div>
                  <div className="flex items-center text-[#727785] group-hover:text-[#1A73E8] transition-colors">
                    <span className="material-symbols-outlined text-2xl">chevron_right</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-[#727785]">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-20">library_books</span>
              <p className="text-sm font-medium">Aún no has creado ningún curso</p>
            </div>
          )}
        </div>
      </main>

      <FABButton onClick={() => {
        if (onSelectCourse) onSelectCourse(null as any);
        onNavigate('S19b');
      }} />

      <BottomNav activeTab="Cursos" onNavigate={onNavigate} />
    </div>
  );
};
