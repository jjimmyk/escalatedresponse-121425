import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Sparkles } from 'lucide-react';

interface OverviewPhaseProps {
  data?: Record<string, any>;
  onDataChange: (data: Record<string, any>) => void;
  onComplete: () => void;
  onPrevious?: () => void;
}

export function OverviewPhase({ data = {}, onDataChange, onComplete, onPrevious }: OverviewPhaseProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [savedValue, setSavedValue] = useState(data.currentSituation || '');

  // Mock incident data - should eventually come from props or global state
  const incidentData = {
    name: 'Oil Spill Alpha',
    type: 'Special Event',
    location: 'AT&T Stadium, Arlington, TX',
    startTime: new Date('2026-06-11T10:00:00'),
    icName: 'Captain Maria Rodriguez',
    status: 'Active',
    priority: 'High',
    capacity: '80,000 attendees',
    security: '85% complete',
    venues: {
      primary: 'AT&T Stadium',
      coverage: '16 host venues nationwide'
    }
  };

  const allItemsCompleted = true;

  const handleTextareaFocus = () => {
    if (!isEditing) {
      setIsEditing(true);
      setEditValue(savedValue);
    }
  };

  const handleTextareaChange = (value: string) => {
    setEditValue(value);
  };

  const handleSave = () => {
    setSavedValue(editValue);
    onDataChange({ ...data, currentSituation: editValue });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(savedValue);
    setIsEditing(false);
  };

  const displayValue = isEditing ? editValue : savedValue;

  return (
    <div className="space-y-6">
      {/* Current Situation Card */}
      <Card className="flex flex-col gap-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              Current Situation
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-border hover:bg-accent hover:text-accent-foreground"
              onClick={() => {
                const generatedText = `Situation Report (SITREP) – Oahu Maritime/Power Infrastructure
Operational Period: Current (T+0–6h) • Focus: Adversary vessel approach to Geofence Alpha (ETA ~3 min) and cross‑domain impacts

Executive Summary
An unidentified adversary vessel (ID: “Adversary Vessel 001”) is tracking inbound toward Geofence Alpha with an estimated arrival at the perimeter in approximately three minutes based on current speed/course over ground. Maritime security posture is elevated while utility, defense, and public safety partners prepare for potential cross‑domain effects (physical access attempt, RF/GNSS interference, or cyber probing correlated with approach). No service‑affecting power outages are currently reported. Weather and sea state may marginally hinder small‑boat maneuvering but do not preclude intentional perimeter contact [1][3].

Weather/Sea State (vicinity, nearshore windward Oʻahu)
- Winds: ENE 15–20 kt with gusts to 25 kt; localized channel acceleration near headlands [1].
- Seas: 4–6 ft wind waves with windward chop; isolated 6–7 ft sets on exposed points [3].
- Visibility: 8–12 nm, brief reductions in passing showers; ceiling mostly 2–4 kft broken [1].
- Tides/Currents: Flood tide tapering; weak onshore set < 0.5 kt in nearshore approaches [2].

Current Situation
- Vessel 001: CPA to Geofence Alpha perimeter ~3 minutes; track steady with minor yaw in chop. AIS ID intermittently unavailable; intermittent spoofed MMSI hits observed on approach vector [4].
- RF/Cyber: Short‑duration spikes in 2.4/5 GHz noise floor within 2 nm; GNSS dilution metrics briefly degraded near shoreline receivers; concurrent credential spray attempts on vendor remote‑access portals (blocked) [5].
- Power Infra: No confirmed faults; utility in N‑1 readiness for critical feeders; vegetation clearance and patrols ongoing on wind‑exposed segments. Mobile generation on standby for priority lifelines [6].

Risk Assessment (near‑term)
- Physical perimeter incursion risk: Moderate to High within T+0–1h if intercept delayed.
- Operational technology exposure: Low to Moderate; no confirmed OT impact. Elevated monitoring and pre‑planned isolation points in place.
- Cascading lifelines: Defense C2 nodes, water pumping stations, hospitals, and telecom backhaul are most sensitive to short‑duration voltage dips or localized grid events.

Immediate Actions (in progress)
1) Maritime: Hail and challenge; activate layered intercept with exclusion bubble; coordinate with USCG/MSIB guidance for temporary safety/security zones [4].
2) Grid: Lock in spinning reserve/VAR support; pre‑configure switching for windward continuity; confirm mobile gen staging and fuel status for priority receivers [6].
3) Cyber: Enforce vendor portal lockouts; confirm MFA on all remote sessions; increase OT network anomaly thresholds with out‑of‑band alerting [5].
4) Public Safety/Defense: Stand up common operating picture overlays; ensure hospital and water utility liaisons on call; ready PA messaging for brief voltage events.

Projected Impacts (T+0–6h)
- If Vessel 001 attempts contact at the perimeter, expect brief maritime exclusion enforcement and possible localized comms/RF interference. Grid effects unlikely absent physical tampering; however, precautionary switching may cause momentary voltage fluctuations on windward feeders. Dependent sites (MCBH C2, hospitals, water pumping) can ride through using UPS/generation if required.

Recommendations (execute now)
1) Intercept and compel course alteration; document hull markings/sensors; record RF spectrum snapshot during closest approach.
2) Stage response crews at access points to critical substations; verify lock integrity and camera uptime; confirm drone counter‑UAS posture.
3) Run 2‑hour loaded tests on priority generators at defense/healthcare sites; verify fuel > 48h at current loads.
4) Maintain four‑hour SITREP cadence across utility/USCG/DoD/County; issue PIRs for any OT alarms, RF anomalies, or AIS/GNSS spoofing indicators.

References (open sources/examples)
[1] NOAA NWS Honolulu – Area Forecast Discussion (marine/windward winds and ceilings).
[2] NOAA Tides & Currents – Honolulu/Oʻahu stations (tide/currents reference).
[3] NOAA National Data Buoy Center – regional buoy observations (seas/period).
[4] USCG (14th District) – Marine Safety Information Bulletins (temporary security/safety zones).
[5] CISA – OT/ICS security advisories and remote access hardening guidance.
[6] Hawaii State Energy Office – Energy Assurance Planning (lifeline continuity and staging).
`;

                setEditValue(generatedText);
                setSavedValue(generatedText);
                onDataChange({ ...data, currentSituation: generatedText });
                setIsEditing(true);
              }}
            >
              <Sparkles className="w-4 h-4" />
              Generate
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 space-y-3">
          <Textarea 
            placeholder="Enter current situation details..."
            className="min-h-[300px] resize-y bg-input-background border-border text-card-foreground"
            value={displayValue}
            onFocus={handleTextareaFocus}
            onChange={(e) => handleTextareaChange(e.target.value)}
          />

          {isEditing && (
            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90"
              >
                Save
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
