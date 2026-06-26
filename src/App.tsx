import { useCallback, useState } from 'react';
import TopMenu from './components/TopMenu';
import GraphEditor from './components/GraphEditor';
import Footer from './components/Footer';
import { NODE_TYPE_OPTIONS } from './data/graphData';
import { layout } from './styles/layout';

export default function App() {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [resetLayoutToken, setResetLayoutToken] = useState(0);

  const handleToggleFilter = useCallback((type: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    setActiveFilters(new Set());
  }, []);

  const handleResetLayout = useCallback(() => {
    setActiveFilters(new Set());
    setResetLayoutToken((token) => token + 1);
  }, []);

  return (
    <div className={layout.app}>
      <TopMenu
        nodeTypeOptions={NODE_TYPE_OPTIONS}
        activeFilters={activeFilters}
        onToggleFilter={handleToggleFilter}
        onClearFilters={handleClearFilters}
        onResetLayout={handleResetLayout}
      />
      <main className={layout.main}>
        <GraphEditor activeFilters={activeFilters} resetLayoutToken={resetLayoutToken} />
      </main>
      <Footer />
    </div>
  );
}
