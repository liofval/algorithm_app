'use server';

/**
 * @fileOverview Algorithm description generation flow.
 *
 * - generateAlgorithmDescription - A function that generates an algorithm description.
 * - GenerateAlgorithmDescriptionInput - The input type for the generateAlgorithmDescription function.
 * - GenerateAlgorithmDescriptionOutput - The return type for the generateAlgorithmDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAlgorithmDescriptionInputSchema = z.object({
  algorithmName: z.string().describe('The name of the algorithm.'),
});
export type GenerateAlgorithmDescriptionInput = z.infer<
  typeof GenerateAlgorithmDescriptionInputSchema
>;

const GenerateAlgorithmDescriptionOutputSchema = z.object({
  description: z.string().describe('A detailed description of the algorithm.'),
});
export type GenerateAlgorithmDescriptionOutput = z.infer<
  typeof GenerateAlgorithmDescriptionOutputSchema
>;

export async function generateAlgorithmDescription(
  input: GenerateAlgorithmDescriptionInput
): Promise<GenerateAlgorithmDescriptionOutput> {
  return generateAlgorithmDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAlgorithmDescriptionPrompt',
  input: {schema: GenerateAlgorithmDescriptionInputSchema},
  output: {schema: GenerateAlgorithmDescriptionOutputSchema},
  prompt: `You are an expert computer science educator.

  Generate a detailed description of the {{algorithmName}} algorithm, suitable for inclusion in a mobile application designed to teach users about algorithms. The description should be clear, concise, and easy to understand for someone who is new to the concept. Focus on explaining the core concepts of how the algorithm works, its purpose, and, if applicable, provide simple real-world analogies to aid understanding.

  Algorithm Name: {{algorithmName}}`,
});

const generateAlgorithmDescriptionFlow = ai.defineFlow(
  {
    name: 'generateAlgorithmDescriptionFlow',
    inputSchema: GenerateAlgorithmDescriptionInputSchema,
    outputSchema: GenerateAlgorithmDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
