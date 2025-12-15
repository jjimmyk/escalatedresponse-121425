# Escalated Response Map View

An incident command and planning application with integrated ArcGIS mapping capabilities for real-time situational awareness and operational planning.

## Features

- **Incident Command System (ICS) Planning Workflow** - Multi-phase planning process including:
  - Initial Response
  - Initial UC Meeting
  - IC/UC Objectives Meeting
  - Planning Meeting
  - Incident Briefing
  - Safety Analysis
  - Resources Management
  - Incident Roster

- **Interactive ArcGIS Map View** - Fullscreen map with:
  - Real-time operational picture
  - Data layers panel
  - Collapsible side panels
  - PRATUS AI assistant integration

- **AI-Powered Assistant** - Integrated PRATUS AI for:
  - Operational guidance
  - Maritime advisories
  - Infrastructure analysis
  - Context-aware responses

## Technology Stack

- React 18 with TypeScript
- Vite for build tooling
- ArcGIS Embedded Maps
- Tailwind CSS for styling
- shadcn/ui component library
- Lucide React icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jjimmyk/escalatedresponse-121425.git
cd escalatedresponse-121425
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Usage

1. **Dashboard View** - Navigate through planning phases using the stepper at the top
2. **Map View** - Click the "Map" button to enter fullscreen map mode
3. **AI Assistant** - Open the PRATUS AI chat for operational guidance
4. **Phase Management** - Complete tasks and move through operational periods

## Project Structure

```
src/
├── components/          # React components
│   ├── phases/         # Phase-specific components
│   └── ui/             # Reusable UI components
├── types/              # TypeScript type definitions
├── imports/            # Imported assets and SVG paths
└── App.tsx             # Main application component
```

## License

This project is available for use and modification.

## Original Design

Original project design available at: https://www.figma.com/design/2r5EAQRI0PFh2JpD1gD68p/Microsoft-Demo
  