/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId, Course, Activity, Interaction, Consultation } from './types';
import { LoginScreen } from './components/screens/LoginScreen';
import { StudentHome } from './components/screens/StudentHome';
import { StudentWelcome } from './components/screens/StudentWelcome';
import { ConsultationSuccess } from './components/screens/ConsultationSuccess';
import { StudentCourses } from './components/screens/StudentCourses';
import { ConsultaForm } from './components/screens/ConsultaForm';
import { StudentActivityPre } from './components/screens/StudentActivityPre';
import { StudentClass } from './components/screens/StudentClass';
import { StudentInteractionIntro } from './components/screens/StudentInteractionIntro';
import { StudentInteractionQuestion } from './components/screens/StudentInteractionQuestion';
import { StudentInteractionFeedback } from './components/screens/StudentInteractionFeedback';
import { StudentInteractionQuestionv2 } from './components/screens/StudentInteractionQuestionv2';
import { StudentInteractionFeedbackv2 } from './components/screens/StudentInteractionFeedbackv2';
import { StudentInteractionEnd } from './components/screens/StudentInteractionEnd';
import { TeacherDashboard } from './components/screens/TeacherDashboard';
import { TeacherMenu } from './components/screens/TeacherMenu';
import { TeacherCourses } from './components/screens/TeacherCourses';
import { TeacherCourseCreate } from './components/screens/TeacherCourseCreate';
import { TeacherCourseDetail } from './components/screens/TeacherCourseDetail';
import { TeacherActivityAdd } from './components/screens/TeacherActivityAdd';
import { TeacherActivityEdit } from './components/screens/TeacherActivityEdit';
import { TeacherConsultationQueue } from './components/screens/TeacherConsultationQueue';
import { TeacherActivityList } from './components/screens/TeacherActivityList';
import { TeacherActivityDashboard } from './components/screens/TeacherActivityDashboard';
import { TeacherInteractionStart } from './components/screens/TeacherInteractionStart';
import { TeacherInteractionList } from './components/screens/TeacherInteractionList';
import { TeacherInteractionType } from './components/screens/TeacherInteractionType';
import { TeacherInteractionEdit } from './components/screens/TeacherInteractionEdit';
import { TeacherInteractionAdd } from './components/screens/TeacherInteractionAdd';
import { TeacherInteractionResults } from './components/screens/TeacherInteractionResults';
import { TeacherSessionSummary } from './components/screens/TeacherSessionSummary';
import { TeacherConsultations } from './components/screens/TeacherConsultations';
import { TeacherCourseStats } from './components/screens/TeacherCourseStats';
import { TeacherStudentList } from './components/screens/TeacherStudentList';
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

  const [consultas, setConsultas] = useState<Consultation[]>(() => {
    const saved = localStorage.getItem('gamifica_consultas');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        nombre: "Anónimo",
        texto: "¿Para qué es el espacio antes del contenido de la selectiva?",
        tiempo: "13:05",
        avatar: null,
        estado: "Pendiente fuera de clase",
        respondida: false
      },
      {
        id: 2,
        nombre: "Juan Pérez (2119000)",
        texto: "¿Cuántas condiciones anidadas se pueden tener?",
        tiempo: "13:18",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1meWSRlToSDIgVWCnnTwp-e4UXu_8vbNs-KLkeRGmgzd2eMz_oHCg0zya6mOtL4_qjQdwgRvMngYPvXMbJKCh9lva7WTPnN__QGZWClXWtsrgGn7u2E5iepVAHR0zPAQJ6tWGIfMv2SZy3l_JoNJlWx39L1HYiGjoNvhTd7GYruJouOf9fF2mtkG7Uzhl12-GpQeanh0H7dHoM1C2UMtJxNnJNYc7QwVrMtIYCfeO3ZiJhv542oPAgJQgR7hK2dvqzU4cdik41jM",
        estado: "Pendiente fuera de clase",
        respondida: false
      },
      {
        id: 3,
        nombre: "María López (2219000)",
        texto: "¿Es necesario usar llaves cada vez que se utilice el if y else?",
        tiempo: "14:07",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZrsG9QrVFZZyDlYDZCer1tmaSLOCNhJ04iU3jriCLoizNZY634iabs1AMbtZSdoJsSnjbvYBDF_w6CK-O20wtWONaUVBFNN-6VPrO_m9Kj8rHIFfgm2Ojf5QiPxkrwn-fDCNm2MiadYp5BhRNTCdEFi4WVPwtwrveR05kq4flzx-j_-0FizZ1qRbAx65a9xUzyaYzgN5nga6PS2UlhU2ZqGDeNLu6-bVuxT5nwzNrgfQpYH0JwIw_xtr1TAmGipXEKrifo8YcTxg",
        estado: "Pendiente de respuesta",
        respondida: false
      }
    ];
  });

  const handleUpdateConsultation = (updated: Consultation) => {
    const newConsultas = consultas.map(c => c.id === updated.id ? updated : c);
    setConsultas(newConsultas);
    localStorage.setItem('gamifica_consultas', JSON.stringify(newConsultas));
  };

  const handleAddConsultation = (consultation: Consultation) => {
    const newConsultas = [...consultas, consultation];
    setConsultas(newConsultas);
    localStorage.setItem('gamifica_consultas', JSON.stringify(newConsultas));
  };

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

  const handleReorderQuestions = (activityId: string, newQuestions: Interaction[]) => {
    const newMap = {
      ...questionsByActivity,
      [activityId]: newQuestions
    };
    setQuestionsByActivity(newMap);
    localStorage.setItem('gamifica_questions_by_activity', JSON.stringify(newMap));
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
      onReorderQuestions: handleReorderQuestions,
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
      consultas,
      onUpdateConsultation: handleUpdateConsultation,
      onAddConsultation: handleAddConsultation,
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
          setCurrentScreen(isActivityFinishedMap[activity.id] ? 'S18' : 'S21h');
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
      case 'S19b': return <TeacherMenu {...commonProps} />;
      case 'S19c': return <TeacherCourses {...commonProps} />;
      case 'S20d': return <TeacherConsultationQueue {...commonProps} />;
      case 'S20e': return <TeacherActivityList {...commonProps} />;
      case 'S21b': return <TeacherInteractionStart {...commonProps} />;
      case 'S21c': return <TeacherInteractionList {...commonProps} />;
      case 'S21e': return <TeacherInteractionEdit {...commonProps} />;
      case 'S21f': return <TeacherInteractionAdd {...commonProps} onInteractionCreated={handleInteractionCreated} />;
      case 'S18': return <TeacherConsultations {...commonProps} />;
      case 'S26': return <TeacherCourseStats {...commonProps} />;
      case 'S27': return <TeacherStudentList {...commonProps} />;
      case 'S01': return <StudentHome onNavigate={setCurrentScreen} />;
      case 'S01_1': return <StudentWelcome onNavigate={setCurrentScreen} />;
      case 'S01_Detail': return <ConsultationSuccess onNavigate={setCurrentScreen} hasConsultation={hasConsultation} isAnonimo={isAnonimo} />;
      case 'S02': return <StudentCourses onNavigate={setCurrentScreen} />;
      case 'S03': return <ConsultaForm onNavigate={setCurrentScreen} onSent={commonProps.onSent} />;
      case 'S04': return <StudentActivityPre onNavigate={setCurrentScreen} />;
      case 'S05': return <ConsultaForm onNavigate={setCurrentScreen} onSent={commonProps.onSent} />;
      case 'S06': return <StudentClass onNavigate={setCurrentScreen} />;
      case 'S22a': return <StudentInteractionIntro onNavigate={setCurrentScreen} />;
      case 'S22b': return <StudentInteractionQuestion onNavigate={setCurrentScreen} />;
      case 'S22c': return <StudentInteractionFeedback onNavigate={setCurrentScreen} />;
      case 'S22b_p2': return <StudentInteractionQuestionv2 onNavigate={setCurrentScreen} />;
      case 'S22c_p2': return <StudentInteractionFeedbackv2 onNavigate={setCurrentScreen} />;
      case 'S22_finalizada': return <StudentInteractionEnd onNavigate={setCurrentScreen} />;
      case 'S19a': return <TeacherDashboard onNavigate={setCurrentScreen} />;
      case 'S19d': return <TeacherCourseCreate onNavigate={setCurrentScreen} />;
      case 'S20a': return <TeacherCourseDetail onNavigate={setCurrentScreen} />
      case 'S20b': return <TeacherActivityAdd onNavigate={setCurrentScreen} />;
      case 'S20c': return <TeacherActivityEdit onNavigate={setCurrentScreen} />;
      case 'S20_ActividadesDocente': return <TeacherActivityDashboard {...commonProps} />;
      case 'S21d': return <TeacherInteractionType onNavigate={setCurrentScreen} />;
      case 'S21h': return <TeacherInteractionResults {...commonProps} />;
      case 'S21j': return <TeacherSessionSummary onNavigate={setCurrentScreen} />;
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

