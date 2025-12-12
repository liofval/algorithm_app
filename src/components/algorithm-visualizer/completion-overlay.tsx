'use client';

import { CheckCircle2 } from 'lucide-react';

export function CompletionOverlay() {
  return (
    <div className="absolute inset-0 bg-card/80 flex flex-col items-center justify-center z-10">
      <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
      <h3 className="text-2xl font-bold font-headline text-foreground">
        Algorithm Complete!
      </h3>
      <p className="text-muted-foreground">The array is now sorted.</p>
    </div>
  );
}
