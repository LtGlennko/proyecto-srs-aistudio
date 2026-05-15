import React from 'react';
import { ScreenProps } from '../../types';
import { Header } from '../common/Header';
import { Breadcrumb } from '../common/Breadcrumb';
import { BottomNav } from '../common/BottomNav';

export const TeacherInteractionAdd: React.FC<ScreenProps> = ({ onNavigate, onInteractionCreated, onInteractionUpdated, editingInteraction, onSetEditingInteraction, selectedCourse, selectedActivity, selectedInteractionType, activeInteractionId, responseCounts }) => {
  const [showSettings, setShowSettings] = React.useState(false);
  const [questionText, setQuestionText] = React.useState(editingInteraction?.text || '');
  const [description, setDescription] = React.useState(editingInteraction?.description || '');
  const [feedbackText, setFeedbackText] = React.useState(editingInteraction?.feedback || '');
  const [options, setOptions] = React.useState(editingInteraction?.options || (selectedInteractionType === 'verdadero_falso' ? ['Verdadero', 'Falso'] : ['', '', '', '']));
  const [correctOptions, setCorrectOptions] = React.useState<number[]>(editingInteraction?.correctOptions || []);
  const [timeLimit, setTimeLimit] = React.useState(editingInteraction?.settings?.timeLimit || 15);
  const [charLimit, setCharLimit] = React.useState(editingInteraction?.settings?.charLimit || 100);
  const [answersPerStudent, setAnswersPerStudent] = React.useState(editingInteraction?.settings?.answersPerStudent || 1);
  const [toggles, setToggles] = React.useState({
    description: editingInteraction?.settings?.includeDescription || false,
    multiple: editingInteraction?.settings?.multipleAnswers || false,
    results: editingInteraction?.settings?.showResults ?? true,
    time: !!editingInteraction?.settings?.timeLimit,
    leaderboard: editingInteraction?.settings?.showLeaderboard || false,
    charLimit: !!editingInteraction?.settings?.charLimit,
    answersPerStudent: !!editingInteraction?.settings?.answersPerStudent,
    feedback: !!editingInteraction?.feedback
  });

  const isMultipleChoice = selectedInteractionType === 'opcion_multiple';
  const isTrueFalse = selectedInteractionType === 'verdadero_falso';
  const isWordCloud = selectedInteractionType === 'nube_palabras';
  const isRanking = selectedInteractionType === 'ranking';
  const isFreeText = selectedInteractionType === 'texto_libre';
  const isPresenting = editingInteraction?.id === activeInteractionId;
  const responsesCount = editingInteraction ? (responseCounts?.[editingInteraction.id] || 0) : 0;

  React.useEffect(() => {
    if (isTrueFalse && options.join(',') !== 'Verdadero,Falso') {
      setOptions(['Verdadero', 'Falso']);
    }
  }, [isTrueFalse]);

  // Temporary state for settings modal
  const [tempToggles, setTempToggles] = React.useState(toggles);
  const [tempTimeLimit, setTempTimeLimit] = React.useState(timeLimit);
  const [tempCharLimit, setTempCharLimit] = React.useState(charLimit);
  const [tempAnswersPerStudent, setTempAnswersPerStudent] = React.useState(answersPerStudent);

  React.useEffect(() => {
    if (showSettings) {
      setTempToggles(toggles);
      setTempTimeLimit(timeLimit);
      setTempCharLimit(charLimit);
      setTempAnswersPerStudent(answersPerStudent);
    }
  }, [showSettings, toggles, timeLimit, charLimit, answersPerStudent]);

  const toggleOptionInModal = (key: keyof typeof toggles) => {
    setTempToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const incrementTimeInModal = () => {
    if (tempTimeLimit < 60) setTempTimeLimit(prev => prev + 15);
  };

  const decrementTimeInModal = () => {
    if (tempTimeLimit > 15) setTempTimeLimit(prev => prev - 15);
  };

  const incrementCharLimit = () => {
    setTempCharLimit(prev => Math.min(255, prev + 5));
  };

  const decrementCharLimit = () => {
    setTempCharLimit(prev => Math.max(15, prev - 5));
  };

  const incrementAnswers = () => {
    if (tempAnswersPerStudent < 5) setTempAnswersPerStudent(prev => prev + 1);
  };

  const decrementAnswers = () => {
    if (tempAnswersPerStudent > 1) setTempAnswersPerStudent(prev => prev - 1);
  };

  const handleSaveSettings = () => {
    setToggles(tempToggles);
    setTimeLimit(tempTimeLimit);
    setCharLimit(tempCharLimit);
    setAnswersPerStudent(tempAnswersPerStudent);
    
    // If switching to single answer mode, keep only the first correct option
    if (!tempToggles.multiple && correctOptions.length > 1) {
      setCorrectOptions([correctOptions[0]]);
    }
    
    setShowSettings(false);
  };

  const handleCorrectToggle = (idx: number) => {
    if (toggles.multiple) {
      setCorrectOptions(prev => 
        prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
      );
    } else {
      setCorrectOptions([idx]);
    }
  };

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (idx: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== idx);
      setOptions(newOptions);
      // Update correct options indices
      setCorrectOptions(prev => {
        return prev
          .filter(i => i !== idx)
          .map(i => i > idx ? i - 1 : i);
      });
    }
  };

  const incrementTime = () => {
    if (timeLimit < 60) setTimeLimit(prev => prev + 15);
  };

  const decrementTime = () => {
    if (timeLimit > 15) setTimeLimit(prev => prev - 15);
  };

  const getValidationErrors = () => {
    const errors: string[] = [];
    if (!questionText.trim()) errors.push('Escribir el texto de la pregunta');
    
    if (isMultipleChoice) {
      if (options.filter(o => o.trim() !== '').length < 2) errors.push('Añadir al menos 2 opciones');
      if (correctOptions.length === 0) errors.push('Marcar al menos una respuesta como correcta');
    } else if (isTrueFalse) {
      if (correctOptions.length === 0) errors.push('Seleccionar la respuesta correcta (Verdadero o Falso)');
    } else if (isRanking) {
      if (options.filter(o => o.trim() !== '').length < 2) errors.push('Añadir al menos 2 opciones para ordenar');
    } else if (!isWordCloud && !isFreeText) {
      if (options && options.filter(o => o.trim() !== '').length < 2) errors.push('Añadir al menos 2 opciones');
    }
    
    return errors;
  };

  const validationErrors = getValidationErrors();
  const isValid = validationErrors.length === 0;

  const handleSave = () => {
    const interactionData = {
      id: editingInteraction?.id || Date.now(),
      text: questionText,
      description: toggles.description ? description : undefined,
      feedback: toggles.feedback ? feedbackText : undefined,
      options: (isMultipleChoice || isTrueFalse || isRanking) ? options.filter(o => o.trim() !== '') : [],
      correctOptions: (isMultipleChoice || isTrueFalse) ? correctOptions : undefined,
      type: selectedInteractionType || 'opcion_multiple',
      settings: {
        includeDescription: toggles.description,
        multipleAnswers: (!isTrueFalse && !isRanking && !isWordCloud && !isFreeText) ? toggles.multiple : undefined,
        showResults: toggles.results,
        timeLimit: toggles.time ? timeLimit : undefined,
        showLeaderboard: (isWordCloud || isRanking || isFreeText) ? false : toggles.leaderboard,
        charLimit: (isWordCloud || isFreeText) ? (toggles.charLimit ? charLimit : 100) : undefined,
        answersPerStudent: (isWordCloud || isFreeText) ? (toggles.answersPerStudent ? answersPerStudent : 1) : undefined
      }
    };

    if (editingInteraction && onInteractionUpdated) {
      onInteractionUpdated(interactionData);
    } else if (onInteractionCreated) {
      onInteractionCreated(interactionData);
    }

    if (isValid) {
      // Clear fields and state
      setQuestionText('');
      setOptions(['', '', '', '']);
      setDescription('');
      setFeedbackText('');
      setCorrectOptions([]);
      if (onSetEditingInteraction) onSetEditingInteraction(null);
      onNavigate('S21h');
    }
  };

  const handleBack = () => {
    if (onSetEditingInteraction) onSetEditingInteraction(null);
    onNavigate('S21c');
  };

  return (
    <div className="bg-[#f9f9ff] selection:bg-[#d8e2ff] selection:text-[#001a41] min-h-screen flex flex-col font-inter">
      <Header 
        backLabel={selectedCourse?.code || 'Actividad'} 
        onBack={handleBack} 
      />
      <Breadcrumb 
        items={[
          { label: 'Mis Cursos', onClick: () => onNavigate('S19c') },
          { label: selectedCourse?.name || 'Curso', onClick: () => onNavigate('S20e') },
          { label: selectedActivity?.name || 'Actividad', onClick: () => onNavigate('S21c') },
          editingInteraction ? 'Editar pregunta' : 'Nueva pregunta'
        ]} 
      />

      <main className="flex-grow pt-[92px] pb-[80px] px-6 w-full">
        <div className="space-y-8 mt-6">
          <div className="space-y-3">
            {isPresenting && (
              <div className="flex items-center justify-between mb-2 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="flex items-center gap-2 text-[#EA4335]">
                  <span className="material-symbols-outlined text-[18px] animate-pulse">broadcast_on_home</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">Presentando</span>
                </div>
                <span className="text-[11px] font-bold text-[#727785] bg-[#ecedf7] px-2 py-0.5 rounded-full">
                  {responsesCount} respuestas
                </span>
              </div>
            )}
            <section className="flex items-center justify-between">
              <label className="block font-manrope font-bold text-[#191c23]">Pregunta</label>
              <button 
                onClick={() => setShowSettings(true)}
                className="p-2 text-[#727785] hover:bg-[#f2f3fd] rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">settings</span>
              </button>
            </section>

            <section className="">
              <div className="relative group">
                <textarea 
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full bg-white border-none rounded-lg p-4 text-[#191c23] placeholder:text-[#727785] ring-1 ring-[#c1c6d6]/30 focus:ring-2 focus:ring-[#005bbf] outline-none transition-all min-h-[100px] resize-none" 
                  placeholder="Escribe tu pregunta aquí..."
                />
              </div>

              {toggles.description && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 mt-4">
                  <label className="block text-xs font-semibold text-[#727785] mb-2">Descripción</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-white border-none rounded-lg p-4 text-[#191c23] placeholder:text-[#727785] ring-1 ring-[#c1c6d6]/30 focus:ring-2 focus:ring-[#005bbf] outline-none transition-all min-h-[80px] resize-none text-sm" 
                    placeholder="Añade una descripción adicional..."
                  />
                </div>
              )}
            </section>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-bold tracking-[0.05em] text-[#727785] uppercase">Interacción - {
              selectedInteractionType === 'opcion_multiple' ? 'Opción múltiple' :
              selectedInteractionType === 'verdadero_falso' ? 'Verdadero o falso' :
              selectedInteractionType === 'nube_palabras' ? 'Nube de palabras' :
              selectedInteractionType === 'ranking' ? 'Ranking' : 'Texto libre'
            }</span>
            <div className="h-px flex-grow bg-[#c1c6d6]/20"></div>
          </div>

          {['opcion_multiple', 'verdadero_falso', 'ranking'].includes(selectedInteractionType || '') && (
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block font-manrope font-bold text-[#191c23]">Opciones</label>
                {!isTrueFalse && (
                  <span className="text-[10px] text-[#727785] font-medium">
                    {isRanking ? 'Mín. 2 opciones' : 'Mín. 2 opciones - Máx. 6'}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                {options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {/* Circle for marking correct answer - Hidden for Ranking */}
                    {!isRanking && (
                      <button 
                        onClick={() => {
                          if (opt.trim() !== '') {
                            handleCorrectToggle(idx);
                          }
                        }}
                        disabled={opt.trim() === ''}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                          opt.trim() === '' 
                            ? 'border-[#c1c6d6] opacity-30 cursor-not-allowed' 
                            : correctOptions.includes(idx) 
                              ? 'border-[#005bbf] bg-[#005bbf] text-white' 
                              : 'border-[#c1c6d6] hover:border-[#005bbf]'
                        }`}
                      >
                        {correctOptions.includes(idx) && (
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        )}
                      </button>
                    )}

                    <div className={`flex-grow flex items-center bg-white rounded-lg ring-1 ring-[#c1c6d6]/30 px-4 transition-all overflow-hidden ${!isTrueFalse ? 'focus-within:ring-2 focus-within:ring-[#005bbf]' : ''}`}>
                      {!isTrueFalse && <span className="text-[#727785] text-sm mr-3 font-bold">{String.fromCharCode(65 + idx)}.</span>}
                      {isTrueFalse ? (
                        <span className="w-full py-4 bg-transparent text-[#191c23] text-sm font-semibold selection:bg-transparent">
                          {opt}
                        </span>
                      ) : (
                        <input 
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...options];
                            newOpts[idx] = e.target.value;
                            setOptions(newOpts);
                          }}
                          className="w-full py-4 border-none bg-transparent text-[#191c23] outline-none focus:ring-0 text-sm disabled:opacity-70 disabled:cursor-default" 
                          placeholder={`Opción ${idx + 1}`} 
                          type="text" 
                        />
                      )}
                    </div>

                    {/* Delete button (only if > 2 options) */}
                    {!isTrueFalse && (
                      <button 
                        onClick={() => removeOption(idx)}
                        disabled={options.length <= 2}
                        className={`p-2 rounded-full transition-colors ${options.length > 2 ? 'text-[#ba1a1a] hover:bg-[#ba1a1a]/10' : 'text-[#c1c6d6] cursor-not-allowed'}`}
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {!isTrueFalse && (
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={addOption}
                    disabled={options.length >= 6}
                    className={`font-semibold text-sm self-start flex items-center gap-2 transition-opacity ${options.length < 6 ? 'text-[#005bbf] hover:opacity-70' : 'text-[#c1c6d6] cursor-not-allowed'}`}
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Añadir opción
                  </button>
                </div>
              )}
            </section>
          )}

          {toggles.feedback && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-xs font-semibold text-[#727785] mb-2 uppercase tracking-wide">Retroalimentación final</label>
              <textarea 
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full bg-white border-none rounded-lg p-4 text-[#191c23] placeholder:text-[#727785] ring-1 ring-[#c1c6d6]/30 focus:ring-2 focus:ring-[#005bbf] outline-none transition-all min-h-[80px] resize-none text-sm" 
                placeholder="Escribe la retroalimentación que verán los alumnos al finalizar..."
              />
            </div>
          )}

          {!isValid && (
            <div className="bg-[#ba1a1a]/5 p-4 rounded-xl border border-[#ba1a1a]/10 animate-in fade-in slide-in-from-top-1 duration-300">
               <div className="flex items-center gap-2 text-[#ba1a1a] mb-2">
                 <span className="material-symbols-outlined text-[18px]">error_outline</span>
                 <span className="text-[11px] font-bold uppercase tracking-wider">Requisitos para guardar:</span>
               </div>
               <ul className="space-y-1.5 pl-1.5">
                 {validationErrors.map((err, i) => (
                   <li key={i} className="text-[#ba1a1a] text-xs flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-[#ba1a1a] rounded-full shrink-0 opacity-40"></div>
                     <span>{err}</span>
                   </li>
                 ))}
               </ul>
            </div>
          )}

          <section className="grid grid-cols-2 gap-4 pt-4">
            <button 
              onClick={handleBack}
              className="py-4 px-6 rounded-lg font-bold text-[#191c23] bg-[#e0e2ec] hover:bg-[#e6e8f2] transition-colors active:scale-95"
            >
              Volver
            </button>
            <button 
              onClick={handleSave}
              disabled={!isValid}
              className={`py-4 px-6 rounded-lg font-bold text-white transition-all active:scale-95 ${
                isValid 
                  ? 'bg-gradient-to-br from-[#005bbf] to-[#1a73e8] shadow-md hover:opacity-90' 
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
              }`}
            >
              Guardar
            </button>
          </section>
        </div>
      </main>

      {/* S21g Modal - Bottom Sheet */}
      {showSettings && (
        <>
          <div 
            className="fixed inset-0 bg-[#191c23]/40 backdrop-blur-[2px] z-[2000] transition-opacity"
            onClick={() => setShowSettings(false)}
          ></div>
          <div className="fixed bottom-0 left-0 right-0 bg-white z-[2001] rounded-t-[16px] shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
            <div className="w-full flex justify-center py-3 sticky top-0 bg-white z-10">
              <div className="w-12 h-1.5 bg-[#c1c6d6]/40 rounded-full"></div>
            </div>
            
            <div className="px-6 pb-4 border-b border-[#c1c6d6]/10 mb-2">
              <h2 className="font-manrope font-bold text-xl text-[#191c23]">Ajustes de interacción</h2>
            </div>

            <div className="px-6 py-4 space-y-5">
              {[
                { label: 'Incluir descripción', key: 'description' },
                ...(isTrueFalse || isWordCloud || isFreeText || isRanking ? [] : [{ label: 'Múltiples respuestas', key: 'multiple' }]),
                { label: 'Mostrar resultados', key: 'results' },
                { label: 'Retroalimentación', key: 'feedback' },
                { label: 'Añadir tiempo', key: 'time' },
                ...(isWordCloud || isRanking || isFreeText ? [] : [{ label: 'Tablero de puntuaciones', key: 'leaderboard' }]),
                ...(isWordCloud || isFreeText ? [
                  { label: 'Límite de caracteres', key: 'charLimit' },
                  { label: 'Respuestas permitidas por alumno', key: 'answersPerStudent' }
                ] : [])
              ].map((item) => (
                <div key={item.key} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#414754]">{item.label}</span>
                    <button 
                      onClick={() => toggleOptionInModal(item.key as keyof typeof toggles)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${tempToggles[item.key as keyof typeof toggles] ? 'bg-[#005bbf]' : 'bg-[#c1c6d6]'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${tempToggles[item.key as keyof typeof toggles] ? 'left-7' : 'left-1'}`}></div>
                    </button>
                  </div>
                  {item.key === 'time' && tempToggles.time && (
                    <div className="pl-4 border-l-2 border-[#f2f3fd] space-y-3 animate-in slide-in-from-top-2 duration-200">
                      <label className="text-[10px] font-bold text-[#727785] uppercase tracking-wider">Tiempo en segundos</label>
                      <div className="flex items-center gap-4 bg-[#f2f3fd] rounded-lg p-2 px-4 w-fit">
                        <span className="text-lg font-bold text-[#191c23] min-w-[30px] text-center">{tempTimeLimit}</span>
                        <div className="flex flex-col gap-1">
                          <button onClick={incrementTimeInModal} className="hover:text-[#005bbf] transition-colors">
                            <span className="material-symbols-outlined text-[20px]">expand_less</span>
                          </button>
                          <button onClick={decrementTimeInModal} className="hover:text-[#005bbf] transition-colors">
                            <span className="material-symbols-outlined text-[20px]">expand_more</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {item.key === 'charLimit' && tempToggles.charLimit && (
                    <div className="pl-4 border-l-2 border-[#f2f3fd] space-y-3 animate-in slide-in-from-top-2 duration-200">
                      <label className="text-[10px] font-bold text-[#727785] uppercase tracking-wider">Límite caracteres (15 - 255)</label>
                      <div className="flex items-center gap-4 bg-[#f2f3fd] rounded-lg p-2 px-4 w-fit">
                        <span className="text-lg font-bold text-[#191c23] min-w-[40px] text-center">{tempCharLimit}</span>
                        <div className="flex flex-col gap-1">
                          <button onClick={incrementCharLimit} className="hover:text-[#005bbf] transition-colors">
                            <span className="material-symbols-outlined text-[20px]">expand_less</span>
                          </button>
                          <button onClick={decrementCharLimit} className="hover:text-[#005bbf] transition-colors">
                            <span className="material-symbols-outlined text-[20px]">expand_more</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {item.key === 'answersPerStudent' && tempToggles.answersPerStudent && (
                    <div className="pl-4 border-l-2 border-[#f2f3fd] space-y-3 animate-in slide-in-from-top-2 duration-200">
                      <label className="text-[10px] font-bold text-[#727785] uppercase tracking-wider">Respuestas por alumno (1 - 5)</label>
                      <div className="flex items-center gap-4 bg-[#f2f3fd] rounded-lg p-2 px-4 w-fit">
                        <span className="text-lg font-bold text-[#191c23] min-w-[30px] text-center">{tempAnswersPerStudent}</span>
                        <div className="flex flex-col gap-1">
                          <button onClick={incrementAnswers} className="hover:text-[#005bbf] transition-colors">
                            <span className="material-symbols-outlined text-[20px]">expand_less</span>
                          </button>
                          <button onClick={decrementAnswers} className="hover:text-[#005bbf] transition-colors">
                            <span className="material-symbols-outlined text-[20px]">expand_more</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-6 grid grid-cols-2 gap-4 border-t border-[#c1c6d6]/10 mt-2">
              <button 
                onClick={() => setShowSettings(false)}
                className="py-4 px-6 rounded-lg font-bold text-[#191c23] bg-[#e0e2ec] hover:bg-[#e6e8f2] transition-colors"
              >
                Volver
              </button>
              <button 
                onClick={handleSaveSettings}
                className="py-4 px-6 rounded-lg font-bold text-white bg-[#005bbf] hover:opacity-90 transition-all border-none"
              >
                Guardar
              </button>
            </div>
          </div>
        </>
      )}

      <BottomNav activeTab="Cursos" onNavigate={onNavigate} />
    </div>
  );
};
