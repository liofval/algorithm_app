'use client';

import { ScaleBeam } from './scale-beam';
import { ScaleBase } from './scale-base';

interface ScaleProps {
  leftValue: number;
  rightValue: number;
  isSwapping: boolean;
  isBalanced: boolean;
}

const TILT_ANGLE = 10;

function calculateRotation(isBalanced: boolean, leftHeavier: boolean): number {
  if (isBalanced) return 0;
  return leftHeavier ? -TILT_ANGLE : TILT_ANGLE;
}

export function Scale({ leftValue, rightValue, isSwapping, isBalanced }: ScaleProps) {
  const leftHeavier = leftValue > rightValue;
  const rotation = calculateRotation(isBalanced, leftHeavier);

  return (
    <div className="flex flex-col items-center">
      <ScaleBeam
        rotation={rotation}
        leftValue={leftValue}
        rightValue={rightValue}
        isSwapping={isSwapping}
      />
      <ScaleBase isSwapping={isSwapping} />
    </div>
  );
}
