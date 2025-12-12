'use client';

import type { ExecutionState } from '@/hooks/use-bubble-sort';
import { Scale } from './scale';
import { BarChart, BAR_TOTAL_WIDTH, BAR_WIDTH } from './bar-chart';
import { StatusMessage } from './status-message';
import { CompletionOverlay } from './completion-overlay';

interface VisualizationAreaProps {
  data: number[];
  executionState: ExecutionState;
  isSorted: boolean;
}

type ComparisonStatus = 'comparing' | 'need-swap' | 'no-swap' | 'swapping';

function getComparisonStatus(
  isSwapping: boolean,
  isBalanced: boolean,
  leftHeavier: boolean
): ComparisonStatus {
  if (isSwapping) return 'swapping';
  if (isBalanced) return 'comparing';
  return leftHeavier ? 'need-swap' : 'no-swap';
}

function calculateScalePosition(leftIndex: number): number {
  const SCALE_HALF_WIDTH = 56;
  return leftIndex * BAR_TOTAL_WIDTH + BAR_TOTAL_WIDTH + BAR_WIDTH / 2 - SCALE_HALF_WIDTH;
}

export function VisualizationArea({ data, executionState, isSorted }: VisualizationAreaProps) {
  const { activeIndices, swapIndices, scaleBalanced } = executionState;

  const isComparing = activeIndices.length === 2;
  const isSwapping = swapIndices.length === 2;
  const showScale = isComparing || isSwapping;

  const comparedIndices = isSwapping ? swapIndices : activeIndices;
  const leftIndex = comparedIndices.length === 2 ? Math.min(...comparedIndices) : -1;
  const rightIndex = comparedIndices.length === 2 ? Math.max(...comparedIndices) : -1;

  const leftValue = leftIndex >= 0 ? data[leftIndex] : 0;
  const rightValue = rightIndex >= 0 ? data[rightIndex] : 0;
  const leftHeavier = leftValue > rightValue;

  const status = getComparisonStatus(isSwapping, scaleBalanced, leftHeavier);

  return (
    <div className="flex flex-col items-center justify-start h-full pt-16 overflow-y-auto">
      {isSorted && <CompletionOverlay />}

      <div className="relative">
        <BarChart
          data={data}
          activeIndices={activeIndices}
          swapIndices={swapIndices}
          isSorted={isSorted}
        />

        {showScale && leftIndex >= 0 && (
          <div
            className="absolute transition-all duration-300"
            style={{
              left: `${calculateScalePosition(leftIndex)}px`,
              top: 'calc(100% + 40px)',
            }}
          >
            <Scale
              leftValue={leftValue}
              rightValue={rightValue}
              isSwapping={isSwapping}
              isBalanced={scaleBalanced}
            />
          </div>
        )}
      </div>

      {showScale && <div className="h-32" />}

      {showScale && (
        <StatusMessage
          status={status}
          leftIndex={leftIndex}
          rightIndex={rightIndex}
          leftValue={leftValue}
          rightValue={rightValue}
        />
      )}

      {!showScale && !isSorted && (
        <div className="mt-8 text-sm text-muted-foreground flex items-center">
          再生ボタンを押してソートを開始
        </div>
      )}
    </div>
  );
}
