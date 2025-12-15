export interface DisasterPhase {
  id: string;
  name: string;
  shortName: string;
  description: string;
  completed: boolean;
  data?: Record<string, any>;
}

export interface OperationalPeriod {
  id: string;
  number: number;
  startTime: Date;
  endTime?: Date;
  phases: DisasterPhase[];
}

export const PLANNING_P_PHASES: Omit<DisasterPhase, 'completed' | 'data'>[] = [
  {
    id: 'initial-response',
    name: 'Initial Response & Assessment',
    shortName: 'Initial Response',
    description: 'Immediate response and situation assessment'
  },
  {
    id: 'incident-briefing',
    name: 'Incident Briefing',
    shortName: 'Incident Briefing',
    description: 'Brief key personnel on the current incident situation'
  }
];

export const OPERATIONAL_PERIOD_PHASES: Omit<DisasterPhase, 'completed' | 'data'>[] = [
  {
    id: 'ics-202-objectives',
    name: 'ICS-202 Objectives',
    shortName: 'ICS-202 Objectives',
    description: 'Incident Objectives'
  },
  {
    id: 'ics-233-actions',
    name: 'ICS-233 Actions',
    shortName: 'ICS-233 Actions',
    description: 'Work Assignment Actions'
  }
];