import { Check, Clock, ChevronDown, ArrowLeft, Calendar, BarChart3, FileText, Settings } from 'lucide-react';
import { DisasterPhase } from '../types/disaster';
import { Button } from './ui/button';

interface PlanningPStepperProps {
  phases: DisasterPhase[];
  currentPhaseId: string;
  onPhaseSelect: (phaseId: string) => void;
  operationalPeriodNumber?: number;
  showHeader?: boolean;
}

export function PlanningPStepper({ phases, currentPhaseId, onPhaseSelect, operationalPeriodNumber = 0, showHeader = true }: PlanningPStepperProps) {
  
  return (
    <div className="px-6 bg-card">
      {/* Horizontal Tab Navigation */}
      <div className="flex items-center justify-center gap-1 overflow-x-auto">
        {phases.map((phase) => {
          const isActive = phase.id === currentPhaseId;

          // No descriptive text for new tabs
          const descriptiveText = null;

          return (
            <button
              key={phase.id}
              onClick={() => onPhaseSelect(phase.id)}
              className={`relative px-4 py-3 transition-colors whitespace-nowrap ${
                isActive
                  ? 'text-accent'
                  : 'text-foreground hover:text-accent'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="caption">
                  {phase.shortName}
                </span>
                
                {/* Descriptive text for Operational Period 0 */}
                {descriptiveText && (
                  <span className="caption text-muted-foreground/60">
                    {descriptiveText}
                  </span>
                )}
              </div>
              
              {/* Active indicator line */}
              {isActive && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}