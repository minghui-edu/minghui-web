import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { hasArticles } from '@/lib/articles';

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const showArticles = await hasArticles();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--cream)', color: 'var(--foreground)' }}>
      <Navbar showArticles={showArticles} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
