import type { Algorithm, CodeBlock } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface AlgorithmWithBlocks {
  algorithm: Algorithm;
  codeBlocks: CodeBlock[];
}

export async function fetchAlgorithms(): Promise<Algorithm[]> {
  const response = await fetch(`${API_BASE_URL}/api/algorithms`);
  if (!response.ok) {
    throw new Error('Failed to fetch algorithms');
  }
  return response.json();
}

export async function fetchAlgorithm(slug: string): Promise<AlgorithmWithBlocks> {
  const response = await fetch(`${API_BASE_URL}/api/algorithms/${slug}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Algorithm not found');
    }
    throw new Error('Failed to fetch algorithm');
  }
  return response.json();
}

export async function fetchCodeBlocks(algorithmId?: string): Promise<CodeBlock[]> {
  const url = algorithmId
    ? `${API_BASE_URL}/api/codeblocks?algorithmId=${algorithmId}`
    : `${API_BASE_URL}/api/codeblocks`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch code blocks');
  }
  return response.json();
}
