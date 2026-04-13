export type ScreenId = 
  | 'Login' | 'Perfil'
  | 'S01' | 'S01_1' | 'S01_Detail' | 'S02' | 'S03' | 'S04' | 'S05' | 'S06'
  | 'S22a' | 'S22b' | 'S22c' | 'S22b_p2' | 'S22c_p2' | 'S22_finalizada'
  | 'S19a' | 'S19b' | 'S19c' | 'S19d'
  | 'S20a' | 'S20b' | 'S20c' | 'S20d' | 'S20e' | 'S20_ActividadesDocente'
  | 'S21b' | 'S21c' | 'S21d' | 'S21e' | 'S21f' | 'S21h' | 'S21j'
  | 'S18' | 'S26' | 'S27';

export interface ScreenProps {
  onNavigate: (screen: ScreenId) => void;
  userRole?: 'docente' | 'alumno' | null;
  hasActivity?: boolean;
  onActivityCreated?: () => void;
  hasInteraction?: boolean;
  onInteractionCreated?: (text: string, options: string[]) => void;
  interactionCount?: number;
  isActivityFinished?: boolean;
  onActivityFinished?: () => void;
  hasConsultation?: boolean;
  isAnonimo?: boolean;
  hasConsultationsDocente?: boolean;
  onSimulate?: () => void;
  onSent?: (esAnonimo: boolean) => void;
  questions?: { id: number; text: string; options: string[] }[];
}
