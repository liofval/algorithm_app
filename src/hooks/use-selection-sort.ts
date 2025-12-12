'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface SelectionSortExecutionState {
  isRunning: boolean;
  currentIndex: number;      // 現在のi（ソート済み境界）
  minIndex: number;          // 現在の最小値のインデックス
  comparingIndex: number;    // 比較中のj
  swapIndices: number[];     // スワップ中のインデックス
  phase: 'idle' | 'comparing' | 'found-min' | 'swapping';
}

type Step = {
  type: 'compare-start' | 'compare-result' | 'update-min' | 'swap';
  data: number[];
  currentIndex: number;
  minIndex: number;
  comparingIndex: number;
};

function generateSelectionSortSteps(initialData: number[]): Step[] {
  const steps: Step[] = [];
  const data = [...initialData];
  const n = data.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      // 比較開始（天秤が釣り合った状態）
      steps.push({
        type: 'compare-start',
        data: [...data],
        currentIndex: i,
        minIndex: minIdx,
        comparingIndex: j,
      });

      // 比較結果（天秤が傾いた状態）
      steps.push({
        type: 'compare-result',
        data: [...data],
        currentIndex: i,
        minIndex: minIdx,
        comparingIndex: j,
      });

      if (data[j] < data[minIdx]) {
        minIdx = j;
        // 最小値更新
        steps.push({
          type: 'update-min',
          data: [...data],
          currentIndex: i,
          minIndex: minIdx,
          comparingIndex: j,
        });
      }
    }

    // スワップ（必要な場合のみ）
    if (minIdx !== i) {
      [data[i], data[minIdx]] = [data[minIdx], data[i]];
      steps.push({
        type: 'swap',
        data: [...data],
        currentIndex: i,
        minIndex: minIdx,
        comparingIndex: -1,
      });
    }
  }

  return steps;
}

export const useSelectionSort = (
  assembledBlocks: { block: { id: string } }[],
  initialData: number[]
) => {
  const [data, setData] = useState([...initialData]);
  const [executionState, setExecutionState] = useState<SelectionSortExecutionState>({
    isRunning: false,
    currentIndex: -1,
    minIndex: -1,
    comparingIndex: -1,
    swapIndices: [],
    phase: 'idle',
  });
  const [speed, setSpeed] = useState(750);
  const [isSorted, setIsSorted] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const stepsRef = useRef<Step[]>([]);
  const stepIndexRef = useRef(0);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setData([...initialData]);
    setExecutionState({
      isRunning: false,
      currentIndex: -1,
      minIndex: -1,
      comparingIndex: -1,
      swapIndices: [],
      phase: 'idle',
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
      currentIndex: -1,
      minIndex: -1,
      comparingIndex: -1,
      swapIndices: [],
      phase: 'idle',
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
      setExecutionState({
        isRunning: false,
        currentIndex: -1,
        minIndex: -1,
        comparingIndex: -1,
        swapIndices: [],
        phase: 'idle',
      });
      setIsSorted(true);
      return;
    }

    const step = stepsRef.current[stepIndexRef.current];
    setData([...step.data]);

    switch (step.type) {
      case 'compare-start':
        setExecutionState((prev) => ({
          ...prev,
          currentIndex: step.currentIndex,
          minIndex: step.minIndex,
          comparingIndex: step.comparingIndex,
          swapIndices: [],
          phase: 'comparing',
        }));
        break;
      case 'compare-result':
        setExecutionState((prev) => ({
          ...prev,
          currentIndex: step.currentIndex,
          minIndex: step.minIndex,
          comparingIndex: step.comparingIndex,
          swapIndices: [],
          phase: 'comparing',
        }));
        break;
      case 'update-min':
        setExecutionState((prev) => ({
          ...prev,
          currentIndex: step.currentIndex,
          minIndex: step.minIndex,
          comparingIndex: step.comparingIndex,
          swapIndices: [],
          phase: 'found-min',
        }));
        break;
      case 'swap':
        setExecutionState((prev) => ({
          ...prev,
          currentIndex: step.currentIndex,
          minIndex: -1,
          comparingIndex: -1,
          swapIndices: [step.currentIndex, step.minIndex],
          phase: 'swapping',
        }));
        break;
    }

    stepIndexRef.current++;
  }, []);

  const run = useCallback(() => {
    if (isSorted) {
      reset();
      return;
    }

    if (stepsRef.current.length === 0) {
      stepsRef.current = generateSelectionSortSteps(initialData);
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
