import { notFound } from 'next/navigation';
import { fetchAlgorithm } from '@/lib/api';
import { AlgorithmPageClient } from './client';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = 'force-dynamic';

export default async function AlgorithmPage({ params }: Props) {
  const { slug } = await params;

  try {
    const { algorithm, codeBlocks } = await fetchAlgorithm(slug);

    return (
      <AlgorithmPageClient
        algorithm={algorithm}
        availableBlocks={codeBlocks}
      />
    );
  } catch {
    notFound();
  }
}
