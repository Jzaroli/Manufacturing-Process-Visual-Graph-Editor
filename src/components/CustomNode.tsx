import { memo, useCallback, useState, type KeyboardEvent } from 'react';
import { Handle, Position, useNodeId, useReactFlow, type NodeProps } from '@xyflow/react';
import type { ManufacturingNode } from '../types/graph';
import { annotateNodesWithDependencies } from '../utils/dependencyValidation';
import { layout } from '../styles/layout';

function ManufacturingNodeComponent({ type, data }: NodeProps<ManufacturingNode>) {
  const nodeId = useNodeId();
  const { setNodes, getEdges } = useReactFlow<ManufacturingNode>();
  const [isEditing, setIsEditing] = useState(false);
  const [draftAtp, setDraftAtp] = useState(String(data.ATP));
  const [draftGrossRequ, setDraftGrossRequ] = useState(String(data.Gross_requ));

  const beginEditing = useCallback(() => {
    setDraftAtp(String(data.ATP));
    setDraftGrossRequ(String(data.Gross_requ));
    setIsEditing(true);
  }, [data.ATP, data.Gross_requ]);

  const cancelEditing = useCallback(() => {
    setDraftAtp(String(data.ATP));
    setDraftGrossRequ(String(data.Gross_requ));
    setIsEditing(false);
  }, [data.ATP, data.Gross_requ]);

  const saveEditing = useCallback(() => {
    if (!nodeId) return;

    const atp = Number(draftAtp);
    const grossRequ = Number(draftGrossRequ);

    if (!Number.isFinite(atp) || !Number.isFinite(grossRequ) || atp < 0 || grossRequ < 0) {
      return;
    }

    setNodes((nodes) => {
      const updated = nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ATP: atp, Gross_requ: grossRequ } }
          : node,
      );
      return annotateNodesWithDependencies(updated, getEdges());
    });
    setIsEditing(false);
  }, [nodeId, draftAtp, draftGrossRequ, setNodes, getEdges]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        saveEditing();
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        cancelEditing();
      }
    },
    [saveEditing, cancelEditing],
  );

  const borderClass = data.hasUnmetDependency
    ? 'border-4 border-red-500'
    : 'border-2 border-transparent hover:border-black';

  return (
    <div
      className={`min-w-[200px] max-w-[240px] rounded-md bg-[#DDDDDD] px-3 py-2.5 shadow-sm transition-all duration-200 hover:shadow-md ${borderClass}`}
      onDoubleClick={(event) => {
        event.stopPropagation();
        beginEditing();
      }}
    >
      <Handle type="target" position={Position.Left} className="!h-2 !w-2 !border-black !bg-white" />

      <div className="mb-1.5 flex items-start justify-between gap-2">
        <span className="inline-block rounded bg-black px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#C7FF00]">
          {type}
        </span>
        {!isEditing && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              beginEditing();
            }}
            className="nodrag nopan shrink-0 rounded bg-black/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black transition-colors hover:bg-[#C7FF00]"
          >
            Edit
          </button>
        )}
      </div>

      <p className="mb-2 text-sm font-semibold leading-snug text-black">{data.name}</p>

      {isEditing ? (
        <div className="nodrag nopan flex flex-col gap-2">
          <label className="flex flex-col gap-0.5 text-xs text-black/80">
            Available-to-Promise:
            <input
              type="number"
              min={0}
              value={draftAtp}
              onChange={(event) => setDraftAtp(event.target.value)}
              onKeyDown={handleKeyDown}
              className="nodrag nopan rounded border border-black/20 bg-white px-2 py-1 text-sm text-black outline-none focus:border-black"
            />
          </label>
          <label className="flex flex-col gap-0.5 text-xs text-black/80">
            Gross Requirement:
            <input
              type="number"
              min={0}
              value={draftGrossRequ}
              onChange={(event) => setDraftGrossRequ(event.target.value)}
              onKeyDown={handleKeyDown}
              className="nodrag nopan rounded border border-black/20 bg-white px-2 py-1 text-sm text-black outline-none focus:border-black"
            />
          </label>
          <div className="flex gap-2">
            <button type="button" onClick={saveEditing} className={`${layout.actionButton} flex-1 py-1.5 text-xs`}>
              Save
            </button>
            <button
              type="button"
              onClick={cancelEditing}
              className={`${layout.secondaryButton} flex-1 py-1.5 text-xs`}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-0.5 text-xs text-black/80">
          <span>
            Available-to-Promise: <strong className="text-black">{data.ATP.toLocaleString()}</strong>
          </span>
          <span>
            Gross Requirement: <strong className="text-black">{data.Gross_requ.toLocaleString()}</strong>
          </span>
          {data.hasUnmetDependency && (
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-red-600">
              Unmet dependency
            </span>
          )}
        </div>
      )}

      <Handle type="source" position={Position.Right} className="!h-2 !w-2 !border-black !bg-white" />
    </div>
  );
}

export default memo(ManufacturingNodeComponent);
