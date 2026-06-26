# Manufacturing-Process-Visual-Graph-Editor
Note: Vibe-Coded Proto

## Stack & Architecture Requirements
- Must use Typescript
- React (Latest stable) with state managed via React Flow hooks (`useNodesState`, `useEdgesState`).
- Memoize the initial static node and edge data arrays using `useMemo` to optimize performance for CRUD operations.
- Smooth scrolling and native zoom gestures (two-finger trackpad, mouse wheel) must be fully enabled within the React Flow canvas.
- Maintain a clean separation of structural configuration data from Tailwind utility layout logic.


## Design Tokens & Theme (Tailwind CSS)
- **Background**: Strict crisp solid white (`bg-white`).
- **Typography**: Base font family `'FKGroteskSemiMono-Regular', monospace`. High-contrast text layout for exceptional readability.
- **Color Palette**:
  - Main background/nodes: `#DDDDDD` (Use arbitrary Tailwind text/bg tags or extended configuration values).
  - Primary Action / Buttons: `#C7FF00` (High visibility accent).
- **Aesthetics**: Minimalist, clean, approachable, spacious padding, subtle rounded corners (`rounded-xl` or `rounded-md` where specified).

## Layout & Components

### 1. Top Menu (Sticky Top Header)
- **Sticky Layout**: Remains locked at the top of the viewport.
- **Controls**: Include UI filters and buttons to manipulate the graph elements (e.g., reset layout, clear filters).
- **Styling**: Action buttons must use button color `#C7FF00`, text color black, and `rounded-md`.
- **Responsiveness**: Implement a mobile-friendly, animated Hamburger Menu built natively with React `useState` (no external UI library dependencies).

### 2. Graph Editor Canvas
- **Canvas Container**: Fully responsive width/height tracking across mobile, tablet, and desktop viewports. Set background color to solid white.
- **Custom Nodes**: Create a custom React Flow node component to render the dataset seamlessly.
  - Apply background color `#DDDDDD`, `rounded-md`, and a distinct state/border change on hover.
  - Display the node `type` as a small header badge, followed by `data.name`, `ATP`, and `Gross_requ`.
- **Custom Controls**: Create a minimal floating overlay panel with custom `+` and `-` buttons styled with `#DDDDDD` to drive zoom-in and zoom-out behaviors via the React Flow API.
- **Initial Dataset**:
```Typescript
const initialNodes = [
  { id: '1', type: 'Mine', data: { name: 'BHP Billiton (Silicon/Metals)', ATP: 1200, Gross_requ: 0 }, position: { x: 0, y: 150 } },
  { id: '2', type: 'Refinery', data: { name: 'Wacker Chemie (Polysilicon Refining)', ATP: 1000, Gross_requ: 1100 }, position: { x: 250, y: 150 } },
  { id: '3', type: 'Ingot_Grower', data: { name: 'GlobalWafers (Ingot Production)', ATP: 850, Gross_requ: 950 }, position: { x: 500, y: 150 } },
  { id: '4', type: 'Wafer_Manufacturer', data: { name: 'Shin-Etsu Handotai (Silicon Wafers)', ATP: 700, Gross_requ: 800 }, position: { x: 750, y: 150 } },
  { id: '5', type: 'Equipment_Provider', data: { name: 'ASML (Lithography Systems)', ATP: 50, Gross_requ: 40 }, position: { x: 750, y: 0 } },
  { id: '6', type: 'IP_Designer', data: { name: 'ARM Holdings (Architecture/IP)', ATP: 500, Gross_requ: 0 }, position: { x: 500, y: 300 } },
  { id: '7', type: 'Fabless_Designer', data: { name: 'NVIDIA (GPU/Chip Design)', ATP: 450, Gross_requ: 480 }, position: { x: 750, y: 300 } },
  { id: '8', type: 'Chemical_Supplier', data: { name: 'Tokyo Ohka Kogyo (Photoresists)', ATP: 650, Gross_requ: 600 }, position: { x: 750, y: 450 } },
  { id: '9', type: 'Foundry', data: { name: 'TSMC (Wafer Fabrication)', ATP: 400, Gross_requ: 420 }, position: { x: 1100, y: 200 } },
  { id: '10', type: 'OSAT', data: { name: 'ASE Group (Packaging & Testing)', ATP: 380, Gross_requ: 395 }, position: { x: 1350, y: 200 } },
  { id: '11', type: 'Distributor', data: { name: 'Arrow Electronics (Logistics)', ATP: 370, Gross_requ: 375 }, position: { x: 1600, y: 200 } },
  { id: '12', type: 'OEM', data: { name: 'Apple Inc. (Device Assembly)', ATP: 350, Gross_requ: 365 }, position: { x: 1850, y: 200 } }
];

const initialEdges = [
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
  { id: 'e11-12', source: '11', target: '12', label: '7 days' }
];
```

### 3. Footer Component
- Anchor neatly to the bottom of the visible viewport layout.
- Text content string: "Created by Johann Zaroli; [Github](https://github.com)" (Format the link as an anchor placeholder).

## Technical Execution Rules
1. **No External Styles**: Use vanilla Tailwind arbitrary utility classes (`bg-[#DDDDDD]`, `bg-[#C7FF00]`) rather than separate `.css` injections.
2. **React Flow Standards**: Use explicit React Flow `<Background />` sub-components set to a white pattern if necessary, but keep the container base strictly clean white. Include custom edge styles to showcase the `lead_time` metadata cleanly as edge labels.
3. Output the solution in a clean, production-ready single-file dashboard configuration or structured modules that will immediately hot-reload and compile under standard Vite setups.
