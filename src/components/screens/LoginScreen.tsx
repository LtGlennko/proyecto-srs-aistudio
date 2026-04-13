import React from 'react';
import { ScreenId } from '../../types';

interface LoginScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectRole: (role: 'docente' | 'alumno') => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate, onSelectRole }) => {
  const [step, setStep] = React.useState<'login' | 'role'>('login');

  const handleGoogleLogin = () => {
    setStep('role');
  };

  if (step === 'login') {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center px-8 font-inter">
        <div className="w-20 h-20 bg-[#f2f3fd] rounded-2xl flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-[#005bbf] text-[48px]">school</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#005bbf] font-manrope mb-2">Proyecto SRS</h1>
        <p className="text-[#727785] text-center mb-12">Sistema de Respuesta en Clase</p>
        
        <button 
          onClick={handleGoogleLogin}
          className="w-full py-4 px-6 border border-[#c1c6d6] rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors active:scale-95"
        >
          <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-6 h-6" />
          <span className="font-bold text-[#191c23]">Continuar con Google</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center px-8 font-inter">
      <h2 className="text-2xl font-bold font-manrope text-[#191c23] mb-8 text-center">Selecciona tu rol</h2>
      
      <div className="w-full space-y-4">
        <button 
          onClick={() => {
            onSelectRole('docente');
            onNavigate('S19a');
          }}
          className="w-full p-6 bg-[#f2f3fd] rounded-2xl flex items-center gap-4 hover:bg-[#e6e8f2] transition-all active:scale-95 text-left"
        >
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#005bbf] shadow-sm">
            <span className="material-symbols-outlined text-[28px]">school</span>
          </div>
          <div>
            <p className="font-bold text-[#191c23] text-lg">Docente</p>
            <p className="text-sm text-[#727785]">Gestiona cursos y actividades</p>
          </div>
        </button>

        <button 
          onClick={() => {
            onSelectRole('alumno');
            onNavigate('S01');
          }}
          className="w-full p-6 bg-[#f2f3fd] rounded-2xl flex items-center gap-4 hover:bg-[#e6e8f2] transition-all active:scale-95 text-left"
        >
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#005bbf] shadow-sm">
            <span className="material-symbols-outlined text-[28px]">person</span>
          </div>
          <div>
            <p className="font-bold text-[#191c23] text-lg">Alumno</p>
            <p className="text-sm text-[#727785]">Participa en clases</p>
          </div>
        </button>
      </div>
    </div>
  );
};
