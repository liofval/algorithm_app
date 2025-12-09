import Link from 'next/link';
import { Code2 } from 'lucide-react';
import { AuthButton } from './auth-button';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Code2 className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-semibold font-headline">Algo Assembler</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          href="/#algorithms"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Algorithms
        </Link>
        <AuthButton />
      </nav>
    </header>
  );
}
