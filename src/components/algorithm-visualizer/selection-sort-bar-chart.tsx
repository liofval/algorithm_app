'use client';

import type { SelectionSortExecutionState } from '@/hooks/use-selection-sort';

interface BarProps {
  value: number;
  index: number;
  height: number;
  status: 'sorted' | 'current' | 'min' | 'comparing' | 'swapping' | 'default';
  isSorted: boolean;
}

function Bar({ value, index, height, status, isSorted }: BarProps) {
  const backgroundColor = getBackgroundColor(status, isSorted);
  const indexClass = status !== 'default' && status !== 'sorted'
    ? 'text-foreground font-bold'
    : 'text-muted-foreground';

  return (
    <div className="flex flex-col items-center mx-1">
      <span className="text-xs font-bold mb-1 text-foreground">
        {value}
      </span>
      <div
        className={`w-11 rounded-t-md transition-all duration-300 ease-in-out ${backgroundColor}`}
        style={{ height: `${height}px` }}
      />
      <div className={`text-xs mt-1 w-11 text-center ${indexClass}`}>
        [{index}]
      </div>
      {status !== 'default' && status !== 'sorted' && (
        <div className={`text-xs mt-0.5 ${getStatusLabelClass(status)}`}>
          {getStatusLabel(status)}
        </div>
      )}
    </div>
  );
}

function getBackgroundColor(status: BarProps['status'], isSorted: boolean): string {
  if (isSorted) return 'bg-green-500';
  switch (status) {
    case 'sorted': return 'bg-green-500';
    case 'swapping': return 'bg-destructive';
    case 'min': return 'bg-yellow-500';
    case 'comparing': return 'bg-accent';
    case 'current': return 'bg-blue-500';
    default: return 'bg-primary';
  }
}

function getStatusLabel(status: BarProps['status']): string {
  switch (status) {
    case 'min': return 'min';
    case 'comparing': return '比較';
    case 'current': return 'i';
    case 'swapping': return 'swap';
    default: return '';
  }
}

function getStatusLabelClass(status: BarProps['status']): string {
  switch (status) {
    case 'min': return 'text-yellow-600 font-bold';
    case 'comparing': return 'text-accent-foreground';
    case 'current': return 'text-blue-600 font-bold';
    case 'swapping': return 'text-destructive font-bold';
    default: return 'text-muted-foreground';
  }
}

interface SelectionSortBarChartProps {
  data: number[];
  executionState: SelectionSortExecutionState;
  isSorted: boolean;
}

export function SelectionSortBarChart({ data, executionState, isSorted }: SelectionSortBarChartProps) {
  const maxValue = Math.max(...data, 1);
  const { currentIndex, minIndex, comparingIndex, swapIndices } = executionState;

  const getBarStatus = (index: number): BarProps['status'] => {
    if (isSorted) return 'sorted';
    if (swapIndices.includes(index)) return 'swapping';
    if (index < currentIndex) return 'sorted';
    if (index === minIndex && minIndex !== currentIndex) return 'min';
    if (index === comparingIndex) return 'comparing';
    if (index === currentIndex && currentIndex >= 0) return 'current';
    return 'default';
  };

  return (
    <div className="flex items-end">
      {data.map((value, index) => {
        const barHeight = (value / maxValue) * 100 + 20;
        const status = getBarStatus(index);

        return (
          <Bar
            key={index}
            value={value}
            index={index}
            height={barHeight}
            status={status}
            isSorted={isSorted}
          />
        );
      })}
    </div>
  );
}

export const BAR_WIDTH = 44;
export const BAR_MARGIN = 8;
export const BAR_TOTAL_WIDTH = BAR_WIDTH + BAR_MARGIN;
