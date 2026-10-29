import React, { useState, useEffect } from 'react';
import { X, Compass, ArrowRight, Eye, Layers } from 'lucide-react';
import { MonographProject } from '../data/architecturalData';

interface MonographModalProps {
  project: MonographProject | null;
  onClose: () => void;
  onLoadInFloorplanWorkbench: (project: MonographProject) => void;
}

export const MonographModal: React.FC<MonographModalProps> = ({
  project,
  onClose,
  onLoadInFloorplanWorkbench,
}) => {
  const [viewMode, setViewMode] = useState<'render' | 'elevation'>('render');

  useEffect(() => {
    setViewMode('render');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#0E1116]/90 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-monograph-title"
    >
      <div className="relative w-full max-w-[1180px] bg-[#171B23] text-[#F4EFE8] rounded-[24px] border border-[rgba(184,146,90,0.35)] shadow-specimen overflow-hidden my-auto">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between gap-4 px-6 sm:px-10 py-5 bg-[#12151B] border-b border-[rgba(244,239,232,0.08)]">
          <div className="flex items-center gap-3 text-xs text-[rgba(244,239,232,0.65)]">
            <span className="label-caps text-[#D2AE78]">
              MONOGRAPH FOLIO NO. {project.monographNo}
            </span>
            <span aria-hidden="true">·</span>
            <span className="label-mono">{project.accessionCode}</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">{project.coordinates}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[#0E1116] p-1 rounded-[8px] border border-[rgba(244,239,232,0.08)]">
              <button
                type="button"
                onClick={() => setViewMode('render')}
                className={`px-3 py-1 rounded-[6px] label-caps flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                  viewMode === 'render'
                    ? 'bg-[#B8925A] text-[#0E1116]'
                    : 'text-[rgba(244,239,232,0.6)] hover:text-[#F4EFE8]'
                }`}
              >
                <Eye className="w-3 h-3" /> Plate View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('elevation')}
                className={`px-3 py-1 rounded-[6px] label-caps flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                  viewMode === 'elevation'
                    ? 'bg-[#B8925A] text-[#0E1116]'
                    : 'text-[rgba(244,239,232,0.6)] hover:text-[#F4EFE8]'
                }`}
              >
                <Layers className="w-3 h-3" /> Section Elevation
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close monograph modal"
              className="w-9 h-9 rounded-[8px] border border-[rgba(244,239,232,0.15)] hover:border-[#D2AE78] flex items-center justify-center text-[#F4EFE8] hover:text-[#D2AE78] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 max-h-[82vh] overflow-y-auto">
          {/* High-Resolution Viewport */}
          <div className="relative w-full aspect-[16/9] bg-[#0E1116] rounded-[16px] overflow-hidden border border-[rgba(244,239,232,0.1)] mb-3">
            <img
              src={viewMode === 'render' ? project.imageSvgDataUri : project.elevationSvgDataUri}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-[#0E1116]/85 px-3.5 py-1.5 border border-[rgba(244,239,232,0.12)] label-caps text-[#D2AE78]">
              EST. {project.year} / {project.typologyShort} / {project.location}
            </div>
          </div>
          <p className="font-serif-editorial italic text-xs text-[rgba(244,239,232,0.55)] mb-8">
            {project.figureCaption}
          </p>

          {/* 12-Column Monograph Essay & Accession Data */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Columns: Editorial Narrative with Drop Cap */}
            <div className="lg:col-span-7">
              <div className="label-caps text-[#B8925A] mb-2">
                {project.typology} · {project.country}
              </div>
              <h2
                id="modal-monograph-title"
                className="font-serif-editorial text-3xl sm:text-4xl text-[#F4EFE8] mb-3"
              >
                {project.title}
              </h2>
              <p className="font-serif-editorial italic text-lg text-[rgba(244,239,232,0.75)] mb-6 pb-6 border-b border-[rgba(244,239,232,0.08)]">
                {project.subtitle}
              </p>

              <p className="font-sans-body font-light text-[16px] leading-[28px] text-[#F4EFE8] mb-5 first-letter:text-5xl first-letter:font-serif-editorial first-letter:text-[#D2AE78] first-letter:float-left first-letter:mr-3.5 first-letter:leading-none">
                {project.narrativeLead}
              </p>
              <p className="font-sans-body font-light text-[15px] leading-[26px] text-[rgba(244,239,232,0.70)] mb-8">
                {project.narrativeBody}
              </p>

              {/* Curatorial Pull Quote */}
              <blockquote className="py-5 border-t border-b border-[rgba(184,146,90,0.25)] my-6">
                <p className="font-serif-editorial italic text-lg text-[#F4EFE8] mb-2">
                  &ldquo;{project.leadCuratorQuote.quote}&rdquo;
                </p>
                <footer className="text-xs text-[rgba(244,239,232,0.6)]">
                  <span className="text-[#D2AE78] font-medium">
                    {project.leadCuratorQuote.author}
                  </span>{' '}
                  · {project.leadCuratorQuote.role}, {project.leadCuratorQuote.institution}
                </footer>
              </blockquote>
            </div>

            {/* Right 5 Columns: Accession Metadata & Blueprint Schedule */}
            <div className="lg:col-span-5 bg-[#12151B] p-6 border border-[rgba(244,239,232,0.08)]">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(244,239,232,0.08)]">
                <span className="label-caps text-[#D2AE78]">ACCESSION &amp; TECTONIC DATA</span>
                <Compass className="w-4 h-4 text-[#B8925A]" />
              </div>

              <dl className="divide-y divide-[rgba(244,239,232,0.06)]">
                {project.parameters.map((param) => (
                  <div key={param.label} className="py-3 flex items-center justify-between gap-4">
                    <dt className="label-caps text-[rgba(244,239,232,0.5)]">{param.label}</dt>
                    <dd
                      className={`label-mono text-right ${
                        param.highlight ? 'text-[#B8925A]' : 'text-[#F4EFE8]'
                      }`}
                    >
                      {param.value}
                    </dd>
                  </div>
                ))}
                <div className="py-3 flex items-center justify-between gap-4">
                  <dt className="label-caps text-[rgba(244,239,232,0.5)]">EMBODIED CARBON</dt>
                  <dd className="label-mono text-[#D2AE78]">
                    {project.embodiedCarbonKgM2} kgCO₂e/m²
                  </dd>
                </div>
                <div className="py-3 flex items-center justify-between gap-4">
                  <dt className="label-caps text-[rgba(244,239,232,0.5)]">DAYLIGHT AUTONOMY</dt>
                  <dd className="label-mono text-[#F4EFE8]">{project.daylightAutonomy}</dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={() => {
                  onLoadInFloorplanWorkbench(project);
                  onClose();
                }}
                className="w-full mt-6 px-6 py-3.5 rounded-[8px] bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] label-caps font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Inspect in CAD Floorplan Workbench</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
