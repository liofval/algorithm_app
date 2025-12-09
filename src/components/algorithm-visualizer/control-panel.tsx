'use client';

import { Play, Pause, RotateCcw, Rabbit, Turtle, Snail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ControlPanelProps {
  onRun: () => void;
  onPause: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  speed: number;
  isRunning: boolean;
}

export function ControlPanel({
  onRun,
  onPause,
  onReset,
  onSpeedChange,
  speed,
  isRunning,
}: ControlPanelProps) {

  const speedLevels = [
    { value: 1500, label: 'Slow', icon: Snail },
    { value: 750, label: 'Normal', icon: Turtle },
    { value: 250, label: 'Fast', icon: Rabbit },
  ];

  return (
    <div className="absolute top-4 right-4 left-4 z-10 flex items-center justify-between p-2 rounded-lg bg-card/80 backdrop-blur-sm border">
      <div className="flex items-center gap-2">
        {!isRunning ? (
          <Button size="icon" onClick={onRun}>
            <Play className="h-4 w-4" />
            <span className="sr-only">Run</span>
          </Button>
        ) : (
          <Button size="icon" onClick={onPause} variant="outline">
            <Pause className="h-4 w-4" />
            <span className="sr-only">Pause</span>
          </Button>
        )}
        <Button size="icon" variant="outline" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
          <span className="sr-only">Reset</span>
        </Button>
      </div>

      <div className="flex items-center gap-4 w-48">
        <Label htmlFor="speed" className="text-sm">Speed</Label>
        <TooltipProvider>
        <div className="flex items-center gap-2 w-full">
            {speedLevels.map(({value, label, icon: Icon}) => (
                <Tooltip key={label}>
                    <TooltipTrigger asChild>
                        <Button variant={speed === value ? 'default' : 'ghost'} size="icon" onClick={() => onSpeedChange(value)}>
                            <Icon className="h-5 w-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{label}</p>
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
        </TooltipProvider>
      </div>
    </div>
  );
}
