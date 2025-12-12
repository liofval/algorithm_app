'use client';

import { useState, useMemo } from 'react';
import type { Algorithm, CodeBlock, AssembledBlock } from '@/lib/types';
import { AssemblyArea } from './assembly-area';
import { VisualizationArea } from './visualization-area';
import { SelectionSortVisualizationArea } from './selection-sort-visualization-area';
import { BlockPalette } from './block-palette';
import { ControlPanel } from './control-panel';
import { useBubbleSort } from '@/hooks/use-bubble-sort';
import { useSelectionSort } from '@/hooks/use-selection-sort';
import { DescriptionPanel } from './description-panel';

type ValidationResult = {
  isCorrect: boolean;
  message: string;
};

interface VisualizerWorkspaceProps {
  algorithm: Algorithm;
  availableBlocks: CodeBlock[];
}

function validateAssembly(
  assembledBlocks: AssembledBlock[],
  availableBlocks: CodeBlock[]
): ValidationResult {
  if (assembledBlocks.length === 0) {
    return { isCorrect: false, message: '' };
  }

  const expectedBlocks = [...availableBlocks].sort((a, b) => a.order - b.order);

  if (assembledBlocks.length !== expectedBlocks.length) {
    return {
      isCorrect: false,
      message: `ブロックが${assembledBlocks.length < expectedBlocks.length ? '足りません' : '多すぎます'}（${assembledBlocks.length}/${expectedBlocks.length}）`,
    };
  }

  for (let i = 0; i < expectedBlocks.length; i++) {
    const assembled = assembledBlocks[i];
    const expected = expectedBlocks[i];

    if (assembled.block.id !== expected.id) {
      return {
        isCorrect: false,
        message: `${i + 1}番目のブロックの順序が間違っています`,
      };
    }

    if (assembled.level !== expected.correctLevel) {
      return {
        isCorrect: false,
        message: `「${assembled.block.codeSnippet}」のインデントが間違っています`,
      };
    }
  }

  return { isCorrect: true, message: '正解！アルゴリズムを実行できます' };
}

export function VisualizerWorkspace({
  algorithm,
  availableBlocks,
}: VisualizerWorkspaceProps) {
  const [assembledBlocks, setAssembledBlocks] = useState<AssembledBlock[]>([]);

  const validation = useMemo(
    () => validateAssembly(assembledBlocks, availableBlocks),
    [assembledBlocks, availableBlocks]
  );

  const isSelectionSort = algorithm.id === 'selection-sort';

  const bubbleSortHook = useBubbleSort(assembledBlocks, algorithm.initialData);
  const selectionSortHook = useSelectionSort(assembledBlocks, algorithm.initialData);

  const {
    data,
    executionState,
    run,
    pause,
    reset,
    setSpeed,
    speed,
    isSorted,
  } = isSelectionSort ? selectionSortHook : bubbleSortHook;

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
          validation={validation}
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
            canRun={validation.isCorrect}
          />
          {isSelectionSort ? (
            <SelectionSortVisualizationArea
              data={data}
              executionState={selectionSortHook.executionState}
              isSorted={isSorted}
            />
          ) : (
            <VisualizationArea
              data={data}
              executionState={bubbleSortHook.executionState}
              isSorted={isSorted}
            />
          )}
        </div>
        <BlockPalette blocks={availableBlocks} />
      </div>
    </div>
  );
}
