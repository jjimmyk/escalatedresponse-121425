import { Button } from '../ui/button';

interface GenericPhaseProps {
  phase: {
    id: string;
    name: string;
    description: string;
  };
  data?: Record<string, any>;
  onDataChange: (data: Record<string, any>) => void;
  onComplete: () => void;
  onPrevious: () => void;
  isFirst?: boolean;
}

export function GenericPhase({ phase, data = {}, onDataChange, onComplete, onPrevious, isFirst = false }: GenericPhaseProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-muted-foreground">{phase.name}</h2>
        <p className="text-muted-foreground">{phase.description}</p>
        <div className="flex gap-4 justify-center pt-6">
        <Button variant="outline" onClick={onPrevious} disabled={isFirst}>
          Previous
        </Button>
        <Button 
          onClick={onComplete}
          className="bg-primary hover:bg-primary/90"
        >
          Complete & Continue
        </Button>
        </div>
      </div>
    </div>
  );
}