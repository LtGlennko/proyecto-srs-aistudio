/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId, Course, Activity, Interaction } from './types';
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
import { LiveView } from './components/screens/LiveView';
import { MobileContainer } from './components/common/MobileContainer';

export default function App() {
  const [isLiveMode, setIsLiveMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('mode') === 'live';
    }
    return false;
  });
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('Login');
  const [userRole, setUserRole] = useState<'docente' | 'alumno' | null>(null);
  const [hasActivity, setHasActivity] = useState(false);
  const [hasInteraction, setHasInteraction] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [isActivityFinishedMap, setIsActivityFinishedMap] = useState<{ [id: string]: boolean }>(() => {
    const saved = localStorage.getItem('gamifica_finished_activities');
    return saved ? JSON.parse(saved) : {};
  });
  const [hasConsultation, setHasConsultation] = useState(false);
  const [isAnonimo, setIsAnonimo] = useState(true);
  const [hasConsultationsDocente, setHasConsultationsDocente] = useState(false);
  const [hasCourse, setHasCourse] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedInteractionType, setSelectedInteractionType] = useState<Interaction['type']>('opcion_multiple');
  const [activitiesByCourse, setActivitiesByCourse] = useState<{ [courseCode: string]: Activity[] }>({});
  const [questionsByActivity, setQuestionsByActivity] = useState<{ [activityId: string]: Interaction[] }>(() => {
    const saved = localStorage.getItem('gamifica_questions_by_activity');
    return saved ? JSON.parse(saved) : {};
  });
  const [editingInteraction, setEditingInteraction] = useState<Interaction | null>(null);
  const [activeInteractionId, setActiveInteractionId] = useState<number | null>(() => {
    const saved = localStorage.getItem('gamifica_active_id');
    return saved ? parseInt(saved, 10) : null;
  });

  const [responseCounts, setResponseCounts] = useState<{ [id: number]: number }>(() => {
    const saved = localStorage.getItem('gamifica_response_counts');
    return saved ? JSON.parse(saved) : {};
  });

  const [allQuestionsData, setAllQuestionsData] = useState<Interaction[]>(() => {
    const saved = localStorage.getItem('gamifica_all_questions'); // We fallback if needed, but questions_by_activity is better
    return saved ? JSON.parse(saved) : [];
  });

  // 1. Sync active interaction and activity data
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'gamifica_active_id') {
        setActiveInteractionId(e.newValue ? parseInt(e.newValue, 10) : null);
      }
      if (e.key === 'gamifica_questions_by_activity') {
        try {
          setQuestionsByActivity(e.newValue ? JSON.parse(e.newValue) : {});
        } catch (err) {
          console.error("Error parsing questions from storage", err);
        }
      }
      if (e.key === 'gamifica_response_counts') {
        try {
          setResponseCounts(e.newValue ? JSON.parse(e.newValue) : {});
        } catch (err) { }
      }
      if (e.key === 'gamifica_finished_activities') {
        try {
          setIsActivityFinishedMap(e.newValue ? JSON.parse(e.newValue) : {});
        } catch (err) { }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 2. Derive all questions for live mode - using useMemo to avoid infinite loops
  const currentActivityQuestions = React.useMemo(() => {
    if (!selectedActivity) return [];
    return questionsByActivity[selectedActivity.id] || [];
  }, [selectedActivity, questionsByActivity]);

  // Sync questions to allQuestionsData when they change
  React.useEffect(() => {
    if (!isLiveMode && selectedActivity) {
      setAllQuestionsData(currentActivityQuestions);
    }
  }, [currentActivityQuestions, isLiveMode, selectedActivity]);

  // 3. Response counter logic - moved to its own effect
  React.useEffect(() => {
    if (activeInteractionId === null) return;
    
    const currentCount = responseCounts[activeInteractionId] || 0;
    if (currentCount >= 20) return;

    const delay = currentCount === 0 ? 3000 : (Math.random() * 2000 + 500);
    const timeout = setTimeout(() => {
      setResponseCounts(prev => {
        const count = prev[activeInteractionId] || 0;
        if (count >= 20) return prev;
        const next = { ...prev, [activeInteractionId]: count + 1 };
        localStorage.setItem('gamifica_response_counts', JSON.stringify(next));
        return next;
      });
    }, delay);

    return () => clearTimeout(timeout);
  }, [activeInteractionId, responseCounts]);

  // 4. Fallback polling for live view mode
  React.useEffect(() => {
    if (!isLiveMode) return;

    const interval = setInterval(() => {
      const savedId = localStorage.getItem('gamifica_active_id');
      const savedQuestionsMap = localStorage.getItem('gamifica_questions_by_activity');
      const savedCounts = localStorage.getItem('gamifica_response_counts');
      
      if (savedId) {
        const id = parseInt(savedId, 10);
        if (id !== activeInteractionId) setActiveInteractionId(id);
      } else if (activeInteractionId !== null) {
        setActiveInteractionId(null);
      }

      if (savedQuestionsMap) {
        try {
          const map = JSON.parse(savedQuestionsMap);
          const allQ = Object.values(map).flat() as Interaction[];
          // Only update if actually different to prevent render loops
          if (JSON.stringify(allQ) !== JSON.stringify(allQuestionsData)) {
            setAllQuestionsData(allQ);
          }
        } catch (e) {}
      }

      if (savedCounts) {
        try {
          const counts = JSON.parse(savedCounts);
          if (JSON.stringify(counts) !== JSON.stringify(responseCounts)) {
            setResponseCounts(counts);
          }
        } catch (e) {}
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLiveMode, activeInteractionId, allQuestionsData, responseCounts]);

  const handleToggleActiveInteraction = (id: number) => {
    const newId = activeInteractionId === id ? null : id;
    setActiveInteractionId(newId);
    if (newId === null) {
      localStorage.removeItem('gamifica_active_id');
    } else {
      localStorage.setItem('gamifica_active_id', newId.toString());
      
      // Reset count if starting fresh for this interaction
      if (!responseCounts[id]) {
        const newCounts = { ...responseCounts, [id]: 0 };
        setResponseCounts(newCounts);
        localStorage.setItem('gamifica_response_counts', JSON.stringify(newCounts));
      }
    }
    
    // Ensure data is synced in localStorage
    localStorage.setItem('gamifica_questions_by_activity', JSON.stringify(questionsByActivity));
  };

  const handleInteractionCreated = (interaction: Interaction) => {
    if (selectedActivity) {
      const newQuestions = [...(questionsByActivity[selectedActivity.id] || []), interaction];
      const newMap = {
        ...questionsByActivity,
        [selectedActivity.id]: newQuestions
      };
      setQuestionsByActivity(newMap);
      localStorage.setItem('gamifica_questions_by_activity', JSON.stringify(newMap));
      setHasInteraction(true);
      setInteractionCount(prev => prev + 1);
    }
  };

  const handleInteractionUpdated = (interaction: Interaction) => {
    if (selectedActivity) {
      const newQuestions = (questionsByActivity[selectedActivity.id] || []).map(q => 
        q.id === interaction.id ? interaction : q
      );
      const newMap = {
        ...questionsByActivity,
        [selectedActivity.id]: newQuestions
      };
      setQuestionsByActivity(newMap);
      localStorage.setItem('gamifica_questions_by_activity', JSON.stringify(newMap));
      setEditingInteraction(null);
    }
  };

  const handleActivityCreated = (activity: Activity) => {
    if (selectedCourse) {
      setActivitiesByCourse(prev => ({
        ...prev,
        [selectedCourse.code]: [...(prev[selectedCourse.code] || []), activity]
      }));
    }
    setHasActivity(true);
  };

  const handleActivityUpdated = (updatedActivity: Activity) => {
    if (selectedCourse) {
      setActivitiesByCourse(prev => ({
        ...prev,
        [selectedCourse.code]: (prev[selectedCourse.code] || []).map(a => a.id === updatedActivity.id ? updatedActivity : a)
      }));
      setSelectedActivity(updatedActivity);
    }
  };

  const handleCourseCreated = (course: Course) => {
    setHasCourse(true);
    setCourses(prev => [...prev, course]);
    setSelectedCourse(course);
  };

  const handleCourseUpdated = (updatedCourse: Course) => {
    setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    setSelectedCourse(updatedCourse);
  };

  const renderScreen = () => {
    const commonProps = {
      onNavigate: setCurrentScreen,
      userRole,
      hasActivity,
      onActivityCreated: handleActivityCreated,
      onActivityUpdated: handleActivityUpdated,
      hasInteraction,
      onInteractionCreated: handleInteractionCreated,
      onInteractionUpdated: handleInteractionUpdated,
      editingInteraction,
      onSetEditingInteraction: setEditingInteraction,
      activeInteractionId,
      onToggleActiveInteraction: handleToggleActiveInteraction,
      responseCounts,
      interactionCount,
      isActivityFinished: selectedActivity ? !!isActivityFinishedMap[selectedActivity.id] : false,
      isActivityFinishedMap,
      onActivityFinished: () => {
        if (selectedActivity) {
          const newMap = { ...isActivityFinishedMap, [selectedActivity.id]: true };
          setIsActivityFinishedMap(newMap);
          localStorage.setItem('gamifica_finished_activities', JSON.stringify(newMap));
        }
      },
      hasConsultation,
      isAnonimo,
      hasConsultationsDocente,
      onSimulate: () => setHasConsultationsDocente(true),
      onSent: (anon: boolean) => {
        setHasConsultation(true);
        setIsAnonimo(anon);
        setCurrentScreen('S01_Detail');
      },
      hasCourse,
      onCourseCreated: handleCourseCreated,
      onCourseUpdated: handleCourseUpdated,
      courses,
      selectedCourse,
      onSelectCourse: (course: Course) => {
        setSelectedCourse(course);
        setCurrentScreen('S20e');
      },
      selectedActivity,
      onSelectActivity: (activity: Activity) => {
        setSelectedActivity(activity);
        if (activity) {
          setCurrentScreen(isActivityFinishedMap[activity.id] ? 'S18' : 'S21c');
        } else {
          setCurrentScreen('S21b');
        }
      },
      questionsByActivity,
      questions: selectedActivity ? (questionsByActivity[selectedActivity.id] || []) : [],
      selectedInteractionType,
      onSelectInteractionType: (type: Interaction['type']) => setSelectedInteractionType(type),
      activitiesByCourse,
      activities: selectedCourse ? (activitiesByCourse[selectedCourse.code] || []) : []
    };

    switch (currentScreen) {
      case 'Login': return <LoginScreen onNavigate={setCurrentScreen} onSelectRole={setUserRole} />;
      case 'Perfil': return <PerfilScreen onNavigate={setCurrentScreen} userRole={userRole} />;
      case 'S19b': return <S19b {...commonProps} />;
      case 'S19c': return <S19c {...commonProps} />;
      case 'S20d': return <S20d {...commonProps} />;
      case 'S20e': return <S20e {...commonProps} />;
      case 'S21b': return <S21b {...commonProps} />;
      case 'S21c': return <S21c {...commonProps} />;
      case 'S21e': return <S21e {...commonProps} />;
      case 'S21f': return <S21f {...commonProps} onInteractionCreated={handleInteractionCreated} />;
      case 'S18': return <S18 {...commonProps} />;
      case 'S26': return <S26 {...commonProps} />;
      case 'S27': return <S27 {...commonProps} />;
      case 'S01': return <S01 onNavigate={setCurrentScreen} />;
      case 'S01_1': return <S01_1 onNavigate={setCurrentScreen} />;
      case 'S01_Detail': return <S01_Detail onNavigate={setCurrentScreen} hasConsultation={hasConsultation} isAnonimo={isAnonimo} />;
      case 'S02': return <S02 onNavigate={setCurrentScreen} />;
      case 'S03': return <ConsultaForm onNavigate={setCurrentScreen} onSent={commonProps.onSent} />;
      case 'S04': return <S04 onNavigate={setCurrentScreen} />;
      case 'S05': return <ConsultaForm onNavigate={setCurrentScreen} onSent={commonProps.onSent} />;
      case 'S06': return <S06 onNavigate={setCurrentScreen} />;
      case 'S22a': return <S22a onNavigate={setCurrentScreen} />;
      case 'S22b': return <S22b onNavigate={setCurrentScreen} />;
      case 'S22c': return <S22c onNavigate={setCurrentScreen} />;
      case 'S22b_p2': return <S22b_p2 onNavigate={setCurrentScreen} />;
      case 'S22c_p2': return <S22c_p2 onNavigate={setCurrentScreen} />;
      case 'S22_finalizada': return <S22_finalizada onNavigate={setCurrentScreen} />;
      case 'S19a': return <S19a onNavigate={setCurrentScreen} />;
      case 'S19d': return <S19d onNavigate={setCurrentScreen} />;
      case 'S20a': return <S20a onNavigate={setCurrentScreen} />
      case 'S20b': return <S20b onNavigate={setCurrentScreen} />;
      case 'S20c': return <S20c onNavigate={setCurrentScreen} />;
      case 'S20_ActividadesDocente': return <S20_ActividadesDocente {...commonProps} />;
      case 'S21d': return <S21d onNavigate={setCurrentScreen} />;
      case 'S21h': return <S21h {...commonProps} />;
      case 'S21j': return <S21j onNavigate={setCurrentScreen} />;
      default: return <LoginScreen onNavigate={setCurrentScreen} onSelectRole={setUserRole} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#f0f2f5] flex items-start justify-center ${isLiveMode ? 'p-0' : 'py-[20px]'}`}>
      {isLiveMode ? (
        <LiveView 
          key={activeInteractionId || 'empty'} 
          activeInteraction={allQuestionsData.find(q => q && q.id === activeInteractionId) || null} 
        />
      ) : (
        <MobileContainer>
          {renderScreen()}
        </MobileContainer>
      )}
    </div>
  );
}

