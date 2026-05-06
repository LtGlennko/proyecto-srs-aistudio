import React, { useState } from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';

export const S21b: React.FC<ScreenProps> = ({ onNavigate, onActivityCreated, onActivityUpdated, selectedCourse, selectedActivity }) => {
  const isEdit = !!selectedActivity;
  const today = new Date().toISOString().split('T')[0];
  
  const [name, setName] = useState(selectedActivity?.name || '');
  const [description, setDescription] = useState(selectedActivity?.description || '');
  const [startDate, setStartDate] = useState(selectedActivity?.startDate || today);
  const [endDate, setEndDate] = useState(selectedActivity?.endDate || today);

  const handleSave = () => {
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
      onNavigate('S20e');
    }
  };

  return (
    <div className="bg-[#f9f9ff] text-[#191c23] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel="Volver" 
        onBack={() => onNavigate('S20e')} 
      />
      <Breadcrumb items={['Mis Cursos', selectedCourse?.name || 'Curso', isEdit ? 'Editar actividad' : 'Nueva actividad']} />

      <main className="flex-grow pt-[92px] pb-[80px] px-6 w-full">

        <section className="bg-transparent mt-6">
          <h2 className="font-manrope text-xl font-bold mb-8 text-[#191c23]">{isEdit ? 'Editar actividad' : 'Nueva actividad'}</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#414754] ml-1">Nombre de actividad</label>
              <div className="relative">
                <input 
                  className="w-full bg-[#f2f3fd] border-none rounded-lg px-4 pr-12 py-3 text-[#191c23] focus:ring-2 focus:ring-[#005bbf]/20 focus:bg-white transition-all outline-none font-medium" 
                  type="text" 
                  placeholder="Ej: Introducción a la Programación"
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
              <label className="block text-sm font-semibold text-[#414754] ml-1">Descripción</label>
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
                    onChange={(e) => setStartDate(e.target.value)}
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
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button 
                onClick={() => onNavigate('S20e')}
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
