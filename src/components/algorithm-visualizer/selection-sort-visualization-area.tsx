'use client';

import type { SelectionSortExecutionState } from '@/hooks/use-selection-sort';
import { Scale } from './scale';
import { SelectionSortBarChart, BAR_TOTAL_WIDTH, BAR_WIDTH } from './selection-sort-bar-chart';
import { CompletionOverlay } from './completion-overlay';

interface SelectionSortVisualizationAreaProps {
  data: number[];
  executionState: SelectionSortExecutionState;
  isSorted: boolean;
}

function getStatusMessage(
  phase: SelectionSortExecutionState['phase'],
  currentIndex: number,
  minIndex: number,
  comparingIndex: number,
  minValue: number,
  comparingValue: number
): string {
  switch (phase) {
    case 'comparing':
      return `[${comparingIndex}]の値${comparingValue}と現在の最小値${minValue}（[${minIndex}]）を比較中...`;
    case 'found-min':
      return `新しい最小値を発見！ [${minIndex}]の値${minValue}が最小`;
    case 'swapping':
      return `[${currentIndex}]と[${minIndex}]をスワップ`;
    default:
      return '';
  }
}

function calculateScalePosition(minIndex: number, comparingIndex: number): number {
  const leftIndex = Math.min(minIndex, comparingIndex);
  const rightIndex = Math.max(minIndex, comparingIndex);
  const SCALE_HALF_WIDTH = 56;
  const centerX = (leftIndex + rightIndex) / 2 * BAR_TOTAL_WIDTH + BAR_WIDTH / 2;
  return centerX - SCALE_HALF_WIDTH;
}

export function SelectionSortVisualizationArea({
  data,
  executionState,
  isSorted
}: SelectionSortVisualizationAreaProps) {
  const { phase, currentIndex, minIndex, comparingIndex, swapIndices } = executionState;

  const isComparing = phase === 'comparing' || phase === 'found-min';
  const isSwapping = phase === 'swapping';
  const showScale = isComparing && minIndex >= 0 && comparingIndex >= 0;

  const minValue = minIndex >= 0 ? data[minIndex] : 0;
  const comparingValue = comparingIndex >= 0 ? data[comparingIndex] : 0;

  // 天秤の左右の値（インデックスの小さい方が左）
  const leftIndex = showScale ? Math.min(minIndex, comparingIndex) : -1;
  const rightIndex = showScale ? Math.max(minIndex, comparingIndex) : -1;
  const leftValue = leftIndex >= 0 ? data[leftIndex] : 0;
  const rightValue = rightIndex >= 0 ? data[rightIndex] : 0;

  // 天秤の傾き：found-minの時は傾く、comparingの時は釣り合う
  const isBalanced = phase === 'comparing';
  const leftHeavier = leftValue > rightValue;

  const statusMessage = getStatusMessage(
    phase,
    currentIndex,
    minIndex,
    comparingIndex,
    minValue,
    comparingValue
  );

  return (
    <div className="flex flex-col items-center justify-start h-full pt-16 overflow-y-auto">
      {isSorted && <CompletionOverlay />}

      <div className="relative">
        <SelectionSortBarChart
          data={data}
          executionState={executionState}
          isSorted={isSorted}
        />

        {showScale && leftIndex >= 0 && (
          <div
            className="absolute transition-all duration-300"
            style={{
              left: `${calculateScalePosition(minIndex, comparingIndex)}px`,
              top: 'calc(100% + 60px)',
            }}
          >
            <Scale
              leftValue={leftValue}
              rightValue={rightValue}
              isSwapping={false}
              isBalanced={isBalanced}
            />
          </div>
        )}
      </div>

      {showScale && <div className="h-32" />}

      {statusMessage && (
        <div className="mt-8 text-sm text-foreground bg-muted px-4 py-2 rounded-lg">
          {statusMessage}
        </div>
      )}

      {!showScale && !isSwapping && !isSorted && phase === 'idle' && (
        <div className="mt-8 text-sm text-muted-foreground flex items-center">
          再生ボタンを押してソートを開始
        </div>
      )}

      {isSwapping && (
        <div className="mt-8 text-sm text-destructive font-bold bg-destructive/10 px-4 py-2 rounded-lg">
          スワップ中: [{swapIndices[0]}] ↔ [{swapIndices[1]}]
        </div>
      )}

      <div className="mt-4 flex gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span>ソート済み</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span>現在位置 (i)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span>最小値候補</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-accent" />
          <span>比較中</span>
        </div>
      </div>
    </div>
  );
}
