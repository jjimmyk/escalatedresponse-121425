import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { Plus, Search, ChevronDown, X, Check, ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { toast } from 'sonner@2.0.3';

interface SafetyAnalysisPhaseProps {
  data: Record<string, any>;
  onDataChange: (data: Record<string, any>) => void;
  onComplete: () => void;
  onPrevious?: () => void;
}

interface MaterialRow {
  id: string;
  material: string;
  qty: string;
  physState: string;
  niosh: string;
  specificGravity: string;
  ph: string;
  idlh: string;
  flashPoint: string;
  lel: string;
  uel: string;
  isEditing: boolean;
}

interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  placeholder: string;
  hasOther?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

function MultiSelectDropdown({
  label,
  options,
  selected,
  onSelectionChange,
  placeholder,
  hasOther = false,
  otherValue = '',
  onOtherChange
}: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allSelected = options.every(opt => selected.includes(opt));

  const toggleSelectAll = () => {
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange([...options]);
    }
  };

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onSelectionChange(selected.filter(item => item !== option));
    } else {
      onSelectionChange([...selected, option]);
    }
  };

  const removeOption = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectionChange(selected.filter(item => item !== option));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="w-full text-left border border-border bg-input-background px-3 py-2 rounded-md hover:bg-card min-h-[36px] relative"
        >
          {selected.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-2 pr-6">
                {selected.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1 px-2 py-1 rounded-md border border-accent bg-transparent"
                    style={{ borderColor: 'var(--accent)' }}
                  >
                    <span className="text-foreground">{item}</span>
                    <X
                      className="h-4 w-4 cursor-pointer hover:text-destructive text-foreground"
                      onClick={(e) => removeOption(item, e)}
                    />
                  </div>
                ))}
              </div>
              <ChevronDown className={`h-4 w-4 text-muted-foreground absolute right-3 top-2 transition-transform ${open ? 'rotate-180' : ''}`} />
            </>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{placeholder}</span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
            </div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[460px] p-0" align="start" side="bottom">
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${label.toLowerCase()}...`}
              className="pl-8 bg-input-background border-border"
            />
          </div>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          <div className="px-3 pt-3 pb-6 space-y-2">
            <div className="flex items-center gap-2 py-2.5">
              <Checkbox
                id={`${label}-select-all`}
                checked={allSelected}
                onCheckedChange={toggleSelectAll}
              />
              <label htmlFor={`${label}-select-all`} className="cursor-pointer flex-1">
                Select All
              </label>
            </div>
            <div className="border-t border-border my-2" />
            {filteredOptions.map((option) => (
              <div key={option} className="flex items-center gap-2 py-2.5">
                <Checkbox
                  id={`${label}-${option}`}
                  checked={selected.includes(option)}
                  onCheckedChange={() => toggleOption(option)}
                />
                <label htmlFor={`${label}-${option}`} className="cursor-pointer flex-1">
                  {option}
                </label>
              </div>
            ))}
            {hasOther && (
              <div className="flex items-center gap-2 py-2.5">
                <span>Other:</span>
                <Input
                  value={otherValue}
                  onChange={(e) => onOtherChange?.(e.target.value)}
                  placeholder="Specify other..."
                  className="flex-1 bg-input-background border-border h-8"
                />
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function SafetyAnalysisPhase({ data, onDataChange, onComplete, onPrevious }: SafetyAnalysisPhaseProps) {
  const [safetyOfficer, setSafetyOfficer] = useState(data.safetyOfficer || '');
  const [physicalHazards, setPhysicalHazards] = useState<string[]>(data.physicalHazards || []);
  const [environmentalHazards, setEnvironmentalHazards] = useState<string[]>(data.environmentalHazards || []);
  const [otherHazards, setOtherHazards] = useState<string[]>(data.otherHazards || []);
  const [physicalHazardsOther, setPhysicalHazardsOther] = useState(data.physicalHazardsOther || '');
  const [environmentalHazardsOther, setEnvironmentalHazardsOther] = useState(data.environmentalHazardsOther || '');
  const [otherHazardsOther, setOtherHazardsOther] = useState(data.otherHazardsOther || '');
  
  // Weather conditions
  const [temp, setTemp] = useState(data.temp || '');
  const [conditions, setConditions] = useState(data.conditions || '');
  const [wind, setWind] = useState(data.wind || '');
  const [tides, setTides] = useState(data.tides || '');
  const [seaState, setSeaState] = useState(data.seaState || '');
  const [waterTemp, setWaterTemp] = useState(data.waterTemp || '');
  const [forecast, setForecast] = useState(data.forecast || '');
  
  const [safetyNotes, setSafetyNotes] = useState(data.safetyNotes || '');
  const [requiredPPE, setRequiredPPE] = useState<string[]>(data.requiredPPE || []);
  const [notesOnPPE, setNotesOnPPE] = useState(data.notesOnPPE || '');
  
  const [hazmatInvolved, setHazmatInvolved] = useState<boolean>(data.hazmatInvolved ?? false);
  const [hazmatAssessment, setHazmatAssessment] = useState<string[]>(data.hazmatAssessment || []);
  const [productSearch, setProductSearch] = useState('');
  const [materials, setMaterials] = useState<MaterialRow[]>(data.materials || []);
  
  const [potentialHazards, setPotentialHazards] = useState<string[]>(data.potentialHazards || []);
  const [requiredInformation, setRequiredInformation] = useState<string[]>(data.requiredInformation || []);
  const [airMonitoring, setAirMonitoring] = useState<boolean>(data.airMonitoring ?? false);
  const [sop, setSop] = useState(data.sop || '');
  const [decontamination, setDecontamination] = useState(data.decontamination || '');
  
  const [medicalMonitoring, setMedicalMonitoring] = useState<boolean>(data.medicalMonitoring ?? false);
  const [medicalTransport, setMedicalTransport] = useState<boolean>(data.medicalTransport ?? false);
  const [emergencyProcedures, setEmergencyProcedures] = useState(data.emergencyProcedures || '');

  // Hazard options based on the Figma design
  const physicalHazardOptions = [
    'Severe Weather',
    'On-Water Response',
    'Flooding',
    'Heat',
    'Ice / Winter Conditions',
    'Debris in Water'
  ];

  const environmentalHazardOptions = [
    'Oil / Petroleum Products',
    'Flammable Gas',
    'Radiological',
    'Poison / Toxins',
    'Blood-Borne Pathogens',
    'Biological Disease',
    'Hazardous Materials',
    'Explosives',
    'Human Remains',
    'Nuclear',
    'Fire'
  ];

  const otherHazardOptions = [
    'Terrorism',
    'Civil Disturbance',
    'Traumatic Incident Stress',
    'Criminal Violence',
    'Wildlife Encounters'
  ];

  const ppeOptions = [
    'Life Jacket',
    'Gloves',
    'Respirators',
    'Steel-Toed Boots',
    'Masks',
    'Face Shields',
    'Hard Hat',
    'Hearing Protection',
    'Fall-Protection Gear',
    'Eye Protection',
    'Protective Clothing',
    'Gas Detectors'
  ];

  const hazmatOptions = [
    'Oil / Petroleum Products',
    'Flammable Liquid',
    'Explosives',
    'Gases',
    'Flammable Solid',
    'Flammable Gas',
    'Oxidizer',
    'Poison (Toxic)',
    'Poison Inhalation Hazard',
    'Radioactive',
    'Corrosive',
    'Dangerous When Wet',
    'Other / Miscellaneous'
  ];

  const potentialHazardsOptions = [
    'The atmosphere contains no known hazards and work conditions preclude splashes, immersion, or potential for unexpected inhalation contact with hazardous levels of any chemicals or pollutants.',
    'Concentrations or types of airborne substances are known and the criteria for using air purifying respirators are met.',
    'Highest level of respiratory protection is needed, but lesser level of skin protection is needed. (SCBA)',
    'Greatest level of skin, respiratory, and eye protection is needed. (Level A)'
  ];

  const requiredInformationOptions = [
    'Security Perimeter',
    'Evacuation Procedures',
    'Medical Triage',
    'Safety Zone',
    'Warning / Danger Signs',
    'Safety Briefings for Responders'
  ];

  const addMaterial = () => {
    const newMaterial: MaterialRow = {
      id: Date.now().toString(),
      material: '',
      qty: '',
      physState: '',
      niosh: '',
      specificGravity: '',
      ph: '',
      idlh: '',
      flashPoint: '',
      lel: '',
      uel: '',
      isEditing: true
    };
    setMaterials([...materials, newMaterial]);
  };

  const updateMaterial = (id: string, field: keyof MaterialRow, value: any) => {
    setMaterials(materials.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const deleteMaterial = (id: string) => {
    setMaterials(materials.filter(m => m.id !== id));
    toast.success('Material deleted successfully');
  };

  const saveMaterial = (id: string) => {
    const material = materials.find(m => m.id === id);
    if (material) {
      // Check if at least the material name is filled
      if (material.material.trim()) {
        setMaterials(materials.map(m => 
          m.id === id ? { ...m, isEditing: false } : m
        ));
        toast.success('Material saved successfully');
      } else {
        toast.error('Please enter a material name');
      }
    }
  };

  const editMaterial = (id: string) => {
    setMaterials(materials.map(m => 
      m.id === id ? { ...m, isEditing: true } : m
    ));
  };

  const cancelEdit = (id: string) => {
    const material = materials.find(m => m.id === id);
    // If material is new (all fields empty), remove it
    if (material && !material.material && !material.qty) {
      setMaterials(materials.filter(m => m.id !== id));
    } else {
      setMaterials(materials.map(m => 
        m.id === id ? { ...m, isEditing: false } : m
      ));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="py-6">
          <div className="space-y-6">
            {/* Safety Officer */}
            <div>
              <Label htmlFor="safety-officer">Safety Officer:</Label>
              <Input
                id="safety-officer"
                value={safetyOfficer}
                onChange={(e) => setSafetyOfficer(e.target.value)}
                placeholder="Enter safety officer..."
                className="mt-2 bg-input-background border-border"
              />
            </div>

            {/* Physical Hazards */}
            <div>
              <Label>Physical Hazards</Label>
              <div className="mt-2">
                <MultiSelectDropdown
                  label="Physical Hazards"
                  options={physicalHazardOptions}
                  selected={physicalHazards}
                  onSelectionChange={setPhysicalHazards}
                  placeholder="Click to select physical hazards..."
                  hasOther={false}
                />
              </div>
            </div>

            {/* Environmental Hazards */}
            <div>
              <Label>Environmental Hazards</Label>
              <div className="mt-2">
                <MultiSelectDropdown
                  label="Environmental Hazards"
                  options={environmentalHazardOptions}
                  selected={environmentalHazards}
                  onSelectionChange={setEnvironmentalHazards}
                  placeholder="Click to select environmental hazards..."
                  hasOther={true}
                  otherValue={environmentalHazardsOther}
                  onOtherChange={setEnvironmentalHazardsOther}
                />
              </div>
            </div>

            {/* Other Hazards */}
            <div>
              <Label>Other Hazards</Label>
              <div className="mt-2">
                <MultiSelectDropdown
                  label="Other Hazards"
                  options={otherHazardOptions}
                  selected={otherHazards}
                  onSelectionChange={setOtherHazards}
                  placeholder="Click to select other hazards..."
                  hasOther={true}
                  otherValue={otherHazardsOther}
                  onOtherChange={setOtherHazardsOther}
                />
              </div>
            </div>

            {/* Weather Conditions */}
            <div>
              <Label>Weather Conditions:</Label>
              <div className="mt-2 grid grid-cols-4 gap-4">
                <div>
                  <label className="block mb-1">Temp:</label>
                  <Input
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    placeholder="Enter temp..."
                    className="bg-input-background border-border"
                  />
                </div>
                <div>
                  <label className="block mb-1">Conditions:</label>
                  <Input
                    value={conditions}
                    onChange={(e) => setConditions(e.target.value)}
                    placeholder="Enter conditions..."
                    className="bg-input-background border-border"
                  />
                </div>
                <div>
                  <label className="block mb-1">Wind:</label>
                  <Input
                    value={wind}
                    onChange={(e) => setWind(e.target.value)}
                    placeholder="Enter wind..."
                    className="bg-input-background border-border"
                  />
                </div>
                <div>
                  <label className="block mb-1">Tides:</label>
                  <Input
                    value={tides}
                    onChange={(e) => setTides(e.target.value)}
                    placeholder="Enter tides..."
                    className="bg-input-background border-border"
                  />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-4">
                <div>
                  <label className="block mb-1">Sea State:</label>
                  <Input
                    value={seaState}
                    onChange={(e) => setSeaState(e.target.value)}
                    placeholder="Enter sea..."
                    className="bg-input-background border-border"
                  />
                </div>
                <div>
                  <label className="block mb-1">Water Temp:</label>
                  <Input
                    value={waterTemp}
                    onChange={(e) => setWaterTemp(e.target.value)}
                    placeholder="Enter water..."
                    className="bg-input-background border-border"
                  />
                </div>
                <div>
                  <label className="block mb-1">Forecast:</label>
                  <Input
                    value={forecast}
                    onChange={(e) => setForecast(e.target.value)}
                    placeholder="Enter forecast..."
                    className="bg-input-background border-border"
                  />
                </div>
              </div>
            </div>

            {/* Safety Notes */}
            <div>
              <Label htmlFor="safety-notes">Safety Notes</Label>
              <Textarea
                id="safety-notes"
                value={safetyNotes}
                onChange={(e) => setSafetyNotes(e.target.value)}
                placeholder="Enter a description..."
                className="mt-2 bg-input-background border-border min-h-[80px]"
              />
            </div>

            {/* Required PPE */}
            <div>
              <Label>Required Personal Protective Equipment (PPE)</Label>
              <div className="mt-2">
                <MultiSelectDropdown
                  label="Required PPE"
                  options={ppeOptions}
                  selected={requiredPPE}
                  onSelectionChange={setRequiredPPE}
                  placeholder="Click to select PPE..."
                  hasOther={false}
                />
              </div>
            </div>

            {/* Notes on PPE */}
            <div>
              <Label htmlFor="notes-ppe">Notes on PPE</Label>
              <Textarea
                id="notes-ppe"
                value={notesOnPPE}
                onChange={(e) => setNotesOnPPE(e.target.value)}
                placeholder="Enter a description..."
                className="mt-2 bg-input-background border-border min-h-[80px]"
              />
            </div>

            {/* HAZMAT Section */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="hazmat-involved"
                    checked={hazmatInvolved}
                    onCheckedChange={(checked) => setHazmatInvolved(checked === true)}
                  />
                  <Label htmlFor="hazmat-involved" className="cursor-pointer">
                    Does the incident involve Hazardous Materials (HAZMAT)
                  </Label>
                </div>
                <span className="text-muted-foreground">If checked, complete HAZMAT Assessment below.</span>
              </div>
            </div>

            {/* HAZMAT Assessment */}
            <div>
              <Label>Hazardous Material (HAZMAT) Assessment:</Label>
              <div className="mt-2">
                <MultiSelectDropdown
                  label="HAZMAT Assessment"
                  options={hazmatOptions}
                  selected={hazmatAssessment}
                  onSelectionChange={setHazmatAssessment}
                  placeholder="Click to select hazardous materials..."
                  hasOther={false}
                />
              </div>
            </div>

            {/* Product or Material Description with Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Label>Product or Material Description:</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Search product/material..."
                      className="bg-input-background border-border pl-10 w-[300px]"
                    />
                  </div>
                </div>
                <Button
                  onClick={addMaterial}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground h-9 px-4 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Material
                </Button>
              </div>

              {/* Materials Table */}
              <div className="border border-border rounded-md overflow-hidden">
                <div className="max-h-[600px] overflow-auto" style={{ scrollbarGutter: 'stable' }}>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-card border-b border-border">
                        <th className="px-3 py-3 text-left">
                          <span>Material</span>
                        </th>
                        <th className="px-3 py-3 text-left">
                          <span>QTY</span>
                        </th>
                        <th className="px-3 py-3 text-left">
                          <span>Phys State</span>
                        </th>
                        <th className="px-3 py-3 text-left">
                          <span>NIOSH#</span>
                        </th>
                        <th className="px-3 py-3 text-left">
                          <span>Specific Gravity</span>
                        </th>
                        <th className="px-3 py-3 text-left">
                          <span>pH</span>
                        </th>
                        <th className="px-3 py-3 text-left">
                          <span>IDLH</span>
                        </th>
                        <th className="px-3 py-3 text-left">
                          <span>Flash Point</span>
                        </th>
                        <th className="px-3 py-3 text-left">
                          <span>LEL</span>
                        </th>
                        <th className="px-3 py-3 text-left">
                          <span>UEL</span>
                        </th>
                        <th className="px-3 py-3 text-left w-20"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {materials.map((material) => (
                        <tr key={material.id} className={`border-b border-border last:border-b-0 bg-card ${!material.isEditing ? 'hover:bg-muted/30' : ''}`}>
                          {material.isEditing ? (
                            <>
                              {/* Edit Mode - Show Inputs */}
                              <td className="px-3 py-2">
                                <Input
                                  value={material.material}
                                  onChange={(e) => updateMaterial(material.id, 'material', e.target.value)}
                                  placeholder="This material"
                                  className="bg-input-background border-border h-8 min-w-[120px]"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  value={material.qty}
                                  onChange={(e) => updateMaterial(material.id, 'qty', e.target.value)}
                                  placeholder="3"
                                  className="bg-input-background border-border h-8 min-w-[60px]"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  value={material.physState}
                                  onChange={(e) => updateMaterial(material.id, 'physState', e.target.value)}
                                  placeholder="Phys State"
                                  className="bg-input-background border-border h-8 min-w-[100px]"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  value={material.niosh}
                                  onChange={(e) => updateMaterial(material.id, 'niosh', e.target.value)}
                                  placeholder="NIOSH#"
                                  className="bg-input-background border-border h-8 min-w-[100px]"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  value={material.specificGravity}
                                  onChange={(e) => updateMaterial(material.id, 'specificGravity', e.target.value)}
                                  placeholder="Specific Gravity"
                                  className="bg-input-background border-border h-8 min-w-[120px]"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  value={material.ph}
                                  onChange={(e) => updateMaterial(material.id, 'ph', e.target.value)}
                                  placeholder="pH"
                                  className="bg-input-background border-border h-8 min-w-[80px]"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  value={material.idlh}
                                  onChange={(e) => updateMaterial(material.id, 'idlh', e.target.value)}
                                  placeholder="IDLH"
                                  className="bg-input-background border-border h-8 min-w-[80px]"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  value={material.flashPoint}
                                  onChange={(e) => updateMaterial(material.id, 'flashPoint', e.target.value)}
                                  placeholder="Flash Point"
                                  className="bg-input-background border-border h-8 min-w-[100px]"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  value={material.lel}
                                  onChange={(e) => updateMaterial(material.id, 'lel', e.target.value)}
                                  placeholder="LEL"
                                  className="bg-input-background border-border h-8 min-w-[80px]"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  value={material.uel}
                                  onChange={(e) => updateMaterial(material.id, 'uel', e.target.value)}
                                  placeholder="UEL"
                                  className="bg-input-background border-border h-8 min-w-[80px]"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => saveMaterial(material.id)}
                                    className="text-green-500 hover:text-green-400 transition-colors"
                                    title="Save"
                                  >
                                    <Check className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => cancelEdit(material.id)}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    title="Cancel"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </>
                          ) : (
                            <>
                              {/* Display Mode - Show Text */}
                              <td className="px-3 py-3">
                                <span className="text-foreground">{material.material || '-'}</span>
                              </td>
                              <td className="px-3 py-3">
                                <span className="text-foreground">{material.qty || '-'}</span>
                              </td>
                              <td className="px-3 py-3">
                                <span className="text-foreground">{material.physState || '-'}</span>
                              </td>
                              <td className="px-3 py-3">
                                <span className="text-foreground">{material.niosh || '-'}</span>
                              </td>
                              <td className="px-3 py-3">
                                <span className="text-foreground">{material.specificGravity || '-'}</span>
                              </td>
                              <td className="px-3 py-3">
                                <span className="text-foreground">{material.ph || '-'}</span>
                              </td>
                              <td className="px-3 py-3">
                                <span className="text-foreground">{material.idlh || '-'}</span>
                              </td>
                              <td className="px-3 py-3">
                                <span className="text-foreground">{material.flashPoint || '-'}</span>
                              </td>
                              <td className="px-3 py-3">
                                <span className="text-foreground">{material.lel || '-'}</span>
                              </td>
                              <td className="px-3 py-3">
                                <span className="text-foreground">{material.uel || '-'}</span>
                              </td>
                              <td className="px-3 py-3">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => editMaterial(material.id)}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    title="Edit"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => deleteMaterial(material.id)}
                                    className="text-muted-foreground hover:text-red-500 transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Potential Hazards */}
            <div>
              <Label>Potential Hazards</Label>
              <div className="mt-2">
                <MultiSelectDropdown
                  label="Potential Hazards"
                  options={potentialHazardsOptions}
                  selected={potentialHazards}
                  onSelectionChange={setPotentialHazards}
                  placeholder="Click to select potential hazards..."
                  hasOther={false}
                />
              </div>
            </div>

            {/* Required Information */}
            <div>
              <Label>Does the incident require a need for any of the following?</Label>
              <div className="mt-2">
                <MultiSelectDropdown
                  label="Required Information"
                  options={requiredInformationOptions}
                  selected={requiredInformation}
                  onSelectionChange={setRequiredInformation}
                  placeholder="Click to select required information..."
                  hasOther={false}
                />
              </div>
            </div>

            {/* Air Monitoring */}
            <div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="air-monitoring"
                  checked={airMonitoring}
                  onCheckedChange={(checked) => setAirMonitoring(checked === true)}
                />
                <Label htmlFor="air-monitoring" className="cursor-pointer">
                  Air Monitoring Required?
                </Label>
              </div>
            </div>

            {/* Standard Operating Procedures */}
            <div>
              <Label htmlFor="sop">Standard Operating Procedures (SOP) and Safe Work Practices</Label>
              <Textarea
                id="sop"
                value={sop}
                onChange={(e) => setSop(e.target.value)}
                placeholder="Enter a description..."
                className="mt-2 bg-input-background border-border min-h-[80px]"
              />
            </div>

            {/* Decontamination Procedures */}
            <div>
              <Label htmlFor="decontamination">Decontamination Procedures:</Label>
              <Textarea
                id="decontamination"
                value={decontamination}
                onChange={(e) => setDecontamination(e.target.value)}
                placeholder="Enter a description..."
                className="mt-2 bg-input-background border-border min-h-[100px]"
              />
            </div>

            {/* Medical */}
            <div>
              <div className="space-y-3">
                <div className="flex items-center gap-6">
                  <span>Medical:</span>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="medical-monitoring"
                      checked={medicalMonitoring}
                      onCheckedChange={(checked) => setMedicalMonitoring(checked === true)}
                    />
                    <Label htmlFor="medical-monitoring" className="cursor-pointer">
                      Medical Monitoring required
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="medical-transport"
                      checked={medicalTransport}
                      onCheckedChange={(checked) => setMedicalTransport(checked === true)}
                    />
                    <Label htmlFor="medical-transport" className="cursor-pointer">
                      Medical Treatment and Transport in place?
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Procedures */}
            <div>
              <Label htmlFor="emergency-procedures">Emergency Procedures:</Label>
              <Textarea
                id="emergency-procedures"
                value={emergencyProcedures}
                onChange={(e) => setEmergencyProcedures(e.target.value)}
                placeholder="Enter a description..."
                className="mt-2 bg-input-background border-border min-h-[80px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
