'use client';

interface BarProps {
  value: number;
  index: number;
  height: number;
  isActive: boolean;
  isSwap: boolean;
  isSorted: boolean;
}

function Bar({ value, index, height, isActive, isSwap, isSorted }: BarProps) {
  const backgroundColor = getBackgroundColor(isActive, isSwap, isSorted);
  const indexClass = isActive || isSwap
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
    </div>
  );
}

function getBackgroundColor(isActive: boolean, isSwap: boolean, isSorted: boolean): string {
  if (isSorted) return 'bg-green-500';
  if (isSwap) return 'bg-destructive';
  if (isActive) return 'bg-accent';
  return 'bg-primary';
}

interface BarChartProps {
  data: number[];
  activeIndices: number[];
  swapIndices: number[];
  isSorted: boolean;
}

export function BarChart({ data, activeIndices, swapIndices, isSorted }: BarChartProps) {
  const maxValue = Math.max(...data, 1);

  return (
    <div className="flex items-end">
      {data.map((value, index) => {
        const barHeight = (value / maxValue) * 100 + 20;
        const isActive = activeIndices.includes(index);
        const isSwap = swapIndices.includes(index);

        return (
          <Bar
            key={index}
            value={value}
            index={index}
            height={barHeight}
            isActive={isActive}
            isSwap={isSwap}
            isSorted={isSorted}
          />
        );
      })}
    </div>
  );
}

// バーのサイズ定数をエクスポート
export const BAR_WIDTH = 44;
export const BAR_MARGIN = 8;
export const BAR_TOTAL_WIDTH = BAR_WIDTH + BAR_MARGIN;
