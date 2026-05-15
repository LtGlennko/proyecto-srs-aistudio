import React, { useState, useMemo } from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';
import { CURRICULUM_COURSES } from '../../constants';

export const TeacherMenu: React.FC<ScreenProps> = ({ onNavigate, onCourseCreated, onCourseUpdated, selectedCourse, courses }) => {
  const isEdit = !!selectedCourse;
  const initialCourse = isEdit ? CURRICULUM_COURSES.find(c => c.code === selectedCourse.code) || null : null;

  const [searchTerm, setSearchTerm] = useState(selectedCourse ? `${selectedCourse.code} - ${selectedCourse.name}` : '');
  const [description, setDescription] = useState(selectedCourse?.description || '');
  const [selectedCourseData, setSelectedCourseData] = useState<typeof CURRICULUM_COURSES[0] | null>(initialCourse);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => {
    if (!searchTerm || (selectedCourseData && searchTerm === `${selectedCourseData.code} - ${selectedCourseData.name}`)) return [];
    const term = searchTerm.toLowerCase();
    
    // Filter out courses already created (except the one being edited)
    const existingCodes = new Set((courses || []).map(c => c.code));
    if (isEdit && selectedCourse) {
      existingCodes.delete(selectedCourse.code);
    }

    return CURRICULUM_COURSES.filter(
      course => 
        !existingCodes.has(course.code) &&
        (course.name.toLowerCase().includes(term) || 
        course.code.toLowerCase().includes(term))
    ).slice(0, 5); // Limit to 5 suggestions
  }, [searchTerm, selectedCourseData, courses, isEdit, selectedCourse]);

  const handleSelect = (course: typeof CURRICULUM_COURSES[0]) => {
    setSelectedCourseData(course);
    setSearchTerm(`${course.code} - ${course.name}`);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (selectedCourseData && value !== `${selectedCourseData.code} - ${selectedCourseData.name}`) {
      setSelectedCourseData(null);
    }
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    // Delay hiding to allow click on suggestion
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleSave = () => {
    if (selectedCourseData) {
      if (isEdit && onCourseUpdated && selectedCourse) {
        onCourseUpdated({
          ...selectedCourse,
          name: selectedCourseData.name,
          code: selectedCourseData.code,
          ciclo: selectedCourseData.ciclo,
          creditos: selectedCourseData.creditos,
          description
        });
      } else if (onCourseCreated) {
        onCourseCreated({
          id: Math.random().toString(36).substr(2, 9),
          name: selectedCourseData.name,
          code: selectedCourseData.code,
          ciclo: selectedCourseData.ciclo,
          creditos: selectedCourseData.creditos,
          description
        });
      }
      onNavigate(isEdit ? 'S20e' : 'S19c');
    }
  };

  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Mis Cursos" 
        onBack={() => onNavigate(isEdit ? 'S20e' : 'S19c')} 
      />
      <Breadcrumb 
        items={[
          { label: 'Mis Cursos', onClick: () => onNavigate('S19c') },
          isEdit ? 'Editar Curso' : 'Nuevo Curso'
        ]} 
      />

      <main className="pt-[92px] pb-[80px] px-6 w-full">

        <section className="space-y-4">
          <h2 className="font-manrope text-xl font-bold text-[#191c23]">{isEdit ? 'Editar curso' : 'Nuevo curso'}</h2>
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-semibold text-[#414754]">Buscar curso</label>
            <div className="relative">
              <input 
                className="w-full bg-[#f2f3fd] border-none rounded-lg p-4 pr-12 text-[#191c23] focus:ring-2 focus:ring-[#005bbf]/20 transition-all text-md" 
                type="text" 
                placeholder="Código o nombre del curso"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={handleBlur}
              />
              {searchTerm && (
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCourseData(null);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#727785] hover:text-[#191c23] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              )}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-[#c1c6d6]/30 rounded-lg shadow-lg overflow-hidden">
                  {suggestions.map((course) => (
                    <button
                      key={course.code}
                      className="w-full text-left p-4 hover:bg-[#f2f3fd] transition-colors border-b border-[#f2f3fd] last:border-none text-sm"
                      onClick={() => handleSelect(course)}
                    >
                      <span className="font-bold">{course.code}</span> - {course.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#414754]">Descripción (opcional)</label>
            <textarea 
              className="w-full bg-[#f2f3fd] border-none rounded-lg p-4 text-[#191c23] focus:ring-2 focus:ring-[#005bbf]/20 transition-all text-md resize-none" 
              placeholder="Ingresa una descripción..." 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="pt-8 flex justify-center">
            <button 
              onClick={handleSave}
              disabled={!selectedCourseData}
              className={`w-full max-w-xs font-manrope font-bold py-4 px-8 rounded-lg transition-all duration-200 ${
                selectedCourseData 
                  ? 'bg-gradient-to-r from-[#005bbf] to-[#1a73e8] text-white shadow-[0px_12px_32px_rgba(0,91,191,0.15)] active:scale-95' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isEdit ? 'Guardar cambios' : 'Guardar'}
            </button>
          </div>
        </section>
      </main>

      <BottomNav activeTab="Cursos" onNavigate={onNavigate} />
    </div>
  );
};
