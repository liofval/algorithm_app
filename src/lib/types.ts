export type Algorithm = {
  id: string;
  name: string;
  description: string;
  initialData: number[];
  longDescription?: string;
};

export type CodeBlockType = 'loop-outer' | 'loop-inner' | 'if' | 'swap' | 'end' | 'assignment' | 'comparison';

export type CodeBlock = {
  id: string;
  algorithmId: string;
  order: number;
  codeSnippet: string;
  type: CodeBlockType;
  logicId: string;
  correctLevel: number;
};

export type AssembledBlock = {
  instanceId: string;
  block: CodeBlock;
  level: number;
};
