export type ScreenId = 
  | 'Login' | 'Perfil'
  | 'S01' | 'S01_1' | 'S01_Detail' | 'S02' | 'S03' | 'S04' | 'S05' | 'S06'
  | 'S22a' | 'S22b' | 'S22c' | 'S22b_p2' | 'S22c_p2' | 'S22_finalizada'
  | 'S19a' | 'S19b' | 'S19c' | 'S19d'
  | 'S20a' | 'S20b' | 'S20c' | 'S20d' | 'S20e' | 'S20_ActividadesDocente'
  | 'S21b' | 'S21c' | 'S21d' | 'S21e' | 'S21f' | 'S21h' | 'S21j'
  | 'S18' | 'S26' | 'S27';

export interface Course {
  id: string;
  name: string;
  code: string;
  ciclo: number;
  creditos: number;
  description?: string;
}

export interface Activity {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Interaction {
  id: number;
  text: string;
  description?: string;
  feedback?: string;
  options: string[];
  correctOptions?: number[]; // indices of correct options
  type: 'opcion_multiple' | 'verdadero_falso' | 'nube_palabras' | 'ranking' | 'texto_libre';
  settings?: {
    multipleAnswers?: boolean;
    showResults?: boolean;
    timeLimit?: number;
    showLeaderboard?: boolean;
    includeDescription?: boolean;
    charLimit?: number;
    answersPerStudent?: number;
  };
}

export interface Consultation {
  id: number;
  nombre: string;
  texto: string;
  tiempo: string;
  avatar: string | null;
  estado: string;
  respondida: boolean;
  activityId?: string;
}

export interface ScreenProps {
  onNavigate: (screen: ScreenId) => void;
  userRole?: 'docente' | 'alumno' | null;
  hasActivity?: boolean;
  onActivityCreated?: (activity: Activity) => void;
  onActivityUpdated?: (activity: Activity) => void;
  hasInteraction?: boolean;
  onInteractionCreated?: (interaction: Interaction) => void;
  onInteractionUpdated?: (interaction: Interaction) => void;
  editingInteraction?: Interaction | null;
  onSetEditingInteraction?: (interaction: Interaction | null) => void;
  activeInteractionId?: number | null;
  onToggleActiveInteraction?: (id: number) => void;
  responseCounts?: { [id: number]: number };
  interactionCount?: number;
  isActivityFinished?: boolean;
  onActivityFinished?: () => void;
  isActivityFinishedMap?: { [id: string]: boolean };
  hasConsultation?: boolean;
  isAnonimo?: boolean;
  hasConsultationsDocente?: boolean;
  consultas?: Consultation[];
  onUpdateConsultation?: (consultation: Consultation) => void;
  onAddConsultation?: (consultation: Consultation) => void;
  onSimulate?: () => void;
  onSent?: (esAnonimo: boolean) => void;
  hasCourse?: boolean;
  onCourseCreated?: (course: Course) => void;
  onCourseUpdated?: (course: Course) => void;
  courses?: Course[];
  selectedCourse?: Course | null;
  onSelectCourse?: (course: Course) => void;
  activities?: Activity[];
  activitiesByCourse?: { [courseCode: string]: Activity[] };
  selectedActivity?: Activity | null;
  onSelectActivity?: (activity: Activity) => void;
  questions?: Interaction[];
  onReorderQuestions?: (activityId: string, newQuestions: Interaction[]) => void;
  questionsByActivity?: { [activityId: string]: Interaction[] };
  selectedInteractionType?: Interaction['type'];
  onSelectInteractionType?: (type: Interaction['type']) => void;
}
