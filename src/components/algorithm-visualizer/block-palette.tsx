'use client';

import type { CodeBlock } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CodeBlockComponent } from './code-block';

interface BlockPaletteProps {
  blocks: CodeBlock[];
}

export function BlockPalette({ blocks }: BlockPaletteProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg">Code Blocks</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-4">
          {blocks.map((block) => (
            <CodeBlockComponent key={block.id} block={block} isDraggable={true} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
