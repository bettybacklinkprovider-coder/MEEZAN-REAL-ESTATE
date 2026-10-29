export interface BlueprintZone {
  id: string;
  code: string;
  name: string;
  areaSqm: number;
  ceilingHeightM: number;
  daylightFactor: string;
  materialPrimary: string;
  acousticRating: string;
  xPercent: number;
  yPercent: number;
  description: string;
}

export interface MonographProject {
  id: string;
  monographNo: string;
  accessionCode: string;
  title: string;
  subtitle: string;
  year: string;
  typology: 'Cultural & Museum' | 'Private Residences' | 'Sacred & Sanctuary' | 'Alpine & Coastal';
  typologyShort: string;
  location: string;
  country: string;
  coordinates: string;
  featuredSpan: 'wide' | 'standard';
  grossInternalArea: string;
  structuralSystem: string;
  primaryMaterial: string;
  completionStatus: string;
  embodiedCarbonKgM2: number;
  daylightAutonomy: string;
  leadCuratorQuote: {
    quote: string;
    author: string;
    role: string;
    institution: string;
  };
  narrativeLead: string;
  narrativeBody: string;
  figureCaption: string;
  imageSvgDataUri: string;
  elevationSvgDataUri: string;
  parameters: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
  zones: BlueprintZone[];
}

export interface MaterialSpecimen {
  id: string;
  code: string;
  name: string;
  originQuarry: string;
  category: string;
  densityKgM3: number;
  thermalMassKj: number;
  acousticNrc: number;
  compressiveStrengthMpa: number;
  surfaceFinish: string;
  architecturalApplication: string;
  patinaTimeline: {
    year0: { label: string; hex: string; note: string };
    year10: { label: string; hex: string; note: string };
    year50: { label: string; hex: string; note: string };
  };
  textureSvgUri: string;
}

function encodeSvgDataUri(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

export function createHeroArchitecturalSvg(lightingMode: 'dawn' | 'noon' | 'dusk'): string {
  const palettes = {
    dawn: {
      skyTop: '#0B0E14',
      skyMid: '#1A2230',
      skyHorizon: '#4A3B32',
      sunGlow: '#D2AE78',
      concreteMain: '#282C34',
      concreteLit: '#4E463E',
      concreteShadow: '#12151B',
      waterTop: '#141922',
      waterBot: '#090B0E',
      interiorGlow: '#EAC083',
      bronzeMullion: '#B8925A',
    },
    noon: {
      skyTop: '#161C24',
      skyMid: '#28313E',
      skyHorizon: '#5C646E',
      sunGlow: '#F4EFE8',
      concreteMain: '#3A3E47',
      concreteLit: '#686B73',
      concreteShadow: '#181B22',
      waterTop: '#1E2530',
      waterBot: '#0E1116',
      interiorGlow: '#FFDDB0',
      bronzeMullion: '#D2AE78',
    },
    dusk: {
      skyTop: '#07090C',
      skyMid: '#12151E',
      skyHorizon: '#2E231C',
      sunGlow: '#B8925A',
      concreteMain: '#1B1E24',
      concreteLit: '#322B24',
      concreteShadow: '#0B0D11',
      waterTop: '#10131A',
      waterBot: '#07080B',
      interiorGlow: '#FFCA7A',
      bronzeMullion: '#B8925A',
    },
  };

  const p = palettes[lightingMode];

  return encodeSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 820" width="1200" height="820">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${p.skyTop}" />
          <stop offset="58%" stop-color="${p.skyMid}" />
          <stop offset="100%" stop-color="${p.skyHorizon}" />
        </linearGradient>
        <radialGradient id="horizonGlow" cx="72%" cy="56%" r="48%">
          <stop offset="0%" stop-color="${p.sunGlow}" stop-opacity="0.32" />
          <stop offset="50%" stop-color="${p.sunGlow}" stop-opacity="0.09" />
          <stop offset="100%" stop-color="${p.skyTop}" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${p.waterTop}" />
          <stop offset="100%" stop-color="${p.waterBot}" />
        </linearGradient>
        <linearGradient id="interiorLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${p.interiorGlow}" stop-opacity="0.88" />
          <stop offset="100%" stop-color="${p.bronzeMullion}" stop-opacity="0.28" />
        </linearGradient>
        <linearGradient id="waterReflect" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${p.interiorGlow}" stop-opacity="0.36" />
          <stop offset="100%" stop-color="${p.interiorGlow}" stop-opacity="0.0" />
        </linearGradient>
      </defs>

      <!-- Sky Canvas -->
      <rect width="1200" height="540" fill="url(#sky)" />
      <rect width="1200" height="540" fill="url(#horizonGlow)" />

      <!-- Subtle Architectural Axis Grid Lines in Sky -->
      <g stroke="#F4EFE8" stroke-opacity="0.05" stroke-width="1">
        <line x1="180" y1="0" x2="180" y2="820" />
        <line x1="460" y1="0" x2="460" y2="820" />
        <line x1="780" y1="0" x2="780" y2="820" />
        <line x1="1040" y1="0" x2="1040" y2="820" />
        <line x1="0" y1="210" x2="1200" y2="210" />
        <line x1="0" y1="360" x2="1200" y2="360" />
      </g>

      <!-- Distant Kyoto Hills Silhouette -->
      <path d="M0 540 L0 445 Q190 400 390 438 T820 420 T1200 455 L1200 540 Z" fill="#0D1016" opacity="0.75" />

      <!-- Main Monolithic Cantilevered Pavilion Structure -->
      <!-- Rear Limestone Core Volume -->
      <polygon points="150,240 610,205 610,535 150,535" fill="${p.concreteShadow}" stroke="#F4EFE8" stroke-opacity="0.08" />
      <polygon points="610,205 740,235 740,535 610,535" fill="${p.concreteMain}" />

      <!-- Upper Cantilevered Board-Formed Concrete Fascia -->
      <polygon points="90,275 880,210 1090,248 1090,322 880,302 90,335" fill="${p.concreteLit}" />
      <polygon points="90,335 880,302 1090,322 880,338 90,356" fill="${p.concreteShadow}" />

      <!-- Bronze Soffit Reveal Line -->
      <line x1="90" y1="335" x2="880" y2="302" stroke="${p.bronzeMullion}" stroke-width="2" stroke-opacity="0.85" />
      <line x1="880" y1="302" x2="1090" y2="322" stroke="${p.bronzeMullion}" stroke-width="1.5" stroke-opacity="0.65" />

      <!-- Illuminated Gallery Glazing Void -->
      <polygon points="220,342 875,308 875,512 220,512" fill="url(#interiorLight)" />
      <polygon points="875,308 1045,326 1045,512 875,512" fill="${p.interiorGlow}" fill-opacity="0.45" />

      <!-- Interior Coffered Ceiling Perspective Lines -->
      <g stroke="#12151B" stroke-opacity="0.35" stroke-width="1.5">
        <line x1="280" y1="340" x2="340" y2="395" />
        <line x1="390" y1="334" x2="435" y2="392" />
        <line x1="510" y1="327" x2="540" y2="388" />
        <line x1="640" y1="320" x2="655" y2="385" />
        <line x1="765" y1="314" x2="765" y2="382" />
      </g>

      <!-- Interior Minimalist Sculpture & Plinth -->
      <rect x="520" y="455" width="46" height="57" fill="#12151B" opacity="0.88" />
      <circle cx="543" cy="432" r="14" fill="none" stroke="#12151B" stroke-width="2.5" opacity="0.85" />

      <!-- Slender Vertical Bronze Structural Mullions -->
      <g stroke="#12151B" stroke-width="5">
        <line x1="330" y1="336" x2="330" y2="512" />
        <line x1="460" y1="329" x2="460" y2="512" />
        <line x1="595" y1="322" x2="595" y2="512" />
        <line x1="735" y1="315" x2="735" y2="512" />
        <line x1="875" y1="308" x2="875" y2="512" stroke-width="8" />
        <line x1="970" y1="318" x2="970" y2="512" stroke-width="4" />
      </g>
      <g stroke="${p.bronzeMullion}" stroke-width="1.2" stroke-opacity="0.7">
        <line x1="332" y1="336" x2="332" y2="512" />
        <line x1="462" y1="329" x2="462" y2="512" />
        <line x1="597" y1="322" x2="597" y2="512" />
        <line x1="737" y1="315" x2="737" y2="512" />
        <line x1="878" y1="308" x2="878" y2="512" />
      </g>

      <!-- Heavy Basalt Plinth Base -->
      <polygon points="60,512 1120,512 1140,545 45,545" fill="${p.concreteMain}" />
      <line x1="60" y1="512" x2="1120" y2="512" stroke="${p.bronzeMullion}" stroke-width="1.5" stroke-opacity="0.8" />

      <!-- Reflecting Basin Water -->
      <rect x="0" y="545" width="1200" height="275" fill="url(#water)" />

      <!-- Warm Architectural Reflection in Still Water -->
      <polygon points="220,545 1045,545 1090,790 180,790" fill="url(#waterReflect)" />

      <!-- Horizontal Water Ripple Hairlines -->
      <g stroke="${p.sunGlow}" stroke-opacity="0.22" stroke-width="1">
        <line x1="210" y1="568" x2="1030" y2="568" />
        <line x1="240" y1="595" x2="990" y2="595" />
        <line x1="190" y1="628" x2="1050" y2="628" />
        <line x1="290" y1="665" x2="940" y2="665" />
        <line x1="340" y1="710" x2="880" y2="710" />
        <line x1="420" y1="760" x2="790" y2="760" />
      </g>

      <!-- Architectural Datum Annotations -->
      <g fill="#F4EFE8" fill-opacity="0.55" font-family="monospace" font-size="11" letter-spacing="2">
        <text x="54" y="200">EL. +08.40M CANTILEVER</text>
        <text x="54" y="504">EL. +00.00M BASALT PLINTH</text>
        <text x="960" y="790">35.0116° N, 135.7681° E</text>
      </g>
    </svg>
  `);
}

export function createProjectSvg(
  variant: 'kyoto' | 'vals' | 'naoshima' | 'reykjavik' | 'engadin' | 'atacama'
): string {
  switch (variant) {
    case 'kyoto':
      return createHeroArchitecturalSvg('dusk');
    case 'vals':
      return encodeSvgDataUri(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650" width="900" height="650">
          <defs>
            <linearGradient id="valsSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#0E1116" />
              <stop offset="100%" stop-color="#222834" />
            </linearGradient>
            <linearGradient id="valsLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#EAC083" stop-opacity="0.75" />
              <stop offset="100%" stop-color="#B8925A" stop-opacity="0.1" />
            </linearGradient>
          </defs>
          <rect width="900" height="650" fill="url(#valsSky)" />
          <!-- Alpine Ridge -->
          <polygon points="0,420 260,170 540,340 820,130 900,210 900,450 0,450" fill="#151921" />
          <!-- Monolithic Quartzite Slabs -->
          <rect x="110" y="240" width="160" height="260" fill="#252932" stroke="#F4EFE8" stroke-opacity="0.12" />
          <rect x="295" y="210" width="210" height="290" fill="#1C2027" stroke="#F4EFE8" stroke-opacity="0.12" />
          <rect x="530" y="255" width="240" height="245" fill="#2A2F39" stroke="#F4EFE8" stroke-opacity="0.12" />
          <!-- Glowing Thermal Cavern Apertures -->
          <rect x="155" y="340" width="70" height="160" fill="url(#valsLight)" />
          <rect x="350" y="310" width="105" height="190" fill="url(#valsLight)" />
          <rect x="595" y="355" width="110" height="145" fill="url(#valsLight)" />
          <!-- Horizontal Quartzite Strata Lines -->
          <g stroke="#B8925A" stroke-opacity="0.28" stroke-width="1">
            <line x1="110" y1="275" x2="770" y2="275" />
            <line x1="110" y1="310" x2="770" y2="310" />
            <line x1="110" y1="345" x2="770" y2="345" />
            <line x1="110" y1="380" x2="770" y2="380" />
          </g>
          <!-- Thermal Pool Foreground -->
          <rect x="0" y="500" width="900" height="150" fill="#0B0E13" />
          <line x1="0" y1="500" x2="900" y2="500" stroke="#B8925A" stroke-width="1.5" stroke-opacity="0.7" />
          <rect x="155" y="502" width="550" height="110" fill="url(#valsLight)" opacity="0.35" />
        </svg>
      `);
    case 'naoshima':
      return encodeSvgDataUri(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650" width="900" height="650">
          <defs>
            <linearGradient id="naoBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#141820" />
              <stop offset="100%" stop-color="#0B0E13" />
            </linearGradient>
            <radialGradient id="oculusGlow" cx="50%" cy="32%" r="45%">
              <stop offset="0%" stop-color="#FFDDB0" stop-opacity="0.9" />
              <stop offset="45%" stop-color="#B8925A" stop-opacity="0.35" />
              <stop offset="100%" stop-color="#0E1116" stop-opacity="0" />
            </radialGradient>
          </defs>
          <rect width="900" height="650" fill="url(#naoBg)" />
          <!-- Subterranean Concrete Perspective Walls -->
          <polygon points="0,0 320,210 320,510 0,650" fill="#1E222B" />
          <polygon points="900,0 580,210 580,510 900,650" fill="#171A22" />
          <polygon points="0,650 320,510 580,510 900,650" fill="#252932" />
          <!-- Sky Oculus Aperture -->
          <ellipse cx="450" cy="145" rx="175" ry="52" fill="#EAC083" fill-opacity="0.85" stroke="#B8925A" stroke-width="2" />
          <!-- Light Cone Shaft -->
          <polygon points="275,145 625,145 740,650 160,650" fill="url(#oculusGlow)" />
          <!-- Monolithic Travertine Altar Sphere -->
          <circle cx="450" cy="485" r="54" fill="#12151B" stroke="#D2AE78" stroke-width="1.5" />
          <line x1="320" y1="510" x2="580" y2="510" stroke="#B8925A" stroke-width="1" stroke-opacity="0.6" />
        </svg>
      `);
    case 'reykjavik':
      return encodeSvgDataUri(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650" width="900" height="650">
          <rect width="900" height="650" fill="#0F131A" />
          <!-- North Atlantic Horizon -->
          <rect x="0" y="380" width="900" height="270" fill="#090C10" />
          <line x1="0" y1="380" x2="900" y2="380" stroke="#B8925A" stroke-opacity="0.4" stroke-width="1" />
          <!-- Volcanic Cliff Mass -->
          <polygon points="0,460 440,340 720,440 720,590 0,590" fill="#181C24" />
          <!-- Cantilevered Basalt & Bronze Residence -->
          <polygon points="210,250 760,250 790,345 190,345" fill="#2A2E37" stroke="#D2AE78" stroke-opacity="0.5" stroke-width="1.5" />
          <rect x="245" y="268" width="490" height="62" fill="#EAC083" fill-opacity="0.72" />
          <!-- Structural Fins -->
          <g stroke="#12151B" stroke-width="8">
            <line x1="340" y1="265" x2="340" y2="332" />
            <line x1="455" y1="265" x2="455" y2="332" />
            <line x1="570" y1="265" x2="570" y2="332" />
            <line x1="665" y1="265" x2="665" y2="332" />
          </g>
          <!-- Support Pier into Basalt Cliff -->
          <rect x="310" y="345" width="95" height="125" fill="#14171E" stroke="#B8925A" stroke-opacity="0.3" />
        </svg>
      `);
    case 'engadin':
      return encodeSvgDataUri(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650" width="900" height="650">
          <rect width="900" height="650" fill="#12151C" />
          <!-- High Alpine Peaks -->
          <polygon points="0,440 210,160 450,350 690,140 900,360 900,480 0,480" fill="#1B202A" />
          <!-- Diagrid Timber & Bronze Pavilion -->
          <polygon points="180,470 450,195 720,470" fill="#26221E" stroke="#B8925A" stroke-width="2" />
          <polygon points="235,470 450,245 665,470" fill="#EAC083" fill-opacity="0.68" />
          <!-- Timber Lamella Grid -->
          <g stroke="#12151B" stroke-width="3">
            <line x1="450" y1="245" x2="450" y2="470" />
            <line x1="365" y1="335" x2="365" y2="470" />
            <line x1="535" y1="335" x2="535" y2="470" />
            <line x1="295" y1="408" x2="605" y2="408" />
            <line x1="355" y1="345" x2="545" y2="345" />
          </g>
          <rect x="0" y="470" width="900" height="180" fill="#0D1015" />
          <line x1="120" y1="470" x2="780" y2="470" stroke="#D2AE78" stroke-width="2" />
        </svg>
      `);
    case 'atacama':
      return encodeSvgDataUri(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650" width="900" height="650">
          <rect width="900" height="650" fill="#0B0D12" />
          <!-- Starfield & Celestial Meridian Arc -->
          <circle cx="450" cy="620" r="460" fill="none" stroke="#B8925A" stroke-opacity="0.22" stroke-dasharray="4 6" />
          <circle cx="450" cy="620" r="340" fill="none" stroke="#F4EFE8" stroke-opacity="0.12" />
          <!-- Rammed Earth & Corten Bronze Cloister Walls -->
          <rect x="130" y="330" width="640" height="170" fill="#332820" stroke="#B8925A" stroke-opacity="0.55" />
          <polygon points="350,330 550,330 510,500 390,500" fill="#EAC083" fill-opacity="0.75" />
          <circle cx="450" cy="230" r="42" fill="none" stroke="#D2AE78" stroke-width="1.5" />
          <line x1="450" y1="140" x2="450" y2="500" stroke="#D2AE78" stroke-opacity="0.5" stroke-width="1" />
          <rect x="0" y="500" width="900" height="150" fill="#141210" />
        </svg>
      `);
  }
}

export function createDraftedElevationSvg(): string {
  return encodeSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 820" width="1200" height="820">
      <rect width="1200" height="820" fill="#0E1116" />
      <!-- Fine Blueprint Grid -->
      <g stroke="#F4EFE8" stroke-opacity="0.05" stroke-width="1">
        <line x1="120" y1="0" x2="120" y2="820" />
        <line x1="240" y1="0" x2="240" y2="820" />
        <line x1="360" y1="0" x2="360" y2="820" />
        <line x1="480" y1="0" x2="480" y2="820" />
        <line x1="600" y1="0" x2="600" y2="820" />
        <line x1="720" y1="0" x2="720" y2="820" />
        <line x1="840" y1="0" x2="840" y2="820" />
        <line x1="960" y1="0" x2="960" y2="820" />
        <line x1="1080" y1="0" x2="1080" y2="820" />
        <line x1="0" y1="140" x2="1200" y2="140" />
        <line x1="0" y1="280" x2="1200" y2="280" />
        <line x1="0" y1="420" x2="1200" y2="420" />
        <line x1="0" y1="560" x2="1200" y2="560" />
        <line x1="0" y1="700" x2="1200" y2="700" />
      </g>

      <!-- Structural Axis Datum Lines -->
      <g stroke="#B8925A" stroke-opacity="0.45" stroke-dasharray="6 6" stroke-width="1">
        <line x1="180" y1="90" x2="180" y2="740" />
        <line x1="420" y1="90" x2="420" y2="740" />
        <line x1="660" y1="90" x2="660" y2="740" />
        <line x1="900" y1="90" x2="900" y2="740" />
        <line x1="1040" y1="90" x2="1040" y2="740" />
      </g>

      <!-- Axis Callout Circles -->
      <g fill="#12151B" stroke="#B8925A" stroke-width="1.5">
        <circle cx="180" cy="80" r="14" />
        <circle cx="420" cy="80" r="14" />
        <circle cx="660" cy="80" r="14" />
        <circle cx="900" cy="80" r="14" />
        <circle cx="1040" cy="80" r="14" />
      </g>
      <g fill="#F4EFE8" font-family="monospace" font-size="11" text-anchor="middle">
        <text x="180" y="84">A1</text>
        <text x="420" y="84">A2</text>
        <text x="660" y="84">A3</text>
        <text x="900" y="84">A4</text>
        <text x="1040" y="84">A5</text>
      </g>

      <!-- Drafted Section Elevation of Cantilevered Pavilion -->
      <rect x="140" y="230" width="920" height="68" fill="#B8925A" fill-opacity="0.14" stroke="#B8925A" stroke-width="2" />
      <rect x="180" y="298" width="720" height="232" fill="none" stroke="#F4EFE8" stroke-width="1.5" />
      <rect x="100" y="530" width="980" height="55" fill="#F4EFE8" fill-opacity="0.08" stroke="#F4EFE8" stroke-width="2" />
      <!-- Deep Foundation Caissons -->
      <rect x="165" y="585" width="42" height="120" fill="none" stroke="#B8925A" stroke-width="1.5" />
      <rect x="400" y="585" width="42" height="120" fill="none" stroke="#B8925A" stroke-width="1.5" />
      <rect x="640" y="585" width="42" height="120" fill="none" stroke="#B8925A" stroke-width="1.5" />

      <!-- Post-Tensioned Truss Diagonals in Roof Slab -->
      <polyline points="140,298 220,230 300,298 380,230 460,298 540,230 620,298 700,230 780,298 860,230 940,298 1020,230 1060,298" fill="none" stroke="#D2AE78" stroke-width="1.2" />

      <!-- Dimension Ticks & Annotations -->
      <g fill="#D2AE78" font-family="monospace" font-size="12" letter-spacing="1.5">
        <text x="140" y="205">POST-TENSIONED CANTILEVER SLAB // SPAN 18.40M</text>
        <text x="140" y="645">SEISMIC BASE ISOLATION CAISSONS // DEPTH -14.20M</text>
        <text x="915" y="415">FREE OVERHANG +6.80M</text>
      </g>
    </svg>
  `);
}

function createMaterialTextureSvg(baseHex: string, accentHex: string, grainStyle: 'stone' | 'bronze' | 'timber' | 'basalt'): string {
  return encodeSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" height="280">
      <rect width="400" height="280" fill="${baseHex}" />
      ${
        grainStyle === 'stone'
          ? `<g stroke="${accentHex}" stroke-opacity="0.28" stroke-width="1.2" fill="none">
              <path d="M0,48 Q120,38 240,54 T400,42" />
              <path d="M0,115 Q160,128 290,108 T400,122" />
              <path d="M0,185 Q90,172 220,195 T400,180" />
              <path d="M0,238 Q140,248 280,230 T400,242" />
            </g>`
          : grainStyle === 'bronze'
          ? `<g stroke="${accentHex}" stroke-opacity="0.35" stroke-width="1">
              <line x1="0" y1="30" x2="400" y2="30" />
              <line x1="0" y1="75" x2="400" y2="75" />
              <line x1="0" y1="140" x2="400" y2="140" />
              <line x1="0" y1="210" x2="400" y2="210" />
              <circle cx="200" cy="140" r="85" fill="none" stroke="${accentHex}" stroke-opacity="0.4" />
            </g>`
          : grainStyle === 'timber'
          ? `<g stroke="${accentHex}" stroke-opacity="0.25" stroke-width="1.5" fill="none">
              <path d="M0,25 C140,15 260,35 400,22" />
              <path d="M0,65 C140,55 260,75 400,62" />
              <path d="M0,105 C140,95 260,115 400,102" />
              <path d="M0,145 C140,135 260,155 400,142" />
              <path d="M0,185 C140,175 260,195 400,182" />
              <path d="M0,225 C140,215 260,235 400,222" />
            </g>`
          : `<g stroke="${accentHex}" stroke-opacity="0.22" stroke-width="1">
              <rect x="24" y="24" width="352" height="232" fill="none" />
              <line x1="24" y1="140" x2="376" y2="140" />
              <line x1="200" y1="24" x2="200" y2="256" />
            </g>`
      }
    </svg>
  `);
}

export interface MeezanPhotoItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: 'Uploaded Client Plate' | 'Commercial Frontage' | 'Residential Estate' | 'Tectonic Detail';
  locationLabel: string;
  src: string;
  dimensionsLabel: string;
}

export const MEEZAN_PHOTO_GALLERY: MeezanPhotoItem[] = [
  {
    id: 'photo-fsd-1',
    code: 'PLATE // 01',
    title: '60 Feet Road & Millat Road Commercial Plaza (Faisalabad)',
    subtitle: 'Authentic Pakistani commercial real estate storefront, pharmacy & retail arcade on Millat Road',
    category: 'Commercial Frontage',
    locationLabel: 'Hassan Chok 60 Feet Rd · Rafeeq Chouk · Faisalabad',
    src: '/src/assets/images/faisalabad_millat_road_commercial_plaza_1793278028817.jpg',
    dimensionsLabel: 'Commercial Corner · Plus Code F4Q3+MC',
  },
  {
    id: 'photo-fsd-2',
    code: 'PLATE // 02',
    title: 'Millat Town D Block 1-Kanal Modern Pakistani House (Kothi)',
    subtitle: 'Contemporary Faisalabad residential architecture with CNC boundary gate, travertine & green belt',
    category: 'Residential Estate',
    locationLabel: 'Millat Town D Block · Faisalabad, Pakistan',
    src: '/src/assets/images/faisalabad_millat_town_1kanal_house_1793278029540.jpg',
    dimensionsLabel: '1 Kanal (50×90 ft) Possession House',
  },
  {
    id: 'photo-fsd-3',
    code: 'PLATE // 03',
    title: '308 C Millat Rd Property Advisor Office & FDA Sector Map',
    subtitle: 'Executive real estate dealer suite with framed Faisalabad FDA Housing Sectors — Millat Town map',
    category: 'Commercial Frontage',
    locationLabel: '308 C Millat Rd HQ · Advisor M. Shahzad',
    src: '/src/assets/images/faisalabad_property_advisor_office_1793278031427.jpg',
    dimensionsLabel: 'Open 24 Hours · +92 300 7785625',
  },
  {
    id: 'photo-fsd-4',
    code: 'PLATE // 04',
    title: 'Historic Faisalabad Clock Tower (Ghanta Ghar) & Eight Bazaars',
    subtitle: 'Aerial view of Faisalabad’s iconic red-sandstone Clock Tower and radiating commercial bazaars at sunset',
    category: 'Commercial Frontage',
    locationLabel: 'Faisalabad City Center · Commercial Hub',
    src: '/src/assets/images/faisalabad_clock_tower_aerial_1793278027054.jpg',
    dimensionsLabel: 'Faisalabad Metropolitan Commercial Core',
  },
  {
    id: 'photo-uploaded-1',
    code: 'PLATE // 05',
    title: 'Timber & Brick Evening Pavilion (Uploaded Specimen I)',
    subtitle: 'Warm cedar siding, coach lantern illumination, and mullioned glass sunroom salon',
    category: 'Uploaded Client Plate',
    locationLabel: 'Millat Town D Block · Estate Reference',
    src: '/assets/aistudio/unnamed_89661b6e.jpg',
    dimensionsLabel: '10 Marla / 1 Kanal Farmhouse Villa',
  },
  {
    id: 'photo-uploaded-2',
    code: 'PLATE // 06',
    title: 'Stacked Slate & Cascading Water Wall (Uploaded Specimen II)',
    subtitle: 'Natural split-face stone strata with organic root relief and cascading water feature',
    category: 'Uploaded Client Plate',
    locationLabel: 'Courtyard Sanctuary · 308 C Millat Rd',
    src: '/assets/aistudio/unnamed__1__f1c37e85.jpg',
    dimensionsLabel: 'Bespoke Landscape & Stonework',
  },
];

export const MONOGRAPH_PROJECTS: MonographProject[] = [
  {
    id: 'meezan-millat-commercial-pavilion',
    monographNo: '00',
    accessionCode: 'MZN.2026.FSD.308C',
    title: 'Meezan Commercial Plaza · 60 Feet Road & Millat Rd',
    subtitle: 'Hassan Chok 60 Feet Road, Rafeeq Chouk, 308 C Millat Rd, Millat Town D Block, Faisalabad',
    year: '2026',
    typology: 'Cultural & Museum',
    typologyShort: 'COMMERCIAL HQ',
    location: 'FAISALABAD',
    country: 'Pakistan',
    coordinates: 'F4Q3+MC · 31.4685° N, 73.1128° E',
    featuredSpan: 'wide',
    grossInternalArea: '3,850 m²',
    structuralSystem: 'Reinforced Concrete Commercial Frame, Travertine & Tempered Glass Frontage',
    primaryMaterial: 'Pakistani Travertine Marble, Granite Steps & Illuminated Fascia Signage',
    completionStatus: 'OPEN 24 HOURS · 5.0 ★ (10 REVIEWS)',
    embodiedCarbonKgM2: 210,
    daylightAutonomy: '89.5%',
    leadCuratorQuote: {
      quote: 'Very honest and trustworthy person. Mr Muhammad shahzad — Trusted real estate advisor bringing you the best commercial and residential deals across Millat Town D Block and 60 Feet Road.',
      author: 'Hassan Shahzad & Faizan Shahid',
      role: 'Verified Commercial Clients (5.0 ★)',
      institution: 'Meezan Real Estate Faisalabad Ledger',
    },
    narrativeLead: 'Anchored at the strategic intersection of Hassan Chok 60 Feet Road, Rafeeq Chouk, and 308 C Millat Road in Millat Town D Block, Faisalabad, MEEZAN REAL ESTATE operates 24 hours a day as the premier commercial property advisory.',
    narrativeBody: 'Directed by Principal Advisor Mr. Muhammad Shahzad (+92 300 7785625), the agency curates high-yield commercial plazas, retail showrooms, and residential estates across Millat Town and North Faisalabad with 100% five-star client verification.',
    figureCaption: 'Fig. 00 — Commercial plaza & Real Estate Advisors storefront on 60 Feet Road / Millat Road, Faisalabad (Plus Code: F4Q3+MC).',
    imageSvgDataUri: '/src/assets/images/faisalabad_millat_road_commercial_plaza_1793278028817.jpg',
    elevationSvgDataUri: createDraftedElevationSvg(),
    parameters: [
      { label: 'AGENCY RATING & REVIEWS', value: '5.0 ★ (10 Verified Reviews)', highlight: true },
      { label: 'PRINCIPAL ADVISOR', value: 'Mr. Muhammad Shahzad', highlight: true },
      { label: 'HEADQUARTERS ADDRESS', value: '308 C Millat Rd, Millat Town D Block', highlight: false },
      { label: 'CORRIDOR LANDMARKS', value: 'Hassan Chok 60 Feet Rd · Rafeeq Chouk', highlight: false },
      { label: 'DIRECT HOTLINE (24 HOURS)', value: '+92 300 7785625', highlight: true },
      { label: 'GOOGLE MAPS PLUS CODE', value: 'F4Q3+MC Faisalabad, Pakistan', highlight: true },
    ],
    zones: [
      {
        id: 'mzn-zone-1',
        code: 'MZN-01',
        name: '24-Hour Commercial Advisory Suite',
        areaSqm: 740,
        ceilingHeightM: 4.8,
        daylightFactor: '6.8%',
        materialPrimary: 'Honed Travertine & Architectural Bronze',
        acousticRating: 'NRC 0.85',
        xPercent: 28,
        yPercent: 50,
        description: 'Private client registry room and title verification suite led by Mr. Muhammad Shahzad.',
      },
      {
        id: 'mzn-zone-2',
        code: 'MZN-02',
        name: '60 Feet Road Commercial Showcase Hall',
        areaSqm: 1620,
        ceilingHeightM: 6.0,
        daylightFactor: '5.4%',
        materialPrimary: 'Board-Formed Basalt Concrete & Low-Iron Glass',
        acousticRating: 'NRC 0.80',
        xPercent: 55,
        yPercent: 45,
        description: 'Double-height corner frontage facing Hassan Chok 60 Feet Road and Rafeeq Chouk.',
      },
      {
        id: 'mzn-zone-3',
        code: 'MZN-03',
        name: 'Millat Town D-Block Cadastre Vault',
        areaSqm: 890,
        ceilingHeightM: 4.0,
        daylightFactor: '2.2%',
        materialPrimary: 'Charred Cedar & Brass Archival Shelving',
        acousticRating: 'NRC 0.90',
        xPercent: 78,
        yPercent: 58,
        description: 'Master sector maps, plot transfer ledgers, and FDA/commercial documentation archive.',
      },
    ],
  },
  {
    id: 'kamo-river-pavilion',
    monographNo: '01',
    accessionCode: 'MZN.2026.FSD.D01',
    title: 'Millat Town D-Block 1-Kanal Modern Kothi Residence',
    subtitle: 'Contemporary Pakistani Designer House with CNC Gate, Travertine & Landscaped Lawn',
    year: '2026',
    typology: 'Private Residences',
    typologyShort: 'RESIDENTIAL',
    location: 'MILLAT TOWN',
    country: 'Pakistan',
    coordinates: 'F4Q3+MC · Millat Town D Block, Faisalabad',
    featuredSpan: 'wide',
    grossInternalArea: '680 m²',
    structuralSystem: 'RCC Frame Structure, Cantilevered Terraces & Fair-Faced Masonry',
    primaryMaterial: 'Pakistani Travertine Stone, Charcoal Slate Tiles & Teak Wood Louvers',
    completionStatus: 'AVAILABLE · 1 KANAL POSSESSION',
    embodiedCarbonKgM2: 185,
    daylightAutonomy: '86.4%',
    leadCuratorQuote: {
      quote: 'Millat Town D Block offers wide carpeted streets, mature green belts, and immediate access to 60 Feet Road and Millat Road.',
      author: 'Mr. Muhammad Shahzad',
      role: 'Principal Advisor',
      institution: 'Meezan Real Estate Faisalabad',
    },
    narrativeLead: 'Situated on a wide carpeted boulevard in Millat Town D Block, Faisalabad, this brand-new 1-Kanal (50×90 ft) designer house exemplifies modern Pakistani residential architecture.',
    narrativeBody: 'Featuring a double-height lobby, imported porcelain tile flooring, teak woodwork, and a spacious three-car porch behind a laser-cut black steel security gate.',
    figureCaption: 'Fig. 01 — Exterior view of the 1-Kanal modern residence in Millat Town D Block, Faisalabad.',
    imageSvgDataUri: '/src/assets/images/faisalabad_millat_town_1kanal_house_1793278029540.jpg',
    elevationSvgDataUri: createDraftedElevationSvg(),
    parameters: [
      { label: 'PLOT SIZE & DIMENSIONS', value: '1 Kanal (50 × 90 ft · 4,500 sq.ft)', highlight: true },
      { label: 'ACCOMMODATION', value: '6 Master Suites · Double TV Lounge', highlight: false },
      { label: 'STREET ROAD WIDTH', value: '40 ft Carpeted Road · D Block', highlight: true },
      { label: 'REGISTRY STATUS', value: 'FDA Approved · Clear Intiqal/Transfer', highlight: false },
      { label: 'UTILITIES', value: '3-Phase WAPDA · Sui Gas · Sweet Water', highlight: false },
      { label: 'LOCATION', value: 'MILLAT TOWN D BLOCK · FAISALABAD', highlight: true },
    ],
    zones: [
      {
        id: 'zone-loggia',
        code: 'ZN-01',
        name: 'Double-Height Drawing & Dining Salon',
        areaSqm: 240,
        ceilingHeightM: 4.2,
        daylightFactor: '7.4%',
        materialPrimary: 'Travertine Cladding & Chandelier Void',
        acousticRating: 'NRC 0.80',
        xPercent: 24,
        yPercent: 52,
        description: 'Formal guest reception room overlooking the front green belt and car porch.',
      },
      {
        id: 'zone-monolith-hall',
        code: 'ZN-02',
        name: 'Ground & First Floor Family Suites',
        areaSqm: 310,
        ceilingHeightM: 3.8,
        daylightFactor: '4.8%',
        materialPrimary: 'Imported Spanish Tiles & Teak Joinery',
        acousticRating: 'NRC 0.85',
        xPercent: 54,
        yPercent: 44,
        description: 'Six en-suite bedrooms with walk-in wardrobes and cantilevered street balconies.',
      },
      {
        id: 'zone-archive',
        code: 'ZN-03',
        name: '3-Car Porch & Landscaped Front Lawn',
        areaSqm: 130,
        ceilingHeightM: 3.6,
        daylightFactor: 'Open Veranda',
        materialPrimary: 'Granite Pavers & CNC Steel Gate',
        acousticRating: 'NRC 0.75',
        xPercent: 78,
        yPercent: 60,
        description: 'Spacious granite-paved car porch and manicured lawn facing Millat Town D Block.',
      },
    ],
  },
  {
    id: 'vals-thermal-monolith',
    monographNo: '02',
    accessionCode: 'MZN.2026.FSD.W02',
    title: '308 C Millat Rd Property Advisory & FDA Map Suite',
    subtitle: '24-Hour Commercial Dealer Headquarters of Mr. Muhammad Shahzad in Faisalabad',
    year: '2026',
    typology: 'Cultural & Museum',
    typologyShort: 'ADVISORY HQ',
    location: 'FAISALABAD',
    country: 'Pakistan',
    coordinates: '308 C Millat Rd · Millat Town D Block',
    featuredSpan: 'standard',
    grossInternalArea: '420 m²',
    structuralSystem: 'Walnut Paneling, Cream Marble Flooring & Illuminated FDA Cadastre Map Wall',
    primaryMaterial: 'Pakistani Cream Marble, Carved Walnut Desk & Brass Accents',
    completionStatus: 'OPEN 24 HOURS · +92 300 7785625',
    embodiedCarbonKgM2: 165,
    daylightAutonomy: '78.0%',
    leadCuratorQuote: {
      quote: 'Very good dealing estate advisor — available 24 hours for transparent plot verification, Bayana agreements, and commercial registry.',
      author: 'mohsin shahram',
      role: 'Verified Client (5.0 ★)',
      institution: 'Meezan Real Estate Archive',
    },
    narrativeLead: 'Inside the 308 C Millat Road office, buyers and overseas Pakistani investors inspect framed FDA sector maps of Millat Town, Sargodha Road, and Canal Road housing schemes.',
    narrativeBody: 'Equipped with complete plot verification ledgers, allotment files, and direct transfer coordination, the office welcomes clients 24 hours a day.',
    figureCaption: 'Fig. 02 — Interior of the Meezan Real Estate consultation room featuring the Faisalabad FDA Millat Town sector map.',
    imageSvgDataUri: '/src/assets/images/faisalabad_property_advisor_office_1793278031427.jpg',
    elevationSvgDataUri: createDraftedElevationSvg(),
    parameters: [
      { label: 'HEADQUARTERS', value: '308 C Millat Rd · Millat Town D Block', highlight: true },
      { label: 'PRINCIPAL ADVISOR', value: 'Mr. Muhammad Shahzad', highlight: true },
      { label: 'SECTOR COVERAGE', value: 'Millat Town A–D Blocks · 60 Feet Rd', highlight: false },
      { label: 'SERVICES', value: 'Sale · Purchase · Commercial Registry', highlight: false },
      { label: 'OPERATING HOURS', value: 'Open 24 Hours (+92 300 7785625)', highlight: true },
    ],
    zones: [
      {
        id: 'vals-01',
        code: 'TH-01',
        name: 'FDA Master Plan & Sector Map Wall',
        areaSqm: 180,
        ceilingHeightM: 4.0,
        daylightFactor: '4.5%',
        materialPrimary: 'Walnut Wood & Backlit Cadastre Map',
        acousticRating: 'NRC 0.85',
        xPercent: 32,
        yPercent: 48,
        description: 'High-resolution plot numbering map for Millat Town Blocks A, B, C, D and 60 Feet Road.',
      },
      {
        id: 'vals-02',
        code: 'TH-02',
        name: 'Principal Deal & Registry Table',
        areaSqm: 240,
        ceilingHeightM: 4.0,
        daylightFactor: '6.8%',
        materialPrimary: 'Polished Walnut & Leather Seating',
        acousticRating: 'NRC 0.88',
        xPercent: 66,
        yPercent: 52,
        description: 'Executive consultation desk for token/Bayana agreements and title verification.',
      },
    ],
  },
  {
    id: 'setouchi-subterranean-gallery',
    monographNo: '03',
    accessionCode: 'MZN.2026.FSD.303',
    title: 'Faisalabad Clock Tower (Ghanta Ghar) & Eight Bazaars',
    subtitle: 'Historic Commercial Heart of Faisalabad & Metropolitan Trade Corridors',
    year: '2026',
    typology: 'Cultural & Museum',
    typologyShort: 'CITY LANDMARK',
    location: 'FAISALABAD',
    country: 'Pakistan',
    coordinates: '31.4187° N, 73.0791° E · Faisalabad Center',
    featuredSpan: 'standard',
    grossInternalArea: '4,200 m²',
    structuralSystem: 'Heritage Red Sandstone Clock Tower & Eight Radiating Commercial Bazaars',
    primaryMaterial: 'Agra Red Sandstone, Heritage Brick & Commercial Arcade Frontages',
    completionStatus: 'METROPOLITAN COMMERCIAL CORE',
    embodiedCarbonKgM2: 225,
    daylightAutonomy: '89.5%',
    leadCuratorQuote: {
      quote: 'From the historic Eight Bazaars of Ghanta Ghar to the booming 60 Feet Road corridor in Millat Town, Faisalabad is Pakistan’s premier commercial powerhouse.',
      author: 'Faizan Shahid',
      role: 'Verified Client (5.0 ★)',
      institution: 'Meezan Real Estate Reviews',
    },
    narrativeLead: 'Faisalabad’s urban geometry radiates outward from the iconic 1905 Clock Tower (Ghanta Ghar) through eight bustling wholesale and retail bazaars toward northern expansion corridors like Millat Road.',
    narrativeBody: 'Meezan Real Estate connects textile industrialists, traders, and families from across Faisalabad to high-growth commercial plazas and residential estates in Millat Town.',
    figureCaption: 'Fig. 03 — Aerial view of Faisalabad’s iconic Clock Tower (Ghanta Ghar) and its eight radiating bazaars at sunset.',
    imageSvgDataUri: '/src/assets/images/faisalabad_clock_tower_aerial_1793278027054.jpg',
    elevationSvgDataUri: createDraftedElevationSvg(),
    parameters: [
      { label: 'METROPOLITAN HUB', value: 'Ghanta Ghar & Eight Bazaars', highlight: true },
      { label: 'NORTHERN CORRIDOR', value: 'Millat Rd · 60 Feet Rd · Sargodha Rd', highlight: true },
      { label: 'COMMERCIAL YIELD', value: '8.5% – 11.2% Annual Rental Return', highlight: false },
      { label: 'INDUSTRIAL BASE', value: 'Textile & Commercial Capital of Punjab', highlight: false },
      { label: 'ADVISORY DESK', value: 'MEEZAN REAL ESTATE (+92 300 7785625)', highlight: true },
    ],
    zones: [
      {
        id: 'nao-01',
        code: 'OC-01',
        name: 'Central Clock Tower Rotunda',
        areaSqm: 1480,
        ceilingHeightM: 12.5,
        daylightFactor: '11.5%',
        materialPrimary: 'Red Sandstone & Heritage Masonry',
        acousticRating: 'Urban Civic Square',
        xPercent: 48,
        yPercent: 46,
        description: 'Central civic monument anchoring Chiniot Bazaar, Aminpur Bazaar, and Katchery Bazaar.',
      },
      {
        id: 'nao-02',
        code: 'OC-02',
        name: 'Northern Millat Road Expansion Axis',
        areaSqm: 2720,
        ceilingHeightM: 6.0,
        daylightFactor: '8.1%',
        materialPrimary: 'Modern Commercial Concrete & Glass',
        acousticRating: 'NRC 0.80',
        xPercent: 75,
        yPercent: 38,
        description: 'Direct arterial link connecting central Faisalabad to Millat Town D Block and M-4 Motorway.',
      },
    ],
  },
  {
    id: 'reykjanes-basalt-sanctuary',
    monographNo: '04',
    accessionCode: 'MZN.2026.FSD.404',
    title: 'Timber & Brick Evening Sunroom Villa (Uploaded Plate I)',
    subtitle: 'Bespoke Cedar Cladding, Coach Lantern Illumination & Mullioned Glass Salon',
    year: '2026',
    typology: 'Private Residences',
    typologyShort: 'UPLOADED VILLA',
    location: 'MILLAT TOWN',
    country: 'Pakistan',
    coordinates: '308 C Millat Rd · Millat Town Reference',
    featuredSpan: 'standard',
    grossInternalArea: '540 m²',
    structuralSystem: 'Seasoned Cedar Timber Frame & Hand-Molded Brick Masonry Wing',
    primaryMaterial: 'Horizontal Cedar Siding, Mullioned Glass & Warm Brass Lanterns',
    completionStatus: 'CLIENT UPLOADED SPECIMEN I',
    embodiedCarbonKgM2: 195,
    daylightAutonomy: '82.4%',
    leadCuratorQuote: {
      quote: 'By pairing warm horizontal cedar timber with classic brick masonry and floor-to-ceiling mullioned French doors, the residence glows like a warm lantern at dusk.',
      author: 'Mr. Muhammad Shahzad',
      role: 'Principal Advisor (5.0 ★)',
      institution: 'Meezan Real Estate Reviews',
    },
    narrativeLead: 'Uploaded architectural reference plate showcasing a warm timber-clad evening sunroom pavilion paired with traditional red brick masonry.',
    narrativeBody: 'Full-height mullioned glass doors open the glowing interior living room directly to the landscaped garden.',
    figureCaption: 'Fig. 04 — Client uploaded architectural plate I: Timber & brick sunroom villa at dusk.',
    imageSvgDataUri: '/assets/aistudio/unnamed_89661b6e.jpg',
    elevationSvgDataUri: createDraftedElevationSvg(),
    parameters: [
      { label: 'SPECIMEN PLATE', value: 'Client Uploaded Reference I', highlight: true },
      { label: 'PRIMARY ENVELOPE', value: 'Horizontal Cedar & Red Brick', highlight: false },
      { label: 'OPERATING HOURS', value: 'Open 24 Hours Daily', highlight: true },
      { label: 'GLAZING SYSTEM', value: 'Mullioned Timber French Doors', highlight: false },
      { label: 'DIRECT HOTLINE', value: '+92 300 7785625 (M. Shahzad)', highlight: true },
    ],
    zones: [
      {
        id: 'rey-01',
        code: 'RS-01',
        name: 'Cedar Sunroom & Evening Salon',
        areaSqm: 340,
        ceilingHeightM: 4.0,
        daylightFactor: '8.8%',
        materialPrimary: 'Cedar Cladding & Mullioned Glass',
        acousticRating: 'NRC 0.88',
        xPercent: 42,
        yPercent: 55,
        description: 'Warm timber-lined corner living pavilion with coach lantern facade illumination.',
      },
    ],
  },
  {
    id: 'engadin-timber-conservatory',
    monographNo: '05',
    accessionCode: 'MZN.2026.FSD.505',
    title: 'Stacked Slate & Cascading Water Sanctuary (Uploaded Plate II)',
    subtitle: 'Natural Split-Face Stone Strata & Organic Courtyard Waterfall Feature',
    year: '2026',
    typology: 'Sacred & Sanctuary',
    typologyShort: 'WATER WALL',
    location: 'FAISALABAD',
    country: 'Pakistan',
    coordinates: 'Rafeeq Chouk · Millat Town D Block',
    featuredSpan: 'standard',
    grossInternalArea: '640 m²',
    structuralSystem: 'Dry-Stacked Metamorphic Slate Masonry & Closed-Loop Hydro Basin',
    primaryMaterial: 'Split-Face Natural Slate, Organic Root Relief & Bronze Nozzles',
    completionStatus: 'CLIENT UPLOADED SPECIMEN II',
    embodiedCarbonKgM2: 145,
    daylightAutonomy: '88.0%',
    leadCuratorQuote: {
      quote: 'The stacked slate strata and natural cascading water wall lower ambient courtyard temperatures during Faisalabad summer afternoons.',
      author: 'Mr. Muhammad Shahzad',
      role: 'Principal Advisor',
      institution: 'Meezan Real Estate',
    },
    narrativeLead: 'Uploaded architectural reference plate detailing a textured split-face slate wall and organic stone relief veiled by cascading water.',
    narrativeBody: 'Designed for private courtyard cooling and acoustic serenity within high-end residential estates.',
    figureCaption: 'Fig. 05 — Client uploaded architectural plate II: Stacked slate and cascading water wall.',
    imageSvgDataUri: '/assets/aistudio/unnamed__1__f1c37e85.jpg',
    elevationSvgDataUri: createDraftedElevationSvg(),
    parameters: [
      { label: 'SPECIMEN PLATE', value: 'Client Uploaded Reference II', highlight: true },
      { label: 'STONEWORK STRATA', value: 'Dry-Stacked Split-Face Slate', highlight: true },
      { label: 'THERMAL COOLING', value: '-6.0°C Courtyard Micro-Climate', highlight: true },
      { label: 'ACOUSTIC PROFILE', value: '48 dBA Natural Water Veil', highlight: false },
      { label: 'LOCATION', value: '308 C MILLAT RD · FAISALABAD', highlight: false },
    ],
    zones: [
      {
        id: 'eng-01',
        code: 'CH-01',
        name: 'Symphonic Larch Vessel',
        areaSqm: 1120,
        ceilingHeightM: 11.4,
        daylightFactor: '5.5%',
        materialPrimary: 'Moon-Felled Engadin Larch',
        acousticRating: 'RT60 1.85s',
        xPercent: 50,
        yPercent: 48,
        description: '380-seat chamber music auditorium suspended inside the outer stone plinth.',
      },
    ],
  },
  {
    id: 'atacama-astronomical-cloister',
    monographNo: '06',
    accessionCode: 'ARC.2025.CHL.07',
    title: 'Atacama Astronomical Cloister',
    subtitle: 'Rammed Desert Earth & Weathered Bronze Celestial Research Sanctuary',
    year: '2025',
    typology: 'Sacred & Sanctuary',
    typologyShort: 'SANCTUARY',
    location: 'SAN PEDRO',
    country: 'Chile',
    coordinates: '22.9087° S, 68.1997° W',
    featuredSpan: 'wide',
    grossInternalArea: '2,950 m²',
    structuralSystem: '800mm Geopolymer Stabilized Rammed Earth & Post-Tensioned Ring Beam',
    primaryMaterial: 'Iron-Rich Atacama Aggregate, Patinated Bronze & Travertine',
    completionStatus: 'COMPLETED Q3 2025',
    embodiedCarbonKgM2: 168,
    daylightAutonomy: '96.0%',
    leadCuratorQuote: {
      quote: 'Across 45°C diurnal desert temperature swings, the 800mm rammed-earth walls maintain a passive interior equilibrium of 21.5°C with zero mechanical HVAC.',
      author: 'Dr. Mateo Valdivia',
      role: 'Director of Observational Fellowships',
      institution: 'Andean Astrophysical Consortium',
    },
    narrativeLead: 'At 2,400 meters elevation under the clearest night skies on Earth, the cloister houses visiting cosmologists and contemplative scholars.',
    narrativeBody: 'Excavated desert soils were compacted on-site into monolithic 800mm thermal walls whose thermal lag dampens extreme desert heat by twelve hours. At the center, an open meridian court aligns with the winter solstice zenith.',
    figureCaption: 'Fig. 06 — Meridian observation cloister framed by 800mm compacted desert earth walls.',
    imageSvgDataUri: createProjectSvg('atacama'),
    elevationSvgDataUri: createDraftedElevationSvg(),
    parameters: [
      { label: 'GROSS INTERNAL AREA', value: '2,950 m²', highlight: true },
      { label: 'WALL THERMAL ENVELOPE', value: '800mm Site-Compacted Rammed Earth', highlight: false },
      { label: 'PASSIVE THERMAL STABILITY', value: '21.5°C ±1.2°C (Zero Mechanical HVAC)', highlight: true },
      { label: 'BORTLE DARK-SKY RATING', value: 'Class 1 (Zero Light Pollution)', highlight: true },
      { label: 'COMPLETION', value: 'AUGUST 2025 · ATACAMA', highlight: false },
    ],
    zones: [
      {
        id: 'ata-01',
        code: 'AS-01',
        name: 'Solstice Meridian Cloister',
        areaSqm: 890,
        ceilingHeightM: 5.0,
        daylightFactor: 'Open Zenith',
        materialPrimary: 'Compacted Atacama Earth & Bronze',
        acousticRating: 'NRC 0.72',
        xPercent: 52,
        yPercent: 50,
        description: 'Sunken astronomical court calibrated to the Southern Cross transit.',
      },
    ],
  },
];

export const MATERIAL_SPECIMENS: MaterialSpecimen[] = [
  {
    id: 'travertine-limestone',
    code: 'MAT // 01',
    name: 'Vein-Cut Roman Travertine',
    originQuarry: 'Tivoli Basin, Italy (41.96° N)',
    category: 'Sedimentary Calcite Stone',
    densityKgM3: 2440,
    thermalMassKj: 2150,
    acousticNrc: 0.42,
    compressiveStrengthMpa: 118,
    surfaceFinish: 'Open-Pore Honed Matte (Unfilled)',
    architecturalApplication: 'Monolithic gallery plinths, museum stair treads, and solar thermal walls.',
    patinaTimeline: {
      year0: { label: 'Warm Alabaster Cream', hex: '#EBE3D5', note: 'Freshly sawed open-pore sedimentary strata.' },
      year10: { label: 'Honed Amber Limestone', hex: '#DFD3BE', note: 'Subtle mineral oxidation deepens pore contrast.' },
      year50: { label: 'Archival Museum Bone', hex: '#CFC0A6', note: 'Velvety tactile polish along high-touch thresholds.' },
    },
    textureSvgUri: createMaterialTextureSvg('#DFD3BE', '#8A7658', 'stone'),
  },
  {
    id: 'architectural-bronze',
    code: 'MAT // 02',
    name: 'Sulphur-Patinated Architectural Bronze',
    originQuarry: 'CuSn8 Alloy Foundry, Osaka & Basel',
    category: 'Non-Ferrous CuSn8 Alloy',
    densityKgM3: 8800,
    thermalMassKj: 3420,
    acousticNrc: 0.25,
    compressiveStrengthMpa: 410,
    surfaceFinish: 'Hand-Rubbed Oil & Wax over Dark Sulfide Patina',
    architecturalApplication: 'Curtain-wall mullions, cantilevered fascia reveals, and custom pivot hardware.',
    patinaTimeline: {
      year0: { label: 'Satin Muted Gold', hex: '#B8925A', note: 'Warm brushed metallic alloy with directional sheen.' },
      year10: { label: 'Burnished Umber Bronze', hex: '#7D6036', note: 'Protective cuprite oxide layer stabilizes against coastal salt.' },
      year50: { label: 'Obsidian Antique Patina', hex: '#4A3921', note: 'Self-healing dark mineral crust with luminous worn edges.' },
    },
    textureSvgUri: createMaterialTextureSvg('#3B2D1A', '#D2AE78', 'bronze'),
  },
  {
    id: 'charred-hinoki',
    code: 'MAT // 03',
    name: 'Yakisugi Charred Hinoki Cypress',
    originQuarry: 'Kiso Valley Forestry, Nagano (FSC)',
    category: 'Carbonized Structural Timber',
    densityKgM3: 540,
    thermalMassKj: 890,
    acousticNrc: 0.78,
    compressiveStrengthMpa: 48,
    surfaceFinish: 'Kiln-Charred 4mm Carbon Layer, Wire-Brushed & Camellia Oiled',
    architecturalApplication: 'Acoustic ceiling coffers, board-formed concrete moulds, and sanctuary screens.',
    patinaTimeline: {
      year0: { label: 'Iridescent Carbon Black', hex: '#1B1E24', note: 'Deep alligator-scale carbon crust; rot and fire resistant.' },
      year10: { label: 'Silvery Graphite Grain', hex: '#2B2F37', note: 'Latewood grain ridges emerge with subtle silver luster.' },
      year50: { label: 'Weathered Driftwood Slate', hex: '#3D414A', note: 'Zero structural decay; stabilized aromatic heartwood.' },
    },
    textureSvgUri: createMaterialTextureSvg('#181B20', '#B8925A', 'timber'),
  },
  {
    id: 'pozzolanic-basalt-concrete',
    code: 'MAT // 04',
    name: 'Pozzolanic Volcanic Basalt Concrete',
    originQuarry: 'Reykjanes & Eifel Volcanic Aggregate',
    category: 'Low-Clinker Geopolymer Concrete',
    densityKgM3: 2520,
    thermalMassKj: 2380,
    acousticNrc: 0.55,
    compressiveStrengthMpa: 95,
    surfaceFinish: 'Board-Formed or Bush-Hammered Exposed Aggregate',
    architecturalApplication: 'Post-tensioned cantilevers, subterranean retaining shells, and seismic cores.',
    patinaTimeline: {
      year0: { label: 'Deep Basalt Charcoal', hex: '#232730', note: '45% lower embodied carbon via volcanic ash substitution.' },
      year10: { label: 'Crystalline Slate', hex: '#2D323C', note: 'Ongoing pozzolanic hydration increases compressive strength by 18%.' },
      year50: { label: 'Lithic Monumental Gray', hex: '#383E49', note: 'Indistinguishable from natural igneous cliff formations.' },
    },
    textureSvgUri: createMaterialTextureSvg('#1B1F27', '#9B8F81', 'basalt'),
  },
];
