'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { AssembledBlock } from '@/lib/types';

export interface ExecutionState {
  isRunning: boolean;
  activeIndices: number[];
  swapIndices: number[];
}

// A simple interpreter for bubble sort logic
const createBubbleSortInterpreter = (assembledBlocks: AssembledBlock[], array: number[]) => {
  let i = 0;
  let j = 0;
  let n = array.length;
  let programCounter = 0;
  let loopStack: { pc: number, counter: 'i' | 'j', end: number }[] = [];
  let conditionResult = false;
  let data = [...array];

  const step = () => {
    if (programCounter >= assembledBlocks.length) {
      // Reached end of user code, maybe check if sorted
      return { data, active: [], swap: [], done: true };
    }

    const currentBlock = assembledBlocks[programCounter];
    let active: number[] = [];
    let swap: number[] = [];
    let done = false;

    switch (currentBlock.block.logicId) {
      case 'loop_i':
        if (loopStack.find(l => l.counter === 'i')) {
          // Exiting loop
          i++;
          programCounter = loopStack.pop()!.pc;
        } else {
          // Entering loop
          if (i < n - 1) {
            loopStack.push({ pc: programCounter, counter: 'i', end: n - 1 });
            j = 0; // Reset inner loop counter
          } else {
             // Find end of loop and skip
            let level = currentBlock.level;
            let pc = programCounter + 1;
            while(pc < assembledBlocks.length && assembledBlocks[pc].level > level) {
                pc++;
            }
            programCounter = pc -1; // it will be incremented later
          }
        }
        break;

      case 'loop_j':
        if (loopStack.find(l => l.counter === 'j')) {
            // Exiting loop
            j++;
            programCounter = loopStack.pop()!.pc;
        } else {
           // Entering loop
           if (j < n - i - 1) {
                loopStack.push({ pc: programCounter, counter: 'j', end: n - i - 1 });
           } else {
                // Find end of loop and skip
                let level = currentBlock.level;
                let pc = programCounter + 1;
                while(pc < assembledBlocks.length && assembledBlocks[pc].level > level) {
                    pc++;
                }
                programCounter = pc - 1; // it will be incremented later
           }
        }
        break;
      
      case 'if_gt':
        active = [j, j + 1];
        if (data[j] > data[j + 1]) {
          conditionResult = true;
        } else {
          conditionResult = false;
          // Skip next block if it's the swap block and at the correct indent
          const nextBlock = assembledBlocks[programCounter + 1];
          if (nextBlock && nextBlock.block.logicId === 'swap' && nextBlock.level > currentBlock.level) {
            programCounter++;
          }
        }
        break;
      
      case 'swap':
        if (conditionResult) {
          swap = [j, j+1];
          [data[j], data[j + 1]] = [data[j + 1], data[j]];
        }
        conditionResult = false;
        break;
    }
    
    // Naive loop handling
    // If we just finished a block and the next block is at a lower indentation level,
    // we might need to jump back to the start of a loop.
    const nextPc = programCounter + 1;
    if (nextPc < assembledBlocks.length && assembledBlocks[nextPc].level < currentBlock.level) {
        // Exiting a block
        const loop = loopStack[loopStack.length - 1];
        if(loop) {
            if (loop.counter === 'j' && j < (n - i - 2)) {
                j++;
                programCounter = loop.pc; // Stay on loop_j block
            } else if(loop.counter === 'i' && i < (n - 2)) {
                 i++;
                 programCounter = loop.pc;
            } else {
                programCounter++;
            }
        } else {
             programCounter++;
        }
    } else {
         programCounter++;
    }

    if (i >= n - 1) {
      done = true;
    }

    return { data, active, swap, done };
  };

  return { step };
};


export const useBubbleSort = (
  assembledBlocks: AssembledBlock[],
  initialData: number[]
) => {
  const [data, setData] = useState([...initialData]);
  const [executionState, setExecutionState] = useState<ExecutionState>({
    isRunning: false,
    activeIndices: [],
    swapIndices: [],
  });
  const [speed, setSpeed] = useState(750);
  const [isSorted, setIsSorted] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const interpreterRef = useRef(createBubbleSortInterpreter(assembledBlocks, initialData));

  useEffect(() => {
    interpreterRef.current = createBubbleSortInterpreter(assembledBlocks, data);
  }, [assembledBlocks, data]);
  
  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setData([...initialData]);
    setExecutionState({
      isRunning: false,
      activeIndices: [],
      swapIndices: [],
    });
    setIsSorted(false);
    interpreterRef.current = createBubbleSortInterpreter(assembledBlocks, initialData);
  }, [initialData, assembledBlocks]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const step = useCallback(() => {
    const { data: newData, active, swap, done } = interpreterRef.current.step();

    setData([...newData]);
    setExecutionState(prev => ({ ...prev, activeIndices: active, swapIndices: swap }));

    if (done) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setExecutionState({ isRunning: false, activeIndices: [], swapIndices: [] });
      setIsSorted(true);
    }
  }, []);

  const run = () => {
    if (isSorted) reset();
    setExecutionState(prev => ({ ...prev, isRunning: true }));
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(step, speed);
  };

  const pause = () => {
    setExecutionState(prev => ({ ...prev, isRunning: false }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (executionState.isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(step, newSpeed);
    }
  };

  return { data, executionState, run, pause, reset, setSpeed: handleSpeedChange, speed, isSorted };
};
