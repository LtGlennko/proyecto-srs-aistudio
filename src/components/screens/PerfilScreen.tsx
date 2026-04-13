import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { MobileContainer } from '../common/MobileContainer';
import { BottomNav } from '../common/BottomNav';
import { BottomNavAlumno } from '../common/BottomNavAlumno';

interface PerfilScreenProps extends ScreenProps {
  userRole: 'docente' | 'alumno' | null;
}

export const PerfilScreen: React.FC<PerfilScreenProps> = ({ onNavigate, userRole }) => {
  const isDocente = userRole === 'docente';
  
  const data = isDocente ? {
    nombre: "María González",
    codigo: "DOC2024",
    perfil: "Docente",
    perfilColor: "#34A853",
    carrera: "Departamento de Informática",
    semestre: "2026 I",
    email: "m.gonzalez@uni.edu"
  } : {
    nombre: "Juan Pérez",
    codigo: "2019000",
    perfil: "Alumno",
    perfilColor: "#005bbf",
    carrera: "Ingeniería Informática",
    semestre: "2026 I",
    email: "j.perez@uni.edu"
  };

  return (
    <div className="bg-white min-h-screen flex flex-col font-inter">
      <Header sinBack={true} sinRight={true} />
      
      <main className="flex-grow pt-[64px] pb-[80px] px-6 flex flex-col items-center gap-4">
        <div className="mt-8 w-24 h-24 rounded-full bg-[#E8F0FE] flex items-center justify-center">
          <span className="material-symbols-outlined text-[48px] text-[#1A73E8]">
            account_circle
          </span>
        </div>

        <div className="text-center">
          <p className="text-xl font-bold text-[#191c23] m-0">
            {data.nombre}
          </p>
          <p className="text-sm text-[#727785] mt-1">
            Código: {data.codigo}
          </p>
          <p className="text-[13px] mt-1 font-medium" style={{ color: data.perfilColor }}>
            {data.perfil}
          </p>
        </div>

        <div className="w-full h-[1px] bg-[#e0e0e0] my-2" />

        <div className="w-full">
          <div className="flex justify-between py-3 border-b border-[#f0f0f0]">
            <span className="text-[#727785] text-sm">Carrera</span>
            <span className="text-[#191c23] text-sm font-medium">
              {data.carrera}
            </span>
          </div>
          <div className="flex justify-between py-3 border-b border-[#f0f0f0]">
            <span className="text-[#727785] text-sm">Semestre</span>
            <span className="text-[#191c23] text-sm font-medium">
              {data.semestre}
            </span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-[#727785] text-sm">Email</span>
            <span className="text-[#191c23] text-sm font-medium">
              {data.email}
            </span>
          </div>
        </div>

        <button 
          className="w-full py-3 border border-[#D93025] rounded-lg bg-transparent text-[#D93025] text-sm font-medium cursor-pointer mt-2 active:bg-red-50 transition-colors"
          onClick={() => onNavigate('Login')}
        >
          Cerrar sesión
        </button>
      </main>

      {isDocente ? (
        <BottomNav activeTab="Perfil" onNavigate={onNavigate} />
      ) : (
        <BottomNavAlumno activeTab="Perfil" onNavigate={onNavigate} />
      )}
    </div>
  );
};
