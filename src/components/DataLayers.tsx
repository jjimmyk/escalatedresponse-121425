import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { ChevronDown, ChevronRight } from 'lucide-react';
import svgPaths from '../imports/svg-7hg6d30srz';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

type DataLayersProps = {
  className?: string;
  style?: React.CSSProperties;
  orientation?: 'vertical' | 'horizontal';
  onHandlePointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void;
  onCollapse?: () => void;
};

export function DataLayers({ className, style, orientation = 'vertical', onHandlePointerDown, onCollapse }: DataLayersProps) {
  const [weatherExpanded, setWeatherExpanded] = React.useState(false);
  const [resourcesExpanded, setResourcesExpanded] = React.useState(false);
  const [tacticsExpanded, setTacticsExpanded] = React.useState(false);
  const [actionsExpanded, setActionsExpanded] = React.useState(false);
  const [grsExpanded, setGrsExpanded] = React.useState(false);
  const [vesselsExpanded, setVesselsExpanded] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [layerToggles, setLayerToggles] = React.useState({
    weather: { radar: true, warnings: true },
    resources: { staging: true, facilities: true },
    tactics: { booms: true, skimmers: false },
    actions: { open: true, completed: false },
    grs: { priority: true, anchor: false },
    vessels: { ais: true, patrol: false },
  });
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [info, setInfo] = React.useState<{
    title: string;
    source: string;
    owner: string;
    created: string;
    lastUpdated: string;
    timezone: string;
    frequency: string;
  } | null>(null);

  const openLayerInfo = (title: string) => {
    // Provide plausible metadata per layer title
    const presets: Record<
      string,
      { source: string; owner: string; created: string; lastUpdated: string; timezone: string; frequency: string }
    > = {
      'Radar Precipitation': {
        source: 'NOAA NEXRAD Composite',
        owner: 'NOAA',
        created: '2022-01-01 00:00',
        lastUpdated: '2025-11-15 14:05',
        timezone: 'UTC',
        frequency: 'Every 5 minutes'
      },
      'Active Weather Warnings': {
        source: 'NOAA Weather Alerts (CAP)',
        owner: 'NOAA',
        created: '2020-05-12 08:00',
        lastUpdated: '2025-11-15 14:02',
        timezone: 'UTC',
        frequency: 'Real-time'
      },
      'Staging Areas': {
        source: 'Incident Logistics GIS (IMS)',
        owner: 'Unified Command - Logistics',
        created: '2025-11-14 09:15',
        lastUpdated: '2025-11-15 13:40',
        timezone: 'UTC',
        frequency: 'Hourly'
      },
      'Critical Facilities': {
        source: 'State Infrastructure GIS',
        owner: 'State EOC - Infrastructure',
        created: '2024-06-01 12:00',
        lastUpdated: '2025-11-15 12:00',
        timezone: 'UTC',
        frequency: 'Daily'
      },
      'Boom Deployment Lines': {
        source: 'Operations Section (Field Mapping)',
        owner: 'Operations - Marine Branch',
        created: '2025-11-15 06:00',
        lastUpdated: '2025-11-15 13:55',
        timezone: 'UTC',
        frequency: 'Ad hoc (as reported)'
      },
      'Skimmer Operations': {
        source: 'Operations Section (Marine)',
        owner: 'Operations - Marine Branch',
        created: '2025-11-15 05:30',
        lastUpdated: '2025-11-15 13:50',
        timezone: 'UTC',
        frequency: 'Ad hoc (as reported)'
      },
      'Open Action Items': {
        source: 'Planning Section (ICS-204/215)',
        owner: 'Planning Section',
        created: '2025-11-14 18:00',
        lastUpdated: '2025-11-15 13:30',
        timezone: 'UTC',
        frequency: 'Per operational update'
      },
      'Completed Action Items': {
        source: 'Planning Section (ICS-204/215)',
        owner: 'Planning Section',
        created: '2025-11-14 18:00',
        lastUpdated: '2025-11-15 13:10',
        timezone: 'UTC',
        frequency: 'Per operational update'
      },
      'Priority Protection Areas': {
        source: 'Environmental Unit (GRP/GRS)',
        owner: 'Environmental Unit',
        created: '2023-03-10 10:00',
        lastUpdated: '2025-11-15 12:45',
        timezone: 'UTC',
        frequency: 'Daily'
      },
      'Boom Anchor Points': {
        source: 'Environmental Unit (Field Survey)',
        owner: 'Environmental Unit',
        created: '2025-11-12 11:25',
        lastUpdated: '2025-11-15 12:20',
        timezone: 'UTC',
        frequency: 'Ad hoc (as surveyed)'
      },
      'AIS Vessel Tracks': {
        source: 'AIS Feed (USCG / Commercial AIS)',
        owner: 'USCG / AIS Providers',
        created: '2019-01-01 00:00',
        lastUpdated: '2025-11-15 14:05',
        timezone: 'UTC',
        frequency: 'Every minute'
      },
      'Patrol Sectors': {
        source: 'USCG Sector Command',
        owner: 'USCG Sector Command',
        created: '2025-11-10 07:00',
        lastUpdated: '2025-11-15 13:25',
        timezone: 'UTC',
        frequency: 'Per shift'
      }
    };
    const meta = presets[title] ?? {
      source: 'Unknown',
      owner: 'Unknown',
      created: 'N/A',
      lastUpdated: 'N/A',
      timezone: 'UTC',
      frequency: 'N/A'
    };
    setInfo({ title, ...meta });
    setInfoOpen(true);
  };

  // counts: selected/total per category
  const weatherSelected = Object.values(layerToggles.weather).filter(Boolean).length;
  const weatherTotal = Object.keys(layerToggles.weather).length;
  const resourcesSelected = Object.values(layerToggles.resources).filter(Boolean).length;
  const resourcesTotal = Object.keys(layerToggles.resources).length;
  const tacticsSelected = Object.values(layerToggles.tactics).filter(Boolean).length;
  const tacticsTotal = Object.keys(layerToggles.tactics).length;
  const actionsSelected = Object.values(layerToggles.actions).filter(Boolean).length;
  const actionsTotal = Object.keys(layerToggles.actions).length;
  const grsSelected = Object.values(layerToggles.grs).filter(Boolean).length;
  const grsTotal = Object.keys(layerToggles.grs).length;
  const vesselsSelected = Object.values(layerToggles.vessels).filter(Boolean).length;
  const vesselsTotal = Object.keys(layerToggles.vessels).length;

  return (
    <Card className={`${className ?? ''} flex flex-col relative`} style={style} role="complementary" aria-label="Data Layers">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="relative h-[26px] w-[195px]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="box-border w-full h-[26px] bg-transparent border border-[#6e757c] rounded-[4px] px-[26px] py-[3.25px] caption text-white placeholder:text-[#6e757c] focus:outline-none focus:border-accent"
            />
            <div className="absolute left-[8px] size-[11.375px] top-[7.44px] pointer-events-none">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                <g>
                  <path d={svgPaths.p3a3bec00} stroke="#6E757C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.710938" />
                  <path d={svgPaths.p380aaa80} stroke="#6E757C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.710938" />
                </g>
              </svg>
            </div>
          </div>
          <div className="ml-auto">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="hover:bg-muted"
              onClick={() => onCollapse && onCollapse()}
              title="Collapse data layers"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 min-h-0 overflow-y-auto pr-2">
        {/* Weather */}
        <div
          className="border border-border rounded-lg overflow-hidden"
          style={{
            background:
              'linear-gradient(90deg, rgba(2, 163, 254, 0.08) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(20, 23, 26) 0%, rgb(20, 23, 26) 100%)',
            ...(orientation === 'horizontal' ? { minWidth: '320px' } : {})
          }}
        >
          <div className={`p-3 ${weatherExpanded ? 'border-b border-border' : ''}`}>
            <div className="flex items-start justify-between">
              <div
                className="flex items-start gap-2 flex-1 cursor-pointer"
                onClick={() => setWeatherExpanded((v) => !v)}
              >
                {weatherExpanded ? (
                  <ChevronDown className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                )}
                <Label>Weather</Label>
              </div>
              <div className="flex items-center gap-3">
                <Button type="button" variant="outline" size="sm" className="h-5 px-1 py-0 text-[10px]" style={{ paddingLeft: '0.275rem', paddingRight: '0.275rem' }}>+ Add Layer</Button>
              </div>
            </div>
          </div>
          {weatherExpanded && (
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-[2px]"
                    style={{ backgroundColor: 'rgba(0,123,255,0.35)', border: '1px solid rgba(255,255,255,0.6)' }}
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => openLayerInfo('Radar Precipitation')}
                    className="text-left bg-transparent p-0"
                    title="View data source details"
                  >
                    <Label className="cursor-pointer">Radar Precipitation</Label>
                  </button>
                </div>
                <Switch
                  checked={layerToggles.weather.radar}
                  onCheckedChange={(v) =>
                    setLayerToggles((prev) => ({
                      ...prev,
                      weather: { ...prev.weather, radar: v },
                    }))
                  }
                  className="dl-switch"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-[2px]"
                    style={{ backgroundColor: 'rgba(220,53,69,0.15)', border: '1px solid rgba(255,255,255,0.6)' }}
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => openLayerInfo('Active Weather Warnings')}
                    className="text-left bg-transparent p-0"
                    title="View data source details"
                  >
                    <Label className="cursor-pointer">Active Weather Warnings</Label>
                  </button>
                </div>
                <Switch
                  checked={layerToggles.weather.warnings}
                  onCheckedChange={(v) =>
                    setLayerToggles((prev) => ({
                      ...prev,
                      weather: { ...prev.weather, warnings: v },
                    }))
                  }
                  className="dl-switch"
                />
              </div>
            </div>
          )}
        </div>

        {/* Resources */}
        <div
          className="border border-border rounded-lg overflow-hidden"
          style={{
            background:
              'linear-gradient(90deg, rgba(2, 163, 254, 0.08) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(20, 23, 26) 0%, rgb(20, 23, 26) 100%)',
            ...(orientation === 'horizontal' ? { minWidth: '320px' } : {})
          }}
        >
          <div className={`p-3 ${resourcesExpanded ? 'border-b border-border' : ''}`}>
            <div className="flex items-start justify-between">
              <div
                className="flex items-start gap-2 flex-1 cursor-pointer"
                onClick={() => setResourcesExpanded((v) => !v)}
              >
                {resourcesExpanded ? (
                  <ChevronDown className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                )}
                <Label>Resources</Label>
              </div>
              <div className="flex items-center gap-3">
                <Button type="button" variant="outline" size="sm" className="h-5 px-1 py-0 text-[10px]" style={{ paddingLeft: '0.275rem', paddingRight: '0.275rem' }}>+ Add Layer</Button>
              </div>
            </div>
          </div>
          {resourcesExpanded && (
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: '#22c55e', border: '1px solid rgba(255,255,255,0.6)' }}
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => openLayerInfo('Staging Areas')}
                    className="text-left bg-transparent p-0"
                    title="View data source details"
                  >
                    <Label className="cursor-pointer">Staging Areas</Label>
                  </button>
                </div>
                <Switch
                  checked={layerToggles.resources.staging}
                  onCheckedChange={(v) =>
                    setLayerToggles((prev) => ({
                      ...prev,
                      resources: { ...prev.resources, staging: v },
                    }))
                  }
                  className="dl-switch"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: '#a855f7', border: '1px solid rgba(255,255,255,0.6)' }}
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => openLayerInfo('Critical Facilities')}
                    className="text-left bg-transparent p-0"
                    title="View data source details"
                  >
                    <Label className="cursor-pointer">Critical Facilities</Label>
                  </button>
                </div>
                <Switch
                  checked={layerToggles.resources.facilities}
                  onCheckedChange={(v) =>
                    setLayerToggles((prev) => ({
                      ...prev,
                      resources: { ...prev.resources, facilities: v },
                    }))
                  }
                  className="dl-switch"
                />
              </div>
            </div>
          )}
        </div>

        {/* Tactics */}
        <div
          className="border border-border rounded-lg overflow-hidden"
          style={{
            background:
              'linear-gradient(90deg, rgba(2, 163, 254, 0.08) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(20, 23, 26) 0%, rgb(20, 23, 26) 100%)',
            ...(orientation === 'horizontal' ? { minWidth: '320px' } : {})
          }}
        >
          <div className={`p-3 ${tacticsExpanded ? 'border-b border-border' : ''}`}>
            <div className="flex items-start justify-between">
              <div
                className="flex items-start gap-2 flex-1 cursor-pointer"
                onClick={() => setTacticsExpanded((v) => !v)}
              >
                {tacticsExpanded ? (
                  <ChevronDown className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                )}
                <Label>Tactics</Label>
              </div>
              <div className="flex items-center gap-3">
                <Button type="button" variant="outline" size="sm" className="h-5 px-1 py-0 text-[10px]" style={{ paddingLeft: '0.275rem', paddingRight: '0.275rem' }}>+ Add Layer</Button>
              </div>
            </div>
          </div>
          {tacticsExpanded && (
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block"
                    style={{
                      width: '24px',
                      height: '6px',
                      backgroundColor: '#f59e0b',
                      border: '1px solid rgba(255,255,255,0.6)',
                      borderRadius: '3px'
                    }}
                    aria-hidden
                    title="Line symbol"
                  />
                  <button
                    type="button"
                    onClick={() => openLayerInfo('Boom Deployment Lines')}
                    className="text-left bg-transparent p-0"
                    title="View data source details"
                  >
                    <Label className="cursor-pointer">Boom Deployment Lines</Label>
                  </button>
                </div>
                <Switch
                  checked={layerToggles.tactics.booms}
                  onCheckedChange={(v) =>
                    setLayerToggles((prev) => ({
                      ...prev,
                      tactics: { ...prev.tactics, booms: v },
                    }))
                  }
                  className="dl-switch"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block"
                    style={{
                      width: '24px',
                      height: '6px',
                      backgroundImage:
                        'repeating-linear-gradient(90deg, #3b82f6 0 8px, transparent 8px 12px)',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255,255,255,0.6)',
                      borderRadius: '3px'
                    }}
                    aria-hidden
                    title="Dashed line symbol"
                  />
                  <button
                    type="button"
                    onClick={() => openLayerInfo('Skimmer Operations')}
                    className="text-left bg-transparent p-0"
                    title="View data source details"
                  >
                    <Label className="cursor-pointer">Skimmer Operations</Label>
                  </button>
                </div>
                <Switch
                  checked={layerToggles.tactics.skimmers}
                  onCheckedChange={(v) =>
                    setLayerToggles((prev) => ({
                      ...prev,
                      tactics: { ...prev.tactics, skimmers: v },
                    }))
                  }
                  className="dl-switch"
                />
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div
          className="border border-border rounded-lg overflow-hidden"
          style={{
            background:
              'linear-gradient(90deg, rgba(2, 163, 254, 0.08) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(20, 23, 26) 0%, rgb(20, 23, 26) 100%)',
            ...(orientation === 'horizontal' ? { minWidth: '320px' } : {})
          }}
        >
          <div className={`p-3 ${actionsExpanded ? 'border-b border-border' : ''}`}>
            <div className="flex items-start justify-between">
              <div
                className="flex items-start gap-2 flex-1 cursor-pointer"
                onClick={() => setActionsExpanded((v) => !v)}
              >
                {actionsExpanded ? (
                  <ChevronDown className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                )}
                <Label>Actions</Label>
              </div>
              <div className="flex items-center gap-3">
                <Button type="button" variant="outline" size="sm" className="h-5 px-1 py-0 text-[10px]" style={{ paddingLeft: '0.275rem', paddingRight: '0.275rem' }}>+ Add Layer</Button>
              </div>
            </div>
          </div>
          {actionsExpanded && (
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: '#facc15', border: '1px solid rgba(255,255,255,0.6)' }}
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => openLayerInfo('Open Action Items')}
                    className="text-left bg-transparent p-0"
                    title="View data source details"
                  >
                    <Label className="cursor-pointer">Open Action Items</Label>
                  </button>
                </div>
                <Switch
                  checked={layerToggles.actions.open}
                  onCheckedChange={(v) =>
                    setLayerToggles((prev) => ({
                      ...prev,
                      actions: { ...prev.actions, open: v },
                    }))
                  }
                  className="dl-switch"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: '#9ca3af', border: '1px solid rgba(255,255,255,0.6)' }}
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => openLayerInfo('Completed Action Items')}
                    className="text-left bg-transparent p-0"
                    title="View data source details"
                  >
                    <Label className="cursor-pointer">Completed Action Items</Label>
                  </button>
                </div>
                <Switch
                  checked={layerToggles.actions.completed}
                  onCheckedChange={(v) =>
                    setLayerToggles((prev) => ({
                      ...prev,
                      actions: { ...prev.actions, completed: v },
                    }))
                  }
                  className="dl-switch"
                />
              </div>
            </div>
          )}
        </div>

        {/* Geographic Response Strategies */}
        <div
          className="border border-border rounded-lg overflow-hidden"
          style={{
            background:
              'linear-gradient(90deg, rgba(2, 163, 254, 0.08) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(20, 23, 26) 0%, rgb(20, 23, 26) 100%)',
            ...(orientation === 'horizontal' ? { minWidth: '320px' } : {})
          }}
        >
          <div className={`p-3 ${grsExpanded ? 'border-b border-border' : ''}`}>
            <div className="flex items-start justify-between">
              <div
                className="flex items-start gap-2 flex-1 cursor-pointer"
                onClick={() => setGrsExpanded((v) => !v)}
              >
                {grsExpanded ? (
                  <ChevronDown className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                )}
                <Label>Geographic Response Strategies</Label>
              </div>
              <div className="flex items-center gap-3">
                <Button type="button" variant="outline" size="sm" className="h-5 px-1 py-0 text-[10px]" style={{ paddingLeft: '0.275rem', paddingRight: '0.275rem' }}>+ Add Layer</Button>
              </div>
            </div>
          </div>
          {grsExpanded && (
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-[2px]"
                    style={{ backgroundColor: 'rgba(13,148,136,0.35)', border: '1px solid #0d9488' }}
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => openLayerInfo('Priority Protection Areas')}
                    className="text-left bg-transparent p-0"
                    title="View data source details"
                  >
                    <Label className="cursor-pointer">Priority Protection Areas</Label>
                  </button>
                </div>
                <Switch
                  checked={layerToggles.grs.priority}
                  onCheckedChange={(v) =>
                    setLayerToggles((prev) => ({
                      ...prev,
                      grs: { ...prev.grs, priority: v },
                    }))
                  }
                  className="dl-switch"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: '#ef4444', border: '1px solid rgba(255,255,255,0.6)' }}
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => openLayerInfo('Boom Anchor Points')}
                    className="text-left bg-transparent p-0"
                    title="View data source details"
                  >
                    <Label className="cursor-pointer">Boom Anchor Points</Label>
                  </button>
                </div>
                <Switch
                  checked={layerToggles.grs.anchor}
                  onCheckedChange={(v) =>
                    setLayerToggles((prev) => ({
                      ...prev,
                      grs: { ...prev.grs, anchor: v },
                    }))
                  }
                  className="dl-switch"
                />
              </div>
            </div>
          )}
        </div>

        {/* Vessel Tracks */}
        <div
          className="border border-border rounded-lg overflow-hidden"
          style={{
            background:
              'linear-gradient(90deg, rgba(2, 163, 254, 0.08) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(20, 23, 26) 0%, rgb(20, 23, 26) 100%)',
            ...(orientation === 'horizontal' ? { minWidth: '320px' } : {})
          }}
        >
          <div className={`p-3 ${vesselsExpanded ? 'border-b border-border' : ''}`}>
            <div className="flex items-start justify-between">
              <div
                className="flex items-start gap-2 flex-1 cursor-pointer"
                onClick={() => setVesselsExpanded((v) => !v)}
              >
                {vesselsExpanded ? (
                  <ChevronDown className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                )}
                <Label>Vessel Tracks</Label>
              </div>
              <div className="flex items-center gap-3">
                <Button type="button" variant="outline" size="sm" className="h-5 px-1 py-0 text-[10px]" style={{ paddingLeft: '0.275rem', paddingRight: '0.275rem' }}>+ Add Layer</Button>
              </div>
            </div>
          </div>
          {vesselsExpanded && (
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block"
                    style={{
                      width: '24px',
                      height: '6px',
                      backgroundColor: '#22c55e',
                      border: '1px solid rgba(255,255,255,0.6)',
                      borderRadius: '3px'
                    }}
                    aria-hidden
                    title="Line symbol"
                  />
                  <button
                    type="button"
                    onClick={() => openLayerInfo('AIS Vessel Tracks')}
                    className="text-left bg-transparent p-0"
                    title="View data source details"
                  >
                    <Label className="cursor-pointer">AIS Vessel Tracks</Label>
                  </button>
                </div>
                <Switch
                  checked={layerToggles.vessels.ais}
                  onCheckedChange={(v) =>
                    setLayerToggles((prev) => ({
                      ...prev,
                      vessels: { ...prev.vessels, ais: v },
                    }))
                  }
                  className="dl-switch"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block"
                    style={{
                      width: '24px',
                      height: '6px',
                      backgroundImage:
                        'repeating-linear-gradient(90deg, #ec4899 0 8px, transparent 8px 12px)',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255,255,255,0.6)',
                      borderRadius: '3px'
                    }}
                    aria-hidden
                    title="Dashed line symbol"
                  />
                  <button
                    type="button"
                    onClick={() => openLayerInfo('Patrol Sectors')}
                    className="text-left bg-transparent p-0"
                    title="View data source details"
                  >
                    <Label className="cursor-pointer">Patrol Sectors</Label>
                  </button>
                </div>
                <Switch
                  checked={layerToggles.vessels.patrol}
                  onCheckedChange={(v) =>
                    setLayerToggles((prev) => ({
                      ...prev,
                      vessels: { ...prev.vessels, patrol: v },
                    }))
                  }
                  className="dl-switch"
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
        <DialogContent className="text-white">
          <DialogHeader>
            <DialogTitle className="text-white">{info?.title ?? 'Layer Details'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm text-white">
            <div className="flex items-center justify-between">
              <span>Data Source</span>
              <span>{info?.source ?? '—'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Data Owner</span>
              <span>{info?.owner ?? '—'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Created</span>
              <span>{info?.created ?? '—'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Last Updated</span>
              <span>{info?.lastUpdated ?? '—'} {info?.timezone ? `(${info.timezone})` : ''}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Update Frequency</span>
              <span>{info?.frequency ?? '—'}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}


