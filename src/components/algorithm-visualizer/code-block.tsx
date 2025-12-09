'use client';
import type { CodeBlock } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  block: CodeBlock;
  isDraggable?: boolean;
}

export function CodeBlockComponent({ block, isDraggable = false }: CodeBlockProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(block));
  };

  const colorMap = {
    'loop-outer': 'bg-blue-200 dark:bg-blue-900',
    'loop-inner': 'bg-sky-200 dark:bg-sky-900',
    'if': 'bg-amber-200 dark:bg-amber-900',
    'swap': 'bg-purple-200 dark:bg-purple-900',
    'end': 'bg-gray-200 dark:bg-gray-700',
    'variable': 'bg-green-200 dark:bg-green-900',
  };
  
  return (
    <div
      draggable={isDraggable}
      onDragStart={isDraggable ? handleDragStart : undefined}
      className={cn(
        "p-2 rounded-md border text-sm w-max",
        colorMap[block.type] || 'bg-card',
        isDraggable && 'cursor-grab hover:shadow-lg transform hover:-translate-y-1 transition-all'
      )}
    >
      <pre className="font-code text-card-foreground">
        <code>{block.codeSnippet}</code>
      </pre>
    </div>
  );
}
