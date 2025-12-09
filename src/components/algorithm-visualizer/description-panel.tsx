'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Algorithm } from '@/lib/types';

interface DescriptionPanelProps {
  algorithm: Algorithm;
}

export function DescriptionPanel({ algorithm }: DescriptionPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg">{algorithm.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{algorithm.description}</p>
        {algorithm.longDescription && (
          <Accordion type="single" collapsible className="w-full mt-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>Learn More</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p className="text-sm whitespace-pre-wrap">{algorithm.longDescription}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
