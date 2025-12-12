package data

import "github.com/mei/algorithm_app/backend/models"

var Algorithms = []models.Algorithm{
	{
		ID:          "bubble-sort",
		Name:        "Bubble Sort",
		Description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
		LongDescription: `Bubble Sort is a basic algorithm for arranging a string of numbers or other elements in the correct order. The method works by examining each set of adjacent elements in the string, from left to right, and switching their positions if they are out of order. This process is repeated until the entire string is sorted.

For example, with the array [5, 2, 8, 1, 9, 4]:
1. Compare 5 and 2. Swap. [2, 5, 8, 1, 9, 4]
2. Compare 5 and 8. No swap.
3. Compare 8 and 1. Swap. [2, 5, 1, 8, 9, 4]
...and so on.

After the first pass, the largest element (9) will be at the end. The algorithm will then repeat the process for the remaining elements.

While simple to understand, Bubble Sort is not very efficient for large lists and is not typically used in real-world applications. Its primary value is for educational purposes to introduce the concept of sorting algorithms.`,
		InitialData: []int{5, 2, 8, 1, 9, 4},
	},
	{
		ID:          "selection-sort",
		Name:        "Selection Sort",
		Description: "A sorting algorithm that repeatedly finds the minimum element from the unsorted portion and places it at the beginning.",
		LongDescription: `Selection Sort is a simple comparison-based sorting algorithm. It divides the input array into two parts: a sorted portion at the beginning and an unsorted portion at the end.

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
		InitialData: []int{5, 2, 8, 1, 9, 4},
	},
}

var CodeBlocks = []models.CodeBlock{
	// Bubble Sort Blocks
	{
		ID:           "bs-01",
		AlgorithmID:  "bubble-sort",
		Order:        1,
		CodeSnippet:  "for i in 0..n-1",
		Type:         "loop-outer",
		LogicID:      "loop_i",
		CorrectLevel: 0,
	},
	{
		ID:           "bs-02",
		AlgorithmID:  "bubble-sort",
		Order:        2,
		CodeSnippet:  "for j in 0..n-i-1",
		Type:         "loop-inner",
		LogicID:      "loop_j",
		CorrectLevel: 1,
	},
	{
		ID:           "bs-03",
		AlgorithmID:  "bubble-sort",
		Order:        3,
		CodeSnippet:  "if (A[j] > A[j+1])",
		Type:         "if",
		LogicID:      "if_gt",
		CorrectLevel: 2,
	},
	{
		ID:           "bs-04",
		AlgorithmID:  "bubble-sort",
		Order:        4,
		CodeSnippet:  "swap(A[j], A[j+1])",
		Type:         "swap",
		LogicID:      "swap",
		CorrectLevel: 3,
	},

	// Selection Sort Blocks
	{
		ID:           "ss-01",
		AlgorithmID:  "selection-sort",
		Order:        1,
		CodeSnippet:  "for i in 0..n-1",
		Type:         "loop-outer",
		LogicID:      "loop_i",
		CorrectLevel: 0,
	},
	{
		ID:           "ss-02",
		AlgorithmID:  "selection-sort",
		Order:        2,
		CodeSnippet:  "minIdx = i",
		Type:         "assignment",
		LogicID:      "init_min",
		CorrectLevel: 1,
	},
	{
		ID:           "ss-03",
		AlgorithmID:  "selection-sort",
		Order:        3,
		CodeSnippet:  "for j in i+1..n",
		Type:         "loop-inner",
		LogicID:      "loop_j",
		CorrectLevel: 1,
	},
	{
		ID:           "ss-04",
		AlgorithmID:  "selection-sort",
		Order:        4,
		CodeSnippet:  "if (A[j] < A[minIdx])",
		Type:         "if",
		LogicID:      "if_lt",
		CorrectLevel: 2,
	},
	{
		ID:           "ss-05",
		AlgorithmID:  "selection-sort",
		Order:        5,
		CodeSnippet:  "minIdx = j",
		Type:         "assignment",
		LogicID:      "update_min",
		CorrectLevel: 3,
	},
	{
		ID:           "ss-06",
		AlgorithmID:  "selection-sort",
		Order:        6,
		CodeSnippet:  "swap(A[i], A[minIdx])",
		Type:         "swap",
		LogicID:      "swap",
		CorrectLevel: 1,
	},
}

func GetAlgorithmByID(id string) *models.Algorithm {
	for _, algo := range Algorithms {
		if algo.ID == id {
			return &algo
		}
	}
	return nil
}

func GetCodeBlocksByAlgorithmID(algorithmID string) []models.CodeBlock {
	var blocks []models.CodeBlock
	for _, block := range CodeBlocks {
		if block.AlgorithmID == algorithmID {
			blocks = append(blocks, block)
		}
	}
	return blocks
}
