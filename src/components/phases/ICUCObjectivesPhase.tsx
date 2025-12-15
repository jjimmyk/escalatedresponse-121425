import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { ArrowRight, ArrowLeft, Target, ChevronDown, Trash2, FileText, AlertTriangle, Shield, FileCheck, Download, Plus, Maximize, Minimize, Users, Calendar, ClipboardList, ListTodo, X, Search, Filter, ArrowUpDown, ArrowUp, ArrowDown, Edit2, Save, XCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import ButtonXs from '../../../imports/ButtonXs';
import ButtonXsAddAction from '../../../imports/ButtonXs-70001-434';
import ButtonAddMaterial from '../../../imports/ButtonAddMaterial';
import organizationRosterImage from 'figma:asset/0e46008b6891c0e8504a61d06f5884916585b5a3.png';
import resourcesSummaryImage from 'figma:asset/dea0249fada64b45617982ce53c115a57ff195b2.png';




interface ThreatAlert {
  id: string;
  threatType: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  location: string;
  timeDetected: string;
  status: 'Active' | 'Monitoring' | 'Resolved';
  assignedTo: string;
  createdAt: Date;
}

interface WorkAssignment {
  id: string;
  assignmentName: string;
  assignedTo: string;
  status: 'Assigned' | 'In Progress' | 'Complete';
  priority: 'Low' | 'Medium' | 'High';
  resources: string;
  location: string;
}

interface Tactic {
  id: string;
  tacticName: string;
  description: string;
  workAssignments: WorkAssignment[];
  createdAt: Date;
}

interface ICUCObjectivesPhaseProps {
  data?: Record<string, any>;
  onDataChange?: (data: Record<string, any>) => void;
  onComplete?: () => void;
  onPrevious?: () => void;
  operationalPeriodNumber?: number;
}

export function ICUCObjectivesPhase({ data = {}, onDataChange, onComplete, onPrevious, operationalPeriodNumber = 0 }: ICUCObjectivesPhaseProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(data.checkedItems || {});
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(data.expandedItems || {});
  const [notes, setNotes] = useState<Record<string, string>>(data.notes || {});

  const [expandedThreats, setExpandedThreats] = useState<Record<string, boolean>>(data.expandedThreats || {});
  const [expandedTactics, setExpandedTactics] = useState<Record<string, boolean>>(data.expandedTactics || {});
  const [expandedDeliverables, setExpandedDeliverables] = useState<Record<string, boolean>>(data.expandedDeliverables || {});

  


  // Deliverables state
  const [deliverables, setDeliverables] = useState<Record<string, boolean>>(data.deliverables || {});
  
  // Fullscreen state
  const [fullscreenCard, setFullscreenCard] = useState<string | null>(null);
  
  // ICS 201 Form State
  const [ics201Data, setIcs201Data] = useState({
    mapSketch: data.ics201Data?.mapSketch || '',
    currentSituation: data.ics201Data?.currentSituation || '',
    responseObjectives: data.ics201Data?.responseObjectives || [],
    organizationRoster: data.ics201Data?.organizationRoster || [
      { id: '1', position: '', assignee: '' }
    ],
    resourcesSummary: data.ics201Data?.resourcesSummary || [
      { id: '1', resource: '', resourceIdentifier: '', dateTimeOrdered: '', eta: '', onScene: false, notes: '' }
    ],
    safetyAnalysis: data.ics201Data?.safetyAnalysis || {
      safetyOfficer: '',
      physicalHazards: [],
      environmentalHazards: [],
      otherHazards: [],
      weatherConditions: {
        temperature: '',
        conditions: '',
        wind: '',
        tides: '',
        seaState: '',
        waterTemperature: '',
        forecast: '',
        safetyNotes: ''
      },
      ppeRequirements: {
        requiredPPE: [],
        ppeNotes: '',
        isHazmat: false
      },
      hazmatAssessment: {
        hazmatClassification: [],
        protectionLevels: [],
        materialDescriptions: [
          {
            id: '1',
            material: '',
            quantity: '',
            physicalState: '',
            nioshNumber: '',
            specificGravity: '',
            ph: '',
            idlh: '',
            flashPoint: '',
            lel: '',
            uel: ''
          }
        ]
      }
    }
  });
  
  // Search, Filter, and Sort State
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [actionTableStates, setActionTableStates] = useState<Record<string, {
    search: string;
    statusFilter: string;
    sortBy: 'action' | 'status' | 'time';
    sortOrder: 'asc' | 'desc';
  }>>(data.actionTableStates || {});

  // Current Situation Edit State
  const [isEditingCurrentSituation, setIsEditingCurrentSituation] = useState(false);
  const [currentSituationDraft, setCurrentSituationDraft] = useState(ics201Data.currentSituation);

  // Objective and Action Edit State
  const [editingObjectiveId, setEditingObjectiveId] = useState<string | null>(null);
  const [editingActionId, setEditingActionId] = useState<string | null>(null);
  const [objectiveDraft, setObjectiveDraft] = useState('');
  const [actionDraft, setActionDraft] = useState({
    action: '',
    status: '',
    time: ''
  });

  // Safety Fields Edit State
  const [editingSafetyOfficer, setEditingSafetyOfficer] = useState(false);
  const [safetyOfficerDraft, setSafetyOfficerDraft] = useState('');
  const [editingTemperature, setEditingTemperature] = useState(false);
  const [temperatureDraft, setTemperatureDraft] = useState('');
  const [editingConditions, setEditingConditions] = useState(false);
  const [conditionsDraft, setConditionsDraft] = useState('');
  const [editingWind, setEditingWind] = useState(false);
  const [windDraft, setWindDraft] = useState('');
  const [editingTides, setEditingTides] = useState(false);
  const [tidesDraft, setTidesDraft] = useState('');
  const [editingSeaState, setEditingSeaState] = useState(false);
  const [seaStateDraft, setSeaStateDraft] = useState('');
  const [editingWaterTemperature, setEditingWaterTemperature] = useState(false);
  const [waterTemperatureDraft, setWaterTemperatureDraft] = useState('');
  const [editingForecast, setEditingForecast] = useState(false);
  const [forecastDraft, setForecastDraft] = useState('');
  const [editingSafetyNotes, setEditingSafetyNotes] = useState(false);
  const [safetyNotesDraft, setSafetyNotesDraft] = useState('');
  const [editingPPENotes, setEditingPPENotes] = useState(false);
  const [ppeNotesDraft, setPPENotesDraft] = useState('');

  // Material Row Edit State
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(null);
  const [materialDraft, setMaterialDraft] = useState({
    material: '',
    quantity: '',
    physicalState: '',
    nioshNumber: '',
    specificGravity: '',
    ph: '',
    idlh: '',
    flashPoint: '',
    lel: '',
    uel: ''
  });

  
  // Sample threat alerts data for World Cup 2026
  const threats: ThreatAlert[] = data.threats || [
    {
      id: '1',
      threatType: 'High-Risk Drones Approaching TFR',
      description: 'Multiple unauthorized drones detected entering Temporary Flight Restriction zone - immediate response required',
      severity: 'Critical',
      location: 'AT&T Stadium - 2 miles north',
      timeDetected: '14:23',
      status: 'Active',
      assignedTo: 'Airspace Security Unit',
      createdAt: new Date()
    }
  ];

  // Sample tactics data for World Cup 2026
  const tactics: Tactic[] = data.tactics || [
    {
      id: '1',
      tacticName: 'Perimeter Security Operations',
      description: 'Maintain secure perimeter around stadium and surrounding areas',
      workAssignments: [
        {
          id: '1',
          assignmentName: 'Stadium North Gate Security',
          assignedTo: 'Security Team Alpha',
          status: 'In Progress',
          priority: 'High',
          resources: '12 Officers, K-9 Unit',
          location: 'AT&T Stadium - North Gate'
        },
        {
          id: '2',
          assignmentName: 'Parking Area Patrol',
          assignedTo: 'Mobile Patrol Unit B',
          status: 'Assigned',
          priority: 'Medium',
          resources: '6 Officers, 3 Vehicles',
          location: 'Lots A-C'
        }
      ],
      createdAt: new Date()
    }
  ];



  // Deliverables checklist with enhanced data
  const deliverablesItems = [
    {
      id: 'draft-ics-202',
      text: 'ICS-201',
      description: 'Initial Response & Assessment',
      icon: FileText,
      color: 'text-accent'
    },
    {
      id: 'uc-division-labor',
      text: 'UC Division of Labor', 
      description: 'Unified Command workload distribution and responsibilities',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      id: 'daily-meeting-schedule',
      text: 'ICS 230',
      description: 'Meeting and briefing schedule',
      icon: Calendar,
      color: 'text-green-500'
    },
    {
      id: 'updated-ics-233',
      text: 'ICS 233',
      description: 'Work Unit Analysis and assignment tracking',
      icon: FileText,
      color: 'text-orange-500'
    }
  ];



  const handleItemCheck = (itemId: string, checked: boolean) => {
    const newCheckedItems = { ...checkedItems, [itemId]: checked };
    setCheckedItems(newCheckedItems);
    updateData({ checkedItems: newCheckedItems });
  };

  const handleItemExpand = (itemId: string) => {
    const newExpandedItems = { ...expandedItems, [itemId]: !expandedItems[itemId] };
    setExpandedItems(newExpandedItems);
    updateData({ expandedItems: newExpandedItems });
  };

  const handleDeliverableExpand = (deliverableId: string) => {
    const newExpandedDeliverables = { ...expandedDeliverables, [deliverableId]: !expandedDeliverables[deliverableId] };
    setExpandedDeliverables(newExpandedDeliverables);
    updateData({ expandedDeliverables: newExpandedDeliverables });
  };

  const handleNotesChange = (itemId: string, noteText: string) => {
    const newNotes = { ...notes, [itemId]: noteText };
    setNotes(newNotes);
    updateData({ notes: newNotes });
  };

  const updateData = (updates: Record<string, any>) => {
    if (onDataChange) {
      onDataChange({ 
        ...data, 
        checkedItems, 
        expandedItems, 
        notes,
        expandedThreats,
        expandedTactics,
        expandedDeliverables,
        deliverables,
        ics201Data,
        globalSearch,
        actionTableStates,
        ...updates 
      });
    }
  };

  const handleDeliverableChange = (deliverableId: string, checked: boolean) => {
    const newDeliverables = { ...deliverables, [deliverableId]: checked };
    setDeliverables(newDeliverables);
    updateData({ deliverables: newDeliverables });
  };

  const handleIcs201Change = (field: string, value: string | any[]) => {
    const newIcs201Data = { ...ics201Data, [field]: value };
    setIcs201Data(newIcs201Data);
    updateData({ ics201Data: newIcs201Data });
  };

  // Current Situation Edit Handlers
  const handleEditCurrentSituation = () => {
    setCurrentSituationDraft(ics201Data.currentSituation);
    setIsEditingCurrentSituation(true);
  };

  const handleSaveCurrentSituation = () => {
    handleIcs201Change('currentSituation', currentSituationDraft);
    setIsEditingCurrentSituation(false);
  };

  const handleCancelCurrentSituation = () => {
    setCurrentSituationDraft(ics201Data.currentSituation);
    setIsEditingCurrentSituation(false);
  };

  // Objective Edit Handlers
  const handleEditObjective = (objectiveId: string, currentValue: string) => {
    setObjectiveDraft(currentValue);
    setEditingObjectiveId(objectiveId);
  };

  const handleSaveObjective = () => {
    if (editingObjectiveId) {
      handleObjectiveChange(editingObjectiveId, 'objective', objectiveDraft);
      setEditingObjectiveId(null);
      setObjectiveDraft('');
    }
  };

  const handleCancelObjective = () => {
    setEditingObjectiveId(null);
    setObjectiveDraft('');
  };

  // Action Edit Handlers
  const handleEditAction = (objectiveId: string, actionId: string, action: any) => {
    setActionDraft({
      action: action.action || '',
      status: action.status || 'Current',
      time: action.time || ''
    });
    setEditingActionId(actionId);
  };

  const handleSaveAction = (objectiveId: string) => {
    if (editingActionId) {
      // Save all three values
      handleActionChange(objectiveId, editingActionId, 'action', actionDraft.action);
      handleActionChange(objectiveId, editingActionId, 'status', actionDraft.status);
      handleActionChange(objectiveId, editingActionId, 'time', actionDraft.time);
      setEditingActionId(null);
      setActionDraft({ action: '', status: '', time: '' });
    }
  };

  const handleCancelAction = () => {
    setEditingActionId(null);
    setActionDraft({ action: '', status: '', time: '' });
  };

  // Safety Officer Edit Handlers
  const handleEditSafetyOfficer = () => {
    setSafetyOfficerDraft(ics201Data.safetyAnalysis.safetyOfficer);
    setEditingSafetyOfficer(true);
  };

  const handleSaveSafetyOfficer = () => {
    handleSafetyChange('safetyOfficer', safetyOfficerDraft);
    setEditingSafetyOfficer(false);
  };

  const handleCancelSafetyOfficer = () => {
    setSafetyOfficerDraft(ics201Data.safetyAnalysis.safetyOfficer);
    setEditingSafetyOfficer(false);
  };

  // Temperature Edit Handlers
  const handleEditTemperature = () => {
    setTemperatureDraft(ics201Data.safetyAnalysis.weatherConditions.temperature);
    setEditingTemperature(true);
  };

  const handleSaveTemperature = () => {
    handleWeatherChange('temperature', temperatureDraft);
    setEditingTemperature(false);
  };

  const handleCancelTemperature = () => {
    setTemperatureDraft(ics201Data.safetyAnalysis.weatherConditions.temperature);
    setEditingTemperature(false);
  };

  // Conditions Edit Handlers
  const handleEditConditions = () => {
    setConditionsDraft(ics201Data.safetyAnalysis.weatherConditions.conditions);
    setEditingConditions(true);
  };

  const handleSaveConditions = () => {
    handleWeatherChange('conditions', conditionsDraft);
    setEditingConditions(false);
  };

  const handleCancelConditions = () => {
    setConditionsDraft(ics201Data.safetyAnalysis.weatherConditions.conditions);
    setEditingConditions(false);
  };

  // Wind Edit Handlers
  const handleEditWind = () => {
    setWindDraft(ics201Data.safetyAnalysis.weatherConditions.wind);
    setEditingWind(true);
  };

  const handleSaveWind = () => {
    handleWeatherChange('wind', windDraft);
    setEditingWind(false);
  };

  const handleCancelWind = () => {
    setWindDraft(ics201Data.safetyAnalysis.weatherConditions.wind);
    setEditingWind(false);
  };

  // Tides Edit Handlers
  const handleEditTides = () => {
    setTidesDraft(ics201Data.safetyAnalysis.weatherConditions.tides);
    setEditingTides(true);
  };

  const handleSaveTides = () => {
    handleWeatherChange('tides', tidesDraft);
    setEditingTides(false);
  };

  const handleCancelTides = () => {
    setTidesDraft(ics201Data.safetyAnalysis.weatherConditions.tides);
    setEditingTides(false);
  };

  // Sea State Edit Handlers
  const handleEditSeaState = () => {
    setSeaStateDraft(ics201Data.safetyAnalysis.weatherConditions.seaState);
    setEditingSeaState(true);
  };

  const handleSaveSeaState = () => {
    handleWeatherChange('seaState', seaStateDraft);
    setEditingSeaState(false);
  };

  const handleCancelSeaState = () => {
    setSeaStateDraft(ics201Data.safetyAnalysis.weatherConditions.seaState);
    setEditingSeaState(false);
  };

  // Water Temperature Edit Handlers
  const handleEditWaterTemperature = () => {
    setWaterTemperatureDraft(ics201Data.safetyAnalysis.weatherConditions.waterTemperature);
    setEditingWaterTemperature(true);
  };

  const handleSaveWaterTemperature = () => {
    handleWeatherChange('waterTemperature', waterTemperatureDraft);
    setEditingWaterTemperature(false);
  };

  const handleCancelWaterTemperature = () => {
    setWaterTemperatureDraft(ics201Data.safetyAnalysis.weatherConditions.waterTemperature);
    setEditingWaterTemperature(false);
  };

  // Forecast Edit Handlers
  const handleEditForecast = () => {
    setForecastDraft(ics201Data.safetyAnalysis.weatherConditions.forecast);
    setEditingForecast(true);
  };

  const handleSaveForecast = () => {
    handleWeatherChange('forecast', forecastDraft);
    setEditingForecast(false);
  };

  const handleCancelForecast = () => {
    setForecastDraft(ics201Data.safetyAnalysis.weatherConditions.forecast);
    setEditingForecast(false);
  };

  // Safety Notes Edit Handlers
  const handleEditSafetyNotes = () => {
    setSafetyNotesDraft(ics201Data.safetyAnalysis.weatherConditions.safetyNotes);
    setEditingSafetyNotes(true);
  };

  const handleSaveSafetyNotes = () => {
    handleWeatherChange('safetyNotes', safetyNotesDraft);
    setEditingSafetyNotes(false);
  };

  const handleCancelSafetyNotes = () => {
    setSafetyNotesDraft(ics201Data.safetyAnalysis.weatherConditions.safetyNotes);
    setEditingSafetyNotes(false);
  };

  // PPE Notes Edit Handlers
  const handleEditPPENotes = () => {
    setPPENotesDraft(ics201Data.safetyAnalysis.ppeRequirements.ppeNotes);
    setEditingPPENotes(true);
  };

  const handleSavePPENotes = () => {
    handlePPEChange('ppeNotes', ppeNotesDraft);
    setEditingPPENotes(false);
  };

  const handleCancelPPENotes = () => {
    setPPENotesDraft(ics201Data.safetyAnalysis.ppeRequirements.ppeNotes);
    setEditingPPENotes(false);
  };

  // Material Row Edit Handlers
  const handleEditMaterial = (materialId: string) => {
    const material = ics201Data.safetyAnalysis.hazmatAssessment.materialDescriptions.find(m => m.id === materialId);
    if (material) {
      setMaterialDraft({
        material: material.material,
        quantity: material.quantity,
        physicalState: material.physicalState,
        nioshNumber: material.nioshNumber,
        specificGravity: material.specificGravity,
        ph: material.ph,
        idlh: material.idlh,
        flashPoint: material.flashPoint,
        lel: material.lel,
        uel: material.uel
      });
      setEditingMaterialId(materialId);
    }
  };

  const handleSaveMaterial = () => {
    if (editingMaterialId) {
      // Update all fields for the material
      Object.keys(materialDraft).forEach(field => {
        handleMaterialChange(editingMaterialId, field, materialDraft[field as keyof typeof materialDraft]);
      });
      setEditingMaterialId(null);
      setMaterialDraft({
        material: '',
        quantity: '',
        physicalState: '',
        nioshNumber: '',
        specificGravity: '',
        ph: '',
        idlh: '',
        flashPoint: '',
        lel: '',
        uel: ''
      });
    }
  };

  const handleCancelMaterial = () => {
    setEditingMaterialId(null);
    setMaterialDraft({
      material: '',
      quantity: '',
      physicalState: '',
      nioshNumber: '',
      specificGravity: '',
      ph: '',
      idlh: '',
      flashPoint: '',
      lel: '',
      uel: ''
    });
  };

  const handleObjectiveChange = (objectiveId: string, field: 'objective' | 'time', value: string) => {
    const newObjectives = ics201Data.responseObjectives.map(obj =>
      obj.id === objectiveId ? { ...obj, [field]: value } : obj
    );
    handleIcs201Change('responseObjectives', newObjectives);
  };

  const handleActionChange = (objectiveId: string, actionId: string, field: 'action' | 'status' | 'time', value: string) => {
    const newObjectives = ics201Data.responseObjectives.map(obj =>
      obj.id === objectiveId 
        ? {
            ...obj,
            actions: obj.actions.map(action =>
              action.id === actionId ? { ...action, [field]: value } : action
            )
          }
        : obj
    );
    handleIcs201Change('responseObjectives', newObjectives);
  };

  const addObjective = () => {
    const newObjectiveId = Date.now().toString();
    const newObjective = {
      id: newObjectiveId,
      objective: '',
      time: '',
      actions: [
        { id: Date.now().toString() + '-1', action: '', status: 'Current', time: '' }
      ]
    };
    handleIcs201Change('responseObjectives', [...ics201Data.responseObjectives, newObjective]);
    
    // Immediately enter edit mode for the new objective
    setEditingObjectiveId(newObjectiveId);
    setObjectiveDraft('');
  };

  const removeObjective = (objectiveId: string) => {
    const newObjectives = ics201Data.responseObjectives.filter(obj => obj.id !== objectiveId);
    handleIcs201Change('responseObjectives', newObjectives);
    
    // If we're deleting the objective that's currently being edited, clear the edit state
    if (editingObjectiveId === objectiveId) {
      setEditingObjectiveId(null);
      setObjectiveDraft('');
    }
  };

  const addAction = (objectiveId: string) => {
    const newAction = {
      id: Date.now().toString(),
      action: '',
      status: 'Current',
      time: ''
    };
    const newObjectives = ics201Data.responseObjectives.map(obj =>
      obj.id === objectiveId 
        ? { ...obj, actions: [...obj.actions, newAction] }
        : obj
    );
    handleIcs201Change('responseObjectives', newObjectives);
  };

  const removeAction = (objectiveId: string, actionId: string) => {
    const newObjectives = ics201Data.responseObjectives.map(obj =>
      obj.id === objectiveId 
        ? { 
            ...obj, 
            actions: obj.actions.filter(action => action.id !== actionId)
          }
        : obj
    );
    handleIcs201Change('responseObjectives', newObjectives);
    
    // If we're deleting the action that's currently being edited, clear the edit state
    if (editingActionId === actionId) {
      setEditingActionId(null);
      setActionDraft({ action: '', status: '', time: '' });
    }
  };

  // Search, Filter, and Sort Handlers
  const updateActionTableState = (objectiveId: string, updates: Partial<{
    search: string;
    statusFilter: string;
    sortBy: 'action' | 'status' | 'time';
    sortOrder: 'asc' | 'desc';
  }>) => {
    const currentState = actionTableStates[objectiveId] || {
      search: '',
      statusFilter: 'all',
      sortBy: 'action',
      sortOrder: 'asc'
    };
    const newState = { ...currentState, ...updates };
    const newActionTableStates = { ...actionTableStates, [objectiveId]: newState };
    setActionTableStates(newActionTableStates);
    updateData({ actionTableStates: newActionTableStates });
  };

  // Filter and sort functions
  const getFilteredAndSortedActions = (objectiveId: string, actions: any[]) => {
    const tableState = actionTableStates[objectiveId] || {
      search: '',
      statusFilter: 'all',
      sortBy: 'action',
      sortOrder: 'asc'
    };

    let filteredActions = [...actions];

    // Apply search filter
    if (tableState.search) {
      filteredActions = filteredActions.filter(action =>
        action.action.toLowerCase().includes(tableState.search.toLowerCase()) ||
        action.time.toLowerCase().includes(tableState.search.toLowerCase())
      );
    }

    // Apply status filter
    if (tableState.statusFilter !== 'all') {
      filteredActions = filteredActions.filter(action => action.status === tableState.statusFilter);
    }

    // Apply sorting
    filteredActions.sort((a, b) => {
      let aValue = a[tableState.sortBy] || '';
      let bValue = b[tableState.sortBy] || '';
      
      if (tableState.sortBy === 'time') {
        // Handle time sorting - treat empty as earliest
        if (!aValue && !bValue) return 0;
        if (!aValue) return tableState.sortOrder === 'asc' ? -1 : 1;
        if (!bValue) return tableState.sortOrder === 'asc' ? 1 : -1;
      }
      
      const comparison = aValue.toString().localeCompare(bValue.toString(), undefined, { numeric: true });
      return tableState.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filteredActions;
  };

  // Global search filter for objectives
  const getFilteredObjectives = () => {
    if (!globalSearch) return ics201Data.responseObjectives;
    
    return ics201Data.responseObjectives.filter(objective => {
      // Search in objective text
      const objectiveMatch = objective.objective.toLowerCase().includes(globalSearch.toLowerCase());
      
      // Search in actions
      const actionMatch = objective.actions.some(action =>
        action.action.toLowerCase().includes(globalSearch.toLowerCase()) ||
        action.time.toLowerCase().includes(globalSearch.toLowerCase())
      );
      
      return objectiveMatch || actionMatch;
    });
  };

  const handleRosterChange = (id: string, field: 'position' | 'assignee', value: string) => {
    const newRoster = ics201Data.organizationRoster.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    handleIcs201Change('organizationRoster', newRoster);
  };

  const addRosterItem = () => {
    const newItem = {
      id: Date.now().toString(),
      position: '',
      assignee: ''
    };
    handleIcs201Change('organizationRoster', [...ics201Data.organizationRoster, newItem]);
  };

  const removeRosterItem = (id: string) => {
    if (ics201Data.organizationRoster.length > 1) {
      const newRoster = ics201Data.organizationRoster.filter(item => item.id !== id);
      handleIcs201Change('organizationRoster', newRoster);
    }
  };

  const handleResourceChange = (id: string, field: 'resource' | 'resourceIdentifier' | 'dateTimeOrdered' | 'eta' | 'onScene' | 'notes', value: string | boolean) => {
    const newResources = ics201Data.resourcesSummary.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    handleIcs201Change('resourcesSummary', newResources);
  };

  const addResourceItem = () => {
    const newItem = {
      id: Date.now().toString(),
      resource: '',
      resourceIdentifier: '',
      dateTimeOrdered: '',
      eta: '',
      onScene: false,
      notes: ''
    };
    handleIcs201Change('resourcesSummary', [...ics201Data.resourcesSummary, newItem]);
  };

  const removeResourceItem = (id: string) => {
    if (ics201Data.resourcesSummary.length > 1) {
      const newResources = ics201Data.resourcesSummary.filter(item => item.id !== id);
      handleIcs201Change('resourcesSummary', newResources);
    }
  };

  const handleSafetyChange = (field: 'safetyOfficer' | 'physicalHazards' | 'environmentalHazards' | 'otherHazards', value: string | string[]) => {
    const newSafetyAnalysis = { ...ics201Data.safetyAnalysis, [field]: value };
    handleIcs201Change('safetyAnalysis', newSafetyAnalysis);
  };

  const handleWeatherChange = (field: 'temperature' | 'conditions' | 'wind' | 'tides' | 'seaState' | 'waterTemperature' | 'forecast' | 'safetyNotes', value: string) => {
    const newWeatherConditions = { ...ics201Data.safetyAnalysis.weatherConditions, [field]: value };
    const newSafetyAnalysis = { ...ics201Data.safetyAnalysis, weatherConditions: newWeatherConditions };
    handleIcs201Change('safetyAnalysis', newSafetyAnalysis);
  };

  const handlePPEChange = (field: 'requiredPPE' | 'ppeNotes' | 'isHazmat', value: string[] | string | boolean) => {
    const newPPERequirements = { ...ics201Data.safetyAnalysis.ppeRequirements, [field]: value };
    const newSafetyAnalysis = { ...ics201Data.safetyAnalysis, ppeRequirements: newPPERequirements };
    handleIcs201Change('safetyAnalysis', newSafetyAnalysis);
  };

  // Predefined PPE options
  const ppeOptions = [
    'Hard Hat/Helmet',
    'Safety Glasses/Goggles',
    'Face Shield',
    'Hearing Protection',
    'High-Visibility Vest',
    'Work Gloves',
    'Chemical Resistant Gloves',
    'Steel Toe Boots',
    'Chemical Resistant Boots',
    'Respirator/N95',
    'SCBA (Self-Contained Breathing Apparatus)',
    'Chemical Suit (Level A)',
    'Chemical Suit (Level B)',
    'Chemical Suit (Level C)',
    'Chemical Suit (Level D)',
    'Life Jacket/PFD',
    'Fall Protection Harness',
    'Cut Resistant Clothing',
    'Flame Resistant Clothing',
    'Disposable Coveralls'
  ];

  // Predefined HAZMAT classification options
  const hazmatClassifications = [
    'Class 1 - Explosives',
    'Class 2 - Gases',
    'Class 3 - Flammable Liquids',
    'Class 4 - Flammable Solids',
    'Class 5 - Oxidizing Substances',
    'Class 6 - Toxic & Infectious Substances',
    'Class 7 - Radioactive Materials',
    'Class 8 - Corrosive Substances',
    'Class 9 - Miscellaneous Dangerous Goods',
    'Marine Pollutant',
    'ORM-D (Other Regulated Materials)',
    'Elevated Temperature Materials'
  ];

  // Predefined protection level options
  const protectionLevelOptions = [
    'The atmosphere contains no known hazards and work conditions preclude splashes, immersion, or potential for unexpected inhalation contact with hazardous levels of any chemicals or pollutants.',
    'Concentrations or types of airborne substances are known and the criteria for using air purifying respirators are met.',
    'Highest level of respiratory protection is needed, but lesser level of skin protection is needed.',
    'Greatest level of skin, respiratory, and eye protection is needed. (Level A)'
  ];

  const handleHazmatChange = (field: 'hazmatClassification' | 'protectionLevels' | 'materialDescriptions', value: string[] | any[]) => {
    const newHazmatAssessment = { ...ics201Data.safetyAnalysis.hazmatAssessment, [field]: value };
    const newSafetyAnalysis = { ...ics201Data.safetyAnalysis, hazmatAssessment: newHazmatAssessment };
    handleIcs201Change('safetyAnalysis', newSafetyAnalysis);
  };

  const handleMaterialChange = (id: string, field: string, value: string) => {
    const newMaterialDescriptions = ics201Data.safetyAnalysis.hazmatAssessment.materialDescriptions.map(material =>
      material.id === id ? { ...material, [field]: value } : material
    );
    handleHazmatChange('materialDescriptions', newMaterialDescriptions);
  };

  const addMaterialRow = () => {
    const newMaterial = {
      id: Date.now().toString(),
      material: '',
      quantity: '',
      physicalState: '',
      nioshNumber: '',
      specificGravity: '',
      ph: '',
      idlh: '',
      flashPoint: '',
      lel: '',
      uel: ''
    };
    handleHazmatChange('materialDescriptions', [...ics201Data.safetyAnalysis.hazmatAssessment.materialDescriptions, newMaterial]);
  };

  const removeMaterialRow = (id: string) => {
    const newMaterialDescriptions = ics201Data.safetyAnalysis.hazmatAssessment.materialDescriptions.filter(material => material.id !== id);
    handleHazmatChange('materialDescriptions', newMaterialDescriptions);
  };

  // Predefined hazard options
  const physicalHazardOptions = [
    'Fall Risk',
    'Electrical Hazards',
    'Heavy Equipment',
    'Traffic',
    'Sharp Objects',
    'Confined Spaces',
    'Heights',
    'Moving Machinery',
    'Unstable Structures',
    'Debris'
  ];

  const environmentalHazardOptions = [
    'Weather Conditions',
    'Extreme Temperatures',
    'High Winds',
    'Lightning',
    'Poor Visibility',
    'Flooding',
    'Ice/Snow',
    'Air Quality',
    'UV Exposure',
    'Noise Levels'
  ];

  const otherHazardOptions = [
    'Chemical Exposure',
    'Biological Contamination',
    'Radiation',
    'Crowd Control',
    'Security Threats',
    'Fatigue',
    'Stress',
    'Communication Issues',
    'Resource Shortages',
    'Public Safety'
  ];





  const handleThreatToggle = (threatId: string) => {
    const newExpandedThreats = { ...expandedThreats, [threatId]: !expandedThreats[threatId] };
    setExpandedThreats(newExpandedThreats);
    updateData({ expandedThreats: newExpandedThreats });
  };

  const handleTacticToggle = (tacticId: string) => {
    const newExpandedTactics = { ...expandedTactics, [tacticId]: !expandedTactics[tacticId] };
    setExpandedTactics(newExpandedTactics);
    updateData({ expandedTactics: newExpandedTactics });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500 text-white';
      case 'High':
        return 'bg-orange-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-black';
      case 'Low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-destructive text-destructive-foreground';
      case 'Monitoring':
        return 'bg-yellow-600 text-white';
      case 'Resolved':
        return 'bg-green-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getWorkAssignmentStatusColor = (status: string) => {
    switch (status) {
      case 'Assigned':
        return 'bg-blue-600 text-white';
      case 'In Progress':
        return 'bg-yellow-600 text-white';
      case 'Complete':
        return 'bg-green-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-black';
      case 'Low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Component for list management
  const ListManager = ({ 
    title, 
    field, 
    placeholder, 
    items 
  }: { 
    title: string; 
    field: string; 
    placeholder: string; 
    items: string[] 
  }) => {
    const [newItem, setNewItem] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingValue, setEditingValue] = useState('');

    const handleAdd = () => {
      if (newItem.trim()) {
        handleAddListItem(field, newItem);
        setNewItem('');
      }
    };

    const handleEdit = (index: number) => {
      setEditingIndex(index);
      setEditingValue(items[index]);
    };

    const handleSaveEdit = () => {
      if (editingIndex !== null) {
        handleEditListItem(field, editingIndex, editingValue);
        setEditingIndex(null);
        setEditingValue('');
      }
    };

    const handleCancelEdit = () => {
      setEditingIndex(null);
      setEditingValue('');
    };

    return (
      <div>
        <Label className="text-sm text-foreground">{title}</Label>
        <div className="space-y-2 mt-1">
          {/* Existing items list */}
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-muted/20 rounded-lg border border-border/50">
              {editingIndex === index ? (
                <>
                  <Input
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    className="flex-1 bg-input-background border-border text-foreground"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveEdit();
                      if (e.key === 'Escape') handleCancelEdit();
                    }}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSaveEdit}
                    className="px-2 h-8"
                  >
                    <FileCheck className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="px-2 h-8"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-sm text-foreground">{item}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(index)}
                    className="px-2 h-8 hover:bg-muted/30"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemoveListItem(field, index)}
                    className="px-2 h-8 hover:bg-destructive/20 text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </>
              )}
            </div>
          ))}
          
          {/* Add new item */}
          <div className="flex items-center gap-2">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-input-background border-border text-foreground placeholder:text-muted-foreground"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAdd();
              }}
            />
            <Button
              size="sm"
              onClick={handleAdd}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-3"
              disabled={!newItem.trim()}
            >
              <Plus className="w-3 h-3 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderDeliverableContent = (deliverable: any) => {
    switch (deliverable.id) {
      case 'draft-ics-202':
        return (
          <div className="space-y-3 p-3 bg-card rounded-lg">
            <div className="space-y-8">
              {/* Map Sketch Section */}
              <div>
                <Label className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>Map Sketch</Label>
                <div className="mt-2 w-full h-72 border border-border rounded-lg overflow-hidden bg-primary flex items-center justify-center relative">
                  <div className="text-center text-primary-foreground">
                    <svg className="w-12 h-12 mx-auto mb-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <div className="font-medium">Interactive Map</div>
                    <div className="text-sm opacity-80">Coming Soon</div>
                  </div>

                </div>
              </div>

              {/* Current Situation Section */}
              <div>
                <Label className="text-foreground mb-2 block" style={{ fontSize: 'var(--text-base)' }}>Current Situation</Label>
                
                {isEditingCurrentSituation ? (
                  <div className="space-y-3">
                    <Textarea
                      value={currentSituationDraft}
                      onChange={(e) => setCurrentSituationDraft(e.target.value)}
                      placeholder="Describe the current situation..."
                      className="bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent min-h-[140px]"
                      rows={6}
                    />
                    <div className="flex items-center gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancelCurrentSituation}
                        className="flex items-center border-border text-muted-foreground hover:text-foreground"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSaveCurrentSituation}
                        className="flex items-center bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="p-3 min-h-[140px] bg-muted/10 border border-border rounded-lg text-foreground cursor-pointer hover:bg-muted/20 transition-colors"
                    onClick={handleEditCurrentSituation}
                  >
                    {ics201Data.currentSituation}
                  </div>
                )}
              </div>

              {/* Initial Response Objectives Section */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>Initial Response Objectives</Label>
                  <div onClick={addObjective} className="cursor-pointer">
                    <ButtonXs />
                  </div>
                  {ics201Data.responseObjectives.length > 0 && (
                    <div className="relative flex-1 max-w-64">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                      <Input
                        value={globalSearch}
                        onChange={(e) => {
                          setGlobalSearch(e.target.value);
                          updateData({ globalSearch: e.target.value });
                        }}
                        placeholder="Search objectives and actions..."
                        className="h-8 pl-7 pr-2 text-xs bg-input-background border-border text-foreground placeholder:text-muted-foreground w-96"
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  {ics201Data.responseObjectives.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <div className="text-base">No Objectives Yet</div>
                    </div>
                  ) : (
                    getFilteredObjectives().map((objective, objectiveIndex) => (
                    <div key={objective.id} className="border border-border rounded-lg overflow-hidden bg-card">
                      {/* Objective Header */}
                      <div className="bg-input-background p-3 border-b border-border">
                        {editingObjectiveId === objective.id ? (
                          <div className="space-y-3">
                            <Input
                              value={objectiveDraft}
                              onChange={(e) => setObjectiveDraft(e.target.value)}
                              placeholder="Enter Objective..."
                              className="bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                            />
                            <div className="flex items-center gap-2 justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleCancelObjective}
                                className="flex items-center border-border text-muted-foreground hover:text-foreground"
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={handleSaveObjective}
                                className="flex items-center bg-accent hover:bg-accent/90 text-accent-foreground"
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <div 
                                className="p-2 min-h-[32px] bg-muted/10 border border-border rounded-lg text-foreground cursor-pointer hover:bg-muted/20 transition-colors flex items-center"
                                onClick={() => handleEditObjective(objective.id, objective.objective)}
                              >
                                {objective.objective}
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeObjective(objective.id)}
                              className="h-6 w-6 p-0 hover:bg-destructive/20 text-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {/* Actions Table */}
                      <div className="border-border">
                        {/* Actions Header */}
                        <div className="grid grid-cols-12 bg-muted/10 border-b border-border">
                          <div className="col-span-7 p-2 border-r border-border">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-foreground font-medium" style={{ fontSize: 'var(--text-base)' }}>Aligned Actions</span>
                              <div onClick={() => addAction(objective.id)} className="cursor-pointer">
                                <ButtonXsAddAction />
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2 p-2 border-r border-border">
                            <span className="text-xs text-foreground font-medium" style={{ fontSize: 'var(--text-base)' }}>Status</span>
                          </div>
                          <div className="col-span-2 p-2 border-r border-border">
                            <span className="text-xs text-foreground font-medium" style={{ fontSize: 'var(--text-base)' }}>Time</span>
                          </div>
                          <div className="col-span-1 p-2">
                            <span className="text-xs text-foreground font-medium" style={{ fontSize: 'var(--text-xs)' }}></span>
                          </div>
                        </div>


                        
                        {/* Action Rows */}
                        {getFilteredAndSortedActions(objective.id, objective.actions).map((action, actionIndex) => (
                          <div key={action.id} className="border-b border-border last:border-b-0">
                            {editingActionId === action.id ? (
                              <div className="p-3 space-y-3">
                                <div className="grid grid-cols-12 gap-3">
                                  <div className="col-span-7">
                                    <Label className="text-xs text-foreground font-medium block mb-1">Action</Label>
                                    <Input
                                      value={actionDraft.action}
                                      onChange={(e) => setActionDraft({...actionDraft, action: e.target.value})}
                                      placeholder="Enter Action..."
                                      className="bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <Label className="text-xs text-foreground font-medium block mb-1">Status</Label>
                                    <Select 
                                      value={actionDraft.status} 
                                      onValueChange={(value) => setActionDraft({...actionDraft, status: value})}
                                    >
                                      <SelectTrigger className="bg-accent/10 border-accent text-foreground">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Current">
                                          <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                                            <span>Current</span>
                                          </div>
                                        </SelectItem>
                                        <SelectItem value="Planned">
                                          <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                                            <span>Planned</span>
                                          </div>
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="col-span-2">
                                    <Label className="text-xs text-foreground font-medium block mb-1">Time</Label>
                                    <Input
                                      value={actionDraft.time}
                                      onChange={(e) => setActionDraft({...actionDraft, time: e.target.value})}
                                      placeholder="Time"
                                      className="bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                                    />
                                  </div>
                                  <div className="col-span-1 flex items-end">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => removeAction(objective.id, action.id)}
                                      className="h-8 w-8 p-0 hover:bg-destructive/20 text-destructive"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 justify-end">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCancelAction}
                                    className="flex items-center border-border text-muted-foreground hover:text-foreground"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleSaveAction(objective.id)}
                                    className="flex items-center bg-accent hover:bg-accent/90 text-accent-foreground"
                                  >
                                    Save
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="grid grid-cols-12">
                                <div className="col-span-7 p-2 border-r border-border">
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 flex-shrink-0">
                                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full ml-2"></div>
                                    </div>
                                    <div className="flex-1">
                                      <div 
                                        className="p-1 min-h-[28px] bg-muted/10 border border-border rounded text-foreground cursor-pointer hover:bg-muted/20 transition-colors flex items-center text-xs"
                                        onClick={() => handleEditAction(objective.id, action.id, action)}
                                      >
                                        {action.action}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-2 p-2 border-r border-border">
                                  <div className="p-1 min-h-[28px] bg-muted/10 border border-border rounded text-foreground flex items-center text-xs">
                                    <div className="flex items-center gap-2">
                                      <div className={`w-2 h-2 rounded-full ${action.status === 'Current' ? 'bg-accent' : 'bg-muted-foreground'}`}></div>
                                      <span>{action.status}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-2 p-2 border-r border-border">
                                  <div className="p-1 min-h-[28px] bg-muted/10 border border-border rounded text-foreground flex items-center text-xs">
                                    {action.time || (
                                      <span className="text-muted-foreground italic">No time set</span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-span-1 p-2 flex items-center justify-center gap-1">

                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeAction(objective.id, action.id)}
                                    className="h-6 w-6 p-0 hover:bg-destructive/20 text-destructive"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    ))
                  )}
                </div>
              </div>



              {/* Organization Roster Section */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Label className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>Organization Roster</Label>

                </div>
                
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={organizationRosterImage} 
                    alt="Incident Seat Roster and Organization Chart"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>

              {/* Resources Summary Section */}
              <div>
                <Label className="text-foreground mb-3 block" style={{ fontSize: 'var(--text-base)' }}>Resources Summary</Label>
                
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={resourcesSummaryImage} 
                    alt="Resource Management Dashboard showing Resource Requests, Organization Resources, Incident Resources, Check-in and Check-out status"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>

              {/* Safety Analysis Section */}
              <div>
                <Label className="text-foreground mb-3 block" style={{ fontSize: 'var(--text-base)' }}>Safety Analysis</Label>
                
                <div className="space-y-4">
                  {/* Safety Officer */}
                  <div>
                    <Label className="text-xs text-foreground font-medium mb-2 block">Safety Officer</Label>
                    
                    {editingSafetyOfficer ? (
                      <div className="space-y-3">
                        <Input
                          value={safetyOfficerDraft}
                          onChange={(e) => setSafetyOfficerDraft(e.target.value)}
                          placeholder="Name of assigned Safety Officer..."
                          className="bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                        />
                        <div className="flex items-center gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancelSafetyOfficer}
                            className="flex items-center border-border text-muted-foreground hover:text-foreground"
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleSaveSafetyOfficer}
                            className="flex items-center bg-accent hover:bg-accent/90 text-accent-foreground"
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="p-3 min-h-[40px] bg-muted/10 border border-border rounded-lg text-foreground cursor-pointer hover:bg-muted/20 transition-colors flex items-center"
                        onClick={handleEditSafetyOfficer}
                      >
                        {ics201Data.safetyAnalysis.safetyOfficer}
                      </div>
                    )}
                  </div>

                  {/* Hazards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Physical Hazards */}
                    <div>
                      <Label className="text-xs text-foreground font-medium mb-2 block">Physical Hazards</Label>
                      <div className="space-y-2">
                        <Select>
                          <SelectTrigger className="bg-input-background border-border text-foreground">
                            <SelectValue placeholder="Select physical hazards..." />
                          </SelectTrigger>
                          <SelectContent>
                            {physicalHazardOptions.map((hazard) => (
                              <SelectItem
                                key={hazard}
                                value={hazard}
                                onClick={() => {
                                  if (!ics201Data.safetyAnalysis.physicalHazards.includes(hazard)) {
                                    handleSafetyChange('physicalHazards', [...ics201Data.safetyAnalysis.physicalHazards, hazard]);
                                  }
                                }}
                              >
                                {hazard}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {ics201Data.safetyAnalysis.physicalHazards.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {ics201Data.safetyAnalysis.physicalHazards.map((hazard) => (
                              <Badge
                                key={hazard}
                                variant="outline"
                                className="text-xs border-border text-foreground cursor-pointer hover:bg-destructive/20"
                                onClick={() => {
                                  const newHazards = ics201Data.safetyAnalysis.physicalHazards.filter(h => h !== hazard);
                                  handleSafetyChange('physicalHazards', newHazards);
                                }}
                              >
                                {hazard} ×
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Environmental Hazards */}
                    <div>
                      <Label className="text-xs text-foreground font-medium mb-2 block">Environmental Hazards</Label>
                      <div className="space-y-2">
                        <Select>
                          <SelectTrigger className="bg-input-background border-border text-foreground">
                            <SelectValue placeholder="Select environmental hazards..." />
                          </SelectTrigger>
                          <SelectContent>
                            {environmentalHazardOptions.map((hazard) => (
                              <SelectItem
                                key={hazard}
                                value={hazard}
                                onClick={() => {
                                  if (!ics201Data.safetyAnalysis.environmentalHazards.includes(hazard)) {
                                    handleSafetyChange('environmentalHazards', [...ics201Data.safetyAnalysis.environmentalHazards, hazard]);
                                  }
                                }}
                              >
                                {hazard}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {ics201Data.safetyAnalysis.environmentalHazards.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {ics201Data.safetyAnalysis.environmentalHazards.map((hazard) => (
                              <Badge
                                key={hazard}
                                variant="outline"
                                className="text-xs border-border text-foreground cursor-pointer hover:bg-destructive/20"
                                onClick={() => {
                                  const newHazards = ics201Data.safetyAnalysis.environmentalHazards.filter(h => h !== hazard);
                                  handleSafetyChange('environmentalHazards', newHazards);
                                }}
                              >
                                {hazard} ×
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Other Hazards */}
                    <div>
                      <Label className="text-xs text-foreground font-medium mb-2 block">Other Hazards</Label>
                      <div className="space-y-2">
                        <Select>
                          <SelectTrigger className="bg-input-background border-border text-foreground">
                            <SelectValue placeholder="Select other hazards..." />
                          </SelectTrigger>
                          <SelectContent>
                            {otherHazardOptions.map((hazard) => (
                              <SelectItem
                                key={hazard}
                                value={hazard}
                                onClick={() => {
                                  if (!ics201Data.safetyAnalysis.otherHazards.includes(hazard)) {
                                    handleSafetyChange('otherHazards', [...ics201Data.safetyAnalysis.otherHazards, hazard]);
                                  }
                                }}
                              >
                                {hazard}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {ics201Data.safetyAnalysis.otherHazards.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {ics201Data.safetyAnalysis.otherHazards.map((hazard) => (
                              <Badge
                                key={hazard}
                                variant="outline"
                                className="text-xs border-border text-foreground cursor-pointer hover:bg-destructive/20"
                                onClick={() => {
                                  const newHazards = ics201Data.safetyAnalysis.otherHazards.filter(h => h !== hazard);
                                  handleSafetyChange('otherHazards', newHazards);
                                }}
                              >
                                {hazard} ×
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weather Conditions Section */}
                <div className="mt-6">
                  <Label className="text-foreground font-medium mb-4 block" style={{ fontSize: 'var(--text-base)' }}>Weather Conditions</Label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Temperature */}
                    <div>
                      <Label className="text-xs text-foreground font-medium mb-2 block">Temperature</Label>
                      
                      {editingTemperature ? (
                        <div className="space-y-3">
                          <Input
                            value={temperatureDraft}
                            onChange={(e) => setTemperatureDraft(e.target.value)}
                            placeholder="°F or °C"
                            className="bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                          />
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancelTemperature}
                              className="flex items-center border-border text-muted-foreground hover:text-foreground text-xs h-6"
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleSaveTemperature}
                              className="flex items-center bg-accent hover:bg-accent/90 text-accent-foreground text-xs h-6"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="p-2 min-h-[40px] bg-muted/10 border border-border rounded-lg text-foreground cursor-pointer hover:bg-muted/20 transition-colors flex items-center text-sm"
                          onClick={handleEditTemperature}
                        >
                          {ics201Data.safetyAnalysis.weatherConditions.temperature}
                        </div>
                      )}
                    </div>

                    {/* Conditions */}
                    <div>
                      <Label className="text-xs text-foreground font-medium mb-2 block">Conditions</Label>
                      
                      {editingConditions ? (
                        <div className="space-y-3">
                          <Input
                            value={conditionsDraft}
                            onChange={(e) => setConditionsDraft(e.target.value)}
                            placeholder="Clear, Cloudy, Rain..."
                            className="bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                          />
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancelConditions}
                              className="flex items-center border-border text-muted-foreground hover:text-foreground text-xs h-6"
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleSaveConditions}
                              className="flex items-center bg-accent hover:bg-accent/90 text-accent-foreground text-xs h-6"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="p-2 min-h-[40px] bg-muted/10 border border-border rounded-lg text-foreground cursor-pointer hover:bg-muted/20 transition-colors flex items-center text-sm"
                          onClick={handleEditConditions}
                        >
                          {ics201Data.safetyAnalysis.weatherConditions.conditions}
                        </div>
                      )}
                    </div>

                    {/* Wind */}
                    <div>
                      <Label className="text-xs text-foreground font-medium mb-2 block">Wind</Label>
                      
                      {editingWind ? (
                        <div className="space-y-3">
                          <Input
                            value={windDraft}
                            onChange={(e) => setWindDraft(e.target.value)}
                            placeholder="Speed & direction"
                            className="bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                          />
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancelWind}
                              className="flex items-center border-border text-muted-foreground hover:text-foreground text-xs h-6"
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleSaveWind}
                              className="flex items-center bg-accent hover:bg-accent/90 text-accent-foreground text-xs h-6"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="p-2 min-h-[40px] bg-muted/10 border border-border rounded-lg text-foreground cursor-pointer hover:bg-muted/20 transition-colors flex items-center text-sm"
                          onClick={handleEditWind}
                        >
                          {ics201Data.safetyAnalysis.weatherConditions.wind}
                        </div>
                      )}
                    </div>

                    {/* Tides */}
                    <div>
                      <Label className="text-xs text-foreground font-medium mb-2 block">Tides</Label>
                      
                      {editingTides ? (
                        <div className="space-y-3">
                          <Input
                            value={tidesDraft}
                            onChange={(e) => setTidesDraft(e.target.value)}
                            placeholder="High/Low, times"
                            className="bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                          />
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancelTides}
                              className="flex items-center border-border text-muted-foreground hover:text-foreground text-xs h-6"
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleSaveTides}
                              className="flex items-center bg-accent hover:bg-accent/90 text-accent-foreground text-xs h-6"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="p-2 min-h-[40px] bg-muted/10 border border-border rounded-lg text-foreground cursor-pointer hover:bg-muted/20 transition-colors flex items-center text-sm"
                          onClick={handleEditTides}
                        >
                          {ics201Data.safetyAnalysis.weatherConditions.tides}
                        </div>
                      )}
                    </div>

                    {/* Sea State */}
                    <div>
                      <Label className="text-xs text-foreground font-medium mb-2 block">Sea State</Label>
                      
                      {editingSeaState ? (
                        <div className="space-y-3">
                          <Input
                            value={seaStateDraft}
                            onChange={(e) => setSeaStateDraft(e.target.value)}
                            placeholder="Wave height, period"
                            className="bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                          />
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancelSeaState}
                              className="flex items-center border-border text-muted-foreground hover:text-foreground text-xs h-6"
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleSaveSeaState}
                              className="flex items-center bg-accent hover:bg-accent/90 text-accent-foreground text-xs h-6"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="p-2 min-h-[40px] bg-muted/10 border border-border rounded-lg text-foreground cursor-pointer hover:bg-muted/20 transition-colors flex items-center text-sm"
                          onClick={handleEditSeaState}
                        >
                          {ics201Data.safetyAnalysis.weatherConditions.seaState}
                        </div>
                      )}
                    </div>

                    {/* Water Temperature */}
                    <div>
                      <Label className="text-xs text-foreground font-medium mb-2 block">Water Temperature</Label>
                      
                      {editingWaterTemperature ? (
                        <div className="space-y-3">
                          <Input
                            value={waterTemperatureDraft}
                            onChange={(e) => setWaterTemperatureDraft(e.target.value)}
                            placeholder="°F or °C"
                            className="bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                          />
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancelWaterTemperature}
                              className="flex items-center border-border text-muted-foreground hover:text-foreground text-xs h-6"
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleSaveWaterTemperature}
                              className="flex items-center bg-accent hover:bg-accent/90 text-accent-foreground text-xs h-6"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="p-2 min-h-[40px] bg-muted/10 border border-border rounded-lg text-foreground cursor-pointer hover:bg-muted/20 transition-colors flex items-center text-sm"
                          onClick={handleEditWaterTemperature}
                        >
                          {ics201Data.safetyAnalysis.weatherConditions.waterTemperature}
                        </div>
                      )}
                    </div>

                    {/* Forecast */}
                    <div className="md:col-span-2">
                      <Label className="text-xs text-foreground font-medium mb-2 block">Forecast</Label>
                      
                      {editingForecast ? (
                        <div className="space-y-3">
                          <Input
                            value={forecastDraft}
                            onChange={(e) => setForecastDraft(e.target.value)}
                            placeholder="Expected changes in conditions..."
                            className="bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                          />
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancelForecast}
                              className="flex items-center border-border text-muted-foreground hover:text-foreground text-xs h-6"
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleSaveForecast}
                              className="flex items-center bg-accent hover:bg-accent/90 text-accent-foreground text-xs h-6"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="p-2 min-h-[40px] bg-muted/10 border border-border rounded-lg text-foreground cursor-pointer hover:bg-muted/20 transition-colors flex items-center text-sm"
                          onClick={handleEditForecast}
                        >
                          {ics201Data.safetyAnalysis.weatherConditions.forecast}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Safety Notes - Full Width */}
                  <div className="mt-4">
                    <Label className="text-xs text-foreground font-medium mb-2 block">Safety Notes</Label>
                    
                    {editingSafetyNotes ? (
                      <div className="space-y-3">
                        <Textarea
                          value={safetyNotesDraft}
                          onChange={(e) => setSafetyNotesDraft(e.target.value)}
                          placeholder="Weather-related safety considerations and recommendations..."
                          className="bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent min-h-[80px]"
                        />
                        <div className="flex items-center gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancelSafetyNotes}
                            className="flex items-center border-border text-muted-foreground hover:text-foreground"
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleSaveSafetyNotes}
                            className="flex items-center bg-accent hover:bg-accent/90 text-accent-foreground"
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="p-3 min-h-[80px] bg-muted/10 border border-border rounded-lg text-foreground cursor-pointer hover:bg-muted/20 transition-colors flex items-start"
                        onClick={handleEditSafetyNotes}
                      >
                        {ics201Data.safetyAnalysis.weatherConditions.safetyNotes}
                      </div>
                    )}
                  </div>
                </div>

                {/* PPE Requirements Section */}
                <div className="mt-6">
                  <Label className="text-foreground font-medium mb-4 block" style={{ fontSize: 'var(--text-base)' }}>PPE Requirements</Label>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Required PPE & HAZMAT */}
                    <div className="space-y-4">
                      {/* Required PPE Multi-Select */}
                      <div>
                        <Label className="text-xs text-foreground font-medium mb-2 block">Required PPE</Label>
                        <div className="space-y-2">
                          <Select>
                            <SelectTrigger className="bg-input-background border-border text-foreground">
                              <SelectValue placeholder="Select required PPE..." />
                            </SelectTrigger>
                            <SelectContent>
                              {ppeOptions.map((ppe) => (
                                <SelectItem
                                  key={ppe}
                                  value={ppe}
                                  onClick={() => {
                                    if (!ics201Data.safetyAnalysis.ppeRequirements.requiredPPE.includes(ppe)) {
                                      handlePPEChange('requiredPPE', [...ics201Data.safetyAnalysis.ppeRequirements.requiredPPE, ppe]);
                                    }
                                  }}
                                >
                                  {ppe}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {ics201Data.safetyAnalysis.ppeRequirements.requiredPPE.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {ics201Data.safetyAnalysis.ppeRequirements.requiredPPE.map((ppe) => (
                                <Badge
                                  key={ppe}
                                  variant="outline"
                                  className="text-xs border-border text-foreground cursor-pointer hover:bg-destructive/20"
                                  onClick={() => {
                                    const newPPE = ics201Data.safetyAnalysis.ppeRequirements.requiredPPE.filter(p => p !== ppe);
                                    handlePPEChange('requiredPPE', newPPE);
                                  }}
                                >
                                  {ppe} ×
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* HAZMAT Checkbox */}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hazmat"
                          checked={ics201Data.safetyAnalysis.ppeRequirements.isHazmat}
                          onCheckedChange={(checked) => handlePPEChange('isHazmat', checked as boolean)}
                          className="border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                        />
                        <Label 
                          htmlFor="hazmat" 
                          className="text-sm text-foreground font-medium cursor-pointer"
                        >
                          Incident involves HAZMAT
                        </Label>
                      </div>
                    </div>

                    {/* PPE Notes */}
                    <div>
                      <Label className="text-xs text-foreground font-medium mb-2 block">Notes on PPE</Label>
                      
                      {editingPPENotes ? (
                        <div className="space-y-3">
                          <Textarea
                            value={ppeNotesDraft}
                            onChange={(e) => setPPENotesDraft(e.target.value)}
                            placeholder="Additional PPE requirements, specifications, or considerations..."
                            className="bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent min-h-[120px]"
                          />
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancelPPENotes}
                              className="flex items-center border-border text-muted-foreground hover:text-foreground"
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleSavePPENotes}
                              className="flex items-center bg-accent hover:bg-accent/90 text-accent-foreground"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="p-3 min-h-[120px] bg-muted/10 border border-border rounded-lg text-foreground cursor-pointer hover:bg-muted/20 transition-colors flex items-start"
                          onClick={handleEditPPENotes}
                        >
                          {ics201Data.safetyAnalysis.ppeRequirements.ppeNotes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* HAZMAT Assessment Section - Conditional */}
                {ics201Data.safetyAnalysis.ppeRequirements.isHazmat && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <Label className="text-sm text-foreground font-medium mb-4 block">HAZMAT Assessment</Label>
                    
                    <div className="space-y-6">
                      {/* HAZMAT Classification */}
                      <div>
                        <Label className="text-xs text-foreground font-medium mb-2 block">HAZMAT Classification</Label>
                        <div className="space-y-2">
                          <Select>
                            <SelectTrigger className="bg-input-background border-border text-foreground">
                              <SelectValue placeholder="Select HAZMAT classifications..." />
                            </SelectTrigger>
                            <SelectContent>
                              {hazmatClassifications.map((classification) => (
                                <SelectItem
                                  key={classification}
                                  value={classification}
                                  onClick={() => {
                                    if (!ics201Data.safetyAnalysis.hazmatAssessment.hazmatClassification.includes(classification)) {
                                      handleHazmatChange('hazmatClassification', [...ics201Data.safetyAnalysis.hazmatAssessment.hazmatClassification, classification]);
                                    }
                                  }}
                                >
                                  {classification}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {ics201Data.safetyAnalysis.hazmatAssessment.hazmatClassification.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {ics201Data.safetyAnalysis.hazmatAssessment.hazmatClassification.map((classification) => (
                                <Badge
                                  key={classification}
                                  variant="outline"
                                  className="text-xs border-border text-foreground cursor-pointer hover:bg-destructive/20"
                                  onClick={() => {
                                    const newClassifications = ics201Data.safetyAnalysis.hazmatAssessment.hazmatClassification.filter(c => c !== classification);
                                    handleHazmatChange('hazmatClassification', newClassifications);
                                  }}
                                >
                                  {classification} ×
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Protection Levels */}
                      <div>
                        <Label className="text-xs text-foreground font-medium mb-2 block">Protection Levels</Label>
                        <div className="space-y-2">
                          <Select>
                            <SelectTrigger className="bg-input-background border-border text-foreground">
                              <SelectValue placeholder="Select protection levels..." />
                            </SelectTrigger>
                            <SelectContent>
                              {protectionLevelOptions.map((protectionLevel, index) => {
                                // Create shorter display names for the options
                                const displayNames = [
                                  'Level D - No Known Hazards',
                                  'Level C - Air Purifying Respirators',
                                  'Level B - High Respiratory Protection', 
                                  'Level A - Maximum Protection'
                                ];
                                
                                return (
                                  <SelectItem
                                    key={protectionLevel}
                                    value={protectionLevel}
                                    onClick={() => {
                                      if (!ics201Data.safetyAnalysis.hazmatAssessment.protectionLevels.includes(protectionLevel)) {
                                        handleHazmatChange('protectionLevels', [...ics201Data.safetyAnalysis.hazmatAssessment.protectionLevels, protectionLevel]);
                                      }
                                    }}
                                  >
                                    <div className="space-y-1">
                                      <div className="font-medium">{displayNames[index]}</div>
                                      <div className="text-xs text-muted-foreground line-clamp-2">
                                        {protectionLevel.length > 80 ? `${protectionLevel.substring(0, 80)}...` : protectionLevel}
                                      </div>
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          {ics201Data.safetyAnalysis.hazmatAssessment.protectionLevels.length > 0 && (
                            <div className="space-y-2">
                              {ics201Data.safetyAnalysis.hazmatAssessment.protectionLevels.map((protectionLevel, index) => {
                                const displayNames = [
                                  'Level D - No Known Hazards',
                                  'Level C - Air Purifying Respirators', 
                                  'Level B - High Respiratory Protection',
                                  'Level A - Maximum Protection'
                                ];
                                const levelIndex = protectionLevelOptions.indexOf(protectionLevel);
                                
                                return (
                                  <div
                                    key={protectionLevel}
                                    className="bg-muted/20 border border-border rounded-lg p-3 relative group cursor-pointer hover:bg-destructive/10"
                                    onClick={() => {
                                      const newProtectionLevels = ics201Data.safetyAnalysis.hazmatAssessment.protectionLevels.filter(p => p !== protectionLevel);
                                      handleHazmatChange('protectionLevels', newProtectionLevels);
                                    }}
                                  >
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="min-w-0 flex-1">
                                        <div className="font-medium text-sm text-foreground mb-1">
                                          {levelIndex !== -1 ? displayNames[levelIndex] : 'Custom Protection Level'}
                                        </div>
                                        <div className="text-xs text-muted-foreground leading-relaxed">
                                          {protectionLevel}
                                        </div>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive/20 text-muted-foreground hover:text-destructive flex-shrink-0"
                                      >
                                        <X className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Product or Material Description Table */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <Label className="text-xs text-foreground font-medium">Product or Material Description</Label>
                          <div onClick={addMaterialRow} className="cursor-pointer">
                            <ButtonAddMaterial />
                          </div>
                        </div>
                        
                        <div className="border border-border rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-muted/30">
                                <TableHead className="text-xs font-medium text-foreground border-r border-border">Material</TableHead>
                                <TableHead className="text-xs font-medium text-foreground border-r border-border">Quantity</TableHead>
                                <TableHead className="text-xs font-medium text-foreground border-r border-border">Physical State</TableHead>
                                <TableHead className="text-xs font-medium text-foreground border-r border-border">NIOSH#</TableHead>
                                <TableHead className="text-xs font-medium text-foreground border-r border-border">Specific Gravity</TableHead>
                                <TableHead className="text-xs font-medium text-foreground border-r border-border">pH</TableHead>
                                <TableHead className="text-xs font-medium text-foreground border-r border-border">IDLH</TableHead>
                                <TableHead className="text-xs font-medium text-foreground border-r border-border">Flash Point</TableHead>
                                <TableHead className="text-xs font-medium text-foreground border-r border-border">LEL</TableHead>
                                <TableHead className="text-xs font-medium text-foreground border-r border-border">UEL</TableHead>
                                <TableHead className="text-xs font-medium text-foreground w-10"></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {ics201Data.safetyAnalysis.hazmatAssessment.materialDescriptions.map((material, index) => (
                                editingMaterialId === material.id ? (
                                  // Edit Mode Row
                                  <TableRow key={material.id} className="border-b border-border bg-accent/5">
                                    <TableCell className="p-1 border-r border-border">
                                      <Input
                                        value={materialDraft.material}
                                        onChange={(e) => setMaterialDraft({...materialDraft, material: e.target.value})}
                                        placeholder="Material name"
                                        className="h-8 text-xs bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground"
                                      />
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <Input
                                        value={materialDraft.quantity}
                                        onChange={(e) => setMaterialDraft({...materialDraft, quantity: e.target.value})}
                                        placeholder="Amount"
                                        className="h-8 text-xs bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground"
                                      />
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <Input
                                        value={materialDraft.physicalState}
                                        onChange={(e) => setMaterialDraft({...materialDraft, physicalState: e.target.value})}
                                        placeholder="Solid/Liquid/Gas"
                                        className="h-8 text-xs bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground"
                                      />
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <Input
                                        value={materialDraft.nioshNumber}
                                        onChange={(e) => setMaterialDraft({...materialDraft, nioshNumber: e.target.value})}
                                        placeholder="NIOSH ID"
                                        className="h-8 text-xs bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground"
                                      />
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <Input
                                        value={materialDraft.specificGravity}
                                        onChange={(e) => setMaterialDraft({...materialDraft, specificGravity: e.target.value})}
                                        placeholder="SG"
                                        className="h-8 text-xs bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground"
                                      />
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <Input
                                        value={materialDraft.ph}
                                        onChange={(e) => setMaterialDraft({...materialDraft, ph: e.target.value})}
                                        placeholder="pH Level"
                                        className="h-8 text-xs bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground"
                                      />
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <Input
                                        value={materialDraft.idlh}
                                        onChange={(e) => setMaterialDraft({...materialDraft, idlh: e.target.value})}
                                        placeholder="IDLH value"
                                        className="h-8 text-xs bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground"
                                      />
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <Input
                                        value={materialDraft.flashPoint}
                                        onChange={(e) => setMaterialDraft({...materialDraft, flashPoint: e.target.value})}
                                        placeholder="Flash point"
                                        className="h-8 text-xs bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground"
                                      />
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <Input
                                        value={materialDraft.lel}
                                        onChange={(e) => setMaterialDraft({...materialDraft, lel: e.target.value})}
                                        placeholder="LEL %"
                                        className="h-8 text-xs bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground"
                                      />
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <Input
                                        value={materialDraft.uel}
                                        onChange={(e) => setMaterialDraft({...materialDraft, uel: e.target.value})}
                                        placeholder="UEL %"
                                        className="h-8 text-xs bg-accent/10 border-accent text-foreground placeholder:text-muted-foreground"
                                      />
                                    </TableCell>
                                    <TableCell className="p-1">
                                      <div className="flex items-center gap-1">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={handleSaveMaterial}
                                          className="h-6 w-6 p-0 hover:bg-accent/20 text-accent hover:text-accent"
                                        >
                                          <Save className="w-3 h-3" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={handleCancelMaterial}
                                          className="h-6 w-6 p-0 hover:bg-muted/20 text-muted-foreground hover:text-foreground"
                                        >
                                          <X className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ) : (
                                  // View Mode Row
                                  <TableRow key={material.id} className="border-b border-border">
                                    <TableCell className="p-1 border-r border-border">
                                      <div className="h-8 px-2 flex items-center text-xs text-foreground bg-muted/10 rounded">
                                        {material.material}
                                      </div>
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <div className="h-8 px-2 flex items-center text-xs text-foreground bg-muted/10 rounded">
                                        {material.quantity}
                                      </div>
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <div className="h-8 px-2 flex items-center text-xs text-foreground bg-muted/10 rounded">
                                        {material.physicalState}
                                      </div>
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <div className="h-8 px-2 flex items-center text-xs text-foreground bg-muted/10 rounded">
                                        {material.nioshNumber}
                                      </div>
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <div className="h-8 px-2 flex items-center text-xs text-foreground bg-muted/10 rounded">
                                        {material.specificGravity}
                                      </div>
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <div className="h-8 px-2 flex items-center text-xs text-foreground bg-muted/10 rounded">
                                        {material.ph}
                                      </div>
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <div className="h-8 px-2 flex items-center text-xs text-foreground bg-muted/10 rounded">
                                        {material.idlh}
                                      </div>
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <div className="h-8 px-2 flex items-center text-xs text-foreground bg-muted/10 rounded">
                                        {material.flashPoint}
                                      </div>
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <div className="h-8 px-2 flex items-center text-xs text-foreground bg-muted/10 rounded">
                                        {material.lel}
                                      </div>
                                    </TableCell>
                                    <TableCell className="p-1 border-r border-border">
                                      <div className="h-8 px-2 flex items-center text-xs text-foreground bg-muted/10 rounded">
                                        {material.uel}
                                      </div>
                                    </TableCell>
                                    <TableCell className="p-1">
                                      <div className="flex items-center gap-1">

                                        {ics201Data.safetyAnalysis.hazmatAssessment.materialDescriptions.length > 1 && (
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeMaterialRow(material.id)}
                                            className="h-6 w-6 p-0 hover:bg-destructive/20 text-muted-foreground hover:text-destructive"
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </Button>
                                        )}
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                )
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end pt-2 border-t border-border">
              <Button 
                size="sm" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => {
                  // Handle save functionality
                  console.log('Saving ICS-201 data:', ics201Data);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        );
        
      case 'uc-division-labor':
        return (
          <div className="space-y-3 p-3 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">
              Define roles and responsibilities for Unified Command members.
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
                <h5 className="text-sm text-foreground mb-2">Command Responsibilities</h5>
                <Textarea
                  placeholder="Define command responsibilities and authority distribution..."
                  className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                  rows={2}
                />
              </div>
              <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
                <h5 className="text-sm text-foreground mb-2">Resource Management</h5>
                <Textarea
                  placeholder="Define resource management roles..."
                  className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                  rows={2}
                />
              </div>
            </div>
            <Button size="sm" variant="outline" className="border-border text-muted-foreground hover:text-foreground">
              <Plus className="w-3 h-3 mr-1" />
              Add Responsibility Area
            </Button>
          </div>
        );
        
      case 'daily-meeting-schedule':
        return (
          <div className="space-y-3 p-3 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">
              Create daily meeting and briefing schedule (ICS 230).
            </p>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="meeting-time" className="text-sm text-foreground">Planning Meeting</Label>
                  <Input
                    id="meeting-time"
                    type="time"
                    className="mt-1 bg-input-background border-border text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="ops-briefing" className="text-sm text-foreground">Operations Briefing</Label>
                  <Input
                    id="ops-briefing"
                    type="time"
                    className="mt-1 bg-input-background border-border text-foreground"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="meeting-location" className="text-sm text-foreground">Default Meeting Location</Label>
                <Input
                  id="meeting-location"
                  placeholder="Enter meeting location..."
                  className="mt-1 bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              Generate ICS 230
            </Button>
          </div>
        );
        
      case 'updated-ics-233':
        return (
          <div className="space-y-3 p-3 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">
              Update Work Unit Analysis with current assignments and status.
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
                <h5 className="text-sm text-foreground mb-2">Current Work Units</h5>
                <div className="text-xs text-muted-foreground">
                  • Security Operations - 85% Complete
                </div>
                <div className="text-xs text-muted-foreground">
                  ��� Perimeter Control - In Progress
                </div>
                <div className="text-xs text-muted-foreground">
                  • Traffic Management - Assigned
                </div>
              </div>
              <div>
                <Label htmlFor="new-work-unit" className="text-sm text-foreground">Add Work Unit</Label>
                <Input
                  id="new-work-unit"
                  placeholder="Enter work unit name..."
                  className="mt-1 bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <ClipboardList className="w-3 h-3 mr-1" />
                Update ICS 233
              </Button>
              <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground">
                <Plus className="w-3 h-3 mr-1" />
                Add Work Unit
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Fullscreen Modal Component
  const FullscreenCardModal = ({ cardId, onClose }: { cardId: string, onClose: () => void }) => {
    const deliverable = deliverablesItems.find(item => item.id === cardId);
    if (!deliverable) return null;

    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="h-full flex flex-col">
          {/* Fullscreen Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <deliverable.icon className={`w-6 h-6 ${deliverable.color}`} />
              <div>
                <h2 className="text-foreground">{deliverable.text}</h2>
                <p className="text-sm text-muted-foreground">{deliverable.description}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="border-white text-white hover:text-white hover:bg-white/20"
            >
              <Minimize className="w-4 h-4 mr-2" />
              Minimize
            </Button>
          </div>

          {/* Fullscreen Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto">
              {renderDeliverableContent(deliverable)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      <div className="space-y-8">
          {/* Individual Deliverable Cards */}
          {deliverablesItems.filter(deliverable => deliverable.id === 'draft-ics-202').map((deliverable) => (
            <Card key={deliverable.id}>
              <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-1.5">
                    <Checkbox
                      checked={deliverables[deliverable.id] || false}
                      onCheckedChange={(checked) => handleDeliverableChange(deliverable.id, checked as boolean)}
                      className="mt-1.5"
                    />
                    <deliverable.icon className={`w-4 h-4 ${deliverable.color} mt-1.5`} />
                    <div>
                      <CardTitle className="text-foreground">{deliverable.text}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {deliverable.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-accent/10 text-accent border border-accent/20 rounded-full text-xs">
                      <Users className="w-3 h-3" />
                      <span>PSC</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Export ICS-201 functionality would go here
                        console.log('Export ICS-201 clicked');
                      }}
                      className="h-7 px-2.5 text-xs border-white text-white hover:text-white hover:bg-white/20"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Export ICS-201
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFullscreenCard(deliverable.id)}
                      className="h-7 px-2.5 text-xs border-white text-white hover:text-white hover:bg-white/20"
                    >
                      <Maximize className="w-3 h-3 mr-1" />
                      Fullscreen
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeliverableExpand(deliverable.id)}
                      className="h-7 w-7 p-0 hover:bg-muted/20"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedDeliverables[deliverable.id] ? '' : '-rotate-90'}`} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {expandedDeliverables[deliverable.id] && (
                <div className="px-6 pb-2 space-y-1.5">
                  {renderDeliverableContent(deliverable)}
                </div>
              )}
            </Card>
          ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <div>
          {onPrevious && (
            <Button variant="outline" onClick={onPrevious} className="border-white text-white hover:text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Phase
            </Button>
          )}
        </div>
        <div>
          {onComplete && (
            <Button onClick={onComplete} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Complete Phase
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {fullscreenCard && (
        <FullscreenCardModal
          cardId={fullscreenCard}
          onClose={() => setFullscreenCard(null)}
        />
      )}
    </div>
  );
}