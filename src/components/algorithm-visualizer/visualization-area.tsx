'use client';

import React from 'react';
import type { ExecutionState } from '@/hooks/use-bubble-sort';
import { CheckCircle2 } from 'lucide-react';

interface VisualizationAreaProps {
  data: number[];
  executionState: ExecutionState;
  isSorted: boolean;
}

export function VisualizationArea({ data, executionState, isSorted }: VisualizationAreaProps) {
  const { activeIndices, swapIndices } = executionState;

  return (
    <div className="flex flex-col items-center justify-center h-full pt-16">
      {isSorted && (
        <div className="absolute inset-0 bg-card/80 flex flex-col items-center justify-center z-10">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-2xl font-bold font-headline text-foreground">Algorithm Complete!</h3>
            <p className="text-muted-foreground">The array is now sorted.</p>
        </div>
      )}
      <div className="flex space-x-2 h-24 items-end">
        {data.map((value, index) => {
          const height = `${(value / Math.max(...data, 1)) * 80 + 20}%`;
          const isActive = activeIndices.includes(index);
          const isSwapping = swapIndices.includes(index);
          
          let backgroundColor = 'bg-primary';
          if (isActive) backgroundColor = 'bg-accent';
          if (isSwapping) backgroundColor = 'bg-destructive';
          if (isSorted) backgroundColor = 'bg-green-500';

          return (
            <div key={`${value}-${index}`} className="relative text-center">
              <div
                className={`w-10 rounded-t-md transition-all duration-300 ease-in-out ${backgroundColor}`}
                style={{ height }}
              >
                <span className="text-xs font-bold absolute -top-5 left-1/2 -translate-x-1/2 text-foreground">
                  {value}
                </span>
              </div>
              <div className="text-xs mt-1 text-muted-foreground w-10 text-center">{index}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
