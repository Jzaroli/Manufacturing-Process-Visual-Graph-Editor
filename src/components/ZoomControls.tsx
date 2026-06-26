import { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';

export default function ZoomControls() {
  const { zoomIn, zoomOut } = useReactFlow();

  const handleZoomIn = useCallback(() => {
    zoomIn({ duration: 200 });
  }, [zoomIn]);

  const handleZoomOut = useCallback(() => {
    zoomOut({ duration: 200 });
  }, [zoomOut]);

  return (
    <div className="absolute bottom-6 right-6 z-10 flex flex-col overflow-hidden rounded-md border border-black/10 bg-white shadow-md">
      <button
        type="button"
        onClick={handleZoomIn}
        aria-label="Zoom in"
        className="flex h-10 w-10 items-center justify-center bg-[#DDDDDD] text-xl font-semibold text-black transition-colors hover:bg-[#C7FF00]"
      >
        +
      </button>
      <div className="h-px bg-black/10" />
      <button
        type="button"
        onClick={handleZoomOut}
        aria-label="Zoom out"
        className="flex h-10 w-10 items-center justify-center bg-[#DDDDDD] text-xl font-semibold text-black transition-colors hover:bg-[#C7FF00]"
      >
        −
      </button>
    </div>
  );
}
