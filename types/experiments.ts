export interface Experiment {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  path: string;
  theory: Theory;
  preparation: Preparation;
  procedure: string[];
  questions: string[];
}

export interface Theory {
  title: string;
  content: string;
  formula?: string;
  image?: string;
}

export interface Preparation {
  samples: string[];
  chemicals: string[];
  equipment: string[];
  safetyNotes?: string[];
}

export interface ExperimentResult {
  experimentId: string;
  groupName: string;
  studentName: string;
  date: string;
  observations: Observation[];
  conclusion: string;
  answers: { [key: string]: string };
}

export interface Observation {
  step: number;
  description: string;
  result: string;
  color?: string;
}

// Benedict Test Types
export interface BenedictSample {
  id: string;
  name: string;
  type: 'water' | 'fruit' | 'glucose' | 'sucrose';
  initialColor: string;
  finalColor: string;
  hasReducingSugar: boolean;
}

// Lugol Test Types
export interface LugolSample {
  id: string;
  name: string;
  type: 'green-banana' | 'ripe-banana';
  initialColor: string;
  finalColor: string;
  hasStarch: boolean;
}

// Biuret Test Types
export interface BiuretSample {
  id: string;
  name: string;
  type: 'water' | 'egg-white';
  initialColor: string;
  finalColor: string;
  hasProtein: boolean;
}

export type ExperimentStep = 
  | 'select-sample'
  | 'add-reagent'
  | 'heat'
  | 'observe'
  | 'record';

export interface SimulationState {
  currentStep: ExperimentStep;
  selectedSample?: string;
  reagentAdded: boolean;
  heated: boolean;
  temperature: number;
  colorChanged: boolean;
  currentColor: string;
  completed: boolean;
}

