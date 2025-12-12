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
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    description: 'A sorting algorithm that repeatedly finds the minimum element from the unsorted portion and places it at the beginning.',
    longDescription: `Selection Sort is a simple comparison-based sorting algorithm. It divides the input array into two parts: a sorted portion at the beginning and an unsorted portion at the end.

The algorithm works as follows:
1. Find the minimum element in the unsorted portion
2. Swap it with the first element of the unsorted portion
3. Move the boundary between sorted and unsorted portions one element to the right
4. Repeat until the entire array is sorted

For example, with the array [5, 2, 8, 1, 9, 4]:
1. Find minimum (1) in positions 0-5. Swap with position 0. [1, 2, 8, 5, 9, 4]
2. Find minimum (2) in positions 1-5. Already in place. [1, 2, 8, 5, 9, 4]
3. Find minimum (4) in positions 2-5. Swap with position 2. [1, 2, 4, 5, 9, 8]
...and so on.

Selection Sort has O(n²) time complexity and is not efficient for large lists, but it has the advantage of minimizing the number of swaps, which can be useful when write operations are expensive.`,
    initialData: [5, 2, 8, 1, 9, 4],
  },
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
    correctLevel: 0,
  },
  {
    id: 'bs-02',
    algorithmId: 'bubble-sort',
    order: 2,
    codeSnippet: 'for j in 0..n-i-1',
    type: 'loop-inner',
    logicId: 'loop_j',
    correctLevel: 1,
  },
  {
    id: 'bs-03',
    algorithmId: 'bubble-sort',
    order: 3,
    codeSnippet: 'if (A[j] > A[j+1])',
    type: 'if',
    logicId: 'if_gt',
    correctLevel: 2,
  },
  {
    id: 'bs-04',
    algorithmId: 'bubble-sort',
    order: 4,
    codeSnippet: 'swap(A[j], A[j+1])',
    type: 'swap',
    logicId: 'swap',
    correctLevel: 3,
  },

  // Selection Sort Blocks
  {
    id: 'ss-01',
    algorithmId: 'selection-sort',
    order: 1,
    codeSnippet: 'for i in 0..n-1',
    type: 'loop-outer',
    logicId: 'loop_i',
    correctLevel: 0,
  },
  {
    id: 'ss-02',
    algorithmId: 'selection-sort',
    order: 2,
    codeSnippet: 'minIdx = i',
    type: 'assignment',
    logicId: 'init_min',
    correctLevel: 1,
  },
  {
    id: 'ss-03',
    algorithmId: 'selection-sort',
    order: 3,
    codeSnippet: 'for j in i+1..n',
    type: 'loop-inner',
    logicId: 'loop_j',
    correctLevel: 1,
  },
  {
    id: 'ss-04',
    algorithmId: 'selection-sort',
    order: 4,
    codeSnippet: 'if (A[j] < A[minIdx])',
    type: 'if',
    logicId: 'if_lt',
    correctLevel: 2,
  },
  {
    id: 'ss-05',
    algorithmId: 'selection-sort',
    order: 5,
    codeSnippet: 'minIdx = j',
    type: 'assignment',
    logicId: 'update_min',
    correctLevel: 3,
  },
  {
    id: 'ss-06',
    algorithmId: 'selection-sort',
    order: 6,
    codeSnippet: 'swap(A[i], A[minIdx])',
    type: 'swap',
    logicId: 'swap',
    correctLevel: 1,
  },
];
