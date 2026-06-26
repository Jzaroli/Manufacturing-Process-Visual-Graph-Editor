import type { ManufacturingNode, ManufacturingEdge } from '../types/graph';

export function computeUnmetDependencyIds(
  nodes: ManufacturingNode[],
  edges: ManufacturingEdge[],
): Set<string> {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const unmet = new Set<string>();

  for (const node of nodes) {
    const parentAtpTotal = edges
      .filter((edge) => edge.target === node.id)
      .reduce((sum, edge) => sum + (nodeMap.get(edge.source)?.data.ATP ?? 0), 0);

    if (node.data.Gross_requ > parentAtpTotal) {
      unmet.add(node.id);
    }
  }

  return unmet;
}

export function annotateNodesWithDependencies(
  nodes: ManufacturingNode[],
  edges: ManufacturingEdge[],
): ManufacturingNode[] {
  const unmetIds = computeUnmetDependencyIds(nodes, edges);

  return nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      hasUnmetDependency: unmetIds.has(node.id),
    },
  }));
}

export function hasValidationChanged(
  current: ManufacturingNode[],
  annotated: ManufacturingNode[],
): boolean {
  return annotated.some(
    (node) =>
      node.data.hasUnmetDependency !==
      current.find((n) => n.id === node.id)?.data.hasUnmetDependency,
  );
}
