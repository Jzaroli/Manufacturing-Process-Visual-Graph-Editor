import { useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  type NodeTypes,
} from '@xyflow/react';

import ManufacturingNodeComponent from './CustomNode';
import ZoomControls from './ZoomControls';
import { initialNodes, initialEdges, NODE_TYPE_OPTIONS } from '../data/graphData';
import { edgeDefaults } from '../styles/layout';
import { layout } from '../styles/layout';
import type { ManufacturingNode, ManufacturingEdge } from '../types/graph';
import {
  annotateNodesWithDependencies,
  hasValidationChanged,
} from '../utils/dependencyValidation';

type GraphEditorProps = {
  activeFilters: Set<string>;
  resetLayoutToken: number;
};

function GraphCanvas({ activeFilters, resetLayoutToken }: GraphEditorProps) {
  const memoizedNodes = useMemo<ManufacturingNode[]>(
    () => initialNodes.map((node) => ({ ...node, data: { ...node.data } })),
    [],
  );

  const memoizedEdges = useMemo<ManufacturingEdge[]>(
    () => initialEdges.map((edge) => ({ ...edge })),
    [],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(memoizedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(memoizedEdges);

  const nodeDataSignature = useMemo(
    () => nodes.map((node) => `${node.id}:${node.data.ATP}:${node.data.Gross_requ}`).join('|'),
    [nodes],
  );

  useEffect(() => {
    setNodes((current) => {
      const annotated = annotateNodesWithDependencies(current, edges);
      return hasValidationChanged(current, annotated) ? annotated : current;
    });
  }, [nodeDataSignature, edges, setNodes]);

  const nodeTypes = useMemo<NodeTypes>(() => {
    return NODE_TYPE_OPTIONS.reduce<NodeTypes>((acc, type) => {
      acc[type] = ManufacturingNodeComponent;
      return acc;
    }, {});
  }, []);

  useEffect(() => {
    const hasFilters = activeFilters.size > 0;

    setNodes((current) =>
      current.map((node) => ({
        ...node,
        hidden: hasFilters ? !activeFilters.has(node.type ?? '') : false,
      })),
    );

    setEdges((current) =>
      current.map((edge) => {
        const sourceHidden = hasFilters && !activeFilters.has(
          memoizedNodes.find((n) => n.id === edge.source)?.type ?? '',
        );
        const targetHidden = hasFilters && !activeFilters.has(
          memoizedNodes.find((n) => n.id === edge.target)?.type ?? '',
        );
        return {
          ...edge,
          hidden: Boolean(sourceHidden || targetHidden),
        };
      }),
    );
  }, [activeFilters, memoizedNodes, setNodes, setEdges]);

  useEffect(() => {
    if (resetLayoutToken === 0) return;

    setNodes((current) => {
      const reset = current.map((node) => {
        const initial = memoizedNodes.find((n) => n.id === node.id);
        return initial
          ? {
              ...node,
              position: { ...initial.position },
              data: { ...initial.data },
              hidden: false,
            }
          : node;
      });
      return annotateNodesWithDependencies(reset, memoizedEdges);
    });
    setEdges((current) =>
      current.map((edge) => {
        const initial = memoizedEdges.find((e) => e.id === edge.id);
        return initial ? { ...edge, hidden: false } : edge;
      }),
    );
  }, [resetLayoutToken, memoizedNodes, memoizedEdges, setNodes, setEdges]);

  const defaultEdgeOptions = useMemo(
    () => ({
      type: 'default' as const,
      labelStyle: edgeDefaults.labelStyle,
      labelBgStyle: edgeDefaults.labelBgStyle,
      labelBgPadding: edgeDefaults.labelBgPadding,
      labelBgBorderRadius: edgeDefaults.labelBgBorderRadius,
      style: edgeDefaults.style,
    }),
    [],
  );

  return (
    <div className={layout.canvasWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.1}
        maxZoom={2}
        panOnScroll
        panOnDrag
        zoomOnScroll
        zoomOnPinch
        zoomOnDoubleClick={false}
        preventScrolling={false}
        className="bg-white"
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#E8E8E8" />
        <ZoomControls />
      </ReactFlow>
    </div>
  );
}

export default function GraphEditor(props: GraphEditorProps) {
  return (
    <ReactFlowProvider>
      <GraphCanvas {...props} />
    </ReactFlowProvider>
  );
}
