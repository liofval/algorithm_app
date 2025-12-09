import type { Algorithm, CodeBlock } from './types';

export const algorithms: Algorithm[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    longDescription: `Bubble Sort is a basic algorithm for arranging a string of numbers or other elements in the correct order. The method works by examining each set of adjacent elements in the string, from left to right, and switching their positions if they are out of order. This process is repeated until the entire string is sorted.

For example, with the array [5, 2, 8, 1, 9, 4]:
1. Compare 5 and 2. Swap. [2, 5, 8, 1, 9, 4]
2. Compare 5 and 8. No swap.
3. Compare 8 and 1. Swap. [2, 5, 1, 8, 9, 4]
...and so on.

After the first pass, the largest element (9) will be at the end. The algorithm will then repeat the process for the remaining elements.

While simple to understand, Bubble Sort is not very efficient for large lists and is not typically used in real-world applications. Its primary value is for educational purposes to introduce the concept of sorting algorithms.`,
    initialData: [5, 2, 8, 1, 9, 4],
  },
  // {
  //   id: 'linear-search',
  //   name: 'Linear Search',
  //   description: 'A simple search algorithm that finds the position of a target value within a list by checking each element one by one.',
  //   initialData: [5, 2, 8, 1, 9, 4],
  // },
];

export const codeBlocks: CodeBlock[] = [
  // Bubble Sort Blocks
  {
    id: 'bs-01',
    algorithmId: 'bubble-sort',
    order: 1,
    codeSnippet: 'for i in 0..n-1',
    type: 'loop-outer',
    logicId: 'loop_i',
  },
  {
    id: 'bs-02',
    algorithmId: 'bubble-sort',
    order: 2,
    codeSnippet: 'for j in 0..n-i-1',
    type: 'loop-inner',
    logicId: 'loop_j',
  },
  {
    id: 'bs-03',
    algorithmId: 'bubble-sort',
    order: 3,
    codeSnippet: 'if (A[j] > A[j+1])',
    type: 'if',
    logicId: 'if_gt',
  },
  {
    id: 'bs-04',
    algorithmId: 'bubble-sort',
    order: 4,
    codeSnippet: 'swap(A[j], A[j+1])',
    type: 'swap',
    logicId: 'swap',
  },
];
