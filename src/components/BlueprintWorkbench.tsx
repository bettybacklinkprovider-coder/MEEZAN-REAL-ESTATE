import React, { useState } from 'react';
import { Compass, Layers, Maximize2, Ruler, Eye } from 'lucide-react';
import { MONOGRAPH_PROJECTS, MonographProject, BlueprintZone } from '../data/architecturalData';

interface BlueprintWorkbenchProps {
  selectedProject: MonographProject;
  onSelectProject: (project: MonographProject) => void;
  onOpenMonographModal: (project: MonographProject) => void;
}

export const BlueprintWorkbench: React.FC<BlueprintWorkbenchProps> = ({
  selectedProject,
  onSelectProject,
  onOpenMonographModal,
}) => {
  const [drawingMode, setDrawingMode] = useState<'plan' | 'section' | 'axonometric'>('plan');
  const [showStructuralGrid, setShowStructuralGrid] = useState(true);
  const [showSolarVector, setShowSolarVector] = useState(true);
  const [showAcousticZones, setShowAcousticZones] = useState(false);
  const [activeZoneId, setActiveZoneId] = useState<string>(
    selectedProject.zones[0]?.id || ''
  );

  // Sync activeZoneId when project changes
  const activeZone: BlueprintZone =
    selectedProject.zones.find((z) => z.id === activeZoneId) ||
    selectedProject.zones[0];

  const handleProjectSwitch = (project: MonographProject) => {
    onSelectProject(project);
    if (project.zones.length > 0) {
      setActiveZoneId(project.zones[0].id);
    }
  };

  return (
    <section
      id="floorplans"
      className="w-full bg-[#12151B] text-[#F4EFE8] border-t border-b border-[rgba(244,239,232,0.08)] py-20 lg:py-28"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[rgba(244,239,232,0.08)]">
          <div>
            <div className="label-caps text-[#B8925A] mb-4">
              02 / DRAFTED PRECISION &amp; TECTONIC CAD MATRIX
            </div>
            <h2
              className="font-serif-editorial text-3xl md:text-5xl font-normal tracking-[-0.015em] text-[#F4EFE8]"
              style={{ textWrap: 'balance' }}
            >
              Interactive Floorplan &amp; Section Datum
            </h2>
          </div>
          <p className="font-sans-body font-light text-[15px] leading-[24px] text-[rgba(244,239,232,0.65)] max-w-xl">
            Inspect drafted 1:100 architectural plans, post-tensioned structural spans, and acoustic
            envelopes. Select any spatial pin within the drafted viewport to audit zone parameters.
          </p>
        </div>

        {/* Project Specimen Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-b border-[rgba(244,239,232,0.08)]">
          <div className="flex flex-wrap items-center gap-2">
            {MONOGRAPH_PROJECTS.slice(0, 4).map((proj) => {
              const isSelected = proj.id === selectedProject.id;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => handleProjectSwitch(proj)}
                  className={`px-4 py-2.5 rounded-[8px] label-caps transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#B8925A] text-[#0E1116] font-semibold shadow-[0_4px_20px_rgba(184,146,90,0.25)]'
                      : 'bg-[#171B23] text-[rgba(244,239,232,0.65)] border border-[rgba(244,239,232,0.08)] hover:border-[#D2AE78] hover:text-[#F4EFE8]'
                  }`}
                >
                  {proj.monographNo}. {proj.title}
                </button>
              );
            })}
          </div>

          {/* Drawing Projection Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-[#0E1116] p-1.5 rounded-[8px] border border-[rgba(244,239,232,0.08)]">
            {(
              [
                { id: 'plan', label: 'Plan 1:100' },
                { id: 'section', label: 'Section A-A' },
                { id: 'axonometric', label: 'Structural Axon' },
              ] as const
            ).map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setDrawingMode(mode.id)}
                className={`px-3.5 py-1.5 rounded-[6px] label-caps transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  drawingMode === mode.id
                    ? 'bg-[#171B23] text-[#D2AE78] border border-[rgba(184,146,90,0.4)]'
                    : 'text-[rgba(244,239,232,0.5)] hover:text-[#F4EFE8]'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main 12-Column Workbench Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-stretch">
          {/* Left 8 Columns: Parent Card (rounded-2xl) containing Crisp 0px Corner Drafted Floorplan Viewport */}
          <div className="lg:col-span-8 bg-[#171B23] rounded-[16px] border border-[rgba(244,239,232,0.08)] p-6 flex flex-col justify-between shadow-ambient-bronze">
            {/* Viewport Top Instrument Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-[rgba(244,239,232,0.06)]">
              <div className="flex items-center gap-4 text-xs text-[rgba(244,239,232,0.65)]">
                <span className="label-mono text-[#D2AE78]">{selectedProject.accessionCode}</span>
                <span aria-hidden="true">/</span>
                <span className="label-mono">{selectedProject.coordinates}</span>
                <span aria-hidden="true" className="hidden sm:inline">/</span>
                <span className="label-caps hidden sm:inline text-[rgba(244,239,232,0.45)]">
                  SCALE 1:100 @ A1
                </span>
              </div>

              {/* Layer Overlays Checkboxes */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowStructuralGrid(!showStructuralGrid)}
                  className="flex items-center gap-2 label-caps text-[rgba(244,239,232,0.75)] hover:text-[#D2AE78] cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span
                    className={`w-3.5 h-3.5 flex items-center justify-center border ${
                      showStructuralGrid
                        ? 'bg-[#B8925A] border-[#B8925A] text-[#0E1116]'
                        : 'border-[#B8925A] bg-transparent'
                    }`}
                  >
                    {showStructuralGrid && (
                      <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6L5 9L10 3"
                          stroke="#0E1116"
                          strokeWidth="2"
                          strokeLinecap="square"
                        />
                      </svg>
                    )}
                  </span>
                  Axis Grid
                </button>

                <button
                  type="button"
                  onClick={() => setShowSolarVector(!showSolarVector)}
                  className="flex items-center gap-2 label-caps text-[rgba(244,239,232,0.75)] hover:text-[#D2AE78] cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span
                    className={`w-3.5 h-3.5 flex items-center justify-center border ${
                      showSolarVector
                        ? 'bg-[#B8925A] border-[#B8925A] text-[#0E1116]'
                        : 'border-[#B8925A] bg-transparent'
                    }`}
                  >
                    {showSolarVector && (
                      <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6L5 9L10 3"
                          stroke="#0E1116"
                          strokeWidth="2"
                          strokeLinecap="square"
                        />
                      </svg>
                    )}
                  </span>
                  Solar Azimuth
                </button>

                <button
                  type="button"
                  onClick={() => setShowAcousticZones(!showAcousticZones)}
                  className="flex items-center gap-2 label-caps text-[rgba(244,239,232,0.75)] hover:text-[#D2AE78] cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span
                    className={`w-3.5 h-3.5 flex items-center justify-center border ${
                      showAcousticZones
                        ? 'bg-[#B8925A] border-[#B8925A] text-[#0E1116]'
                        : 'border-[#B8925A] bg-transparent'
                    }`}
                  >
                    {showAcousticZones && (
                      <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6L5 9L10 3"
                          stroke="#0E1116"
                          strokeWidth="2"
                          strokeLinecap="square"
                        />
                      </svg>
                    )}
                  </span>
                  Acoustic Envelope
                </button>
              </div>
            </div>

            {/* Architectural Exception: Crisp 0px Corner Floorplan Viewport */}
            <div className="relative w-full aspect-[16/10] bg-[#0E1116] rounded-none border border-[rgba(184,146,90,0.28)] overflow-hidden select-none">
              <svg
                className="w-full h-full"
                viewBox="0 0 1000 625"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Structural Grid Layer */}
                {showStructuralGrid && (
                  <g stroke="#F4EFE8" strokeOpacity="0.06" strokeWidth="1">
                    {Array.from({ length: 19 }).map((_, idx) => (
                      <line
                        key={`v-${idx}`}
                        x1={(idx + 1) * 50}
                        y1="0"
                        x2={(idx + 1) * 50}
                        y2="625"
                      />
                    ))}
                    {Array.from({ length: 12 }).map((_, idx) => (
                      <line
                        key={`h-${idx}`}
                        x1="0"
                        y1={(idx + 1) * 50}
                        x2="1000"
                        y2={(idx + 1) * 50}
                      />
                    ))}
                    {/* Structural Axis Reference Lines */}
                    <g stroke="#B8925A" strokeOpacity="0.3" strokeDasharray="4 6">
                      <line x1="150" y1="40" x2="150" y2="585" />
                      <line x1="350" y1="40" x2="350" y2="585" />
                      <line x1="650" y1="40" x2="650" y2="585" />
                      <line x1="850" y1="40" x2="850" y2="585" />
                      <line x1="60" y1="150" x2="940" y2="150" />
                      <line x1="60" y1="475" x2="940" y2="475" />
                    </g>
                  </g>
                )}

                {/* Solar Path & Glazing Vector */}
                {showSolarVector && (
                  <g>
                    <path
                      d="M 90 540 Q 500 80 910 540"
                      stroke="#D2AE78"
                      strokeOpacity="0.4"
                      strokeWidth="1.5"
                      strokeDasharray="8 6"
                      fill="none"
                    />
                    <circle
                      cx="500"
                      cy="310"
                      r="230"
                      stroke="#B8925A"
                      strokeOpacity="0.14"
                      strokeWidth="1"
                    />
                    <text
                      x="715"
                      y="245"
                      fill="#D2AE78"
                      fillOpacity="0.65"
                      fontFamily="monospace"
                      fontSize="10"
                      letterSpacing="1.5"
                    >
                      SOLAR SOLSTICE AZIMUTH 142.6°
                    </text>
                  </g>
                )}

                {/* Acoustic Contours */}
                {showAcousticZones && (
                  <g stroke="#EAC083" strokeOpacity="0.28" strokeWidth="1" fill="#B8925A" fillOpacity="0.04">
                    <ellipse cx="520" cy="300" rx="220" ry="120" />
                    <ellipse cx="520" cy="300" rx="145" ry="75" />
                    <ellipse cx="260" cy="320" rx="95" ry="85" />
                  </g>
                )}

                {/* Drawing Mode Geometry */}
                {drawingMode === 'plan' && (
                  <g>
                    {/* Outer Basalt Plinth Boundary */}
                    <rect
                      x="110"
                      y="110"
                      width="780"
                      height="405"
                      stroke="#F4EFE8"
                      strokeOpacity="0.35"
                      strokeWidth="1.5"
                    />
                    {/* Reflecting Water Basin Hatch */}
                    <rect
                      x="130"
                      y="130"
                      width="210"
                      height="365"
                      fill="#B8925A"
                      fillOpacity="0.05"
                      stroke="#B8925A"
                      strokeOpacity="0.4"
                      strokeWidth="1"
                    />
                    {/* Thick Load-Bearing Core Walls */}
                    <rect
                      x="350"
                      y="150"
                      width="490"
                      height="325"
                      fill="#12151B"
                      stroke="#F4EFE8"
                      strokeWidth="3"
                    />
                    {/* Internal Partition Divisions & Door Swings */}
                    <line x1="650" y1="150" x2="650" y2="415" stroke="#F4EFE8" strokeWidth="2.5" />
                    <path
                      d="M 650 415 A 45 45 0 0 1 695 460"
                      stroke="#B8925A"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    <line x1="650" y1="415" x2="695" y2="415" stroke="#D2AE78" strokeWidth="1.5" />

                    {/* Sunken Courtyard / Oculus in Plan */}
                    <rect
                      x="430"
                      y="220"
                      width="155"
                      height="180"
                      stroke="#D2AE78"
                      strokeWidth="1.5"
                      fill="#B8925A"
                      fillOpacity="0.06"
                    />
                    <line x1="430" y1="220" x2="585" y2="400" stroke="#B8925A" strokeOpacity="0.25" />
                    <line x1="585" y1="220" x2="430" y2="400" stroke="#B8925A" strokeOpacity="0.25" />

                    {/* Structural Column Grid Dots */}
                    {[150, 350, 500, 650, 840].map((cx) =>
                      [150, 312, 475].map((cy) => (
                        <rect
                          key={`col-${cx}-${cy}`}
                          x={cx - 4}
                          y={cy - 4}
                          width="8"
                          height="8"
                          fill="#D2AE78"
                        />
                      ))
                    )}

                    {/* Dimension Lines */}
                    <g stroke="#9B8F81" strokeWidth="1" fill="#D2AE78" fontFamily="monospace" fontSize="11">
                      <line x1="110" y1="555" x2="890" y2="555" />
                      <line x1="110" y1="548" x2="110" y2="562" />
                      <line x1="350" y1="548" x2="350" y2="562" />
                      <line x1="650" y1="548" x2="650" y2="562" />
                      <line x1="890" y1="548" x2="890" y2="562" />
                      <text x="215" y="546" stroke="none">18,400 mm</text>
                      <text x="485" y="546" stroke="none">24,000 mm</text>
                      <text x="755" y="546" stroke="none">16,200 mm</text>
                    </g>
                  </g>
                )}

                {drawingMode === 'section' && (
                  <g>
                    {/* Ground Datum Line */}
                    <line x1="60" y1="440" x2="940" y2="440" stroke="#F4EFE8" strokeWidth="2.5" />
                    {/* Cantilevered Roof Truss */}
                    <rect
                      x="130"
                      y="185"
                      width="730"
                      height="52"
                      fill="#B8925A"
                      fillOpacity="0.14"
                      stroke="#D2AE78"
                      strokeWidth="2"
                    />
                    <polyline
                      points="130,237 190,185 250,237 310,185 370,237 430,185 490,237 550,185 610,237 670,185 730,237 790,185 860,237"
                      stroke="#B8925A"
                      strokeWidth="1.2"
                      fill="none"
                    />
                    {/* Glazing & Interior Columns */}
                    <line x1="340" y1="237" x2="340" y2="440" stroke="#F4EFE8" strokeWidth="4" />
                    <line x1="640" y1="237" x2="640" y2="440" stroke="#F4EFE8" strokeWidth="4" />
                    <line x1="830" y1="237" x2="830" y2="440" stroke="#D2AE78" strokeWidth="1.5" />
                    {/* Subterranean Archive Vault */}
                    <rect
                      x="340"
                      y="440"
                      width="490"
                      height="115"
                      fill="#12151B"
                      stroke="#B8925A"
                      strokeWidth="1.5"
                    />
                    <text
                      x="135"
                      y="168"
                      fill="#D2AE78"
                      fontFamily="monospace"
                      fontSize="11"
                    >
                      ROOF PARAPET EL. +08.40M // POST-TENSIONED CANTILEVER
                    </text>
                    <text
                      x="360"
                      y="510"
                      fill="#F4EFE8"
                      fillOpacity="0.7"
                      fontFamily="monospace"
                      fontSize="11"
                    >
                      SUBTERRANEAN ARCHIVE VAULT EL. -04.20M
                    </text>
                  </g>
                )}

                {drawingMode === 'axonometric' && (
                  <g>
                    {/* Isometric Plinth Plane */}
                    <polygon
                      points="500,490 160,330 500,170 840,330"
                      fill="#12151B"
                      stroke="#F4EFE8"
                      strokeOpacity="0.45"
                      strokeWidth="1.5"
                    />
                    {/* Isometric Structural Core */}
                    <polygon
                      points="520,420 310,320 520,220 730,320"
                      fill="#B8925A"
                      fillOpacity="0.12"
                      stroke="#B8925A"
                      strokeWidth="1.5"
                    />
                    {/* Floating Isometric Roof Plane */}
                    <polygon
                      points="480,310 140,150 480,45 820,205"
                      fill="#D2AE78"
                      fillOpacity="0.16"
                      stroke="#D2AE78"
                      strokeWidth="2"
                    />
                    {/* Vertical Projection Vectors */}
                    <g stroke="#B8925A" strokeDasharray="4 4" strokeWidth="1">
                      <line x1="160" y1="330" x2="140" y2="150" />
                      <line x1="500" y1="490" x2="480" y2="310" />
                      <line x1="840" y1="330" x2="820" y2="205" />
                    </g>
                    <text
                      x="165"
                      y="565"
                      fill="#D2AE78"
                      fontFamily="monospace"
                      fontSize="11"
                    >
                      EXPLODED TECTONIC AXONOMETRIC // SEISMIC ISOLATION &amp; ROOF SLAB
                    </text>
                  </g>
                )}
              </svg>

              {/* Interactive Zone Pins Overlay */}
              {selectedProject.zones.map((zone) => {
                const isSelected = activeZone?.id === zone.id;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setActiveZoneId(zone.id)}
                    style={{ left: `${zone.xPercent}%`, top: `${zone.yPercent}%` }}
                    className={`-translate-x-1/2 -translate-y-1/2 absolute px-2.5 py-1 border transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#B8925A] text-[#0E1116] border-[#F4EFE8] scale-105 shadow-[0_0_25px_rgba(184,146,90,0.6)] z-20'
                        : 'bg-[#0E1116]/90 text-[#D2AE78] border-[#B8925A]/60 hover:border-[#D2AE78] z-10'
                    }`}
                  >
                    <span className="label-mono font-semibold">{zone.code}</span>
                    <span className="text-[11px] font-medium hidden sm:inline whitespace-nowrap">
                      {zone.name}
                    </span>
                  </button>
                );
              })}

              {/* Bottom Left North Arrow & Scale Bar */}
              <div className="absolute bottom-3 left-4 flex items-center gap-4 bg-[#0E1116]/85 px-3 py-1.5 border border-[rgba(244,239,232,0.1)]">
                <div className="flex items-center gap-1.5 label-mono text-[#D2AE78]">
                  <Compass className="w-3.5 h-3.5" />
                  <span>N 00°00&apos;E</span>
                </div>
                <div className="h-3 w-[1px] bg-[rgba(244,239,232,0.15)]" />
                <div className="flex items-center gap-2 label-mono text-[rgba(244,239,232,0.65)]">
                  <Ruler className="w-3.5 h-3.5 text-[#B8925A]" />
                  <span>0m ─── 5m ─── 15m</span>
                </div>
              </div>
            </div>

            {/* Viewport Footer: Zone Selector Pills & Monograph Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-4 border-t border-[rgba(244,239,232,0.06)]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="label-caps text-[rgba(244,239,232,0.45)] mr-2">
                  INSPECT SPATIAL ZONE:
                </span>
                {selectedProject.zones.map((z) => (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => setActiveZoneId(z.id)}
                    className={`px-3 py-1 rounded-[4px] label-caps transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      activeZone?.id === z.id
                        ? 'bg-[rgba(184,146,90,0.2)] border border-[#D2AE78] text-[#F4EFE8]'
                        : 'bg-[rgba(184,146,90,0.06)] border border-[rgba(184,146,90,0.2)] text-[#D2AE78] hover:border-[#D2AE78]'
                    }`}
                  >
                    {z.code} · {z.name}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onOpenMonographModal(selectedProject)}
                className="flex items-center gap-2 px-4 py-2 rounded-[8px] border border-[rgba(184,146,90,0.4)] text-[#F4EFE8] hover:border-[#D2AE78] hover:bg-[rgba(184,146,90,0.06)] label-caps transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#B8925A]" />
                Open Full Monograph Plate
              </button>
            </div>
          </div>

          {/* Right 4 Columns: Blueprint & Plan Data Lists (Crisp 0px Matrix inside 16px Card) */}
          <div className="lg:col-span-4 bg-[#171B23] rounded-[16px] border border-[rgba(244,239,232,0.08)] p-6 flex flex-col justify-between">
            <div>
              {/* Active Zone Callout Box (0px Drafted Matrix) */}
              {activeZone && (
                <div className="bg-[#0E1116] rounded-none border border-[rgba(184,146,90,0.3)] p-5 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="label-caps text-[#B8925A]">
                      ACTIVE NODE // {activeZone.code}
                    </span>
                    <span className="label-mono text-[#F4EFE8] bg-[rgba(184,146,90,0.12)] px-2 py-0.5 border border-[rgba(184,146,90,0.25)]">
                      {activeZone.areaSqm} m²
                    </span>
                  </div>
                  <h3 className="font-serif-editorial text-xl text-[#F4EFE8] mb-2">
                    {activeZone.name}
                  </h3>
                  <p className="font-sans-body font-light text-[13px] leading-[20px] text-[rgba(244,239,232,0.65)] mb-4">
                    {activeZone.description}
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[rgba(244,239,232,0.06)]">
                    <div>
                      <div className="label-caps text-[rgba(244,239,232,0.4)] text-[9px]">
                        DATUM HEIGHT
                      </div>
                      <div className="label-mono text-[#F4EFE8] mt-1">
                        +{activeZone.ceilingHeightM.toFixed(1)}m
                      </div>
                    </div>
                    <div>
                      <div className="label-caps text-[rgba(244,239,232,0.4)] text-[9px]">
                        DAYLIGHT
                      </div>
                      <div className="label-mono text-[#D2AE78] mt-1">
                        {activeZone.daylightFactor}
                      </div>
                    </div>
                    <div>
                      <div className="label-caps text-[rgba(244,239,232,0.4)] text-[9px]">
                        ACOUSTICS
                      </div>
                      <div className="label-mono text-[#F4EFE8] mt-1">
                        {activeZone.acousticRating}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Blueprint & Plan Data Lists (Exact Spec: Horizontal rows separated by 1px rgba(244,239,232,0.06)) */}
              <div className="mb-3 flex items-center justify-between">
                <span className="label-caps text-[rgba(244,239,232,0.5)]">
                  ARCHITECTURAL SCHEDULE
                </span>
                <Layers className="w-3.5 h-3.5 text-[#B8925A]" />
              </div>

              <div className="rounded-none border-t border-[rgba(244,239,232,0.06)]">
                {selectedProject.parameters.map((param) => (
                  <div
                    key={param.label}
                    className="flex items-center justify-between gap-4 py-3.5 border-b border-[rgba(244,239,232,0.06)]"
                  >
                    <span className="label-caps text-[rgba(244,239,232,0.55)]">
                      {param.label}
                    </span>
                    <span
                      className={`label-mono text-right ${
                        param.highlight ? 'text-[#B8925A]' : 'text-[#F4EFE8]'
                      }`}
                    >
                      {param.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Attributable Institutional Proof Quote */}
            <div className="mt-6 pt-5 border-t border-[rgba(244,239,232,0.08)]">
              <p className="font-serif-editorial italic text-[14px] leading-[22px] text-[rgba(244,239,232,0.85)] mb-3">
                &ldquo;{selectedProject.leadCuratorQuote.quote}&rdquo;
              </p>
              <div className="text-[12px] text-[rgba(244,239,232,0.55)]">
                <span className="text-[#D2AE78] font-medium">
                  {selectedProject.leadCuratorQuote.author}
                </span>
                <span aria-hidden="true"> · </span>
                <span>{selectedProject.leadCuratorQuote.role}</span>
                <span aria-hidden="true"> · </span>
                <span>{selectedProject.leadCuratorQuote.institution}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
