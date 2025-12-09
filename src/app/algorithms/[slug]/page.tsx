import { notFound } from 'next/navigation';
import { algorithms, codeBlocks } from '@/lib/data';
import { Header } from '@/components/header';
import { VisualizerWorkspace } from '@/components/algorithm-visualizer/visualizer-workspace';

type Props = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return algorithms.map((algo) => ({
    slug: algo.id,
  }));
}

export default function AlgorithmPage({ params }: Props) {
  const { slug } = params;
  const algorithm = algorithms.find((a) => a.id === slug);
  const blocks = codeBlocks.filter((b) => b.algorithmId === slug);

  if (!algorithm) {
    notFound();
  }

  return (
    <div className="flex h-screen w-full flex-col bg-secondary">
      <Header />
      <main className="flex-1 overflow-hidden">
        <VisualizerWorkspace algorithm={algorithm} availableBlocks={blocks} />
      </main>
    </div>
  );
}
