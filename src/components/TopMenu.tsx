import { useState } from 'react';
import { layout } from '../styles/layout';

type TopMenuProps = {
  nodeTypeOptions: string[];
  activeFilters: Set<string>;
  onToggleFilter: (type: string) => void;
  onClearFilters: () => void;
  onResetLayout: () => void;
};

export default function TopMenu({
  nodeTypeOptions,
  activeFilters,
  onToggleFilter,
  onClearFilters,
  onResetLayout,
}: TopMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const filterControls = (
    <div className="flex flex-wrap gap-2">
      {nodeTypeOptions.map((type) => {
        const isActive = activeFilters.has(type);
        return (
          <button
            key={type}
            type="button"
            onClick={() => onToggleFilter(type)}
            className={`${layout.filterChip} ${isActive ? layout.filterChipActive : layout.filterChipInactive}`}
          >
            {type.replace(/_/g, ' ')}
          </button>
        );
      })}
    </div>
  );

  const actionControls = (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={onClearFilters} className={layout.secondaryButton}>
        Clear Filters
      </button>
      <button type="button" onClick={onResetLayout} className={layout.actionButton}>
        Reset Layout
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-20 border-b border-black/10 bg-white shadow-sm">
      <div className="mx-auto flex max-w-[100vw] items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold md:text-lg">
            Supply Chain Editor
          </h1>
          <p className="hidden text-xs text-black/60 sm:block">
            Semiconductor supply chain visualization
          </p>
        </div>

        <button
          type="button"
          className="relative z-30 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md border border-black/15 bg-[#DDDDDD] md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`block h-0.5 w-5 bg-black transition-all duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-5 bg-black transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-5 bg-black transition-all duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>

        <div className="hidden items-center gap-4 md:flex">
          {filterControls}
          {actionControls}
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-black/10 bg-white transition-all duration-300 ease-in-out md:hidden ${
          menuOpen ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 px-4 py-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/50">
              Filter by type
            </p>
            {filterControls}
          </div>
          {actionControls}
        </div>
      </div>
    </header>
  );
}
