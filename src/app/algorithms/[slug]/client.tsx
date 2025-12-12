'use client';

import type { Algorithm, CodeBlock } from '@/lib/types';
import { Header } from '@/components/header';
import { VisualizerWorkspace } from '@/components/algorithm-visualizer/visualizer-workspace';

interface AlgorithmPageClientProps {
  algorithm: Algorithm;
  availableBlocks: CodeBlock[];
}

export function AlgorithmPageClient({
  algorithm,
  availableBlocks,
}: AlgorithmPageClientProps) {
  return (
    <div className="flex h-screen w-full flex-col bg-secondary">
      <Header />
      <main className="flex-1 overflow-hidden">
        <VisualizerWorkspace
          algorithm={algorithm}
          availableBlocks={availableBlocks}
        />
      </main>
    </div>
  );
}
