import { notFound } from 'next/navigation';
import { algorithms, codeBlocks } from '@/lib/data';
import { AlgorithmPageClient } from './client';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return algorithms.map((algo) => ({
    slug: algo.id,
  }));
}

export default async function AlgorithmPage({ params }: Props) {
  const { slug } = await params;
  const algorithm = algorithms.find((a) => a.id === slug);
  const blocks = codeBlocks.filter((b) => b.algorithmId === slug);

  if (!algorithm) {
    notFound();
  }

  return (
    <AlgorithmPageClient
      algorithm={algorithm}
      availableBlocks={blocks}
    />
  );
}
