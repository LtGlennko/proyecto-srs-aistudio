/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId } from './types';
import { LoginScreen } from './components/screens/LoginScreen';
import { S01 } from './components/screens/S01';
import { S01_1 } from './components/screens/S01_1';
import { S01_Detail } from './components/screens/S01_Detail';
import { S02 } from './components/screens/S02';
import { ConsultaForm } from './components/screens/ConsultaForm';
import { S04 } from './components/screens/S04';
import { S06 } from './components/screens/S06';
import { S22a } from './components/screens/S22a';
import { S22b } from './components/screens/S22b';
import { S22c } from './components/screens/S22c';
import { S22b_p2 } from './components/screens/S22b_p2';
import { S22c_p2 } from './components/screens/S22c_p2';
import { S22_finalizada } from './components/screens/S22_finalizada';
import { S19a } from './components/screens/S19a';
import { S19b } from './components/screens/S19b';
import { S19c } from './components/screens/S19c';
import { S19d } from './components/screens/S19d';
import { S20a } from './components/screens/S20a';
import { S20b } from './components/screens/S20b';
import { S20c } from './components/screens/S20c';
import { S20d } from './components/screens/S20d';
import { S20e } from './components/screens/S20e';
import { S20_ActividadesDocente } from './components/screens/S20_ActividadesDocente';
import { S21b } from './components/screens/S21b';
import { S21c } from './components/screens/S21c';
import { S21d } from './components/screens/S21d';
import { S21e } from './components/screens/S21e';
import { S21f } from './components/screens/S21f';
import { S21h } from './components/screens/S21h';
import { S21j } from './components/screens/S21j';
import { S18 } from './components/screens/S18';
import { S26 } from './components/screens/S26';
import { S27 } from './components/screens/S27';
import { PerfilScreen } from './components/screens/PerfilScreen';
import { MobileContainer } from './components/common/MobileContainer';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('Login');
  const [userRole, setUserRole] = useState<'docente' | 'alumno' | null>(null);
  const [hasActivity, setHasActivity] = useState(false);
  const [hasInteraction, setHasInteraction] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [isActivityFinished, setIsActivityFinished] = useState(false);
  const [hasConsultation, setHasConsultation] = useState(false);
  const [isAnonimo, setIsAnonimo] = useState(true);
  const [hasConsultationsDocente, setHasConsultationsDocente] = useState(false);
  const [questions, setQuestions] = useState<{ id: number; text: string; options: string[] }[]>([]);

  const addQuestion = (text: string, options: string[]) => {
    setQuestions(prev => [...prev, { id: prev.length + 1, text, options }]);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Login': return <LoginScreen onNavigate={setCurrentScreen} onSelectRole={setUserRole} />;
      case 'Perfil': return <PerfilScreen onNavigate={setCurrentScreen} userRole={userRole} />;
      case 'S01': return <S01 onNavigate={setCurrentScreen} />;
      case 'S01_1': return <S01_1 onNavigate={setCurrentScreen} />;
      case 'S01_Detail': return <S01_Detail onNavigate={setCurrentScreen} hasConsultation={hasConsultation} isAnonimo={isAnonimo} />;
      case 'S02': return <S02 onNavigate={setCurrentScreen} />;
      case 'S03': return <ConsultaForm onNavigate={setCurrentScreen} onSent={(anon) => {
        setHasConsultation(true);
        setIsAnonimo(anon);
        setCurrentScreen('S01_Detail');
      }} />;
      case 'S04': return <S04 onNavigate={setCurrentScreen} />;
      case 'S05': return <ConsultaForm onNavigate={setCurrentScreen} onSent={(anon) => {
        setHasConsultation(true);
        setIsAnonimo(anon);
        setCurrentScreen('S01_Detail');
      }} />;
      case 'S06': return <S06 onNavigate={setCurrentScreen} />;
      case 'S22a': return <S22a onNavigate={setCurrentScreen} />;
      case 'S22b': return <S22b onNavigate={setCurrentScreen} />;
      case 'S22c': return <S22c onNavigate={setCurrentScreen} />;
      case 'S22b_p2': return <S22b_p2 onNavigate={setCurrentScreen} />;
      case 'S22c_p2': return <S22c_p2 onNavigate={setCurrentScreen} />;
      case 'S22_finalizada': return <S22_finalizada onNavigate={setCurrentScreen} />;
      case 'S19a': return <S19a onNavigate={setCurrentScreen} />;
      case 'S19b': return <S19b onNavigate={setCurrentScreen} />;
      case 'S19c': return <S19c onNavigate={setCurrentScreen} />;
      case 'S19d': return <S19d onNavigate={setCurrentScreen} />;
      case 'S20a': return <S20a onNavigate={setCurrentScreen} isActivityFinished={isActivityFinished} />;
      case 'S20b': return <S20b onNavigate={setCurrentScreen} />;
      case 'S20c': return <S20c onNavigate={setCurrentScreen} />;
      case 'S20d': return <S20d onNavigate={setCurrentScreen} hasConsultationsDocente={hasConsultationsDocente} onSimulate={() => setHasConsultationsDocente(true)} />;
      case 'S20e': return <S20e onNavigate={setCurrentScreen} hasActivity={hasActivity} interactionCount={interactionCount} isActivityFinished={isActivityFinished} />;
      case 'S20_ActividadesDocente': return <S20_ActividadesDocente onNavigate={setCurrentScreen} />;
      case 'S21b': return <S21b onNavigate={setCurrentScreen} onActivityCreated={() => setHasActivity(true)} />;
      case 'S21c': return <S21c onNavigate={setCurrentScreen} hasInteraction={hasInteraction} onActivityFinished={() => setIsActivityFinished(true)} questions={questions} />;
      case 'S21d': return <S21d onNavigate={setCurrentScreen} />;
      case 'S21e': return <S21e onNavigate={setCurrentScreen} />;
      case 'S21f': return <S21f onNavigate={setCurrentScreen} onInteractionCreated={(text, options) => {
        setHasInteraction(true);
        setInteractionCount(prev => prev + 1);
        addQuestion(text, options);
      }} />;
      case 'S21h': return <S21h onNavigate={setCurrentScreen} hasInteraction={hasInteraction} onActivityFinished={() => setIsActivityFinished(true)} questions={questions} />;
      case 'S21j': return <S21j onNavigate={setCurrentScreen} isActivityFinished={isActivityFinished} />;
      case 'S18': return <S18 onNavigate={setCurrentScreen} questions={questions} />;
      case 'S26': return <S26 onNavigate={setCurrentScreen} interactionCount={interactionCount} />;
      case 'S27': return <S27 onNavigate={setCurrentScreen} questions={questions} />;
      default: return <LoginScreen onNavigate={setCurrentScreen} onSelectRole={setUserRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-start justify-center py-[20px]">
      <MobileContainer>
        {renderScreen()}
      </MobileContainer>
    </div>
  );
}

