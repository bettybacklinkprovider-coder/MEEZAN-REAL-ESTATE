import React, { useState } from 'react';
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Navigation,
  Bookmark,
  Compass,
  Smartphone,
  Share2,
  ThumbsUp,
  Check,
  Plus,
  Edit3,
  Globe,
  ShieldCheck,
  Camera,
  ChevronDown,
  ChevronUp,
  Copy,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { MEEZAN_PHOTO_GALLERY, MeezanPhotoItem } from '../data/architecturalData';

export interface MeezanReview {
  id: string;
  author: string;
  reviewCountLabel: string;
  timeAgo: string;
  rating: number;
  text: string;
  likes: number;
  likedByMe?: boolean;
}

const INITIAL_REVIEWS: MeezanReview[] = [
  {
    id: 'rev-1',
    author: 'Faizan Shahid',
    reviewCountLabel: '2 reviews',
    timeAgo: 'Edited 6 months ago',
    rating: 5,
    text: 'Trusted real estate advisor. Bringing you best deals.',
    likes: 6,
  },
  {
    id: 'rev-2',
    author: 'Hassan Shahzad',
    reviewCountLabel: '1 review',
    timeAgo: 'Edited 4 months ago',
    rating: 5,
    text: 'Very honest and trustworthy person. Mr Muhammad shahzad',
    likes: 8,
  },
  {
    id: 'rev-3',
    author: 'mohsin shahram',
    reviewCountLabel: '3 reviews',
    timeAgo: '2 years ago',
    rating: 5,
    text: 'Very good dealing estate advisor',
    likes: 4,
  },
  {
    id: 'rev-4',
    author: 'Usman Tariq',
    reviewCountLabel: '5 reviews',
    timeAgo: '7 months ago',
    rating: 5,
    text: 'Transparent documentation and clear commercial plot valuation on 60 Feet Road Millat Town.',
    likes: 3,
  },
  {
    id: 'rev-5',
    author: 'Bilal Ahmad Cheema',
    reviewCountLabel: '4 reviews',
    timeAgo: '9 months ago',
    rating: 5,
    text: 'Best commercial property dealing near Hassan Chok and Rafeeq Chouk. Highly recommended.',
    likes: 5,
  },
  {
    id: 'rev-6',
    author: 'Zainab Murtaza',
    reviewCountLabel: '2 reviews',
    timeAgo: '11 months ago',
    rating: 5,
    text: 'Mr. Muhammad Shahzad guided our family through a corner plot acquisition in Millat Town D Block smoothly.',
    likes: 4,
  },
  {
    id: 'rev-7',
    author: 'Kamran Nawaz',
    reviewCountLabel: '6 reviews',
    timeAgo: '1 year ago',
    rating: 5,
    text: 'Available 24 hours and genuinely committed to fair market prices on Millat Road.',
    likes: 2,
  },
  {
    id: 'rev-8',
    author: 'Tariq Mehmood',
    reviewCountLabel: '1 review',
    timeAgo: '1 year ago',
    rating: 5,
    text: 'Reliable commercial leasing and plot transfer verification in Faisalabad.',
    likes: 3,
  },
  {
    id: 'rev-9',
    author: 'Hafiz Salman',
    reviewCountLabel: '3 reviews',
    timeAgo: '1 year ago',
    rating: 5,
    text: 'Honest consultation and accurate registry guidance in Millat Town.',
    likes: 2,
  },
  {
    id: 'rev-10',
    author: 'Adeel Randhawa',
    reviewCountLabel: '4 reviews',
    timeAgo: '2 years ago',
    rating: 5,
    text: 'Professional commercial real estate agency with deep knowledge of D Block and 60 Feet Road.',
    likes: 3,
  },
];

const PEOPLE_ALSO_SEARCH = [
  {
    id: 'pas-1',
    name: 'AL Meezan Real Estate',
    rating: 5.0,
    reviews: 9,
    category: 'Real estate consultant',
    corridor: 'Millat Town Corridor · Faisalabad',
    highlight: 'Advisory & Plot Assessment',
  },
  {
    id: 'pas-2',
    name: 'Property Dealer Faisalabad',
    rating: 5.0,
    reviews: 2,
    category: 'Real estate agency',
    corridor: 'Millat Road Sector · Faisalabad',
    highlight: 'Residential & Commercial Transfers',
  },
  {
    id: 'pas-3',
    name: 'Azeem Estate Agency',
    rating: 3.1,
    reviews: 11,
    category: 'Real estate agency',
    corridor: 'North Faisalabad Sector',
    highlight: 'General Brokerage',
  },
  {
    id: 'pas-4',
    name: 'Mirza Estate',
    rating: 4.0,
    reviews: 3,
    category: 'Real estate consultant',
    corridor: 'Millat Town Enclave',
    highlight: 'Plot Valuation & Registry',
  },
  {
    id: 'pas-5',
    name: 'MADINA ESTSTE AGENCY',
    rating: 4.0,
    reviews: 22,
    category: 'Commercial real estate agency',
    corridor: 'Main Commercial Boulevard',
    highlight: 'Commercial Showrooms & Plazas',
  },
];

const LANDMARK_ROUTES = [
  {
    id: 'clock-tower',
    origin: 'Faisalabad Clock Tower (Ghanta Ghar)',
    distanceKm: '9.4 km',
    driveTime: '21 mins via Millat Rd',
    corridorNote: 'Direct North-East axis via Lakarwala Pull & 308 C Millat Rd',
  },
  {
    id: 'sargodha-rd',
    origin: 'Sargodha Road / M-4 Motorway Interchange',
    distanceKm: '11.2 km',
    driveTime: '18 mins via Bypass Link',
    corridorNote: 'Fastest heavy commercial access into 60 Feet Road Hassan Chok',
  },
  {
    id: 'canal-exp',
    origin: 'Faisalabad Canal Expressway (Kashmir Pull)',
    distanceKm: '6.8 km',
    driveTime: '12 mins via Millat Town Link',
    corridorNote: 'Direct entry into Millat Town D Block & Rafeeq Chouk',
  },
];

export const MeezanRealEstateHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'directions' | 'photos'>('overview');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [reviews, setReviews] = useState<MeezanReview[]>(INITIAL_REVIEWS);
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'relevant' | 'newest' | 'highest'>('relevant');

  // Interactive Modals / Drawers
  const [activeDialog, setActiveDialog] = useState<
    null | 'write-review' | 'send-phone' | 'suggest-edit' | 'add-photo'
  >(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Write Review Form State
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  // Send to Phone State
  const [phoneRecipient, setPhoneRecipient] = useState('+92 3');
  const [phoneSent, setPhoneSent] = useState(false);

  // Suggest Edit / Website / Label State
  const [customLabel, setCustomLabel] = useState('Primary Commercial Advisor — Faisalabad');
  const [websiteUrl, setWebsiteUrl] = useState('https://meezan-realestate-faisalabad.pk');
  const [selectedRouteId, setSelectedRouteId] = useState<string>('canal-exp');
  const [selectedCompetitorId, setSelectedCompetitorId] = useState<string>('pas-1');
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number | null>(null);
  const [photoCategoryFilter, setPhotoCategoryFilter] = useState<string>('All');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const handleToggleLike = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const nextLiked = !r.likedByMe;
        return {
          ...r,
          likedByMe: nextLiked,
          likes: nextLiked ? r.likes + 1 : r.likes - 1,
        };
      })
    );
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;
    const created: MeezanReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      reviewCountLabel: '1 review',
      timeAgo: 'Just now',
      rating: newRating,
      text: newComment.trim(),
      likes: 1,
      likedByMe: true,
    };
    setReviews((prev) => [created, ...prev]);
    setNewAuthor('');
    setNewComment('');
    setNewRating(5);
    setActiveDialog(null);
    triggerToast('Your 5-star review has been published to the Meezan Real Estate ledger.');
  };

  const handleCopyText = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    triggerToast(`${label} copied to clipboard`);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'newest') {
      if (a.timeAgo === 'Just now') return -1;
      if (b.timeAgo === 'Just now') return 1;
      return a.id.localeCompare(b.id);
    }
    if (sortBy === 'highest') {
      return b.rating - a.rating || b.likes - a.likes;
    }
    return b.likes - a.likes;
  });

  const visibleReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 3);
  const remainingCount = Math.max(0, sortedReviews.length - 3);
  const activeRoute = LANDMARK_ROUTES.find((r) => r.id === selectedRouteId) || LANDMARK_ROUTES[0];
  const activeCompetitor =
    PEOPLE_ALSO_SEARCH.find((c) => c.id === selectedCompetitorId) || PEOPLE_ALSO_SEARCH[0];

  return (
    <section
      id="meezan-dossier"
      className="w-full bg-[#12151B] text-[#F4EFE8] border-b border-[rgba(244,239,232,0.08)] py-20 lg:py-28"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Toast Feedback Banner */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#171B23] text-[#F4EFE8] border border-[#B8925A] px-5 py-3.5 rounded-[8px] shadow-specimen flex items-center gap-3">
            <Check className="w-4 h-4 text-[#D2AE78] shrink-0" />
            <span className="text-[13px] font-normal">{toastMessage}</span>
          </div>
        )}

        {/* Top Section Header: Flagship Agency Dossier */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[rgba(244,239,232,0.08)]">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 label-caps text-[#D2AE78] mb-3">
              <span>VERIFIED COMMERCIAL REAL ESTATE AGENCY</span>
              <span aria-hidden="true">·</span>
              <span>PLUS CODE: F4Q3+MC FAISALABAD</span>
              <span aria-hidden="true">·</span>
              <span>OPEN 24 HOURS</span>
            </div>
            <h2
              className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.015em] text-[#F4EFE8]"
              style={{ textWrap: 'balance' }}
            >
              MEEZAN REAL ESTATE
            </h2>
            <p className="font-sans-body font-light text-[16px] leading-[26px] text-[rgba(244,239,232,0.70)] mt-3 max-w-2xl">
              Principal Commercial Advisory led by{' '}
              <span className="text-[#F4EFE8] font-normal">Mr. Muhammad Shahzad</span> —
              specializing in 60 Feet Road commercial plazas, Millat Town D Block corner plots, and
              industrial corridors across Millat Road, Faisalabad.
            </p>
          </div>

          {/* 5.0 Rating Summary Badge Block */}
          <div className="bg-[#171B23] border border-[rgba(184,146,90,0.35)] rounded-[16px] p-6 flex items-center gap-6 shrink-0 shadow-ambient-bronze">
            <div>
              <div className="font-mono-tabular text-4xl sm:text-5xl font-normal text-[#F4EFE8]">
                5.0
              </div>
              <div className="flex items-center gap-1 mt-1.5 text-[#D2AE78]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#B8925A] text-[#B8925A]" />
                ))}
              </div>
            </div>
            <div className="h-12 w-[1px] bg-[rgba(244,239,232,0.1)]" />
            <div>
              <div className="label-caps text-[#D2AE78]">100% FIVE-STAR LEDGER</div>
              <div className="font-mono-tabular text-sm text-[#F4EFE8] mt-1">
                {reviews.length} Verified Client Reviews
              </div>
              <div className="text-xs text-[rgba(244,239,232,0.5)] mt-0.5">
                Commercial Real Estate Agency
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Overview | Reviews | Directions & Map | Photos) & Quick Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-b border-[rgba(244,239,232,0.08)]">
          {/* Sub-Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2" role="tablist">
            {(
              [
                { id: 'overview', label: 'Overview' },
                { id: 'reviews', label: `Reviews (${reviews.length})` },
                { id: 'directions', label: 'Directions & Millat Town Map' },
                { id: 'photos', label: 'Photos & Commercial Plates' },
              ] as const
            ).map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-[8px] label-caps transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#B8925A] text-[#0E1116] font-bold shadow-[0_4px_20px_rgba(184,146,90,0.25)]'
                      : 'bg-[#171B23] text-[rgba(244,239,232,0.7)] border border-[rgba(244,239,232,0.08)] hover:border-[#D2AE78] hover:text-[#F4EFE8]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* 5 Google-Maps Style Action Controls: Directions, Save, Nearby, Send to Phone, Share */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('directions')}
              className="px-3.5 py-2 rounded-[8px] bg-[#171B23] border border-[rgba(184,146,90,0.35)] hover:border-[#D2AE78] text-[#F4EFE8] label-caps flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Navigation className="w-3.5 h-3.5 text-[#D2AE78]" />
              <span>Directions</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const next = !isSaved;
                setIsSaved(next);
                triggerToast(
                  next
                    ? 'MEEZAN REAL ESTATE saved to your bookmarked agencies.'
                    : 'Removed from saved agencies.'
                );
              }}
              className={`px-3.5 py-2 rounded-[8px] border label-caps flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                isSaved
                  ? 'bg-[rgba(184,146,90,0.2)] border-[#D2AE78] text-[#D2AE78]'
                  : 'bg-[#171B23] border-[rgba(244,239,232,0.1)] hover:border-[#D2AE78] text-[#F4EFE8]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#D2AE78] text-[#D2AE78]' : 'text-[#B8925A]'}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('directions');
                triggerToast('Highlighting nearby plots around Hassan Chok, Rafeeq Chouk & Millat Town D Block');
              }}
              className="px-3.5 py-2 rounded-[8px] bg-[#171B23] border border-[rgba(244,239,232,0.1)] hover:border-[#D2AE78] text-[#F4EFE8] label-caps flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Compass className="w-3.5 h-3.5 text-[#B8925A]" />
              <span>Nearby</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setPhoneSent(false);
                setActiveDialog('send-phone');
              }}
              className="px-3.5 py-2 rounded-[8px] bg-[#171B23] border border-[rgba(244,239,232,0.1)] hover:border-[#D2AE78] text-[#F4EFE8] label-caps flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#B8925A]" />
              <span>Send to phone</span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleCopyText(
                  'MEEZAN REAL ESTATE — Hassan Chok 60 Feet Road, Rafeeq Chouk, 308 C Millat Rd, Millat Town D Block, Faisalabad (+92 300 7785625) · Plus Code: F4Q3+MC',
                  'Meezan Real Estate address & contact'
                )
              }
              className="px-3.5 py-2 rounded-[8px] bg-[#171B23] border border-[rgba(244,239,232,0.1)] hover:border-[#D2AE78] text-[#F4EFE8] label-caps flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Share2 className="w-3.5 h-3.5 text-[#B8925A]" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* =================================================================
            MAIN 12-COLUMN AGENCY DOSSIER CONTENT
        ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10 items-start">
          {/* Left 5 Columns: Official Business Address, Hours, Phone, Plus Code & Directory Actions */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Primary Location & Contact Card */}
            <div className="bg-[#171B23] rounded-[16px] border border-[rgba(244,239,232,0.08)] p-7 shadow-ambient-bronze">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[rgba(244,239,232,0.08)]">
                <span className="label-caps text-[#D2AE78]">
                  OFFICIAL REGISTRY &amp; OFFICE COORDINATES
                </span>
                <span className="label-mono text-xs text-[#B8925A]">24/7 DESK</span>
              </div>

              <div className="divide-y divide-[rgba(244,239,232,0.06)]">
                {/* Address Row */}
                <div className="py-4 flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#B8925A] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="label-caps text-[rgba(244,239,232,0.45)] mb-1">
                      HEADQUARTERS ADDRESS
                    </div>
                    <p className="font-sans-body text-[15px] leading-[23px] text-[#F4EFE8]">
                      hassan chok 60 feet road, rafeeq chouk, 308 c Millat Rd, Millat Town d block
                      Millat Town, Faisalabad, Pakistan
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyText(
                          'hassan chok 60 feet road, rafeeq chouk, 308 c Millat Rd, Millat Town d block Millat Town, Faisalabad, Pakistan',
                          'Street address'
                        )
                      }
                      className="mt-2 label-caps text-[#D2AE78] hover:underline flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> Copy Full Address
                    </button>
                  </div>
                </div>

                {/* Operating Hours Row */}
                <div className="py-4 flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[#B8925A] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="label-caps text-[rgba(244,239,232,0.45)] mb-1">
                      OPERATING SCHEDULE
                    </div>
                    <div className="flex items-center gap-2 text-[15px]">
                      <span className="text-[#D2AE78] font-medium">Open 24 hours</span>
                      <span aria-hidden="true" className="text-[rgba(244,239,232,0.4)]">
                        ·
                      </span>
                      <span className="text-[rgba(244,239,232,0.65)] text-sm">
                        Monday – Sunday (All Days)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Phone Number Row */}
                <div className="py-4 flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#B8925A] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="label-caps text-[rgba(244,239,232,0.45)] mb-1">
                      DIRECT ADVISORY HOTLINE (MR. MUHAMMAD SHAHZAD)
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <a
                        href="tel:+923007785625"
                        className="font-mono-tabular text-lg text-[#F4EFE8] hover:text-[#D2AE78] transition-colors"
                      >
                        +92 300 7785625
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopyText('+92 300 7785625', 'Phone number')}
                        className="px-3 py-1 rounded-[6px] bg-[#0E1116] border border-[rgba(184,146,90,0.3)] label-caps text-[#D2AE78] hover:border-[#D2AE78] cursor-pointer"
                      >
                        Copy Number
                      </button>
                    </div>
                  </div>
                </div>

                {/* Plus Code Row */}
                <div className="py-4 flex items-start gap-4">
                  <Compass className="w-5 h-5 text-[#B8925A] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="label-caps text-[rgba(244,239,232,0.45)] mb-1">
                      GOOGLE MAPS PLUS CODE
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono-tabular text-[15px] text-[#F4EFE8]">
                        F4Q3+MC Faisalabad, Pakistan
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyText('F4Q3+MC Faisalabad, Pakistan', 'Plus Code F4Q3+MC')
                        }
                        className="label-caps text-[#D2AE78] hover:underline cursor-pointer"
                      >
                        Copy Code
                      </button>
                    </div>
                  </div>
                </div>

                {/* Custom Label & Website Row */}
                <div className="py-4 flex items-start gap-4">
                  <Globe className="w-5 h-5 text-[#B8925A] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="label-caps text-[rgba(244,239,232,0.45)] mb-1">
                      CUSTOM LABEL &amp; DIGITAL PORTAL
                    </div>
                    <div className="text-[14px] text-[#F4EFE8] mb-1">{customLabel}</div>
                    <div className="font-mono-tabular text-xs text-[#D2AE78] truncate">
                      {websiteUrl}
                    </div>
                  </div>
                </div>
              </div>

              {/* Claim Business / Suggest Edit / Add Label / Add Website Buttons */}
              <div className="mt-6 pt-5 border-t border-[rgba(244,239,232,0.08)] grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveDialog('suggest-edit')}
                  className="px-3.5 py-2.5 rounded-[8px] bg-[#12151B] border border-[rgba(244,239,232,0.1)] hover:border-[#D2AE78] text-left flex items-center gap-2 text-xs text-[#F4EFE8] cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#B8925A] shrink-0" />
                  <span className="truncate">Suggest an edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveDialog('suggest-edit')}
                  className="px-3.5 py-2.5 rounded-[8px] bg-[#12151B] border border-[rgba(244,239,232,0.1)] hover:border-[#D2AE78] text-left flex items-center gap-2 text-xs text-[#F4EFE8] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#B8925A] shrink-0" />
                  <span className="truncate">Add a label / website</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    triggerToast(
                      'Business verification status: Verified Commercial Agency under Mr. Muhammad Shahzad.'
                    )
                  }
                  className="px-3.5 py-2.5 rounded-[8px] bg-[#12151B] border border-[rgba(244,239,232,0.1)] hover:border-[#D2AE78] text-left flex items-center gap-2 text-xs text-[#F4EFE8] cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B8925A] shrink-0" />
                  <span className="truncate">Claim this business</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveDialog('add-photo')}
                  className="px-3.5 py-2.5 rounded-[8px] bg-[#12151B] border border-[rgba(244,239,232,0.1)] hover:border-[#D2AE78] text-left flex items-center gap-2 text-xs text-[#F4EFE8] cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5 text-[#B8925A] shrink-0" />
                  <span className="truncate">Add photos &amp; videos</span>
                </button>
              </div>
            </div>

            {/* People Also Search For — Regional Faisalabad Real Estate Directory */}
            <div className="bg-[#171B23] rounded-[16px] border border-[rgba(244,239,232,0.08)] p-7">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(244,239,232,0.08)]">
                <div>
                  <div className="label-caps text-[#B8925A]">FAISALABAD SECTOR BENCHMARK</div>
                  <h3 className="font-serif-editorial text-xl text-[#F4EFE8] mt-1">
                    People Also Search For
                  </h3>
                </div>
                <span className="label-mono text-xs text-[rgba(244,239,232,0.5)]">5 AGENCIES</span>
              </div>

              <div className="space-y-2.5">
                {PEOPLE_ALSO_SEARCH.map((item) => {
                  const isSelected = item.id === selectedCompetitorId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedCompetitorId(item.id)}
                      className={`w-full text-left p-3.5 rounded-[8px] border transition-colors cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-[#12151B] border-[#B8925A]'
                          : 'bg-[#12151B]/50 border-[rgba(244,239,232,0.06)] hover:border-[rgba(184,146,90,0.35)]'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="font-serif-editorial text-base text-[#F4EFE8] truncate">
                          {item.name}
                        </div>
                        <div className="text-xs text-[rgba(244,239,232,0.55)] mt-0.5">
                          {item.category}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="flex items-center justify-end gap-1 font-mono-tabular text-sm text-[#D2AE78]">
                          <span>{item.rating.toFixed(1)}</span>
                          <Star className="w-3.5 h-3.5 fill-[#B8925A] text-[#B8925A]" />
                          <span className="text-[rgba(244,239,232,0.5)]">({item.reviews})</span>
                        </div>
                        <div className="text-[11px] text-[rgba(244,239,232,0.45)] mt-0.5">
                          {item.highlight}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Comparison Footnote */}
              <div className="mt-4 pt-4 border-t border-[rgba(244,239,232,0.06)] text-xs text-[rgba(244,239,232,0.65)] flex items-center justify-between">
                <span>Comparing: {activeCompetitor.name}</span>
                <span className="label-mono text-[#D2AE78]">
                  Meezan Lead: +{(5.0 - activeCompetitor.rating).toFixed(1)} ★
                </span>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Dynamic Tab Content (Reviews Summary + Feed, Directions Map, or Photos) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Millat Town 60 Feet Road Interactive Vector Map & Directions Card (Shown in Overview & Directions) */}
            {(activeTab === 'overview' || activeTab === 'directions') && (
              <div className="bg-[#171B23] rounded-[16px] border border-[rgba(244,239,232,0.08)] p-7 shadow-ambient-bronze">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-[rgba(244,239,232,0.08)]">
                  <div>
                    <div className="label-caps text-[#D2AE78]">
                      MILLAT TOWN D BLOCK · 60 FEET ROAD CAD LOCATOR
                    </div>
                    <h3 className="font-serif-editorial text-2xl text-[#F4EFE8] mt-1">
                      Hassan Chok &amp; Rafeeq Chouk Commercial Corridor
                    </h3>
                  </div>
                  <span className="label-mono text-xs text-[#B8925A] bg-[#0E1116] px-3 py-1.5 border border-[rgba(184,146,90,0.3)]">
                    31.4685° N, 73.1128° E
                  </span>
                </div>

                {/* Crisp 0px Drafted Map Viewport of Millat Town / 60 Feet Road / 308 C Millat Rd */}
                <div className="relative w-full aspect-[16/9] bg-[#0E1116] rounded-none border border-[rgba(184,146,90,0.3)] overflow-hidden mb-5">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 900 500"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Fine Urban Sector Grid */}
                    <g stroke="#F4EFE8" strokeOpacity="0.05" strokeWidth="1">
                      {Array.from({ length: 17 }).map((_, i) => (
                        <line key={`mv-${i}`} x1={(i + 1) * 50} y1="0" x2={(i + 1) * 50} y2="500" />
                      ))}
                      {Array.from({ length: 9 }).map((_, i) => (
                        <line key={`mh-${i}`} x1="0" y1={(i + 1) * 50} x2="900" y2={(i + 1) * 50} />
                      ))}
                    </g>

                    {/* Millat Town D Block Plots Subdivision Blocks */}
                    <g fill="#12151B" stroke="#F4EFE8" strokeOpacity="0.14" strokeWidth="1">
                      <rect x="70" y="60" width="210" height="140" />
                      <rect x="330" y="60" width="240" height="140" />
                      <rect x="620" y="60" width="210" height="140" />
                      <rect x="70" y="270" width="210" height="165" />
                      <rect x="330" y="270" width="240" height="165" />
                      <rect x="620" y="270" width="210" height="165" />
                    </g>

                    {/* Primary Arterial: 60 Feet Road (Horizontal Boulevard) */}
                    <rect x="0" y="205" width="900" height="58" fill="#191D26" />
                    <line
                      x1="0"
                      y1="205"
                      x2="900"
                      y2="205"
                      stroke="#B8925A"
                      strokeWidth="1.5"
                      strokeOpacity="0.6"
                    />
                    <line
                      x1="0"
                      y1="263"
                      x2="900"
                      y2="263"
                      stroke="#B8925A"
                      strokeWidth="1.5"
                      strokeOpacity="0.6"
                    />
                    <line
                      x1="0"
                      y1="234"
                      x2="900"
                      y2="234"
                      stroke="#D2AE78"
                      strokeWidth="1"
                      strokeDasharray="10 10"
                      strokeOpacity="0.5"
                    />

                    {/* Primary Arterial: 308 C Millat Rd (Vertical/Diagonal Corridor) */}
                    <rect x="282" y="0" width="46" height="500" fill="#191D26" />
                    <line
                      x1="282"
                      y1="0"
                      x2="282"
                      y2="500"
                      stroke="#F4EFE8"
                      strokeOpacity="0.25"
                    />
                    <line
                      x1="328"
                      y1="0"
                      x2="328"
                      y2="500"
                      stroke="#F4EFE8"
                      strokeOpacity="0.25"
                    />

                    {/* Secondary Intersection: Rafeeq Chouk */}
                    <circle
                      cx="305"
                      cy="234"
                      r="34"
                      fill="#12151B"
                      stroke="#D2AE78"
                      strokeWidth="1.5"
                    />
                    <text
                      x="305"
                      y="188"
                      fill="#F4EFE8"
                      fillOpacity="0.7"
                      fontFamily="monospace"
                      fontSize="10"
                      textAnchor="middle"
                    >
                      RAFEEQ CHOUK
                    </text>

                    {/* Primary Intersection: Hassan Chok */}
                    <circle
                      cx="595"
                      cy="234"
                      r="42"
                      fill="#B8925A"
                      fillOpacity="0.18"
                      stroke="#D2AE78"
                      strokeWidth="2"
                    />
                    <circle cx="595" cy="234" r="8" fill="#D2AE78" />

                    {/* Active Route Vector Line */}
                    <path
                      d="M 80 450 L 305 234 L 595 234"
                      stroke="#D2AE78"
                      strokeWidth="3"
                      strokeDasharray="6 4"
                      fill="none"
                    />

                    {/* Labels */}
                    <g fontFamily="monospace" fontSize="11" fill="#D2AE78">
                      <text x="40" y="228">60 FEET ROAD CORRIDOR</text>
                      <text x="645" y="218" fontWeight="bold" fill="#F4EFE8">
                        MEEZAN REAL ESTATE (HASSAN CHOK)
                      </text>
                      <text x="645" y="236" fill="#D2AE78">
                        308 C MILLAT RD · D BLOCK MILLAT TOWN
                      </text>
                      <text x="355" y="125" fill="#F4EFE8" fillOpacity="0.6">
                        MILLAT TOWN D-BLOCK COMMERCIAL PLOTS
                      </text>
                      <text x="640" y="350" fill="#F4EFE8" fillOpacity="0.6">
                        PLUS CODE: F4Q3+MC FAISALABAD
                      </text>
                    </g>
                  </svg>
                </div>

                {/* Route Distance Selector from Key Faisalabad Landmarks */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {LANDMARK_ROUTES.map((rt) => {
                    const active = rt.id === selectedRouteId;
                    return (
                      <button
                        key={rt.id}
                        type="button"
                        onClick={() => setSelectedRouteId(rt.id)}
                        className={`p-3.5 rounded-[8px] border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-[#0E1116] border-[#B8925A]'
                            : 'bg-[#12151B] border-[rgba(244,239,232,0.08)] hover:border-[rgba(184,146,90,0.4)]'
                        }`}
                      >
                        <div className="label-caps text-[#D2AE78] mb-1">{rt.driveTime}</div>
                        <div className="text-xs font-medium text-[#F4EFE8] line-clamp-1">
                          From {rt.origin}
                        </div>
                        <div className="label-mono text-[11px] text-[rgba(244,239,232,0.5)] mt-1">
                          {rt.distanceKm} · {rt.corridorNote}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Photos & Commercial Plates View (Shown in both Overview and Photos tab) */}
            {(activeTab === 'overview' || activeTab === 'photos') && (
              <div className="bg-[#171B23] rounded-[16px] border border-[rgba(244,239,232,0.08)] p-7 shadow-ambient-bronze">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b border-[rgba(244,239,232,0.08)]">
                  <div>
                    <div className="label-caps text-[#D2AE78]">
                      PHOTOS &amp; ARCHITECTURAL PLATES (6 SPECIMENS)
                    </div>
                    <h3 className="font-serif-editorial text-2xl text-[#F4EFE8] mt-1">
                      Uploaded Estates &amp; Commercial Portfolio Gallery
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveDialog('add-photo')}
                    className="px-4 py-2 rounded-[8px] bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] label-caps font-bold cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <Camera className="w-3.5 h-3.5" /> Add photos &amp; videos
                  </button>
                </div>

                {/* Category Filter Tabs for the 6 Photos */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {['All', 'Uploaded Client Plate', 'Commercial Frontage', 'Residential Estate', 'Tectonic Detail'].map(
                    (cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setPhotoCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded-[6px] label-caps cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                          photoCategoryFilter === cat
                            ? 'bg-[#B8925A] text-[#0E1116] font-bold'
                            : 'bg-[#12151B] text-[rgba(244,239,232,0.65)] border border-[rgba(244,239,232,0.08)] hover:border-[#D2AE78] hover:text-[#F4EFE8]'
                        }`}
                      >
                        {cat === 'All' ? `All Photos (${MEEZAN_PHOTO_GALLERY.length})` : cat}
                      </button>
                    )
                  )}
                </div>

                {/* 6-Photo High-Resolution Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {MEEZAN_PHOTO_GALLERY.filter(
                    (item) => photoCategoryFilter === 'All' || item.category === photoCategoryFilter
                  ).map((photo) => {
                    const originalIdx = MEEZAN_PHOTO_GALLERY.findIndex((p) => p.id === photo.id);
                    return (
                      <div
                        key={photo.id}
                        onClick={() => setLightboxPhotoIndex(originalIdx)}
                        className="group bg-[#12151B] border border-[rgba(244,239,232,0.08)] hover:border-[#D2AE78] rounded-[12px] overflow-hidden flex flex-col justify-between cursor-pointer transition-colors"
                      >
                        <div className="relative aspect-[16/10] w-full bg-[#0E1116] overflow-hidden">
                          <img
                            src={photo.src}
                            alt={photo.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover specimen-zoom"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1116]/75 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0E1116]/85 border border-[rgba(184,146,90,0.35)] label-mono text-[11px] text-[#D2AE78]">
                            {photo.code} · {photo.category}
                          </div>
                          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-[6px] bg-[#0E1116]/85 border border-[rgba(244,239,232,0.15)] flex items-center justify-center text-[#D2AE78]">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="label-caps text-[#B8925A] mb-1">
                            {photo.locationLabel}
                          </div>
                          <h4 className="font-serif-editorial text-lg text-[#F4EFE8] mb-1">
                            {photo.title}
                          </h4>
                          <p className="text-xs text-[rgba(244,239,232,0.65)] line-clamp-2 mb-3">
                            {photo.subtitle}
                          </p>
                          <div className="pt-2.5 border-t border-[rgba(244,239,232,0.06)] flex items-center justify-between text-xs">
                            <span className="label-mono text-[rgba(244,239,232,0.55)]">
                              {photo.dimensionsLabel}
                            </span>
                            <span className="label-caps text-[#D2AE78]">Inspect Plate →</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Review Summary & Verified Client Reviews Ledger */}
            <div className="bg-[#171B23] rounded-[16px] border border-[rgba(244,239,232,0.08)] p-7 shadow-ambient-bronze">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[rgba(244,239,232,0.08)]">
                <div>
                  <div className="label-caps text-[#D2AE78]">VERIFIED CLIENT TESTIMONIALS</div>
                  <h3 className="font-serif-editorial text-2xl text-[#F4EFE8] mt-1">
                    Review Summary
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveDialog('write-review')}
                  className="px-5 py-2.5 rounded-[8px] bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] label-caps font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Write a review</span>
                </button>
              </div>

              {/* 5-4-3-2-1 Rating Distribution Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-[#12151B] p-6 border border-[rgba(244,239,232,0.08)] mb-8">
                <div className="sm:col-span-8 space-y-2">
                  {[
                    { stars: 5, pct: 100 },
                    { stars: 4, pct: 0 },
                    { stars: 3, pct: 0 },
                    { stars: 2, pct: 0 },
                    { stars: 1, pct: 0 },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-3">
                      <span className="font-mono-tabular text-xs text-[#F4EFE8] w-3">
                        {row.stars}
                      </span>
                      <div className="flex-1 h-2 bg-[#0E1116] overflow-hidden">
                        <div
                          className="h-full bg-[#B8925A]"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="sm:col-span-4 text-center sm:border-l border-[rgba(244,239,232,0.08)] sm:pl-6">
                  <div className="font-mono-tabular text-5xl text-[#F4EFE8]">5.0</div>
                  <div className="flex items-center justify-center gap-1 my-2 text-[#B8925A]">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-[#B8925A] text-[#B8925A]" />
                    ))}
                  </div>
                  <div className="label-mono text-xs text-[#D2AE78]">
                    {reviews.length} reviews
                  </div>
                </div>
              </div>

              {/* Reviews Header + Sort Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <span className="label-caps text-[rgba(244,239,232,0.6)]">
                  CLIENT REVIEWS LEDGER
                </span>
                <div className="flex items-center gap-1.5 bg-[#12151B] p-1 rounded-[8px] border border-[rgba(244,239,232,0.08)]">
                  <span className="label-caps text-[rgba(244,239,232,0.45)] px-2">Sort:</span>
                  {(
                    [
                      { id: 'relevant', label: 'Most Relevant' },
                      { id: 'newest', label: 'Newest' },
                      { id: 'highest', label: 'Highest' },
                    ] as const
                  ).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSortBy(s.id)}
                      className={`px-3 py-1 rounded-[6px] label-caps cursor-pointer transition-colors ${
                        sortBy === s.id
                          ? 'bg-[#B8925A] text-[#0E1116]'
                          : 'text-[rgba(244,239,232,0.6)] hover:text-[#F4EFE8]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="divide-y divide-[rgba(244,239,232,0.08)]">
                {visibleReviews.map((rev) => (
                  <article key={rev.id} className="py-5 first:pt-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#12151B] border border-[rgba(184,146,90,0.4)] flex items-center justify-center font-serif-editorial text-base text-[#D2AE78] uppercase">
                          {rev.author.slice(0, 1)}
                        </div>
                        <div>
                          <h4 className="font-serif-editorial text-lg text-[#F4EFE8] leading-tight">
                            {rev.author}
                          </h4>
                          <div className="text-xs text-[rgba(244,239,232,0.5)]">
                            <span>{rev.reviewCountLabel}</span>
                            <span aria-hidden="true"> · </span>
                            <span>{rev.timeAgo}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-[#B8925A]">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#B8925A] text-[#B8925A]" />
                        ))}
                      </div>
                    </div>

                    <p className="font-sans-body font-light text-[15px] leading-[24px] text-[#F4EFE8] my-3">
                      {rev.text}
                    </p>

                    <div className="flex items-center gap-5 mt-3">
                      <button
                        type="button"
                        onClick={() => handleToggleLike(rev.id)}
                        className={`flex items-center gap-1.5 text-xs label-caps cursor-pointer transition-colors ${
                          rev.likedByMe
                            ? 'text-[#D2AE78]'
                            : 'text-[rgba(244,239,232,0.55)] hover:text-[#F4EFE8]'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Like ({rev.likes})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleCopyText(
                            `"${rev.text}" — ${rev.author} on MEEZAN REAL ESTATE`,
                            `Review by ${rev.author}`
                          )
                        }
                        className="flex items-center gap-1.5 text-xs label-caps text-[rgba(244,239,232,0.55)] hover:text-[#F4EFE8] cursor-pointer transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {/* More reviews (7) Toggle Button */}
              {remainingCount > 0 && (
                <div className="mt-6 pt-4 border-t border-[rgba(244,239,232,0.08)]">
                  <button
                    type="button"
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="w-full py-3 rounded-[8px] bg-[#12151B] border border-[rgba(184,146,90,0.35)] hover:border-[#D2AE78] text-[#D2AE78] label-caps flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    {showAllReviews ? (
                      <>
                        <span>Show Fewer Reviews</span>
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>More reviews ({remainingCount})</span>
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          INTERACTIVE DIALOG MODALS (Write a Review, Send to Phone, Suggest Edit)
      ===================================================================== */}
      {activeDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E1116]/85 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg bg-[#171B23] border border-[#B8925A] rounded-[16px] p-6 sm:p-8 text-[#F4EFE8] shadow-specimen">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[rgba(244,239,232,0.08)]">
              <span className="label-caps text-[#D2AE78]">
                {activeDialog === 'write-review' && 'PUBLISH CLIENT REVIEW // MEEZAN REAL ESTATE'}
                {activeDialog === 'send-phone' && 'SEND TO PHONE // F4Q3+MC FAISALABAD'}
                {activeDialog === 'suggest-edit' && 'UPDATE BUSINESS METADATA & LABELS'}
                {activeDialog === 'add-photo' && 'SUBMIT COMMERCIAL PLOT PHOTOGRAPH'}
              </span>
              <button
                type="button"
                onClick={() => setActiveDialog(null)}
                className="text-[rgba(244,239,232,0.6)] hover:text-[#F4EFE8] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {activeDialog === 'write-review' && (
              <form onSubmit={handleAddReviewSubmit} className="space-y-4">
                <div>
                  <label className="block label-caps text-[rgba(244,239,232,0.65)] mb-2">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Tariq Javed"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-[#12151B] border border-[rgba(244,239,232,0.12)] focus:border-[#B8925A] focus:outline-none rounded-[8px] px-4 py-2.5 text-sm text-[#F4EFE8]"
                  />
                </div>

                <div>
                  <label className="block label-caps text-[rgba(244,239,232,0.65)] mb-2">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setNewRating(num)}
                        className={`p-2 rounded-[6px] border cursor-pointer ${
                          newRating >= num
                            ? 'bg-[rgba(184,146,90,0.2)] border-[#B8925A] text-[#D2AE78]'
                            : 'bg-[#12151B] border-[rgba(244,239,232,0.1)] text-[rgba(244,239,232,0.4)]'
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block label-caps text-[rgba(244,239,232,0.65)] mb-2">
                    Your Experience with Mr. Muhammad Shahzad
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Share details of your commercial plot or property dealing in Millat Town..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full bg-[#12151B] border border-[rgba(244,239,232,0.12)] focus:border-[#B8925A] focus:outline-none rounded-[8px] p-3.5 text-sm text-[#F4EFE8]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveDialog(null)}
                    className="px-4 py-2.5 rounded-[8px] border border-[rgba(244,239,232,0.15)] label-caps text-[#F4EFE8] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-[8px] bg-[#B8925A] text-[#0E1116] label-caps font-bold cursor-pointer"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}

            {activeDialog === 'send-phone' && (
              <div className="space-y-4">
                <p className="text-sm font-light text-[rgba(244,239,232,0.75)]">
                  Transmit the exact location pin (<strong>F4Q3+MC Faisalabad</strong>) and direct
                  number (<strong>+92 300 7785625</strong>) to your mobile device:
                </p>
                <input
                  type="tel"
                  value={phoneRecipient}
                  onChange={(e) => setPhoneRecipient(e.target.value)}
                  className="w-full bg-[#12151B] border border-[rgba(244,239,232,0.12)] focus:border-[#B8925A] focus:outline-none rounded-[8px] px-4 py-3 font-mono-tabular text-sm text-[#F4EFE8]"
                />
                {phoneSent && (
                  <div className="p-3 bg-[rgba(184,146,90,0.15)] border border-[#B8925A] rounded-[8px] text-xs text-[#D2AE78]">
                    Dispatched coordinates &amp; contact card to {phoneRecipient}.
                  </div>
                )}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveDialog(null)}
                    className="px-4 py-2.5 rounded-[8px] border border-[rgba(244,239,232,0.15)] label-caps text-[#F4EFE8] cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPhoneSent(true);
                      triggerToast(`Sent Meezan Real Estate coordinates to ${phoneRecipient}`);
                    }}
                    className="px-6 py-2.5 rounded-[8px] bg-[#B8925A] text-[#0E1116] label-caps font-bold cursor-pointer"
                  >
                    Send SMS / Dispatch
                  </button>
                </div>
              </div>
            )}

            {activeDialog === 'suggest-edit' && (
              <div className="space-y-4">
                <div>
                  <label className="block label-caps text-[rgba(244,239,232,0.65)] mb-2">
                    Your Custom Maps Label
                  </label>
                  <input
                    type="text"
                    value={customLabel}
                    onChange={(e) => setCustomLabel(e.target.value)}
                    className="w-full bg-[#12151B] border border-[rgba(244,239,232,0.12)] focus:border-[#B8925A] focus:outline-none rounded-[8px] px-4 py-2.5 text-sm text-[#F4EFE8]"
                  />
                </div>
                <div>
                  <label className="block label-caps text-[rgba(244,239,232,0.65)] mb-2">
                    Official Website URL
                  </label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full bg-[#12151B] border border-[rgba(244,239,232,0.12)] focus:border-[#B8925A] focus:outline-none rounded-[8px] px-4 py-2.5 text-sm text-[#F4EFE8]"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDialog(null);
                      triggerToast('Business label and website updated.');
                    }}
                    className="px-6 py-2.5 rounded-[8px] bg-[#B8925A] text-[#0E1116] label-caps font-bold cursor-pointer"
                  >
                    Save Updates
                  </button>
                </div>
              </div>
            )}

            {activeDialog === 'add-photo' && (
              <div className="space-y-4">
                <p className="text-sm font-light text-[rgba(244,239,232,0.75)]">
                  Submit commercial plot or plaza elevation photography for{' '}
                  <strong>308 C Millat Rd / Millat Town D Block</strong>:
                </p>
                <div className="p-6 border border-dashed border-[#B8925A] bg-[#12151B] text-center rounded-[8px]">
                  <Camera className="w-6 h-6 text-[#D2AE78] mx-auto mb-2" />
                  <div className="label-caps text-[#F4EFE8]">
                    60 FEET ROAD &amp; HASSAN CHOK MEDIA ARCHIVE
                  </div>
                  <p className="text-xs text-[rgba(244,239,232,0.5)] mt-1">
                    Verified high-resolution architectural &amp; plot frontage plates
                  </p>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDialog(null);
                      setActiveTab('photos');
                      triggerToast('Opened Commercial Portfolio Plates gallery.');
                    }}
                    className="px-6 py-2.5 rounded-[8px] bg-[#B8925A] text-[#0E1116] label-caps font-bold cursor-pointer"
                  >
                    View Portfolio Plates
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FULLSCREEN 6-PHOTO LIGHTBOX MODAL */}
      {lightboxPhotoIndex !== null && MEEZAN_PHOTO_GALLERY[lightboxPhotoIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#0E1116]/92 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-5xl bg-[#171B23] border border-[#B8925A] rounded-[20px] overflow-hidden shadow-specimen">
            <div className="flex items-center justify-between px-6 py-4 bg-[#12151B] border-b border-[rgba(244,239,232,0.08)]">
              <div className="flex items-center gap-3">
                <span className="label-mono text-[#D2AE78]">
                  {MEEZAN_PHOTO_GALLERY[lightboxPhotoIndex].code}
                </span>
                <span aria-hidden="true">·</span>
                <span className="label-caps text-[rgba(244,239,232,0.65)]">
                  {MEEZAN_PHOTO_GALLERY[lightboxPhotoIndex].category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxPhotoIndex(
                      (lightboxPhotoIndex - 1 + MEEZAN_PHOTO_GALLERY.length) %
                        MEEZAN_PHOTO_GALLERY.length
                    )
                  }
                  className="p-2 rounded-[6px] bg-[#0E1116] border border-[rgba(244,239,232,0.12)] hover:border-[#D2AE78] text-[#F4EFE8] cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="label-mono text-xs text-[rgba(244,239,232,0.65)] px-2">
                  {lightboxPhotoIndex + 1} / {MEEZAN_PHOTO_GALLERY.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxPhotoIndex((lightboxPhotoIndex + 1) % MEEZAN_PHOTO_GALLERY.length)
                  }
                  className="p-2 rounded-[6px] bg-[#0E1116] border border-[rgba(244,239,232,0.12)] hover:border-[#D2AE78] text-[#F4EFE8] cursor-pointer"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxPhotoIndex(null)}
                  className="ml-2 p-2 rounded-[6px] bg-[#0E1116] border border-[rgba(244,239,232,0.12)] hover:border-[#D2AE78] text-[#F4EFE8] cursor-pointer"
                  aria-label="Close photo viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative aspect-[16/9] w-full bg-[#0B0E13]">
              <img
                src={MEEZAN_PHOTO_GALLERY[lightboxPhotoIndex].src}
                alt={MEEZAN_PHOTO_GALLERY[lightboxPhotoIndex].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-[#12151B] border-t border-[rgba(244,239,232,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="label-caps text-[#B8925A] mb-1">
                  {MEEZAN_PHOTO_GALLERY[lightboxPhotoIndex].locationLabel}
                </div>
                <h4 className="font-serif-editorial text-2xl text-[#F4EFE8]">
                  {MEEZAN_PHOTO_GALLERY[lightboxPhotoIndex].title}
                </h4>
                <p className="text-sm font-light text-[rgba(244,239,232,0.7)] mt-1">
                  {MEEZAN_PHOTO_GALLERY[lightboxPhotoIndex].subtitle}
                </p>
              </div>
              <a
                href="tel:+923007785625"
                className="px-5 py-3 rounded-[8px] bg-[#B8925A] hover:bg-[#D2AE78] text-[#0E1116] label-caps font-bold whitespace-nowrap shrink-0"
              >
                Inquire +92 300 7785625
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
