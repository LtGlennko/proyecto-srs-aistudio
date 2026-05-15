import React, { useState } from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';

export const TeacherInteractionStart: React.FC<ScreenProps> = ({ onNavigate, onActivityCreated, onActivityUpdated, selectedCourse, selectedActivity }) => {
  const isEdit = !!selectedActivity;
  const today = new Date().toISOString().split('T')[0];
  
  const [name, setName] = useState(selectedActivity?.name || '');
  const [description, setDescription] = useState(selectedActivity?.description || '');
  const [startDate, setStartDate] = useState(selectedActivity?.startDate || today);
  const [endDate, setEndDate] = useState(selectedActivity?.endDate || today);
  const [showInfo, setShowInfo] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);

  const handleSave = () => {
    const newErrors: string[] = [];
    if (!name.trim()) newErrors.push('Escribir el nombre de la actividad');

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Parse dates from YYYY-MM-DD format to local midnight Date objects
    const [yS, mS, dS] = startDate.split('-').map(Number);
    const start = new Date(yS, mS - 1, dS);
    
    const [yE, mE, dE] = endDate.split('-').map(Number);
    const end = new Date(yE, mE - 1, dE);

    if (start < today) {
      newErrors.push('La actividad no puede iniciar en el pasado (máximo ayer para atrás)');
    }
    if (end < start) {
      newErrors.push('La fecha de fin no puede ser menor que la de inicio');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    if (name) {
      if (isEdit && onActivityUpdated && selectedActivity) {
        onActivityUpdated({
          ...selectedActivity,
          name,
          description,
          startDate,
          endDate
        });
      } else if (onActivityCreated) {
        onActivityCreated({
          id: Math.random().toString(36).substr(2, 9),
          name,
          description,
          startDate,
          endDate
        });
      }
      onNavigate(isEdit ? 'S21c' : 'S20e');
    }
  };

  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Volver" 
        onBack={() => onNavigate(isEdit ? 'S21c' : 'S20e')} 
      />
      <Breadcrumb 
        items={[
          { label: 'Mis Cursos', onClick: () => onNavigate('S19c') },
          { label: selectedCourse?.name || 'Curso', onClick: () => onNavigate('S20e') },
          isEdit ? 'Editar actividad' : 'Nueva actividad'
        ]} 
      />

      <main className="flex-grow pt-[92px] pb-[80px] px-6 w-full">
        {errors.length > 0 && (
          <div className="bg-[#ba1a1a]/5 p-4 rounded-xl border border-[#ba1a1a]/10 animate-in fade-in slide-in-from-top-1 duration-300 mb-6">
             <div className="flex items-center gap-2 text-[#ba1a1a] mb-2">
               <span className="material-symbols-outlined text-[18px]">error_outline</span>
               <span className="text-[11px] font-bold uppercase tracking-wider">Errores de validación:</span>
             </div>
             <ul className="space-y-1.5 pl-1.5">
               {errors.map((err, i) => (
                 <li key={i} className="text-[#ba1a1a] text-xs flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-[#ba1a1a] rounded-full shrink-0 opacity-40"></div>
                   <span>{err}</span>
                 </li>
               ))}
             </ul>
          </div>
        )}

        <section className="bg-transparent mt-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-manrope text-xl font-bold text-[#191c23]">{isEdit ? 'Editar actividad' : 'Nueva actividad'}</h2>
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className={`flex items-center justify-center w-6 h-6 rounded-full transition-all ${showInfo ? 'bg-[#005bbf] text-white' : 'bg-[#f2f3fd] text-[#005bbf] hover:bg-[#e0e4ff]'}`}
              title="¿Qué es una actividad?"
            >
              <span className="material-symbols-outlined text-[18px]">info</span>
            </button>
          </div>
          
          {showInfo && (
            <div className="bg-[#f2f3fd] border-l-4 border-[#005bbf] p-4 rounded-r-lg mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-[#005bbf] flex-shrink-0">help_outline</span>
                <p className="text-[#414754] text-[13px] leading-relaxed">
                  <span className="font-bold text-[#191c23]">¿Qué es una actividad?</span><br />
                  Es un contenedor que agrupa un conjunto de interacciones (preguntas, evaluaciones, nubes de palabras, etc.) para una clase o tema determinado.
                </p>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#414754] ml-1">Nombre de actividad</label>
              <div className="relative">
                <input 
                  className="w-full bg-[#f2f3fd] border-none rounded-lg px-4 pr-12 py-3 text-[#191c23] focus:ring-2 focus:ring-[#005bbf]/20 focus:bg-white transition-all outline-none font-medium" 
                  type="text" 
                  placeholder="Ej: Tema 1: Interacción con el IDE"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {name && (
                  <button 
                    onClick={() => setName('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#727785] hover:text-[#191c23] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#414754] ml-1">Descripción (opcional)</label>
              <textarea 
                className="w-full bg-[#f2f3fd] border-none rounded-lg px-4 py-3 text-[#191c23] focus:ring-2 focus:ring-[#005bbf]/20 focus:bg-white transition-all outline-none font-medium min-h-[120px] resize-none" 
                placeholder="Escribe los detalles de la actividad..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#414754] ml-1">Día inicio</label>
                <div className="relative">
                  <input 
                    className="w-full bg-[#f2f3fd] border-none rounded-lg px-4 py-3 text-[#191c23] focus:ring-2 focus:ring-[#005bbf]/20 focus:bg-white transition-all outline-none font-medium appearance-none" 
                    type="date" 
                    value={startDate}
                    min={today}
                    onChange={(e) => {
                      const newStart = e.target.value;
                      setStartDate(newStart);
                      if (endDate < newStart) {
                        setEndDate(newStart);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#414754] ml-1">Día fin</label>
                <div className="relative">
                  <input 
                    className="w-full bg-[#f2f3fd] border-none rounded-lg px-4 py-3 text-[#191c23] focus:ring-2 focus:ring-[#005bbf]/20 focus:bg-white transition-all outline-none font-medium appearance-none" 
                    type="date" 
                    value={endDate}
                    min={startDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button 
                onClick={() => onNavigate(isEdit ? 'S21c' : 'S20e')}
                className="flex-1 py-3 px-6 rounded-lg bg-[#414754] text-white font-bold text-sm active:scale-95 duration-150 transition-all hover:opacity-90" 
                type="button"
              >
                Volver
              </button>
              <button 
                onClick={handleSave}
                disabled={!name}
                className={`flex-[2] py-3 px-6 rounded-lg font-manrope font-bold text-sm active:scale-95 duration-150 transition-all hover:opacity-90 shadow-[0px_12px_32px_rgba(25,28,35,0.06)] ${
                  name 
                    ? 'bg-gradient-to-br from-[#005bbf] to-[#1a73e8] text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`} 
                type="button"
              >
                {isEdit ? 'Guardar cambios' : 'Crear actividad'}
              </button>
            </div>
          </form>
        </section>
      </main>

      <BottomNav activeTab="Cursos" onNavigate={onNavigate} />
    </div>
  );
};
