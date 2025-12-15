import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ChevronDown, ChevronRight, Edit2, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import svgPaths from '../../imports/svg-300ru7qiwa';
import searchSvgPaths from '../../imports/svg-7hg6d30srz';

interface IncidentRosterPhaseProps {
  data: Record<string, any>;
  onDataChange: (data: Record<string, any>) => void;
  onComplete: () => void;
  onPrevious?: () => void;
  isMapExpanded?: boolean;
}

interface AssignedMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  checkedIn: boolean;
  checkInTime?: string;
  signedIn: boolean;
  signInTime?: string;
  activationStatus: 'Activated' | 'Not Activated' | 'Awaiting Confirmation';
}

interface RosterPosition {
  id: string;
  title: string;
  assignedMembers?: AssignedMember[];
}

interface AvailablePerson {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

// Mock available personnel database (INDOPACOM/Oahu power context)
const AVAILABLE_PERSONNEL: AvailablePerson[] = [
  { id: 'p1', name: 'Col. Hana Kealoha (INDOPACOM J3/J35 Ops)', email: 'hana.kealoha@pacom.mil', phone: '(808) 472-1001' },
  { id: 'p2', name: 'Maj. Eric Tan (USMC MCBH Facilities)', email: 'eric.tan@usmc.mil', phone: '(808) 257-1002' },
  { id: 'p3', name: 'Kai Nakamura (Utility Grid Operations Liaison)', email: 'kai.nakamura@utility.hi', phone: '(808) 543-1003' },
  { id: 'p4', name: 'Ava Ikaika (State Energy Office Liaison)', email: 'ava.ikaika@hawaii.gov', phone: '(808) 587-1004' },
  { id: 'p5', name: 'Noa Silva (Honolulu Board of Water Supply Ops)', email: 'noa.silva@hbws.hi.us', phone: '(808) 748-1005' },
  { id: 'p6', name: 'Dr. Leilani Park (Hospital Coalition Coordinator)', email: 'leilani.park@hihealth.org', phone: '(808) 531-1006' },
  { id: 'p7', name: 'Malia Young (Telecom ESF‑2 Lead)', email: 'malia.young@telecom.hi', phone: '(808) 533-1007' },
  { id: 'p8', name: 'Lt. Cmdr. Jonah Reyes (Navy Region Hawaii Liaison)', email: 'jonah.reyes@navy.mil', phone: '(808) 473-1008' },
  { id: 'p9', name: 'Ken Ito (OT/ICS Security Lead)', email: 'ken.ito@utility.hi', phone: '(808) 543-1009' },
  { id: 'p10', name: 'Megan Lau (Public Affairs – JIC)', email: 'megan.lau@hawaii.gov', phone: '(808) 586-1010' },
  { id: 'p11', name: 'Daniel Kim (Legal & Privacy Counsel)', email: 'daniel.kim@ag.hi.gov', phone: '(808) 586-1011' },
  { id: 'p12', name: 'Sgt. Kalani Ho (Logistics – Fuel & Gensets)', email: 'kalani.ho@hi.ng.mil', phone: '(808) 672-1012' },
];

export function IncidentRosterPhase({ data, onDataChange, onComplete, onPrevious, isMapExpanded = true }: IncidentRosterPhaseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<{ memberId: string; positionId: string } | null>(null);
  const [expandedMembers, setExpandedMembers] = useState<Set<string>>(new Set());

  // Dynamic column widths based on map expansion state
  const columnWidths = isMapExpanded ? {
    person: 'w-[240px]',
    position: 'w-[180px]',
    activation: 'w-[150px]',
    checkIn: 'w-[140px]',
    signIn: 'w-[140px]',
    actions: 'w-[100px]'
  } : {
    person: 'w-[320px]',
    position: 'w-[240px]',
    activation: 'w-[200px]',
    checkIn: 'w-[180px]',
    signIn: 'w-[180px]',
    actions: 'w-[120px]'
  };

  // Initialize roster data aligned with SITREP: adversary vessel approaching Geofence Alpha and cross-domain impacts
  const roster: RosterPosition[] = data.roster || [
    { id: 'uscg-intercept', title: 'USCG – Sector Honolulu (Maritime Intercept Lead)', assignedMembers: [
      { id: 'm-uscg-1', name: 'Cmdr. Keoni Akana (USCG Intercept Lead)', email: 'keoni.akana@uscg.mil', phone: '(808) 536-6901', checkedIn: true, checkInTime: new Date().toLocaleString(), signedIn: true, signInTime: new Date().toLocaleString(), activationStatus: 'Activated' }
    ] },
    { id: 'pacom-ops', title: 'INDOPACOM Operations (J3/J35)', assignedMembers: [
      { id: 'm-pacom-1', name: 'Col. Hana Kealoha (INDOPACOM J3/J35 Ops)', email: 'hana.kealoha@pacom.mil', phone: '(808) 472-1001', checkedIn: true, checkInTime: new Date().toLocaleString(), signedIn: true, signInTime: new Date().toLocaleString(), activationStatus: 'Activated' }
    ] },
    { id: 'spectrum-rf', title: 'Spectrum / RF Monitoring Team', assignedMembers: [
      { id: 'm-rf-1', name: 'Lt. Nia Kawai (RF/Spectrum Lead)', email: 'nia.kawai@pacom.mil', phone: '(808) 532-2001', checkedIn: true, signedIn: true, activationStatus: 'Activated' }
    ] },
    { id: 'base-security', title: 'Base Security / Counter‑UAS', assignedMembers: [
      { id: 'm-sec-1', name: 'Capt. Leo Tanaka (Counter‑UAS)', email: 'leo.tanaka@usmc.mil', phone: '(808) 257-1200', checkedIn: true, signedIn: true, activationStatus: 'Activated' }
    ] },
    { id: 'mcbh-fac', title: 'USMC – MCBH Facilities/Electrical', assignedMembers: [
      { id: 'm-mcbh-1', name: 'Maj. Eric Tan (USMC MCBH Facilities)', email: 'eric.tan@usmc.mil', phone: '(808) 257-1002', checkedIn: true, signedIn: true, activationStatus: 'Activated' }
    ] },
    { id: 'utility-grid', title: 'Utility Grid Operations Liaison', assignedMembers: [
      { id: 'm-utility-1', name: 'Kai Nakamura (Utility Grid Operations Liaison)', email: 'kai.nakamura@utility.hi', phone: '(808) 543-1003', checkedIn: true, signedIn: true, activationStatus: 'Activated' }
    ] },
    { id: 'ot-ics', title: 'OT/ICS Security Lead (Utility)', assignedMembers: [
      { id: 'm-ot-1', name: 'Ken Ito (OT/ICS Security Lead)', email: 'ken.ito@utility.hi', phone: '(808) 543-1009', checkedIn: true, signedIn: true, activationStatus: 'Activated' }
    ] },
    { id: 'water', title: 'Honolulu Board of Water Supply Ops', assignedMembers: [
      { id: 'm-water-1', name: 'Noa Silva (HBWS Ops Chief)', email: 'noa.silva@hbws.hi.us', phone: '(808) 748-1005', checkedIn: true, signedIn: true, activationStatus: 'Activated' }
    ] },
    { id: 'health', title: 'Hospital Coalition Coordinator', assignedMembers: [
      { id: 'm-health-1', name: 'Dr. Leilani Park (Hospital Coalition)', email: 'leilani.park@hihealth.org', phone: '(808) 531-1006', checkedIn: true, signedIn: true, activationStatus: 'Activated' }
    ] },
    { id: 'telecom', title: 'Telecom ESF‑2 Lead', assignedMembers: [
      { id: 'm-tel-1', name: 'Malia Young (Telecom ESF‑2 Lead)', email: 'malia.young@telecom.hi', phone: '(808) 533-1007', checkedIn: true, signedIn: false, activationStatus: 'Awaiting Confirmation' }
    ] },
    { id: 'state-energy', title: 'Hawaii State Energy Office Liaison', assignedMembers: [
      { id: 'm-seo-1', name: 'Ava Ikaika (State Energy Office Liaison)', email: 'ava.ikaika@hawaii.gov', phone: '(808) 587-1004', checkedIn: true, signedIn: true, activationStatus: 'Activated' }
    ] },
    { id: 'cop-manager', title: 'Common Operating Picture (COP) Manager / USCG Liaison', assignedMembers: [
      { id: 'm-cop-1', name: 'Jordan Kaleo (COP Manager)', email: 'jordan.kaleo@state.hi.us', phone: '(808) 586-2201', checkedIn: true, signedIn: true, activationStatus: 'Activated' }
    ] },
    { id: 'county-pd', title: 'County PD – Shoreline Access/Perimeter', assignedMembers: [
      { id: 'm-cpd-1', name: 'Lt. Mia Kapule (Shoreline Access Lead)', email: 'mia.kapule@honolulu.gov', phone: '(808) 723-0001', checkedIn: true, signedIn: true, activationStatus: 'Activated' }
    ] },
    { id: 'navy-liaison', title: 'Navy Region Hawaii Liaison', assignedMembers: [
      { id: 'm-navy-1', name: 'Lt. Cmdr. Jonah Reyes (Navy Region Hawaii)', email: 'jonah.reyes@navy.mil', phone: '(808) 473-1008', checkedIn: true, signedIn: true, activationStatus: 'Activated' }
    ] },
    { id: 'public-affairs', title: 'Public Information Officer (JIC)', assignedMembers: [
      { id: 'm-pio-1', name: 'Megan Lau (Public Affairs – JIC)', email: 'megan.lau@hawaii.gov', phone: '(808) 586-1010', checkedIn: true, signedIn: true, activationStatus: 'Activated' }
    ] },
    { id: 'legal-privacy', title: 'Legal & Privacy Counsel', assignedMembers: [
      { id: 'm-legal-1', name: 'Daniel Kim (Legal & Privacy Counsel)', email: 'daniel.kim@ag.hi.gov', phone: '(808) 586-1011', checkedIn: true, signedIn: true, activationStatus: 'Activated' }
    ] },
    { id: 'logistics', title: 'Logistics – Fuel & Gensets', assignedMembers: [
      { id: 'm-log-1', name: 'Sgt. Kalani Ho (HI NG Logistics)', email: 'kalani.ho@hi.ng.mil', phone: '(808) 672-1012', checkedIn: true, signedIn: true, activationStatus: 'Activated' }
    ] },
  ];

  // Add/Edit Member Side Sheet form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    positionId: roster[0]?.id || 'incident-commander',
    activationStatus: 'Activated' as 'Activated' | 'Not Activated' | 'Awaiting Confirmation',
    checkedIn: false,
    signedIn: false,
  });

  const handleGenerateTeamsSite = () => {
    toast.success('Generating Microsoft Teams site for Incident Roster...');
  };

  const openAddMemberSheet = () => {
    setEditingMember(null);
    setFormData({ name: '', email: '', phone: '', positionId: roster[0]?.id || 'incident-commander', activationStatus: 'Activated', checkedIn: false, signedIn: false });
    setIsSheetOpen(true);
  };

  const openEditMemberSheet = (memberId: string, positionId: string) => {
    const position = roster.find(p => p.id === positionId);
    const member = position?.assignedMembers?.find(m => m.id === memberId);
    if (!member) return;
    setEditingMember({ memberId, positionId });
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone || '',
      positionId,
      activationStatus: member.activationStatus,
      checkedIn: member.checkedIn,
      signedIn: member.signedIn,
    });
    setIsSheetOpen(true);
  };

  const saveMember = () => {
    if (!formData.name || !formData.email || !formData.positionId) {
      toast.error('Please fill in name, email, and position');
      return;
    }

    const updatedRoster = roster.map(position => {
      if (position.id !== formData.positionId && editingMember && position.id === editingMember.positionId) {
        // If position changed, remove from old position below, then will be added to new position in next pass
        return {
          ...position,
          assignedMembers: position.assignedMembers?.filter(m => m.id !== editingMember.memberId) || [],
        };
      }
      return position;
    }).map(position => {
      if (position.id === formData.positionId) {
        if (editingMember && position.id === formData.positionId) {
          // Update existing in same position
          return {
            ...position,
            assignedMembers: (position.assignedMembers || []).map(m => m.id === editingMember.memberId ? {
              ...m,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              activationStatus: formData.activationStatus,
              checkedIn: formData.checkedIn,
              signedIn: formData.signedIn,
            } : m)
          };
        } else if (editingMember && position.id === formData.positionId) {
          return position; // handled above
        } else {
          // Add new
          const newMember: AssignedMember = {
            id: `${Date.now()}-${Math.random()}`,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            checkedIn: formData.checkedIn,
            signedIn: formData.signedIn,
            activationStatus: formData.activationStatus,
          };
          return {
            ...position,
            assignedMembers: [...(position.assignedMembers || []), newMember]
          };
        }
      }
      return position;
    });

    onDataChange({ ...data, roster: updatedRoster });
    setIsSheetOpen(false);
    setEditingMember(null);
    toast.success(editingMember ? 'Member updated successfully' : 'Member added successfully');
  };

  const handleRemoveMember = (memberId: string, positionId: string) => {
    const updatedRoster = roster.map(position => {
      if (position.id === positionId) {
        return {
          ...position,
          assignedMembers: position.assignedMembers?.filter(m => m.id !== memberId) || []
        };
      }
      return position;
    });

    onDataChange({ ...data, roster: updatedRoster });
    toast.success('Member removed');
  };

  const handleEditMember = (memberId: string, positionId: string) => {
    openEditMemberSheet(memberId, positionId);
  };

  const handleCheckInChange = (memberId: string, positionId: string, value: string) => {
    const newCheckedIn = value === 'checked-in';
    const updatedRoster = roster.map(position => {
      if (position.id === positionId) {
        return {
          ...position,
          assignedMembers: position.assignedMembers?.map(member => {
            if (member.id === memberId) {
              return {
                ...member,
                checkedIn: newCheckedIn,
                checkInTime: newCheckedIn ? new Date().toLocaleString() : undefined
              };
            }
            return member;
          }) || []
        };
      }
      return position;
    });

    onDataChange({ ...data, roster: updatedRoster });
    
    const position = roster.find(p => p.id === positionId);
    const member = position?.assignedMembers?.find(m => m.id === memberId);
    if (member) {
      toast.success(`${member.name} ${newCheckedIn ? 'checked in' : 'checked out'}`);
    }
  };

  const handleSignInChange = (memberId: string, positionId: string, value: string) => {
    const newSignedIn = value === 'signed-in';
    const updatedRoster = roster.map(position => {
      if (position.id === positionId) {
        return {
          ...position,
          assignedMembers: position.assignedMembers?.map(member => {
            if (member.id === memberId) {
              return {
                ...member,
                signedIn: newSignedIn,
                signInTime: newSignedIn ? new Date().toLocaleString() : undefined
              };
            }
            return member;
          }) || []
        };
      }
      return position;
    });

    onDataChange({ ...data, roster: updatedRoster });
    
    const position = roster.find(p => p.id === positionId);
    const member = position?.assignedMembers?.find(m => m.id === memberId);
    if (member) {
      toast.success(`${member.name} ${newSignedIn ? 'signed in' : 'signed out'}`);
    }
  };

  const handleToggleActivation = (memberId: string, positionId: string) => {
    const updatedRoster = roster.map(position => {
      if (position.id === positionId) {
        return {
          ...position,
          assignedMembers: position.assignedMembers?.map(member => {
            if (member.id === memberId) {
              // Cycle through: Activated -> Awaiting Confirmation -> Not Activated -> Activated
              let newStatus: 'Activated' | 'Not Activated' | 'Awaiting Confirmation';
              if (member.activationStatus === 'Activated') {
                newStatus = 'Awaiting Confirmation';
              } else if (member.activationStatus === 'Awaiting Confirmation') {
                newStatus = 'Not Activated';
              } else {
                newStatus = 'Activated';
              }
              
              return {
                ...member,
                activationStatus: newStatus
              };
            }
            return member;
          }) || []
        };
      }
      return position;
    });

    onDataChange({ ...data, roster: updatedRoster });
  };

  // Helper function to get activation status color
  const getActivationStatusColor = (status: 'Activated' | 'Not Activated' | 'Awaiting Confirmation') => {
    switch (status) {
      case 'Activated':
        return 'var(--accent)';
      case 'Awaiting Confirmation':
        return '#F59E0B'; // Warning/amber color
      case 'Not Activated':
        return 'var(--muted)';
      default:
        return 'var(--muted)';
    }
  };

  // Helper function to get activation status text color
  const getActivationStatusTextColor = (status: 'Activated' | 'Not Activated' | 'Awaiting Confirmation') => {
    switch (status) {
      case 'Activated':
        return 'white';
      case 'Awaiting Confirmation':
        return '#F59E0B'; // Warning/amber color
      case 'Not Activated':
        return '#6e757c';
      default:
        return '#6e757c';
    }
  };

  // Get all members across all positions (flat list)
  const allMembers: Array<{ member: AssignedMember; position: RosterPosition }> = [];
  roster.forEach(position => {
    position.assignedMembers?.forEach(member => {
      allMembers.push({ member, position });
    });
  });

  // Filter members by search term (name, email, position)
  const filteredMembers = allMembers.filter(({ member, position }) => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      member.name.toLowerCase().includes(s) ||
      member.email.toLowerCase().includes(s) ||
      (position.title.toLowerCase().includes(s))
    );
  });

  const toggleMember = (id: string) => {
    setExpandedMembers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section - Sticky (mirrors Resources) */}
      <div className="sticky top-0 z-10 bg-[#222529] rounded-lg border border-[#6e757c] relative">
        <div className="flex items-center justify-between px-[13px] py-3 w-full border-b-2 border-border rounded-t-lg rounded-b-none">
          {/* Title */}
          <p className="caption text-nowrap text-white whitespace-pre">Incident Roster</p>
          {/* Search + Add Member (search immediately left of button) */}
          <div className="flex items-center gap-4">
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
                    <path d={searchSvgPaths.p3a3bec00} stroke="#6E757C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.710938" />
                    <path d={searchSvgPaths.p380aaa80} stroke="#6E757C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.710938" />
                  </g>
                </svg>
              </div>
            </div>
            <button
              onClick={handleGenerateTeamsSite}
              className="h-[22.75px] rounded-[4px] px-3 border border-border hover:bg-[rgba(255,255,255,0.1)] transition-colors caption text-white"
            >
              Generate Teams Site
            </button>
            <button
              onClick={openAddMemberSheet}
              className="bg-[#01669f] h-[22.75px] rounded-[4px] w_[130.625px] hover:bg-[#01669f]/90 transition-colors flex items-center justify-center relative w-[130.625px]"
            >
              <div className="absolute left-[16px] size-[13px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
                  <g>
                    <path d="M2.70833 6.5H10.2917" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
                    <path d="M6.5 2.70833V10.2917" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
                  </g>
                </svg>
              </div>
              <p className="caption text-nowrap text-white ml-[21px]">Add Member</p>
            </button>
          </div>
        </div>
      </div>

      {/* Roster Members List (mirrors Resources list) */}
      <div className="space-y-4">
        {filteredMembers.map(({ member, position }) => {
          const compositeId = `${position.id}:${member.id}`;
          const isExpanded = expandedMembers.has(compositeId);
          return (
            <div
              key={compositeId}
              className="border border-border rounded-lg overflow-hidden"
              style={{ background: 'linear-gradient(90deg, rgba(2, 163, 254, 0.08) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(20, 23, 26) 0%, rgb(20, 23, 26) 100%)' }}
            >
              {/* Member Header */}
              <div className={`p-3 ${isExpanded ? 'border-b border-border' : ''}`}>
                <div className="flex items-start justify-between">
                  <div
                    className="flex items-start gap-2 flex-1 cursor-pointer"
                    onClick={() => toggleMember(compositeId)}
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <span className="caption text-white">{member.name}</span>
                      {!isExpanded && (
                        <div className="flex items-center gap-3 mt-1">
                          <span className="caption text-white">{position.title}</span>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getActivationStatusColor(member.activationStatus) }} />
                              <span className="caption" style={{ color: getActivationStatusTextColor(member.activationStatus) }}>{member.activationStatus}</span>
              </div>
                            <span className="caption" style={{ color: member.checkedIn ? 'var(--accent)' : '#6e757c' }}>{member.checkedIn ? 'Checked-In' : 'Checked-Out'}</span>
                            <span className="caption" style={{ color: member.signedIn ? 'var(--accent)' : '#6e757c' }}>{member.signedIn ? 'Signed-In' : 'Signed-Out'}</span>
              </div>
            </div>
                      )}
          </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleEditMember(member.id, position.id); }}
                      className="p-1 hover:bg-muted/30 rounded transition-colors"
                    >
                      <Edit2 className="w-3 h-3 text-white" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRemoveMember(member.id, position.id); }}
                      className="p-1 hover:bg-muted/30 rounded transition-colors"
                    >
                      <Trash2 className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Member Details (Expanded) */}
              {isExpanded && (
                <div className="p-4 space-y-4 bg-card/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white mb-1 block">Position</label>
                      <p className="caption text-white">{position.title}</p>
                    </div>
                    <div>
                      <label className="text-white mb-1 block">Email</label>
                      <p className="caption text-white">{member.email}</p>
                    </div>
                    <div>
                      <label className="text-white mb-1 block">Phone</label>
                      <p className="caption text-white">{member.phone || '-'}</p>
                    </div>
                    <div>
                      <label className="text-white mb-1 block">Activation Status</label>
                      <button
                        onClick={() => handleToggleActivation(member.id, position.id)}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                      >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getActivationStatusColor(member.activationStatus) }} />
                        <span className="caption" style={{ color: getActivationStatusTextColor(member.activationStatus) }}>{member.activationStatus}</span>
                      </button>
                    </div>
                    <div>
                      <label className="text-white mb-1 block">Check-In Status</label>
                    <Select 
                      value={member.checkedIn ? 'checked-in' : 'checked-out'}
                      onValueChange={(value) => handleCheckInChange(member.id, position.id, value)}
                    >
                      <SelectTrigger className="h-8 w-full border-border bg-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                          <SelectItem value="checked-in" className="cursor-pointer">Checked-In</SelectItem>
                          <SelectItem value="checked-out" className="cursor-pointer">Checked-Out</SelectItem>
                      </SelectContent>
                    </Select>
                      <p className="caption text-[#6e757c] mt-1">{member.checkInTime ? `At ${member.checkInTime}` : '-'}</p>
                  </div>
                    <div>
                      <label className="text-white mb-1 block">Sign-In Status</label>
                    <Select 
                      value={member.signedIn ? 'signed-in' : 'signed-out'}
                      onValueChange={(value) => handleSignInChange(member.id, position.id, value)}
                    >
                      <SelectTrigger className="h-8 w-full border-border bg-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                          <SelectItem value="signed-in" className="cursor-pointer">Signed-In</SelectItem>
                          <SelectItem value="signed-out" className="cursor-pointer">Signed-Out</SelectItem>
                      </SelectContent>
                    </Select>
                      <p className="caption text-[#6e757c] mt-1">{member.signInTime ? `At ${member.signInTime}` : '-'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
              </div>

      {/* Footer count (mirrors Resources) */}
      <div className="bg-[#222529] h-[49px] relative w-full">
        <div aria-hidden="true" className="absolute border-[#6e757c] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
        <div className="flex items-center h-[49px] px-6">
          <p className="font-['Open_Sans',_sans-serif] font-normal leading-[18px] text-[#6e757c] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'}
          </p>
                              </div>
                            </div>

      {/* Add/Edit Member Side Panel */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-[640px] bg-card overflow-y-auto px-6">
          <SheetHeader>
            <SheetTitle>{editingMember ? 'Edit Member' : 'Add Member'}</SheetTitle>
            <SheetDescription>
              {editingMember ? 'Update the member information below.' : 'Fill in the form below to add a new roster member.'}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6 pb-6">
            <div className="space-y-2">
              <Label className="text-foreground">Full Name <span className="text-destructive">*</span></Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-input-background border-border" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Email <span className="text-destructive">*</span></Label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-input-background border-border" />
                                  </div>
            <div className="space-y-2">
              <Label className="text-foreground">Phone</Label>
              <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-input-background border-border" />
                  </div>
            <div className="space-y-2">
              <Label className="text-foreground">Position <span className="text-destructive">*</span></Label>
              <Select value={formData.positionId} onValueChange={(value) => setFormData({ ...formData, positionId: value })}>
                <SelectTrigger className="bg-input-background border-border">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {roster.map((pos) => (
                    <SelectItem key={pos.id} value={pos.id}>{pos.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
                  </div>
            <div className="space-y-2">
              <Label className="text-foreground">Activation Status</Label>
              <Select value={formData.activationStatus} onValueChange={(value) => setFormData({ ...formData, activationStatus: value as any })}>
                <SelectTrigger className="bg-input-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activated">Activated</SelectItem>
                  <SelectItem value="Awaiting Confirmation">Awaiting Confirmation</SelectItem>
                  <SelectItem value="Not Activated">Not Activated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Check-In</Label>
                <Select value={formData.checkedIn ? 'checked-in' : 'checked-out'} onValueChange={(value) => setFormData({ ...formData, checkedIn: value === 'checked-in' })}>
                  <SelectTrigger className="bg-input-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked-in">Checked-In</SelectItem>
                    <SelectItem value="checked-out">Checked-Out</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              <div className="space-y-2">
                <Label className="text-foreground">Sign-In</Label>
                <Select value={formData.signedIn ? 'signed-in' : 'signed-out'} onValueChange={(value) => setFormData({ ...formData, signedIn: value === 'signed-in' })}>
                  <SelectTrigger className="bg-input-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="signed-in">Signed-In</SelectItem>
                    <SelectItem value="signed-out">Signed-Out</SelectItem>
                  </SelectContent>
                </Select>
          </div>
        </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={saveMember} className="flex-1 bg-primary hover:bg-primary/90">{editingMember ? 'Update Member' : 'Add Member'}</Button>
              <Button onClick={() => setIsSheetOpen(false)} variant="outline" className="flex-1 border-border">Cancel</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
