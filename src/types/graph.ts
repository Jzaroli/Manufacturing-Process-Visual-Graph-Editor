import type { Node, Edge } from '@xyflow/react';

export type ManufacturingNodeData = {
  name: string;
  ATP: number;
  Gross_requ: number;
  hasUnmetDependency?: boolean;
};

export type ManufacturingNodeType =
  | 'Mine'
  | 'Refinery'
  | 'Ingot_Grower'
  | 'Wafer_Manufacturer'
  | 'Equipment_Provider'
  | 'IP_Designer'
  | 'Fabless_Designer'
  | 'Chemical_Supplier'
  | 'Foundry'
  | 'OSAT'
  | 'Distributor'
  | 'OEM';

export type ManufacturingNode = Node<ManufacturingNodeData, ManufacturingNodeType>;

export type ManufacturingEdge = Edge;
