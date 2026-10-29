import React, { useState } from 'react';
import { MATERIAL_SPECIMENS, MaterialSpecimen } from '../data/architecturalData';
import { ArrowUpRight, Check } from 'lucide-react';

interface MaterialitySectionProps {
  selectedMaterialsForBrief: string[];
  onToggleMaterialInBrief: (materialName: string) => void;
}

export const MaterialitySection: React.FC<MaterialitySectionProps> = ({
  selectedMaterialsForBrief,
  onToggleMaterialInBrief,
}) => {
  const [activeSpecimen, setActiveSpecimen] = useState<MaterialSpecimen>(MATERIAL_SPECIMENS[0]);
  const [patinaStage, setPatinaStage] = useState<'year0' | 'year10' | 'year50'>('year10');

  const currentPatina = activeSpecimen.patinaTimeline[patinaStage];
  const isIncludedInCommission = selectedMaterialsForBrief.includes(activeSpecimen.name);

  return (
    <section
      id="materiality"
      className="w-full bg-[#F4EFE8] text-[#0E1116] border-b border-[rgba(14,17,22,0.08)] py-20 lg:py-28"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[rgba(14,17,22,0.08)]">
          <div>
            <div className="label-caps text-[#785926] mb-4">
              03 / TECTONIC MATERIALITY &amp; WEATHERING ARCHIVE
            </div>
            <h2
              className="font-serif-editorial text-3xl md:text-5xl font-normal tracking-[-0.015em] text-[#0E1116]"
              style={{ textWrap: 'balance' }}
            >
              Enduring Matter &amp; Fifty-Year Patina
            </h2>
          </div>
          <p className="font-sans-body font-light text-[15px] leading-[24px] text-[rgba(14,17,22,0.70)] max-w-xl">
            Every ARCOVA commission rejects synthetic coatings in favor of raw quarry stone,
            kiln-charred timber, and non-ferrous alloys that gain mineral depth across decades.
          </p>
        </div>

        {/* 12-Column Specimen Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-stretch">
          {/* Left 5 Columns: Specimen Index List */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {MATERIAL_SPECIMENS.map((spec) => {
              const isSelected = spec.id === activeSpecimen.id;
              const isPinned = selectedMaterialsForBrief.includes(spec.name);
              return (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => setActiveSpecimen(spec)}
                  className={`w-full text-left p-6 rounded-[16px] border transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFFFFF] border-[#B8925A] shadow-[0_20px_40px_-15px_rgba(14,17,22,0.08)]'
                      : 'bg-transparent border-[rgba(14,17,22,0.08)] hover:border-[rgba(184,146,90,0.45)] hover:bg-[#FFFFFF]/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] uppercase text-[#785926]">
                      <span>{spec.code}</span>
                      <span aria-hidden="true">·</span>
                      <span>{spec.category}</span>
                    </div>
                    {isPinned && (
                      <span className="label-caps text-[#785926] flex items-center gap-1">
                        <Check className="w-3 h-3" /> In Brief
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif-editorial text-[22px] leading-[30px] font-medium text-[#0E1116] mb-1">
                    {spec.name}
                  </h3>
                  <p className="font-sans-body font-light text-[13px] text-[rgba(14,17,22,0.65)]">
                    Quarry Provenance: {spec.originQuarry}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right 7 Columns: Cream Elevated Plate (#FFFFFF) Specimen Inspection Dossier */}
          <div className="lg:col-span-7 bg-[#FFFFFF] rounded-[16px] border border-[rgba(14,17,22,0.08)] p-8 lg:p-10 flex flex-col justify-between shadow-[0_20px_40px_-15px_rgba(14,17,22,0.07)]">
            <div>
              {/* Top Specimen Metadata Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[rgba(14,17,22,0.08)]">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[#785926] font-semibold mb-1">
                    SPECIMEN PLATE // {activeSpecimen.code}
                  </div>
                  <h3 className="font-serif-editorial text-2xl md:text-3xl text-[#0E1116]">
                    {activeSpecimen.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleMaterialInBrief(activeSpecimen.name)}
                  className={`px-5 py-2.5 rounded-[8px] label-caps transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 ${
                    isIncludedInCommission
                      ? 'bg-[#0E1116] text-[#F4EFE8] border border-[#0E1116]'
                      : 'bg-[#B8925A] text-[#0E1116] hover:bg-[#D2AE78]'
                  }`}
                >
                  {isIncludedInCommission ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#D2AE78]" />
                      Added to Commission Brief
                    </>
                  ) : (
                    <>
                      Specify in Commission Dossier
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Visual Swatch & Patina Chronology Interactive Simulator */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-8 items-stretch">
                {/* Texture Swatch Image with Dynamic Patina Overlay */}
                <div className="md:col-span-6 relative rounded-[12px] overflow-hidden border border-[rgba(14,17,22,0.12)] min-h-[220px] bg-[#12151B]">
                  <img
                    src={activeSpecimen.textureSvgUri}
                    alt={`${activeSpecimen.name} surface grain specimen`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div
                    className="absolute inset-0 mix-blend-multiply transition-colors duration-300"
                    style={{ backgroundColor: currentPatina.hex, opacity: 0.45 }}
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-[#0E1116]/90 text-[#F4EFE8] p-3 border border-[rgba(244,239,232,0.12)]">
                    <div className="flex items-center justify-between">
                      <span className="label-caps text-[#D2AE78]">{currentPatina.label}</span>
                      <span className="label-mono text-[rgba(244,239,232,0.65)]">
                        {currentPatina.hex}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Patina Aging Controls */}
                <div className="md:col-span-6 flex flex-col justify-between bg-[#F4EFE8]/70 p-5 border border-[rgba(14,17,22,0.08)]">
                  <div>
                    <div className="label-caps text-[#785926] mb-3">
                      CHRONOLOGICAL WEATHERING SIMULATION
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 bg-[#EBE4DA] p-1 rounded-[8px] mb-4">
                      {(
                        [
                          { id: 'year0', label: 'Year 00' },
                          { id: 'year10', label: 'Year 10' },
                          { id: 'year50', label: 'Year 50' },
                        ] as const
                      ).map((st) => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setPatinaStage(st.id)}
                          className={`py-2 rounded-[6px] label-caps transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                            patinaStage === st.id
                              ? 'bg-[#0E1116] text-[#F4EFE8] shadow-sm'
                              : 'text-[rgba(14,17,22,0.65)] hover:text-[#0E1116]'
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>

                    <p className="font-sans-body font-light text-[14px] leading-[22px] text-[rgba(14,17,22,0.80)]">
                      {currentPatina.note}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[rgba(14,17,22,0.08)]">
                    <div className="label-caps text-[rgba(14,17,22,0.45)] mb-1">
                      MILLING &amp; SURFACE PREPARATION
                    </div>
                    <div className="font-sans-body text-[13px] font-normal text-[#0E1116]">
                      {activeSpecimen.surfaceFinish}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantitative Physical Properties Matrix (0px Crisp Data Matrix) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-l border-[rgba(14,17,22,0.08)]">
                <div className="p-4 border-r border-b border-[rgba(14,17,22,0.08)]">
                  <div className="label-caps text-[rgba(14,17,22,0.45)]">BULK DENSITY</div>
                  <div className="font-mono-tabular text-xl font-medium text-[#0E1116] mt-1.5">
                    {activeSpecimen.densityKgM3.toLocaleString()}{' '}
                    <span className="text-xs text-[rgba(14,17,22,0.55)]">kg/m³</span>
                  </div>
                </div>
                <div className="p-4 border-r border-b border-[rgba(14,17,22,0.08)]">
                  <div className="label-caps text-[rgba(14,17,22,0.45)]">THERMAL MASS</div>
                  <div className="font-mono-tabular text-xl font-medium text-[#785926] mt-1.5">
                    {activeSpecimen.thermalMassKj.toLocaleString()}{' '}
                    <span className="text-xs text-[rgba(14,17,22,0.55)]">kJ/m³K</span>
                  </div>
                </div>
                <div className="p-4 border-r border-b border-[rgba(14,17,22,0.08)]">
                  <div className="label-caps text-[rgba(14,17,22,0.45)]">ACOUSTIC NRC</div>
                  <div className="font-mono-tabular text-xl font-medium text-[#0E1116] mt-1.5">
                    {activeSpecimen.acousticNrc.toFixed(2)}{' '}
                    <span className="text-xs text-[rgba(14,17,22,0.55)]">coeff</span>
                  </div>
                </div>
                <div className="p-4 border-r border-b border-[rgba(14,17,22,0.08)]">
                  <div className="label-caps text-[rgba(14,17,22,0.45)]">COMPRESSION</div>
                  <div className="font-mono-tabular text-xl font-medium text-[#0E1116] mt-1.5">
                    {activeSpecimen.compressiveStrengthMpa}{' '}
                    <span className="text-xs text-[rgba(14,17,22,0.55)]">MPa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Application Note */}
            <div className="mt-6 pt-4 border-t border-[rgba(14,17,22,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[13px] text-[rgba(14,17,22,0.70)]">
              <span>
                <strong className="font-medium text-[#0E1116]">Tectonic Deployment:</strong>{' '}
                {activeSpecimen.architecturalApplication}
              </span>
              <span className="label-mono text-[#785926] shrink-0">
                QUARRY VERIFIED · ISO 14025 EPD
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
