'use client';

import { ScalePan } from './scale-pan';

interface ScaleBeamProps {
  rotation: number;
  leftValue: number;
  rightValue: number;
  isSwapping: boolean;
}

export function ScaleBeam({ rotation, leftValue, rightValue, isSwapping }: ScaleBeamProps) {
  const beamClass = isSwapping
    ? 'bg-destructive'
    : 'bg-muted-foreground';

  return (
    <div
      className="relative transition-transform duration-500 ease-out"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <ScalePan value={leftValue} isSwapping={isSwapping} position="left" />
      <ScalePan value={rightValue} isSwapping={isSwapping} position="right" />

      {/* Beam */}
      <div className={`w-28 h-1 rounded-full transition-colors ${beamClass}`} />

      {/* Center pivot */}
      <div className={`absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 rounded-full transition-colors ${beamClass}`} />
    </div>
  );
}
