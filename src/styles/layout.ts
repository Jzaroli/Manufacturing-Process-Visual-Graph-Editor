export const layout = {
  app: 'flex h-screen flex-col bg-white font-sans text-black antialiased',
  main: 'relative flex flex-1 flex-col overflow-hidden min-h-0',
  canvasWrapper: 'relative h-full w-full flex-1 min-h-0',
  actionButton:
    'rounded-md bg-[#C7FF00] px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40',
  secondaryButton:
    'rounded-md border border-black/20 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#DDDDDD]/40',
  filterChip:
    'rounded-md border border-black/15 px-3 py-1.5 text-xs transition-colors',
  filterChipActive: 'border-black bg-[#C7FF00]',
  filterChipInactive: 'bg-[#DDDDDD]/50 hover:bg-[#DDDDDD]',
} as const;

export const edgeDefaults = {
  labelStyle: { fill: '#000000', fontWeight: 600, fontSize: 11 },
  labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.92 },
  labelBgPadding: [6, 4] as [number, number],
  labelBgBorderRadius: 4,
  style: { stroke: '#333333', strokeWidth: 1.5 },
};
