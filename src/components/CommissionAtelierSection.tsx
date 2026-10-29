import React, { useState } from 'react';
import { Check, Download, FileText, ArrowRight, RotateCcw } from 'lucide-react';
import { MATERIAL_SPECIMENS } from '../data/architecturalData';

interface CommissionAtelierSectionProps {
  selectedMaterials: string[];
  onToggleMaterial: (materialName: string) => void;
}

const TYPOLOGIES = [
  { id: 'cultural', label: 'Cultural & Museum Institution', baseRatePerSqm: 6800, monthsBase: 28 },
  { id: 'residential', label: 'Monolithic Private Residence', baseRatePerSqm: 5900, monthsBase: 22 },
  { id: 'sanctuary', label: 'Thermal & Contemplative Sanctuary', baseRatePerSqm: 6400, monthsBase: 26 },
  { id: 'alpine', label: 'High-Altitude / Coastal Pavilion', baseRatePerSqm: 6200, monthsBase: 24 },
] as const;

const TOPOGRAPHIES = [
  { id: 'coastal', label: 'Coastal Basalt Shelf', factor: 1.15 },
  { id: 'alpine', label: 'High Alpine Ridge (>1,500m)', factor: 1.22 },
  { id: 'subterranean', label: 'Subterranean / Excavated', factor: 1.18 },
  { id: 'urban', label: 'Historic Urban Sanctuary', factor: 1.05 },
] as const;

export const CommissionAtelierSection: React.FC<CommissionAtelierSectionProps> = ({
  selectedMaterials,
  onToggleMaterial,
}) => {
  const [patronName, setPatronName] = useState('Faizan Shahid');
  const [institutionName, setInstitutionName] = useState('Meezan Commercial Holdings');
  const [patronEmail, setPatronEmail] = useState('advisory@meezan-realestate.pk');
  const [siteLocation, setSiteLocation] = useState(
    '308 C Millat Rd, Millat Town D Block, 60 Feet Road, Faisalabad (F4Q3+MC)'
  );
  const [typologyId, setTypologyId] = useState<string>('cultural');
  const [topographyId, setTopographyId] = useState<string>('urban');
  const [targetAreaSqm, setTargetAreaSqm] = useState<number>(2400);
  const [requireSeismicIsolation, setRequireSeismicIsolation] = useState<boolean>(true);
  const [requireZeroMechanicalHvac, setRequireZeroMechanicalHvac] = useState<boolean>(true);
  const [projectNotes, setProjectNotes] = useState(
    'Commercial plaza & showroom development inquiry at Hassan Chok 60 Feet Road / Rafeeq Chouk, Millat Town D Block, Faisalabad with Principal Advisor Mr. Muhammad Shahzad (+92 300 7785625).'
  );
  const [submittedDossierCode, setSubmittedDossierCode] = useState<string | null>(null);

  const activeTypology = TYPOLOGIES.find((t) => t.id === typologyId) || TYPOLOGIES[0];
  const activeTopography = TOPOGRAPHIES.find((t) => t.id === topographyId) || TOPOGRAPHIES[0];

  const estimatedBudgetEurMillions = (
    (targetAreaSqm *
      activeTypology.baseRatePerSqm *
      activeTopography.factor *
      (requireSeismicIsolation ? 1.08 : 1.0)) /
    1_000_000
  ).toFixed(2);

  const estimatedDurationMonths = Math.round(
    activeTypology.monthsBase * (targetAreaSqm > 3000 ? 1.2 : 1.0)
  );

  const estimatedEmbodiedCarbon = Math.round(
    (requireZeroMechanicalHvac ? 215 : 290) *
      (selectedMaterials.some((m) => m.includes('Hinoki')) ? 0.82 : 1.0)
  );

  const handleCommissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `ARC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedDossierCode(randomCode);
  };

  const handleDownloadBrief = () => {
    const briefContent = [
      'ARCOVA ARCHITECTURAL ATELIER — KYOTO · ZURICH · REYKJAVIK',
      `COMMISSION FEASIBILITY DOSSIER: ${submittedDossierCode || 'ARC-2026-DRAFT'}`,
      '====================================================================',
      `PATRON / PRINCIPAL: ${patronName}`,
      `INSTITUTION / TRUST: ${institutionName}`,
      `CONTACT: ${patronEmail}`,
      `PROPOSED SITE: ${siteLocation}`,
      `TYPOLOGY: ${activeTypology.label}`,
      `SITE TOPOGRAPHY: ${activeTopography.label}`,
      `TARGET GROSS INTERNAL AREA: ${targetAreaSqm.toLocaleString()} m²`,
      `SPECIFIED MATERIAL PALETTE: ${selectedMaterials.join(', ') || 'Standard Atelier Limestone & Bronze'}`,
      `SEISMIC BASE ISOLATION: ${requireSeismicIsolation ? 'SPECIFIED' : 'STANDARD'}`,
      `PASSIVE THERMAL EQUILIBRIUM: ${requireZeroMechanicalHvac ? 'SPECIFIED' : 'HYBRID'}`,
      '--------------------------------------------------------------------',
      `ESTIMATED STRUCTURAL CONSTRUCTION VALUE: €${estimatedBudgetEurMillions}M EUR`,
      `PROJECTED DESIGN & TECTONIC DELIVERY: ${estimatedDurationMonths} MONTHS`,
      `TARGET EMBODIED CARBON CEILING: ${estimatedEmbodiedCarbon} kgCO2e/m²`,
      '--------------------------------------------------------------------',
      'PROGRAMMATIC NOTES:',
      projectNotes,
    ].join('\n');

    const blob = new Blob([briefContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${submittedDossierCode || 'ARCOVA-Brief'}-Specification.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="atelier"
      className="w-full bg-[#0E1116] text-[#F4EFE8] border-t border-[rgba(244,239,232,0.08)] py-20 lg:py-28"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[rgba(244,239,232,0.08)]">
          <div>
            <div className="label-caps text-[#B8925A] mb-4">
              04 / PRIVATE ATELIER &amp; COMMISSION FEASIBILITY
            </div>
            <h2
              className="font-serif-editorial text-3xl md:text-5xl font-normal tracking-[-0.015em] text-[#F4EFE8]"
              style={{ textWrap: 'balance' }}
            >
              Initiate a Monograph Commission
            </h2>
          </div>
          <p className="font-sans-body font-light text-[15px] leading-[24px] text-[rgba(244,239,232,0.65)] max-w-xl">
            ARCOVA accepts four private and institutional commissions annually across our Kyoto,
            Zurich, and Reykjavik studios. Configure your programmatic parameters below.
          </p>
        </div>

        {/* 12-Column Atelier Configurator & Live Feasibility Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 items-start">
          {/* Left 7 Columns: Commission Brief Form */}
          <form
            onSubmit={handleCommissionSubmit}
            className="lg:col-span-7 bg-[#171B23] rounded-[16px] border border-[rgba(244,239,232,0.08)] p-8 lg:p-10"
          >
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-[rgba(244,239,232,0.08)]">
              <span className="label-caps text-[#D2AE78]">
                PROGRAMMATIC SPECIFICATION SHEET
              </span>
              <span className="label-mono text-[rgba(244,239,232,0.45)]">
                SIA 102 / RIBA STAGES 0–7
              </span>
            </div>

            {/* Patron & Site Identity Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label
                  htmlFor="patron-name"
                  className="block label-caps text-[rgba(244,239,232,0.65)] mb-2.5"
                >
                  Principal Patron or Director
                </label>
                <input
                  id="patron-name"
                  type="text"
                  required
                  value={patronName}
                  onChange={(e) => setPatronName(e.target.value)}
                  className="w-full bg-[#12151B] border border-[rgba(244,239,232,0.12)] focus:border-[#B8925A] focus:outline-none focus:ring-0 caret-[#D2AE78] text-[#F4EFE8] rounded-[8px] px-4 py-3 text-[15px] font-light transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="institution-name"
                  className="block label-caps text-[rgba(244,239,232,0.65)] mb-2.5"
                >
                  Institution or Family Office
                </label>
                <input
                  id="institution-name"
                  type="text"
                  required
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  className="w-full bg-[#12151B] border border-[rgba(244,239,232,0.12)] focus:border-[#B8925A] focus:outline-none focus:ring-0 caret-[#D2AE78] text-[#F4EFE8] rounded-[8px] px-4 py-3 text-[15px] font-light transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="patron-email"
                  className="block label-caps text-[rgba(244,239,232,0.65)] mb-2.5"
                >
                  Direct Correspondence Address
                </label>
                <input
                  id="patron-email"
                  type="email"
                  required
                  value={patronEmail}
                  onChange={(e) => setPatronEmail(e.target.value)}
                  className="w-full bg-[#12151B] border border-[rgba(244,239,232,0.12)] focus:border-[#B8925A] focus:outline-none focus:ring-0 caret-[#D2AE78] text-[#F4EFE8] rounded-[8px] px-4 py-3 text-[15px] font-light transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="site-coordinates"
                  className="block label-caps text-[rgba(244,239,232,0.65)] mb-2.5"
                >
                  Site Location &amp; Coordinates
                </label>
                <input
                  id="site-coordinates"
                  type="text"
                  required
                  value={siteLocation}
                  onChange={(e) => setSiteLocation(e.target.value)}
                  className="w-full bg-[#12151B] border border-[rgba(244,239,232,0.12)] focus:border-[#B8925A] focus:outline-none focus:ring-0 caret-[#D2AE78] text-[#F4EFE8] rounded-[8px] px-4 py-3 text-[15px] font-light transition-colors"
                />
              </div>
            </div>

            {/* Custom Sharp Radio Controls: Architectural Typology */}
            <div className="mb-8">
              <div className="label-caps text-[rgba(244,239,232,0.65)] mb-3">
                COMMISSION TYPOLOGY (RADIO SELECTION)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TYPOLOGIES.map((t) => {
                  const isChecked = typologyId === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTypologyId(t.id)}
                      className={`flex items-center gap-3.5 p-3.5 rounded-[8px] border text-left transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-[#12151B] border-[#B8925A] text-[#F4EFE8]'
                          : 'bg-[#12151B]/60 border-[rgba(244,239,232,0.12)] text-[rgba(244,239,232,0.65)] hover:border-[rgba(184,146,90,0.4)]'
                      }`}
                    >
                      {/* Sharp Custom Radio Glyph with 1px Bronze Stroke */}
                      <span
                        className={`w-4 h-4 shrink-0 flex items-center justify-center border ${
                          isChecked
                            ? 'bg-[#B8925A] border-[#B8925A]'
                            : 'border-[#B8925A] bg-transparent'
                        }`}
                      >
                        {isChecked && <span className="w-2 h-2 bg-[#0E1116]" />}
                      </span>
                      <span className="text-[13px] font-normal">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Gross Internal Area Slider & Site Topography */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 p-5 bg-[#12151B] rounded-[8px] border border-[rgba(244,239,232,0.08)]">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="area-slider"
                    className="label-caps text-[rgba(244,239,232,0.65)]"
                  >
                    Gross Internal Area
                  </label>
                  <span className="label-mono text-[#D2AE78]">
                    {targetAreaSqm.toLocaleString()} m²
                  </span>
                </div>
                <input
                  id="area-slider"
                  type="range"
                  min={450}
                  max={8500}
                  step={50}
                  value={targetAreaSqm}
                  onChange={(e) => setTargetAreaSqm(Number(e.target.value))}
                  className="w-full accent-[#B8925A] cursor-pointer mt-2"
                />
                <div className="flex justify-between label-mono text-[10px] text-[rgba(244,239,232,0.4)] mt-1">
                  <span>450 m²</span>
                  <span>4,500 m²</span>
                  <span>8,500 m²</span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="topography-select"
                  className="block label-caps text-[rgba(244,239,232,0.65)] mb-2"
                >
                  Geotechnical Site Condition
                </label>
                <select
                  id="topography-select"
                  value={topographyId}
                  onChange={(e) => setTopographyId(e.target.value)}
                  className="w-full bg-[#171B23] border border-[rgba(244,239,232,0.12)] focus:border-[#B8925A] focus:outline-none text-[#F4EFE8] rounded-[8px] px-3.5 py-2.5 text-[13px] cursor-pointer"
                >
                  {TOPOGRAPHIES.map((top) => (
                    <option key={top.id} value={top.id} className="bg-[#12151B] text-[#F4EFE8]">
                      {top.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sharp Custom Checkboxes: Materiality & Engineering Directives */}
            <div className="mb-8">
              <div className="label-caps text-[rgba(244,239,232,0.65)] mb-3">
                SPECIFIED TECTONIC MATERIALS &amp; ENGINEERING SYSTEMS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MATERIAL_SPECIMENS.map((mat) => {
                  const checked = selectedMaterials.includes(mat.name);
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => onToggleMaterial(mat.name)}
                      className={`flex items-center gap-3 p-3 rounded-[8px] border text-left transition-colors cursor-pointer ${
                        checked
                          ? 'bg-[#12151B] border-[#B8925A] text-[#F4EFE8]'
                          : 'bg-[#12151B]/50 border-[rgba(244,239,232,0.10)] text-[rgba(244,239,232,0.65)] hover:border-[rgba(184,146,90,0.4)]'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 shrink-0 flex items-center justify-center border ${
                          checked
                            ? 'bg-[#B8925A] border-[#B8925A]'
                            : 'border-[#B8925A] bg-transparent'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3 text-[#0E1116] stroke-[2.5]" />}
                      </span>
                      <span className="text-[13px] truncate">{mat.name}</span>
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setRequireSeismicIsolation(!requireSeismicIsolation)}
                  className={`flex items-center gap-3 p-3 rounded-[8px] border text-left transition-colors cursor-pointer ${
                    requireSeismicIsolation
                      ? 'bg-[#12151B] border-[#B8925A] text-[#F4EFE8]'
                      : 'bg-[#12151B]/50 border-[rgba(244,239,232,0.10)] text-[rgba(244,239,232,0.65)]'
                  }`}
                >
                  <span
                    className={`w-4 h-4 shrink-0 flex items-center justify-center border ${
                      requireSeismicIsolation
                        ? 'bg-[#B8925A] border-[#B8925A]'
                        : 'border-[#B8925A] bg-transparent'
                    }`}
                  >
                    {requireSeismicIsolation && (
                      <Check className="w-3 h-3 text-[#0E1116] stroke-[2.5]" />
                    )}
                  </span>
                  <span className="text-[13px] truncate">Seismic Base Isolation Bearings</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRequireZeroMechanicalHvac(!requireZeroMechanicalHvac)}
                  className={`flex items-center gap-3 p-3 rounded-[8px] border text-left transition-colors cursor-pointer ${
                    requireZeroMechanicalHvac
                      ? 'bg-[#12151B] border-[#B8925A] text-[#F4EFE8]'
                      : 'bg-[#12151B]/50 border-[rgba(244,239,232,0.10)] text-[rgba(244,239,232,0.65)]'
                  }`}
                >
                  <span
                    className={`w-4 h-4 shrink-0 flex items-center justify-center border ${
                      requireZeroMechanicalHvac
                        ? 'bg-[#B8925A] border-[#B8925A]'
                        : 'border-[#B8925A] bg-transparent'
                    }`}
                  >
                    {requireZeroMechanicalHvac && (
                      <Check className="w-3 h-3 text-[#0E1116] stroke-[2.5]" />
                    )}
                  </span>
                  <span className="text-[13px] truncate">Passive Geothermal Mass Equilibrium</span>
                </button>
              </div>
            </div>

            {/* Programmatic Narrative Textarea */}
            <div className="mb-8">
              <label
                htmlFor="program-notes"
                className="block label-caps text-[rgba(244,239,232,0.65)] mb-2.5"
              >
                Curatorial &amp; Spatial Brief
              </label>
              <textarea
                id="program-notes"
                rows={3}
                value={projectNotes}
                onChange={(e) => setProjectNotes(e.target.value)}
                className="w-full bg-[#12151B] border border-[rgba(244,239,232,0.12)] focus:border-[#B8925A] focus:outline-none focus:ring-0 caret-[#D2AE78] text-[#F4EFE8] rounded-[8px] p-4 text-[14px] font-light leading-[22px] transition-colors"
              />
            </div>

            {/* Primary Bronze Action & Secondary Ghost Reset */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-[8px] bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] label-caps font-bold transition-all shadow-[0_4px_20px_rgba(184,146,90,0.25)] flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Register Commission Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleDownloadBrief}
                className="px-6 py-3.5 rounded-[8px] border border-[rgba(184,146,90,0.4)] hover:border-[#D2AE78] hover:bg-[rgba(184,146,90,0.06)] text-[#F4EFE8] label-caps transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5 text-[#D2AE78]" />
                <span>Download Specification (.TXT)</span>
              </button>
            </div>
          </form>

          {/* Right 5 Columns: Live Architectural Feasibility & Dossier Output */}
          <div className="lg:col-span-5 bg-[#12151B] rounded-[16px] border border-[rgba(244,239,232,0.08)] p-8 flex flex-col justify-between shadow-ambient-bronze">
            <div>
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-[rgba(244,239,232,0.08)]">
                <div>
                  <div className="label-caps text-[#B8925A]">LIVE FEASIBILITY PROJECTION</div>
                  <h3 className="font-serif-editorial text-2xl text-[#F4EFE8] mt-1">
                    {institutionName || 'Private Commission'}
                  </h3>
                </div>
                <FileText className="w-5 h-5 text-[#B8925A]" />
              </div>

              {/* Submitted Confirmation Banner */}
              {submittedDossierCode && (
                <div className="mb-6 p-4 bg-[rgba(184,146,90,0.10)] border border-[#B8925A] rounded-[8px]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="label-caps text-[#D2AE78]">
                      DOSSIER LOGGED // {submittedDossierCode}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSubmittedDossierCode(null)}
                      className="text-xs text-[rgba(244,239,232,0.6)] hover:text-[#F4EFE8] flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  </div>
                  <p className="text-[13px] font-light text-[#F4EFE8]">
                    Transmitted to Senior Partner Atelier Desk (Zurich &amp; Kyoto). Initial
                    topographical &amp; zoning review scheduled within 48 hours.
                  </p>
                </div>
              )}

              {/* Primary Valuation & Schedule KPIs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-[#0E1116] border border-[rgba(244,239,232,0.08)]">
                  <div className="label-caps text-[rgba(244,239,232,0.45)]">
                    ESTIMATED CONSTRUCTION
                  </div>
                  <div className="font-mono-tabular text-2xl md:text-3xl text-[#D2AE78] mt-2">
                    €{estimatedBudgetEurMillions}M
                  </div>
                  <div className="text-[11px] text-[rgba(244,239,232,0.45)] mt-1">
                    Turnkey Structural &amp; Envelope
                  </div>
                </div>

                <div className="p-4 bg-[#0E1116] border border-[rgba(244,239,232,0.08)]">
                  <div className="label-caps text-[rgba(244,239,232,0.45)]">
                    ATELIER DELIVERY
                  </div>
                  <div className="font-mono-tabular text-2xl md:text-3xl text-[#F4EFE8] mt-2">
                    {estimatedDurationMonths} <span className="text-base">Mos</span>
                  </div>
                  <div className="text-[11px] text-[rgba(244,239,232,0.45)] mt-1">
                    Concept to Monograph Handover
                  </div>
                </div>
              </div>

              {/* Blueprint & Plan Data Lists */}
              <div className="border-t border-[rgba(244,239,232,0.06)]">
                <div className="flex items-center justify-between py-3.5 border-b border-[rgba(244,239,232,0.06)]">
                  <span className="label-caps text-[rgba(244,239,232,0.55)]">
                    PHASE I · CONCEPT &amp; MONOGRAPH MODEL
                  </span>
                  <span className="label-mono text-[#F4EFE8]">
                    Months 01–{Math.round(estimatedDurationMonths * 0.22)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3.5 border-b border-[rgba(244,239,232,0.06)]">
                  <span className="label-caps text-[rgba(244,239,232,0.55)]">
                    PHASE II · QUARRY &amp; TIMBER PROCUREMENT
                  </span>
                  <span className="label-mono text-[#F4EFE8]">
                    Months {Math.round(estimatedDurationMonths * 0.22) + 1}–
                    {Math.round(estimatedDurationMonths * 0.45)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3.5 border-b border-[rgba(244,239,232,0.06)]">
                  <span className="label-caps text-[rgba(244,239,232,0.55)]">
                    PHASE III · SITE EXCAVATION &amp; TECTONICS
                  </span>
                  <span className="label-mono text-[#B8925A]">
                    Months {Math.round(estimatedDurationMonths * 0.45) + 1}–{estimatedDurationMonths}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3.5 border-b border-[rgba(244,239,232,0.06)]">
                  <span className="label-caps text-[rgba(244,239,232,0.55)]">
                    EMBODIED CARBON TARGET
                  </span>
                  <span className="label-mono text-[#D2AE78]">
                    {estimatedEmbodiedCarbon} kgCO₂e/m²
                  </span>
                </div>
                <div className="flex items-center justify-between py-3.5 border-b border-[rgba(244,239,232,0.06)]">
                  <span className="label-caps text-[rgba(244,239,232,0.55)]">
                    SPECIFIED MATERIALS COUNT
                  </span>
                  <span className="label-mono text-[#F4EFE8]">
                    {selectedMaterials.length} Quarry Specimens
                  </span>
                </div>
              </div>
            </div>

            {/* Offices Footer inside Card */}
            <div className="mt-8 pt-5 border-t border-[rgba(244,239,232,0.08)]">
              <div className="label-caps text-[rgba(244,239,232,0.45)] mb-2">
                MEEZAN REAL ESTATE &amp; ATELIER DESKS (OPEN 24 HOURS)
              </div>
              <div className="text-[12px] text-[rgba(244,239,232,0.65)] flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-[#D2AE78]">
                  Faisalabad (308 C Millat Rd · Millat Town D Block · +92 300 7785625)
                </span>
                <span aria-hidden="true">·</span>
                <span>Kyoto</span>
                <span aria-hidden="true">·</span>
                <span>Zurich</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
