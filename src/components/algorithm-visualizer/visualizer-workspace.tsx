'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import type { Algorithm, CodeBlock, AssembledBlock } from '@/lib/types';
import { AssemblyArea } from './assembly-area';
import { VisualizationArea } from './visualization-area';
import { BlockPalette } from './block-palette';
import { ControlPanel } from './control-panel';
import { useBubbleSort } from '@/hooks/use-bubble-sort';
import { DescriptionPanel } from './description-panel';

interface VisualizerWorkspaceProps {
  algorithm: Algorithm;
  availableBlocks: CodeBlock[];
}

export function VisualizerWorkspace({
  algorithm,
  availableBlocks,
}: VisualizerWorkspaceProps) {
  const [assembledBlocks, setAssembledBlocks] = useState<AssembledBlock[]>([]);

  // This is a placeholder for a more dynamic system.
  // For now, we only have one algorithm hook.
  const {
    data,
    executionState,
    run,
    pause,
    reset,
    setSpeed,
    speed,
    isSorted,
  } = useBubbleSort(assembledBlocks, algorithm.initialData);

  const handleDrop = (
    block: CodeBlock,
    index: number,
    level: number
  ) => {
    const newBlock: AssembledBlock = {
      instanceId: `${block.id}-${Date.now()}`,
      block,
      level,
    };
    const newBlocks = [...assembledBlocks];
    newBlocks.splice(index, 0, newBlock);
    setAssembledBlocks(newBlocks);
  };

  const handleBlockUpdate = (newBlocks: AssembledBlock[]) => {
    setAssembledBlocks(newBlocks);
  };

  return (
    <div className="flex h-full w-full p-4 gap-4">
      <div className="w-1/3 flex flex-col gap-4">
        <DescriptionPanel algorithm={algorithm} />
        <AssemblyArea
          blocks={assembledBlocks}
          onDrop={handleDrop}
          onBlockUpdate={handleBlockUpdate}
        />
      </div>
      <div className="w-2/3 flex flex-col gap-4">
        <div className="flex-grow rounded-lg border bg-card text-card-foreground shadow-sm p-4 relative">
          <ControlPanel
            onRun={run}
            onPause={pause}
            onReset={reset}
            onSpeedChange={setSpeed}
            speed={speed}
            isRunning={executionState.isRunning}
          />
          <VisualizationArea data={data} executionState={executionState} isSorted={isSorted} />
        </div>
        <BlockPalette blocks={availableBlocks} />
      </div>
    </div>
  );
}
