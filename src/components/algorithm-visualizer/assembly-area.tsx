'use client';

import React, { useState } from 'react';
import { GripVertical, Trash2, ArrowBigRight, ArrowBigLeft, CheckCircle2, XCircle } from 'lucide-react';
import type { CodeBlock, AssembledBlock } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CodeBlockComponent } from './code-block';

type ValidationResult = {
  isCorrect: boolean;
  message: string;
};

interface AssemblyAreaProps {
  blocks: AssembledBlock[];
  onDrop: (block: CodeBlock, index: number, level: number) => void;
  onBlockUpdate: (blocks: AssembledBlock[]) => void;
  validation: ValidationResult;
}

export function AssemblyArea({ blocks, onDrop, onBlockUpdate, validation }: AssemblyAreaProps) {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const blockData = e.dataTransfer.getData('application/json');
    const draggedBlock = JSON.parse(blockData) as CodeBlock;

    const sourceInstanceId = e.dataTransfer.getData('sourceInstanceId');
    
    if (sourceInstanceId) {
      // Reordering
      const draggedIndex = blocks.findIndex(b => b.instanceId === sourceInstanceId);
      if (draggedIndex > -1) {
        const newBlocks = [...blocks];
        const [removed] = newBlocks.splice(draggedIndex, 1);
        newBlocks.splice(index, 0, removed);
        onBlockUpdate(newBlocks);
      }
    } else {
      // Dropping new block from palette
      let newLevel = 0;
      if (index > 0) {
        const prevBlock = blocks[index-1];
        if (prevBlock.block.type.startsWith('loop')) {
          newLevel = prevBlock.level + 1;
        } else {
          newLevel = prevBlock.level;
        }
      }
      onDrop(draggedBlock, index, newLevel);
    }
    setDragOverIndex(null);
  };

  const handleDragStart = (e: React.DragEvent, instanceId: string) => {
    e.dataTransfer.setData('sourceInstanceId', instanceId);
    const block = blocks.find(b => b.instanceId === instanceId)?.block;
    if(block) e.dataTransfer.setData('application/json', JSON.stringify(block));
  };
  
  const removeBlock = (instanceId: string) => {
    onBlockUpdate(blocks.filter(b => b.instanceId !== instanceId));
  };

  const changeIndent = (instanceId: string, direction: 1 | -1) => {
    const newBlocks = blocks.map(b => 
      b.instanceId === instanceId 
        ? { ...b, level: Math.max(0, b.level + direction) }
        : b
    );
    onBlockUpdate(newBlocks);
  };

  return (
    <Card className="flex-grow flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-lg">Assembly Area</CardTitle>
      </CardHeader>
      <CardContent
        className="flex-grow p-4 bg-muted/50 rounded-b-lg overflow-y-auto"
        onDragOver={(e) => handleDragOver(e, blocks.length)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, blocks.length)}
      >
        <div className="space-y-2">
          {blocks.map((assembledBlock, index) => (
            <div
              key={assembledBlock.instanceId}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              className="relative"
            >
              {dragOverIndex === index && <div className="h-1 bg-accent rounded-full my-1" />}
              <div
                className="flex items-center group"
                style={{ marginLeft: `${assembledBlock.level * 2}rem` }}
                draggable
                onDragStart={(e) => handleDragStart(e, assembledBlock.instanceId)}
              >
                <GripVertical className="h-5 w-5 text-muted-foreground mr-2 cursor-grab" />
                <CodeBlockComponent block={assembledBlock.block} isDraggable={false} />
                <div className="opacity-0 group-hover:opacity-100 flex items-center ml-2 transition-opacity">
                  <button onClick={() => changeIndent(assembledBlock.instanceId, -1)} className="p-1 hover:text-accent disabled:text-muted-foreground/50" disabled={assembledBlock.level === 0}><ArrowBigLeft className="h-4 w-4" /></button>
                  <button onClick={() => changeIndent(assembledBlock.instanceId, 1)} className="p-1 hover:text-accent"><ArrowBigRight className="h-4 w-4" /></button>
                  <button onClick={() => removeBlock(assembledBlock.instanceId)} className="p-1 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
          {dragOverIndex === blocks.length && <div className="h-1 bg-accent rounded-full my-1" />}
        </div>
        {blocks.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground border-2 border-dashed border-border rounded-lg">
            <p>Drag blocks here to start</p>
          </div>
        )}
        {validation.message && (
          <div
            className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
              validation.isCorrect
                ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20'
                : 'bg-destructive/10 text-destructive border border-destructive/20'
            }`}
          >
            {validation.isCorrect ? (
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            ) : (
              <XCircle className="h-5 w-5 flex-shrink-0" />
            )}
            <p className="text-sm font-medium">{validation.message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
