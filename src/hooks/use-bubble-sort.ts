'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface ExecutionState {
  isRunning: boolean;
  activeIndices: number[];
  swapIndices: number[];
  scaleBalanced: boolean; // 天秤が釣り合っている状態かどうか
}

type Step = {
  type: 'compare-start' | 'compare-result' | 'swap';
  indices: [number, number];
  data: number[];
};

function generateBubbleSortSteps(initialData: number[]): Step[] {
  const steps: Step[] = [];
  const data = [...initialData];
  const n = data.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare start - 天秤が釣り合った状態
      steps.push({
        type: 'compare-start',
        indices: [j, j + 1],
        data: [...data],
      });

      if (data[j] > data[j + 1]) {
        // Compare result - 天秤が傾く（スワップが必要な場合のみ）
        steps.push({
          type: 'compare-result',
          indices: [j, j + 1],
          data: [...data],
        });

        // Swap
        [data[j], data[j + 1]] = [data[j + 1], data[j]];
        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          data: [...data],
        });
      } else {
        // スワップ不要の場合は傾きを見せて終わり
        steps.push({
          type: 'compare-result',
          indices: [j, j + 1],
          data: [...data],
        });
      }
    }
  }

  return steps;
}

export const useBubbleSort = (
  assembledBlocks: { block: { id: string } }[],
  initialData: number[]
) => {
  const [data, setData] = useState([...initialData]);
  const [executionState, setExecutionState] = useState<ExecutionState>({
    isRunning: false,
    activeIndices: [],
    swapIndices: [],
    scaleBalanced: false,
  });
  const [speed, setSpeed] = useState(750);
  const [isSorted, setIsSorted] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const stepsRef = useRef<Step[]>([]);
  const stepIndexRef = useRef(0);

  // Reset when blocks change
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setData([...initialData]);
    setExecutionState({
      isRunning: false,
      activeIndices: [],
      swapIndices: [],
      scaleBalanced: false,
    });
    setIsSorted(false);
    stepsRef.current = [];
    stepIndexRef.current = 0;
  }, [assembledBlocks, initialData]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setData([...initialData]);
    setExecutionState({
      isRunning: false,
      activeIndices: [],
      swapIndices: [],
      scaleBalanced: false,
    });
    setIsSorted(false);
    stepsRef.current = [];
    stepIndexRef.current = 0;
  }, [initialData]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const executeStep = useCallback(() => {
    if (stepIndexRef.current >= stepsRef.current.length) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setExecutionState({ isRunning: false, activeIndices: [], swapIndices: [], scaleBalanced: false });
      setIsSorted(true);
      return;
    }

    const step = stepsRef.current[stepIndexRef.current];
    setData([...step.data]);

    if (step.type === 'compare-start') {
      setExecutionState((prev) => ({
        ...prev,
        activeIndices: step.indices,
        swapIndices: [],
        scaleBalanced: true, // 釣り合った状態
      }));
    } else if (step.type === 'compare-result') {
      setExecutionState((prev) => ({
        ...prev,
        activeIndices: step.indices,
        swapIndices: [],
        scaleBalanced: false, // 傾いた状態
      }));
    } else {
      setExecutionState((prev) => ({
        ...prev,
        activeIndices: [],
        swapIndices: step.indices,
        scaleBalanced: false,
      }));
    }

    stepIndexRef.current++;
  }, []);

  const run = useCallback(() => {
    if (isSorted) {
      reset();
      return;
    }

    // Generate steps if not already done
    if (stepsRef.current.length === 0) {
      stepsRef.current = generateBubbleSortSteps(initialData);
      stepIndexRef.current = 0;
    }

    setExecutionState((prev) => ({ ...prev, isRunning: true }));
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(executeStep, speed);
  }, [isSorted, reset, initialData, executeStep, speed]);

  const pause = useCallback(() => {
    setExecutionState((prev) => ({ ...prev, isRunning: false }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
    if (executionState.isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(executeStep, newSpeed);
    }
  }, [executionState.isRunning, executeStep]);

  return { data, executionState, run, pause, reset, setSpeed: handleSpeedChange, speed, isSorted };
};
