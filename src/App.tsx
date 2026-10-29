/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowUpRight,
  Compass,
  Grid,
  List,
  Maximize2,
  Sun,
  Layers,
  Eye,
  Phone,
  MapPin,
} from 'lucide-react';
import {
  MONOGRAPH_PROJECTS,
  MonographProject,
  createHeroArchitecturalSvg,
  createDraftedElevationSvg,
} from './data/architecturalData';
import { MeezanRealEstateHub } from './components/MeezanRealEstateHub';
import { BlueprintWorkbench } from './components/BlueprintWorkbench';
import { MaterialitySection } from './components/MaterialitySection';
import { CommissionAtelierSection } from './components/CommissionAtelierSection';
import { MonographModal } from './components/MonographModal';

type TypologyFilter =
  | 'All Works'
  | 'Cultural & Museum'
  | 'Private Residences'
  | 'Sacred & Sanctuary'
  | 'Alpine & Coastal';

export default function App() {
  // Hero interactive state
  const [heroLighting, setHeroLighting] = useState<'dawn' | 'noon' | 'dusk'>('dusk');
  const [heroViewportMode, setHeroViewportMode] = useState<'render' | 'elevation'>('render');

  // Portfolio section interactive state
  const [activeFilter, setActiveFilter] = useState<TypologyFilter>('All Works');
  const [catalogViewMode, setCatalogViewMode] = useState<'grid' | 'table'>('grid');

  // Blueprint Workbench state
  const [selectedBlueprintProject, setSelectedBlueprintProject] = useState<MonographProject>(
    MONOGRAPH_PROJECTS[0]
  );

  // Commission Material Palette state
  const [selectedBriefMaterials, setSelectedBriefMaterials] = useState<string[]>([
    'Vein-Cut Roman Travertine',
    'Sulphur-Patinated Architectural Bronze',
  ]);

  // Modal Lightbox state
  const [modalProject, setModalProject] = useState<MonographProject | null>(null);

  const filteredProjects =
    activeFilter === 'All Works'
      ? MONOGRAPH_PROJECTS
      : MONOGRAPH_PROJECTS.filter((p) => p.typology === activeFilter);

  const handleToggleMaterialInBrief = (materialName: string) => {
    setSelectedBriefMaterials((prev) =>
      prev.includes(materialName)
        ? prev.filter((m) => m !== materialName)
        : [...prev, materialName]
    );
  };

  const handleLoadInFloorplanWorkbench = (project: MonographProject) => {
    setSelectedBlueprintProject(project);
    const el = document.getElementById('floorplans');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroPhotos = {
    dawn: '/src/assets/images/faisalabad_millat_town_1kanal_house_1793278029540.jpg',
    noon: '/src/assets/images/faisalabad_clock_tower_aerial_1793278027054.jpg',
    dusk: '/src/assets/images/faisalabad_millat_road_commercial_plaza_1793278028817.jpg',
  };

  const heroImageUri =
    heroViewportMode === 'render'
      ? heroPhotos[heroLighting]
      : createDraftedElevationSvg();

  return (
    <div className="min-h-screen bg-[#0E1116] text-[#F4EFE8] flex flex-col">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 w-full bg-[#0E1116]/95 backdrop-blur-md border-b border-[rgba(244,239,232,0.08)]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-serif-editorial text-xl sm:text-2xl tracking-[0.12em] text-[#F4EFE8] whitespace-nowrap shrink-0"
          >
            MEEZAN REAL ESTATE
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary Atelier Navigation"
            className="hidden md:flex items-center gap-8"
          >
            <a
              href="#meezan-dossier"
              className="label-caps text-[rgba(244,239,232,0.65)] hover:text-[#D2AE78] transition-colors py-1 border-b border-transparent hover:border-[#B8925A] whitespace-nowrap shrink-0"
            >
              Overview &amp; Reviews
            </a>
            <a
              href="#monographs"
              className="label-caps text-[rgba(244,239,232,0.65)] hover:text-[#D2AE78] transition-colors py-1 border-b border-transparent hover:border-[#B8925A] whitespace-nowrap shrink-0"
            >
              Monographs
            </a>
            <a
              href="#floorplans"
              className="label-caps text-[rgba(244,239,232,0.65)] hover:text-[#D2AE78] transition-colors py-1 border-b border-transparent hover:border-[#B8925A] whitespace-nowrap shrink-0"
            >
              Floorplans
            </a>
            <a
              href="#materiality"
              className="label-caps text-[rgba(244,239,232,0.65)] hover:text-[#D2AE78] transition-colors py-1 border-b border-transparent hover:border-[#B8925A] whitespace-nowrap shrink-0"
            >
              Materiality
            </a>
            <a
              href="#atelier"
              className="label-caps text-[rgba(244,239,232,0.65)] hover:text-[#D2AE78] transition-colors py-1 border-b border-transparent hover:border-[#B8925A] whitespace-nowrap shrink-0"
            >
              Advisory Desk
            </a>
          </nav>

          {/* Zone 3: 1 Primary Bronze Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('meezan-dossier')}
              className="px-6 py-3 rounded-[8px] bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] label-caps font-bold transition-all shadow-[0_4px_20px_rgba(184,146,90,0.25)] cursor-pointer whitespace-nowrap shrink-0"
            >
              Call +92 300 7785625
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          PAVILION 01: DARK OBSIDIAN HERO VOID (#0E1116)
      ===================================================================== */}
      <main id="top" className="flex-1">
        <section className="w-full bg-[#0E1116] text-[#F4EFE8] pt-10 pb-20 lg:pt-16 lg:pb-24 border-b border-[rgba(244,239,232,0.08)]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
            {/* 12-Column Split-Screen Hero with items-stretch */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left 6 Columns: Editorial Hierarchy & Controls */}
              <div className="lg:col-span-6 flex flex-col justify-between py-2">
                <div>
                  {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
                  <div className="flex flex-wrap items-center gap-2.5 label-caps text-[#D2AE78] mb-6">
                    <span>COMMERCIAL REAL ESTATE AGENCY</span>
                    <span aria-hidden="true">/</span>
                    <span>5.0 ★ (10 REVIEWS)</span>
                    <span aria-hidden="true">/</span>
                    <span>OPEN 24 HOURS</span>
                  </div>

                  {/* Editorial Hero Headline */}
                  <h1
                    className="font-serif-editorial text-[40px] leading-[48px] sm:text-[54px] sm:leading-[62px] xl:text-[64px] xl:leading-[72px] font-normal tracking-[-0.02em] text-[#F4EFE8] mb-6"
                    style={{ textWrap: 'balance' }}
                  >
                    Meezan Real Estate &amp; Architectural Advisory.
                  </h1>

                  {/* Continuous Reading Body Copy */}
                  <p className="font-sans-body font-light text-[17px] leading-[29px] tracking-[0.01em] text-[rgba(244,239,232,0.65)] max-w-[60ch] mb-6">
                    Headquartered at{' '}
                    <span className="text-[#F4EFE8] font-normal">
                      Hassan Chok 60 Feet Road, Rafeeq Chouk, 308 C Millat Rd, Millat Town D Block,
                      Faisalabad
                    </span>{' '}
                    (Plus Code: <span className="font-mono-tabular text-[#D2AE78]">F4Q3+MC</span>).
                    Principal Advisor <span className="text-[#F4EFE8] font-normal">Mr. Muhammad Shahzad</span>{' '}
                    delivers trusted commercial property acquisitions, plot valuations, and
                    architectural monographs 24 hours a day.
                  </p>

                  {/* Operational Location & Direct Hotline Bar */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[rgba(244,239,232,0.75)] mb-9 pb-6 border-b border-[rgba(244,239,232,0.08)]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#B8925A]" />
                      308 C Millat Rd · Millat Town D Block · Faisalabad
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1.5 font-mono-tabular text-[#D2AE78]">
                      <Phone className="w-3.5 h-3.5 text-[#B8925A]" />
                      +92 300 7785625
                    </span>
                  </div>

                  {/* Primary Bronze Action + Secondary Ghost Outline */}
                  <div className="flex flex-wrap items-center gap-4 mb-12">
                    <button
                      type="button"
                      onClick={() => scrollToSection('meezan-dossier')}
                      className="px-8 py-3.5 rounded-[8px] bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] label-caps font-bold transition-all shadow-[0_4px_20px_rgba(184,146,90,0.25)] cursor-pointer whitespace-nowrap shrink-0"
                    >
                      View Reviews &amp; Directions
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection('floorplans')}
                      className="px-8 py-3.5 rounded-[8px] bg-transparent border border-[rgba(184,146,90,0.4)] hover:border-[#D2AE78] hover:bg-[rgba(184,146,90,0.06)] text-[#F4EFE8] label-caps transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Inspect 1:100 CAD Plans
                    </button>
                  </div>
                </div>

                {/* Interactive Featured Specimen Plate & Viewport Mode Controller */}
                <div className="pt-8 border-t border-[rgba(244,239,232,0.08)]">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="label-caps text-[rgba(244,239,232,0.45)] mb-2 flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5 text-[#B8925A]" />
                        <span>FAISALABAD REAL ESTATE PLATES // 308 C MILLAT RD</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#12151B] p-1 rounded-[8px] border border-[rgba(244,239,232,0.08)]">
                        {(
                          [
                            { id: 'dusk', label: '60ft Rd Commercial Plaza' },
                            { id: 'dawn', label: 'Millat Town 1-Kanal Kothi' },
                            { id: 'noon', label: 'Faisalabad Ghanta Ghar' },
                          ] as const
                        ).map((mode) => (
                          <button
                            key={mode.id}
                            type="button"
                            onClick={() => {
                              setHeroViewportMode('render');
                              setHeroLighting(mode.id);
                            }}
                            className={`px-3 py-1.5 rounded-[6px] label-caps transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                              heroViewportMode === 'render' && heroLighting === mode.id
                                ? 'bg-[#B8925A] text-[#0E1116]'
                                : 'text-[rgba(244,239,232,0.6)] hover:text-[#F4EFE8]'
                            }`}
                          >
                            {mode.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="label-caps text-[rgba(244,239,232,0.45)] mb-2">
                        DRAWING OVERLAY
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#12151B] p-1 rounded-[8px] border border-[rgba(244,239,232,0.08)]">
                        <button
                          type="button"
                          onClick={() => setHeroViewportMode('render')}
                          className={`px-3 py-1.5 rounded-[6px] label-caps flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                            heroViewportMode === 'render'
                              ? 'bg-[#171B23] text-[#D2AE78] border border-[rgba(184,146,90,0.4)]'
                              : 'text-[rgba(244,239,232,0.55)] hover:text-[#F4EFE8]'
                          }`}
                        >
                          <Eye className="w-3 h-3" /> Photo
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeroViewportMode('elevation')}
                          className={`px-3 py-1.5 rounded-[6px] label-caps flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                            heroViewportMode === 'elevation'
                              ? 'bg-[#171B23] text-[#D2AE78] border border-[rgba(184,146,90,0.4)]'
                              : 'text-[rgba(244,239,232,0.55)] hover:text-[#F4EFE8]'
                          }`}
                        >
                          <Layers className="w-3 h-3" /> 1:100 Section
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 6 Columns: Featured Specimen Viewport Card */}
              <div className="lg:col-span-6 flex flex-col">
                <div
                  onClick={() => setModalProject(MONOGRAPH_PROJECTS[0])}
                  className="group relative flex-1 min-h-[420px] lg:h-full bg-[#12151B] rounded-[16px] border border-[rgba(244,239,232,0.08)] hover:border-[rgba(184,146,90,0.40)] overflow-hidden flex flex-col justify-between shadow-specimen cursor-pointer transition-colors"
                >
                  {/* Image Container with Measured Scrim & Slow Zoom */}
                  <div className="relative flex-1 w-full overflow-hidden bg-[#0B0E13]">
                    <img
                      src={heroImageUri}
                      alt="Meezan Real Estate Commercial Arcade at 308 C Millat Rd, Millat Town D Block, Faisalabad"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover specimen-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1116] via-[#0E1116]/25 to-transparent" />

                    {/* Top Right Lightbox Affordance */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-[6px] bg-[#0E1116]/85 border border-[rgba(184,146,90,0.3)] label-caps text-[#D2AE78] flex items-center gap-1.5">
                      <Maximize2 className="w-3 h-3" />
                      <span>Inspect Flagship Dossier</span>
                    </div>
                  </div>

                  {/* Specimen Card Footer */}
                  <div className="p-6 bg-[#12151B] border-t border-[rgba(244,239,232,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="label-caps text-[#B8925A] mb-1">
                        FAISALABAD / 308 C MILLAT RD / MILLAT TOWN D BLOCK
                      </div>
                      <h2 className="font-serif-editorial text-xl text-[#F4EFE8]">
                        00. Meezan Commercial Arcade &amp; Advisory HQ
                      </h2>
                    </div>
                    <div className="label-mono text-[#D2AE78] shrink-0">
                      5.0 ★ (10) · F4Q3+MC
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Architectural Parameter Strip Below Hero Split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(244,239,232,0.08)] border border-[rgba(244,239,232,0.08)] mt-14">
              <div className="bg-[#0E1116] p-6">
                <div className="label-caps text-[rgba(244,239,232,0.45)]">
                  GOOGLE MAPS CLIENT RATING
                </div>
                <div className="font-mono-tabular text-3xl text-[#D2AE78] mt-2">
                  5.0 ★ <span className="text-base text-[#F4EFE8]">(10 Reviews)</span>
                </div>
                <div className="text-[13px] font-light text-[rgba(244,239,232,0.55)] mt-1">
                  100% 5-star rating for honest &amp; trustworthy commercial advisory
                </div>
              </div>

              <div className="bg-[#0E1116] p-6">
                <div className="label-caps text-[rgba(244,239,232,0.45)]">
                  PRINCIPAL REAL ESTATE ADVISOR
                </div>
                <div className="font-serif-editorial text-2xl text-[#F4EFE8] mt-2">
                  Mr. Muhammad Shahzad
                </div>
                <div className="text-[13px] font-light text-[rgba(244,239,232,0.55)] mt-1">
                  Direct 24-hour commercial &amp; plot hotline: +92 300 7785625
                </div>
              </div>

              <div className="bg-[#0E1116] p-6">
                <div className="label-caps text-[rgba(244,239,232,0.45)]">
                  PRIMARY COMMERCIAL CORRIDOR
                </div>
                <div className="font-mono-tabular text-2xl text-[#F4EFE8] mt-2">
                  60 Feet Rd <span className="text-sm text-[#B8925A]">· Millat Town</span>
                </div>
                <div className="text-[13px] font-light text-[rgba(244,239,232,0.55)] mt-1">
                  Hassan Chok, Rafeeq Chouk &amp; 308 C Millat Rd, D Block
                </div>
              </div>

              <div className="bg-[#0E1116] p-6">
                <div className="label-caps text-[rgba(244,239,232,0.45)]">
                  PLUS CODE &amp; HOURS
                </div>
                <div className="font-mono-tabular text-2xl text-[#D2AE78] mt-2">
                  F4Q3+MC <span className="text-sm text-[#F4EFE8]">· 24 Hours</span>
                </div>
                <div className="text-[13px] font-light text-[rgba(244,239,232,0.55)] mt-1">
                  Open 24 hours daily in Faisalabad, Pakistan
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            PAVILION 01B: MEEZAN REAL ESTATE OFFICIAL MAPS & REVIEWS HUB (#12151B)
        ===================================================================== */}
        <MeezanRealEstateHub />

        {/* =====================================================================
            PAVILION 02: GALLERY CREAM LIMESTONE PORTFOLIO (#F4EFE8)
        ===================================================================== */}
        <section
          id="monographs"
          className="w-full bg-[#F4EFE8] text-[#0E1116] py-20 lg:py-28 border-b border-[rgba(14,17,22,0.08)]"
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[rgba(14,17,22,0.08)]">
              <div>
                <div className="label-caps text-[#785926] mb-4">
                  01 / SELECTED ARCHITECTURAL &amp; COMMERCIAL MONOGRAPHS
                </div>
                <h2
                  className="font-serif-editorial text-3xl md:text-5xl font-normal tracking-[-0.015em] text-[#0E1116]"
                  style={{ textWrap: 'balance' }}
                >
                  Built Works &amp; Commercial Holdings
                </h2>
              </div>

              <p className="font-sans-body font-light text-[15px] leading-[24px] text-[rgba(14,17,22,0.70)] max-w-xl">
                Each work is documented as a complete tectonic monograph. Select any project to
                inspect high-resolution plates, curatorial essays, or load its 1:100 CAD plan into
                the workbench below.
              </p>
            </div>

            {/* Interactive Filter Bar & Catalog Mode Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-b border-[rgba(14,17,22,0.08)] mb-12">
              <div className="flex flex-wrap items-center gap-2" role="tablist">
                {(
                  [
                    'All Works',
                    'Cultural & Museum',
                    'Private Residences',
                    'Sacred & Sanctuary',
                    'Alpine & Coastal',
                  ] as TypologyFilter[]
                ).map((cat) => {
                  const isActive = activeFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveFilter(cat)}
                      className={`px-4 py-2 rounded-[8px] label-caps transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-[#0E1116] text-[#F4EFE8]'
                          : 'bg-transparent text-[rgba(14,17,22,0.65)] border border-[rgba(14,17,22,0.12)] hover:border-[#B8925A] hover:text-[#0E1116]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center gap-1.5 bg-[#E6DFD5] p-1 rounded-[8px]">
                <button
                  type="button"
                  onClick={() => setCatalogViewMode('grid')}
                  className={`px-3 py-1.5 rounded-[6px] label-caps flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                    catalogViewMode === 'grid'
                      ? 'bg-[#FFFFFF] text-[#0E1116] shadow-xs'
                      : 'text-[rgba(14,17,22,0.6)] hover:text-[#0E1116]'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" /> Folio Plates
                </button>
                <button
                  type="button"
                  onClick={() => setCatalogViewMode('table')}
                  className={`px-3 py-1.5 rounded-[6px] label-caps flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                    catalogViewMode === 'table'
                      ? 'bg-[#FFFFFF] text-[#0E1116] shadow-xs'
                      : 'text-[rgba(14,17,22,0.6)] hover:text-[#0E1116]'
                  }`}
                >
                  <List className="w-3.5 h-3.5" /> Archival Index
                </button>
              </div>
            </div>

            {/* Catalog View Mode 1: Monograph Folio Grid */}
            {catalogViewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {filteredProjects.map((project) => {
                  const colSpanClass =
                    project.featuredSpan === 'wide' && activeFilter === 'All Works'
                      ? 'md:col-span-7'
                      : activeFilter === 'All Works'
                      ? 'md:col-span-5'
                      : 'md:col-span-6';

                  return (
                    <article
                      key={project.id}
                      className={`${colSpanClass} group bg-[#FFFFFF] rounded-[16px] border border-[rgba(14,17,22,0.08)] hover:border-[rgba(184,146,90,0.45)] overflow-hidden flex flex-col justify-between transition-all duration-200 shadow-[0_20px_40px_-15px_rgba(14,17,22,0.06)]`}
                    >
                      <div>
                        {/* Internal Image Container with Slow Zoom on Hover */}
                        <div
                          onClick={() => setModalProject(project)}
                          className="relative aspect-[16/10] w-full bg-[#12151B] overflow-hidden cursor-pointer"
                        >
                          <img
                            src={project.imageSvgDataUri}
                            alt={`${project.title} in ${project.location}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover specimen-zoom"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1116]/60 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4 label-mono text-[#F4EFE8] bg-[#0E1116]/80 px-2.5 py-1 border border-[rgba(244,239,232,0.15)]">
                            NO. {project.monographNo} · {project.accessionCode}
                          </div>
                        </div>

                        {/* Card Editorial Body */}
                        <div className="p-7">
                          {/* Quiet Unboxed Metadata Index */}
                          <div className="label-caps text-[#785926] mb-2">
                            EST. {project.year} / {project.typologyShort} / {project.location}
                          </div>

                          <h3 className="font-serif-editorial text-2xl sm:text-[26px] leading-[34px] font-medium text-[#0E1116] mb-2">
                            <button
                              type="button"
                              onClick={() => setModalProject(project)}
                              className="text-left hover:text-[#785926] transition-colors cursor-pointer"
                            >
                              {project.title}
                            </button>
                          </h3>

                          <p className="font-sans-body font-light text-[15px] leading-[24px] text-[rgba(14,17,22,0.70)] mb-6">
                            {project.narrativeLead}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer with Bronze Metadata & Direct CAD Workbench Action */}
                      <div className="px-7 py-4 bg-[#F9F6F1] border-t border-[rgba(14,17,22,0.08)] flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-xs text-[rgba(14,17,22,0.65)]">
                          <span className="label-mono font-medium text-[#0E1116]">
                            {project.grossInternalArea}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate max-w-[200px]">{project.primaryMaterial}</span>
                        </div>

                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => handleLoadInFloorplanWorkbench(project)}
                            className="label-caps text-[rgba(14,17,22,0.65)] hover:text-[#785926] flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                          >
                            <Compass className="w-3.5 h-3.5" /> CAD Plan
                          </button>

                          <button
                            type="button"
                            onClick={() => setModalProject(project)}
                            className="label-caps text-[#785926] hover:text-[#0E1116] flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                          >
                            <span>Read Monograph</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* Catalog View Mode 2: Archival Index Table (Tabular Numerals) */
              <div className="bg-[#FFFFFF] border border-[rgba(14,17,22,0.08)] overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[rgba(14,17,22,0.12)] bg-[#F9F6F1]">
                      <th className="py-4 px-5 label-caps text-[rgba(14,17,22,0.5)]">INDEX</th>
                      <th className="py-4 px-5 label-caps text-[rgba(14,17,22,0.5)]">
                        MONOGRAPH TITLE
                      </th>
                      <th className="py-4 px-5 label-caps text-[rgba(14,17,22,0.5)]">TYPOLOGY</th>
                      <th className="py-4 px-5 label-caps text-[rgba(14,17,22,0.5)]">LOCATION</th>
                      <th className="py-4 px-5 label-caps text-[rgba(14,17,22,0.5)] text-right">
                        GROSS AREA
                      </th>
                      <th className="py-4 px-5 label-caps text-[rgba(14,17,22,0.5)] text-right">
                        CARBON
                      </th>
                      <th className="py-4 px-5 label-caps text-[rgba(14,17,22,0.5)] text-right">
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(14,17,22,0.08)]">
                    {filteredProjects.map((proj) => (
                      <tr
                        key={proj.id}
                        className="hover:bg-[#F4EFE8]/50 transition-colors"
                      >
                        <td className="py-4 px-5 label-mono text-[#785926]">
                          {proj.accessionCode}
                        </td>
                        <td className="py-4 px-5 font-serif-editorial text-lg text-[#0E1116] font-medium">
                          {proj.title}
                        </td>
                        <td className="py-4 px-5 text-[13px] text-[rgba(14,17,22,0.7)]">
                          {proj.typology}
                        </td>
                        <td className="py-4 px-5 label-caps text-[rgba(14,17,22,0.7)]">
                          {proj.location} · {proj.year}
                        </td>
                        <td className="py-4 px-5 label-mono text-[#0E1116] text-right">
                          {proj.grossInternalArea}
                        </td>
                        <td className="py-4 px-5 label-mono text-[#785926] text-right">
                          {proj.embodiedCarbonKgM2} kgCO₂e/m²
                        </td>
                        <td className="py-4 px-5 text-right">
                          <button
                            type="button"
                            onClick={() => setModalProject(proj)}
                            className="label-caps text-[#785926] hover:text-[#0E1116] cursor-pointer whitespace-nowrap"
                          >
                            Open Plate →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* =====================================================================
            PAVILION 03: DARK BASALT FLOORPLAN & CAD MATRIX (#12151B)
        ===================================================================== */}
        <BlueprintWorkbench
          selectedProject={selectedBlueprintProject}
          onSelectProject={setSelectedBlueprintProject}
          onOpenMonographModal={(proj) => setModalProject(proj)}
        />

        {/* =====================================================================
            PAVILION 04: GALLERY CREAM LIMESTONE MATERIALITY ARCHIVE (#F4EFE8)
        ===================================================================== */}
        <MaterialitySection
          selectedMaterialsForBrief={selectedBriefMaterials}
          onToggleMaterialInBrief={handleToggleMaterialInBrief}
        />

        {/* =====================================================================
            PAVILION 05: DEEP OBSIDIAN COMMISSION ATELIER (#0E1116)
        ===================================================================== */}
        <CommissionAtelierSection
          selectedMaterials={selectedBriefMaterials}
          onToggleMaterial={handleToggleMaterialInBrief}
        />
      </main>

      {/* QUIET ARCHITECTURAL FOOTER */}
      <footer className="w-full bg-[#0B0E13] text-[rgba(244,239,232,0.55)] border-t border-[rgba(244,239,232,0.08)] py-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-serif-editorial text-lg tracking-[0.14em] text-[#F4EFE8] mr-4">
              MEEZAN REAL ESTATE
            </span>
            <span className="text-xs text-[rgba(244,239,232,0.45)]">
              Hassan Chok 60 Feet Road, Rafeeq Chouk, 308 C Millat Rd, Millat Town D Block,
              Faisalabad · +92 300 7785625 · F4Q3+MC · Open 24 Hours
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 label-caps text-[rgba(244,239,232,0.55)]">
            <a href="#meezan-dossier" className="hover:text-[#D2AE78] transition-colors">
              Reviews (5.0 ★)
            </a>
            <a href="#monographs" className="hover:text-[#D2AE78] transition-colors">
              Monographs
            </a>
            <a href="#floorplans" className="hover:text-[#D2AE78] transition-colors">
              CAD Datum
            </a>
            <a href="#atelier" className="hover:text-[#D2AE78] transition-colors">
              Advisory Desk
            </a>
          </div>
        </div>
      </footer>

      {/* HIGH-RESOLUTION MONOGRAPH LIGHTBOX MODAL */}
      <MonographModal
        project={modalProject}
        onClose={() => setModalProject(null)}
        onLoadInFloorplanWorkbench={handleLoadInFloorplanWorkbench}
      />
    </div>
  );
}
