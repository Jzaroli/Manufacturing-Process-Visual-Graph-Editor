import type { ManufacturingNode, ManufacturingEdge } from '../types/graph';

export const initialNodes: ManufacturingNode[] = [
  { id: '1', type: 'Mine', data: { name: 'BHP Billiton', ATP: 1200, Gross_requ: 0 }, position: { x: -250, y: 150 } },
  { id: '2', type: 'Refinery', data: { name: 'Wacker Chemie', ATP: 1000, Gross_requ: 1201 }, position: { x: 50, y: 150 } },
  { id: '3', type: 'Ingot_Grower', data: { name: 'GlobalWafers', ATP: 850, Gross_requ: 950 }, position: { x: 350, y: 150 } },
  { id: '4', type: 'Wafer_Manufacturer', data: { name: 'Shin-Etsu Handotai', ATP: 700, Gross_requ: 800 }, position: { x: 650, y: 150 } },
  { id: '5', type: 'Equipment_Provider', data: { name: 'ASML', ATP: 50, Gross_requ: 0 }, position: { x: 650, y: 0 } },
  { id: '6', type: 'IP_Designer', data: { name: 'ARM Holdings', ATP: 500, Gross_requ: 0 }, position: { x: 350, y: 300 } },
  { id: '7', type: 'Fabless_Designer', data: { name: 'NVIDIA', ATP: 450, Gross_requ: 480 }, position: { x: 650, y: 300 } },
  { id: '8', type: 'Chemical_Supplier', data: { name: 'Tokyo Ohka Kogyo', ATP: 650, Gross_requ: 0 }, position: { x: 650, y: 450 } },
  { id: '9', type: 'Foundry', data: { name: 'TSMC', ATP: 400, Gross_requ: 420 }, position: { x: 950, y: 200 } },
  { id: '10', type: 'OSAT', data: { name: 'ASE Group', ATP: 380, Gross_requ: 395 }, position: { x: 1250, y: 200 } },
  { id: '11', type: 'Distributor', data: { name: 'Arrow Electronics', ATP: 370, Gross_requ: 375 }, position: { x: 1550, y: 200 } },
  { id: '12', type: 'OEM', data: { name: 'Apple Inc.', ATP: 350, Gross_requ: 365 }, position: { x: 1850, y: 200 } },
];

export const initialEdges: ManufacturingEdge[] = [
  { id: 'e1-2', source: '1', target: '2', label: '45 days', animated: true },
  { id: 'e2-3', source: '2', target: '3', label: '30 days' },
  { id: 'e3-4', source: '3', target: '4', label: '21 days' },
  { id: 'e4-9', source: '4', target: '9', label: '14 days' },
  { id: 'e5-9', source: '5', target: '9', label: '180 days', style: { stroke: '#FF3333' } },
  { id: 'e6-7', source: '6', target: '7', label: '5 days' },
  { id: 'e7-9', source: '7', target: '9', label: '60 days' },
  { id: 'e8-9', source: '8', target: '9', label: '10 days' },
  { id: 'e9-10', source: '9', target: '10', label: '90 days' },
  { id: 'e10-11', source: '10', target: '11', label: '12 days' },
  { id: 'e11-12', source: '11', target: '12', label: '7 days' },
];

export const NODE_TYPE_OPTIONS = [
  ...new Set(initialNodes.map((node) => node.type)),
] as string[];
