import React from 'react';
import { Interaction } from '../../types';

interface LiveViewProps {
  activeInteraction: Interaction | null;
}

export const LiveView: React.FC<LiveViewProps> = ({ activeInteraction }) => {
  // Use local state triggered by props to ensure smooth transitions
  const [displayInteraction, setDisplayInteraction] = React.useState<Interaction | null>(activeInteraction);

  React.useEffect(() => {
    setDisplayInteraction(activeInteraction);
  }, [activeInteraction]);

  return (
    <div className="min-h-screen bg-[#001a41] text-white flex flex-col items-center justify-center p-8 font-inter overflow-hidden relative">
      {/* Background Orbs for Atmosphere */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#005bbf]/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#475e8c]/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      <div className="max-w-4xl w-full text-center z-10 space-y-12">
        {!displayInteraction ? (
          <div className="space-y-6 animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <span className="material-symbols-outlined text-5xl text-[#005bbf] animate-bounce">
                wait_for_column
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-manrope font-extrabold tracking-tight">
              Esperando al instructor
            </h1>
            <p className="text-[#c1c6d6] text-lg md:text-xl max-w-xl mx-auto">
              La actividad aún no ha comenzado o no hay interacciones en curso. Por favor, mantente atento a la pantalla.
            </p>
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-3 bg-[#EA4335] px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-[#EA4335]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              En Vivo
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-manrope font-extrabold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                {displayInteraction.text}
              </h2>
              
              {displayInteraction.description && (
                <p className="text-[#c1c6d6] text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
                  {displayInteraction.description}
                </p>
              )}

              {displayInteraction.feedback && (
                <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                  <div className="flex items-center justify-center gap-2 mb-3 text-[#005bbf]">
                    <span className="material-symbols-outlined">info</span>
                    <span className="text-[12px] font-black uppercase tracking-widest">Retroalimentación</span>
                  </div>
                  <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic">
                    "{displayInteraction.feedback}"
                  </p>
                </div>
              )}
            </div>

            {/* Interaction Type Indicator */}
            <div className="flex items-center justify-center gap-4 pt-12">
              <div className="h-px w-12 bg-white/10" />
              <div className="flex items-center gap-2 text-[#727785] text-sm font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-[18px]">
                  {displayInteraction.type === 'opcion_multiple' ? 'list_alt' :
                   displayInteraction.type === 'verdadero_falso' ? 'check_circle' :
                   displayInteraction.type === 'ranking' ? 'format_list_numbered' :
                   displayInteraction.type === 'nube_palabras' ? 'cloud' : 'notes'}
                </span>
                {displayInteraction.type.replace('_', ' ')}
              </div>
              <div className="h-px w-12 bg-white/10" />
            </div>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-30 select-none">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#005bbf] rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-[14px] text-white">school</span>
          </div>
          <span className="font-manrope font-bold text-sm tracking-tight">GamificaAI</span>
        </div>
      </div>
    </div>
  );
};
