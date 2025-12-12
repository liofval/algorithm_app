'use client';

interface ScaleBaseProps {
  isSwapping: boolean;
}

export function ScaleBase({ isSwapping }: ScaleBaseProps) {
  const baseClass = isSwapping
    ? 'bg-destructive/50'
    : 'bg-muted-foreground/50';

  return (
    <>
      {/* Support pole */}
      <div className={`w-1 h-5 transition-colors ${baseClass}`} />

      {/* Base */}
      <div className={`w-10 h-2 rounded-sm transition-colors ${baseClass}`} />
    </>
  );
}
