'use client';

interface ScalePanProps {
  value: number;
  isSwapping: boolean;
  position: 'left' | 'right';
}

export function ScalePan({ value, isSwapping, position }: ScalePanProps) {
  const positionClass = position === 'left' ? '-left-1' : '-right-1';

  const containerClass = isSwapping
    ? 'border-destructive bg-destructive/10'
    : 'border-muted-foreground bg-muted/50';

  const textClass = isSwapping
    ? 'text-destructive'
    : 'text-foreground';

  const ropeClass = isSwapping
    ? 'bg-destructive/70'
    : 'bg-muted-foreground/70';

  return (
    <div className={`absolute ${positionClass} -top-12 flex flex-col items-center`}>
      <div className={`w-12 h-9 border-2 border-t-0 flex items-center justify-center transition-colors ${containerClass}`}>
        <span className={`text-base font-bold transition-colors ${textClass}`}>
          {value}
        </span>
      </div>
      <div className={`w-0.5 h-3 transition-colors ${ropeClass}`} />
    </div>
  );
}
