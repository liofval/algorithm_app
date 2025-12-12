'use client';

import { ArrowLeftRight } from 'lucide-react';

type ComparisonStatus = 'comparing' | 'need-swap' | 'no-swap' | 'swapping';

interface StatusMessageProps {
  status: ComparisonStatus;
  leftIndex: number;
  rightIndex: number;
  leftValue: number;
  rightValue: number;
}

const STATUS_STYLES: Record<ComparisonStatus, string> = {
  comparing: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
  'need-swap': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
  'no-swap': 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20',
  swapping: 'bg-destructive/10 text-destructive border border-destructive/20',
};

export function StatusMessage({
  status,
  leftIndex,
  rightIndex,
  leftValue,
  rightValue,
}: StatusMessageProps) {
  return (
    <div className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium ${STATUS_STYLES[status]}`}>
      <StatusContent
        status={status}
        leftIndex={leftIndex}
        rightIndex={rightIndex}
        leftValue={leftValue}
        rightValue={rightValue}
      />
    </div>
  );
}

function StatusContent({
  status,
  leftIndex,
  rightIndex,
  leftValue,
  rightValue,
}: StatusMessageProps) {
  switch (status) {
    case 'swapping':
      return (
        <span className="flex items-center gap-2">
          <ArrowLeftRight className="w-4 h-4" />
          {leftValue} と {rightValue} をスワップ中...
        </span>
      );
    case 'comparing':
      return (
        <span>
          A[{leftIndex}]={leftValue} と A[{rightIndex}]={rightValue} を比較中...
        </span>
      );
    case 'need-swap':
      return (
        <span>
          A[{leftIndex}]={leftValue} {'>'} A[{rightIndex}]={rightValue} → スワップが必要
        </span>
      );
    case 'no-swap':
      return (
        <span>
          A[{leftIndex}]={leftValue} {'≤'} A[{rightIndex}]={rightValue} → そのまま
        </span>
      );
  }
}
