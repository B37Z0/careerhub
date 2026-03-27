/**
 * Career Portal — Search Results Page
 * Displays results for a keyword search (default: "full-stack").
 * All filters and keyword are preserved when the user presses Search.
 */

import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { ChevronDown, ChevronLeft, ChevronRight, Menu, Info, Search as SearchIcon } from "lucide-react";

// ─── Top Navigation ───────────────────────────────────────────────────────────

const TOP_NAV_ITEMS = [
  "OVERVIEW",
  "EXPERIENTIAL RECORD",
  "MY DOCUMENTS",
  "MY APPLICATIONS",
  "MY INTERVIEWS",
  "MY APPOINTMENTS",
  "MY EVENTS",
];

function TopNav({ active, onSelect, onMenuToggle }: { active: string; onSelect: (v: string) => void; onMenuToggle: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });

  return (
    <div className="flex items-stretch h-[48px] bg-[#f0f0f0] border-b border-[#ccc] flex-shrink-0">
      <button
        className="px-3 flex items-center text-gray-500 hover:text-gray-800 flex-shrink-0 border-r border-[#ccc]"
        onClick={onMenuToggle}
      >
        <Menu size={18} />
      </button>
      <button
        className="px-2 flex items-center text-gray-500 hover:text-gray-800 flex-shrink-0"
        onClick={() => scroll("left")}
      >
        <ChevronLeft size={16} />
      </button>
      <div
        ref={scrollRef}
        className="flex items-stretch overflow-x-hidden flex-1"
        style={{ scrollbarWidth: "none" }}
      >
        {TOP_NAV_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className="flex items-center px-4 text-[12.5px] font-semibold tracking-wide whitespace-nowrap border-b-[3px] transition-all duration-150 flex-shrink-0"
            style={{
              color: active === item ? "#1a1a1a" : "#444",
              borderBottomColor: active === item ? "#2d5fa6" : "transparent",
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <button
        className="px-2 flex items-center text-gray-500 hover:text-gray-800 flex-shrink-0 border-l border-[#ccc]"
        onClick={() => scroll("right")}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  expandable?: boolean;
  activeHighlight?: "purple" | "purple-sub";
  children?: NavItem[];
}

const SIDEBAR_ITEMS: NavItem[] = [
  { label: "Dashboard" },
  { label: "Appointments", expandable: true, children: [{ label: "My Appointments" }] },
  { label: "Co-Curricular Record", expandable: true, children: [{ label: "My Co-Curricular Record" }] },
  { label: "Events & Workshops", expandable: true, children: [{ label: "My Events" }] },
  { label: "Experiential Learning" },
  {
    label: "Jobs & Recruitment",
    expandable: true,
    activeHighlight: "purple",
    children: [
      { label: "Job Search Overview" },
      { label: "Work Study", expandable: true },
      { label: "On-Campus Jobs", expandable: true },
      {
        label: "Off-Campus Jobs",
        expandable: true,
        children: [
          { label: "Off-Campus Job Board", activeHighlight: "purple-sub" },
          { label: "Off-Campus Jobs Documents" },
          { label: "Off-Campus Job Applications" },
        ],
      },
      { label: "Casual Job Board", expandable: true },
      { label: "Recruitment", expandable: true },
    ],
  },
  { label: "Programs", expandable: true, children: [{ label: "My Programs" }] },
  { label: "Student Resources", expandable: true, children: [{ label: "Student Resources" }] },
  { label: "St. George Online Store" },
  { label: "Logout" },
];

function SidebarNavItem({
  item,
  depth = 0,
  expanded,
  onToggle,
}: {
  item: NavItem;
  depth?: number;
  expanded: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  const isExpanded = expanded[item.label];
  const isPurple = item.activeHighlight === "purple";
  const isPurpleSub = item.activeHighlight === "purple-sub";
  const paddingLeft = 20 + depth * 14;

  return (
    <>
      <button
        className="w-full text-left flex items-center justify-between transition-colors duration-150"
        style={{
          paddingLeft,
          paddingRight: 16,
          paddingTop: depth === 0 ? 10 : 8,
          paddingBottom: depth === 0 ? 10 : 8,
          backgroundColor: isPurple || isPurpleSub ? "#6b3fa0" : undefined,
        }}
        onMouseEnter={(e) => {
          if (!isPurple && !isPurpleSub)
            (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)";
        }}
        onMouseLeave={(e) => {
          if (!isPurple && !isPurpleSub)
            (e.currentTarget as HTMLElement).style.backgroundColor = "";
        }}
        onClick={() => {
          if (item.label === "Dashboard") window.location.href = "/dashboard";
          else if (item.label === "Off-Campus Job Board") window.location.href = "/";
          else if (item.expandable) onToggle(item.label);
          else window.location.href = "/placeholder";
        }}
      >
        <span
          className="text-[13px] leading-tight"
          style={{
            color: isPurple || isPurpleSub ? "#fff" : "rgba(230,235,245,0.92)",
            fontWeight: isPurple || isPurpleSub ? 700 : 400,
          }}
        >
          {item.label}
        </span>
        {item.expandable && (
          <ChevronDown
            size={13}
            className="flex-shrink-0 transition-transform duration-200"
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              color: isPurple || isPurpleSub ? "#fff" : "rgba(180,190,210,0.7)",
            }}
          />
        )}
      </button>
      {item.children && isExpanded && (
        <div style={{ backgroundColor: "rgba(0,0,0,0.15)" }}>
          {item.children.map((child) => (
            <SidebarNavItem key={child.label} item={child} depth={depth + 1} expanded={expanded} onToggle={onToggle} />
          ))}
        </div>
      )}
    </>
  );
}

function Sidebar() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("sidebarExpanded");
    if (saved) return JSON.parse(saved);
    return { "Jobs & Recruitment": true, "Off-Campus Jobs": true };
  });
  const toggle = (key: string) =>
    setExpanded((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem("sidebarExpanded", JSON.stringify(next));
      return next;
    });

  return (
    <div
      className="flex flex-col overflow-y-auto flex-shrink-0"
      style={{ width: 280, minWidth: 280, backgroundColor: "#1e2a5e", minHeight: "calc(100vh - 0px)" }}
    >
      <div className="px-5 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
        <h2 className="text-white font-bold text-[22px] leading-tight">Ben Zhou</h2>
      </div>
      <nav className="flex-1 py-1">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarNavItem key={item.label} item={item} depth={0} expanded={expanded} onToggle={toggle} />
        ))}
      </nav>
    </div>
  );
}

// ─── Quick Searches ───────────────────────────────────────────────────────────

const QUICK_SEARCHES = [
  { count: 12, label: "Applied To", color: "#2563eb" },
  { count: 5,  label: "Shortlist",  color: "#dc2626" },
  { count: 34, label: "New Postings", color: "#16a34a" },
  { count: 8,  label: "Deadlines Soon", color: "#ea580c" },
];

const SAVED_FILTERS = [
  "Tech Companies - Remote",
  "Finance - Toronto",
  "Summer Internships 2024",
  "4-Month Co-ops",
];

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-[#d0d5de] rounded-sm overflow-hidden bg-white">
      <div
        className="px-4 py-3 text-[11.5px] font-bold tracking-widest uppercase"
        style={{ backgroundColor: "#f5f6f8", borderBottom: "1px solid #d0d5de", color: "#333" }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function QuickSearches() {
  const [, navigate] = useLocation();
  return (
    <SectionCard title="QUICK SEARCHES:">
      <div>
        {QUICK_SEARCHES.map((item, i) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-4 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left group"
            style={{ borderTop: i > 0 ? "1px solid #e8eaed" : undefined }}
            onClick={() => {
              if (item.label === "Shortlist") navigate("/shortlist");
              else toast.info(`Searching: ${item.label}`);
            }}
          >
            <span
              className="flex-shrink-0 flex items-center justify-center text-white text-[12px] font-semibold rounded-full"
              style={{
                backgroundColor: item.color,
                minWidth: 30,
                height: 30,
                fontSize: item.count >= 100 ? "11px" : "12px",
              }}
            >
              {item.count}
            </span>
            <span className="text-[13px] text-[#2d5fa6] group-hover:underline">{item.label}</span>
          </button>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Breadcrumb ──────────────────────────────────────────────────────────────

function Breadcrumb({ keyword }: { keyword: string }) {
  return (
    <div
      className="flex items-center gap-2 px-5 py-3 text-[13px] bg-[#f5f5f5] border-b border-[#d0d5de] flex-shrink-0"
      style={{ height: 40 }}
    >
      <button className="text-[#2d5fa6] hover:underline font-semibold">Jobs & Recruitment</button>
      <span className="text-gray-500">›</span>
      <button className="text-[#2d5fa6] hover:underline font-semibold" onClick={() => window.location.href = "/"}>Off Campus Jobs</button>
      <span className="text-gray-500">›</span>
      <button className="text-[#2d5fa6] hover:underline font-semibold" onClick={() => window.location.href = "/"}>Off Campus Job Board</button>
      <span className="text-gray-500">›</span>
      <span className="font-semibold text-gray-700 flex items-center gap-1">
        <SearchIcon size={12} className="inline" />
        Search: "{keyword}"
      </span>
    </div>
  );
}

// ─── Search Result Job Data ───────────────────────────────────────────────────

const SEARCH_JOBS = [
  { id: 263001, title: "Full-Stack Software Engineer",         org: "Uncountable",          division: "Engineering",          openings: 3,  location: "Remote",     deadline: "2026-05-10", workLocation: "Remote"    },
  { id: 263002, title: "Full-Stack Developer",                 org: "Shopify",              division: "Core Commerce",        openings: 5,  location: "Ottawa",     deadline: "2026-05-18", workLocation: "Remote"    },
  { id: 263003, title: "Senior Full-Stack Engineer",           org: "Wealthsimple",         division: "Platform",             openings: 2,  location: "Toronto",    deadline: "2026-06-01", workLocation: "Hybrid"    },
  { id: 263004, title: "Full-Stack Web Developer",             org: "Hootsuite",            division: "Product Engineering",  openings: 4,  location: "Vancouver",  deadline: "2026-06-10", workLocation: "Hybrid"    },
  { id: 263005, title: "Full-Stack Engineer — Payments",       org: "Stripe",               division: "Financial Infra",      openings: 6,  location: "Toronto",    deadline: "2026-06-15", workLocation: "Remote"    },
  { id: 263006, title: "Software Engineer, Full Stack",        org: "Google Canada",        division: "Cloud Platform",       openings: 8,  location: "Waterloo",   deadline: "2026-06-20", workLocation: "Hybrid"    },
  { id: 263007, title: "Full-Stack Product Engineer",          org: "Notion",               division: "Editor Infrastructure",openings: 3,  location: "Remote",     deadline: "2026-07-01", workLocation: "Remote"    },
  { id: 263008, title: "Full-Stack Developer — Data Platform", org: "Palantir Technologies",division: "Data Integration",     openings: 4,  location: "Toronto",    deadline: "2026-07-08", workLocation: "In-Person" },
  { id: 263009, title: "Software Engineer (Full-Stack Track)", org: "Cohere",               division: "API Platform",         openings: 5,  location: "Toronto",    deadline: "2026-07-15", workLocation: "Hybrid"    },
  { id: 263010, title: "Full-Stack Engineer — Mobile & Web",   org: "Ritual",               division: "Consumer Product",     openings: 2,  location: "Toronto",    deadline: "2026-07-22", workLocation: "Hybrid"    },
];

// ─── Main Content ─────────────────────────────────────────────────────────────

function MainContent({ onMenuToggle }: { onMenuToggle: () => void }) {
  const [activeNav, setActiveNav] = useState("MY APPLICATIONS");

  // ── Persistent filter state ──────────────────────────────────────────────────
  // Pre-filled with "full-stack" + Full Time / 12 Months matching the search
  const [keyword,            setKeyword]            = useState("full-stack");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);
  const [jobType,            setJobType]            = useState("full-time");
  const [industry,           setIndustry]           = useState("technology");
  const [workTerm,           setWorkTerm]           = useState("12-months");
  const [employer,           setEmployer]           = useState("");
  const [locationFilter,     setLocationFilter]     = useState("");
  const [salary,             setSalary]             = useState("");

  // Track whether the user has explicitly pressed Search (shows results count badge)
  const [searched, setSearched] = useState(true);

  const handleSearch = () => {
    setSearched(true);
    toast.success(`Showing results for "${keyword}"`, {
      description: "Filters applied: Full Time · 12 Months · Technology",
    });
  };

  const inputClass =
    "border border-[#aaa] rounded-sm px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#2d5fa6] focus:ring-1 focus:ring-[#2d5fa6] bg-white w-full";
  const labelClass = "block text-[12px] font-semibold text-gray-600 mb-1";

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      <TopNav active={activeNav} onSelect={() => window.location.href = "/placeholder"} onMenuToggle={onMenuToggle} />
      <Breadcrumb keyword={keyword || "full-stack"} />

      <div className="flex-1 overflow-y-auto bg-white p-5">
        {/* Title + results badge */}
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-[16px] font-bold text-gray-800">Off-Campus Job Board</h2>
          {searched && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-white"
              style={{ backgroundColor: "#2d5fa6" }}
            >
              <SearchIcon size={11} />
              {SEARCH_JOBS.length} results for "{keyword}"
            </span>
          )}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-2 gap-5 mb-3">
          {/* Keyword search widget */}
          <div className="border border-[#d0d5de] rounded-sm p-4 bg-white flex flex-col">
            <label className="block text-[13px] font-semibold text-gray-700 mb-2.5">
              Keyword Search
            </label>
            <div className="relative mb-4">
              <input
                id="search-keyword-input"
                type="text"
                value={keyword}
                onChange={(e) => { setKeyword(e.target.value); setSearched(false); }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Keyword Search"
                className={inputClass}
                style={{ paddingRight: 32 }}
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={handleSearch}
              >
                <SearchIcon size={16} />
              </button>
            </div>

            {/* Info links */}
            <div className="text-[12px] text-gray-600 space-y-2 border-t border-[#e0e0e0] pt-3">
              <div>
                <button className="text-[#2d5fa6] font-semibold hover:underline text-left"
                  onClick={() => toast.info("Non Endorsement: The University of Toronto does not endorse or recommend employers.")}>
                  Non Endorsement Statement →
                </button>
              </div>
              <div>
                <button className="text-[#2d5fa6] font-semibold hover:underline text-left"
                  onClick={() => toast.info("Employer Participation: We welcome employers from all industries whose practices align with our Employer Guidelines.")}>
                  Employer Participation →
                </button>
              </div>
              <div>
                <button className="text-[#2d5fa6] font-semibold hover:underline text-left"
                  onClick={() => toast.info("Job Fraud: Protect yourself by not sharing personal info early. Contact careerservices@utoronto.ca with concerns.")}>
                  Job Fraud Prevention →
                </button>
              </div>
              <div className="border-t border-[#e0e0e0] pt-3 mt-2">
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  If you have any questions or would like to discuss your concerns, please contact:
                </p>
                <p className="text-[11px] font-semibold text-gray-700 mt-1">
                  Career Exploration & Education -{" "}
                  <a href="mailto:careerservices@utoronto.ca" className="text-[#2d5fa6] hover:underline">
                    careerservices@utoronto.ca
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Searches widget */}
          <div>
            <QuickSearches />
          </div>
        </div>

        {/* Advanced filters toggle */}
        <button
          className="flex items-center gap-2 text-[13px] font-semibold mb-5 transition-colors"
          style={{ color: "#2d5fa6" }}
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          <ChevronDown
            size={14}
            style={{
              transform: showAdvancedFilters ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          />
          Advanced search filters
        </button>

        {/* Advanced filters — persistent, pre-filled */}
        {showAdvancedFilters && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-5" style={{ maxWidth: 700 }}>
            <div>
              <label className={labelClass}>Job Type</label>
              <select value={jobType} onChange={(e) => setJobType(e.target.value)} className={inputClass}>
                <option value="">-- Any --</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Industry</label>
              <select value={industry} onChange={(e) => setIndustry(e.target.value)} className={inputClass}>
                <option value="">-- Any --</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="consulting">Consulting</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="education">Education</option>
                <option value="energy">Energy</option>
                <option value="telecommunications">Telecommunications</option>
                <option value="government">Government</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Work Term</label>
              <select value={workTerm} onChange={(e) => setWorkTerm(e.target.value)} className={inputClass}>
                <option value="">-- Any --</option>
                <option value="4-months">4 Months</option>
                <option value="8-months">8 Months</option>
                <option value="12-months">12 Months</option>
                <option value="permanent">Permanent</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Employer</label>
              <input
                type="text"
                value={employer}
                onChange={(e) => setEmployer(e.target.value)}
                placeholder="Employer name"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                placeholder="City or Province"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Salary (Hourly)</label>
              <select value={salary} onChange={(e) => setSalary(e.target.value)} className={inputClass}>
                <option value="">-- Any --</option>
                <option value="15-20">$15 - $20/hr</option>
                <option value="20-25">$20 - $25/hr</option>
                <option value="25-30">$25 - $30/hr</option>
                <option value="30-40">$30 - $40/hr</option>
                <option value="40-plus">$40+/hr</option>
              </select>
            </div>
          </div>
        )}

        {/* Active filter chips */}
        {searched && (
          <div className="flex flex-wrap gap-2 mb-4">
            {keyword && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#e8f0fd] text-[#2d5fa6] border border-[#c5d8f5]">
                keyword: {keyword}
              </span>
            )}
            {jobType && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#e8f0fd] text-[#2d5fa6] border border-[#c5d8f5]">
                type: {jobType.replace("-", " ")}
              </span>
            )}
            {industry && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#e8f0fd] text-[#2d5fa6] border border-[#c5d8f5]">
                industry: {industry}
              </span>
            )}
            {workTerm && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#e8f0fd] text-[#2d5fa6] border border-[#c5d8f5]">
                term: {workTerm.replace("-", " ")}
              </span>
            )}
            {locationFilter && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#e8f0fd] text-[#2d5fa6] border border-[#c5d8f5]">
                location: {locationFilter}
              </span>
            )}
          </div>
        )}

        {/* Search + Save buttons */}
        <div className="flex items-center gap-3 mb-6">
          <button
            id="search-results-search-btn"
            className="px-5 py-2 text-[14px] font-semibold text-white rounded-sm transition-colors"
            style={{ backgroundColor: "#2d5fa6" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = "#244d8a")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = "#2d5fa6")}
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="px-4 py-2 text-[13px] font-semibold text-white rounded-sm transition-colors"
            style={{ backgroundColor: "#555" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = "#444")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = "#555")}
            onClick={() => toast.info("Filter saved successfully")}
          >
            Save Filters
          </button>
          <select
            className="border border-[#aaa] rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:border-[#2d5fa6] bg-white"
            onChange={(e) => { if (e.target.value) toast.info(`Loaded: ${e.target.value}`); }}
            defaultValue=""
          >
            <option value="">-- Load Saved Filters --</option>
            {SAVED_FILTERS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Job Board Table */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-[14px] font-bold text-gray-800">Job Postings</h3>
            <span className="text-[12px] text-gray-500">
              — {SEARCH_JOBS.length} results
            </span>
          </div>
          <div className="border border-[#d0d5de] rounded-sm overflow-x-auto bg-white">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr className="bg-[#f5f5f5] border-b border-[#d0d5de]">
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 whitespace-nowrap">Status</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 whitespace-nowrap">ID</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 whitespace-nowrap min-w-[220px]">Position</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 whitespace-nowrap">Organization</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 whitespace-nowrap">Division</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 whitespace-nowrap">Openings</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 whitespace-nowrap">Location</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 whitespace-nowrap">App Deadline</th>
                </tr>
              </thead>
              <tbody>
                {SEARCH_JOBS.map((job) => (
                  <tr key={job.id} className="border-b border-[#e0e0e0] hover:bg-[#f9f9f9] transition-colors">
                    <td className="px-4 py-2.5 text-gray-600">—</td>
                    <td className="px-4 py-2.5 text-gray-600 font-semibold">{job.id}</td>
                    <td className="px-4 py-2.5">
                      <div>
                        <a href={`/job/${job.id}`} className="text-[#2d5fa6] hover:underline font-semibold block mb-1.5">
                          {job.title}
                        </a>
                        <div className="flex gap-1.5 flex-wrap">
                          {/* Always Full Time */}
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold text-white bg-[#4caf50] whitespace-nowrap">
                            Full Time
                          </span>
                          {/* Always 12m */}
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold text-white bg-[#607d8b] whitespace-nowrap">
                            12m
                          </span>
                          {/* Work location */}
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold text-white whitespace-nowrap ${
                            job.workLocation === "In-Person" ? "bg-[#1976d2]" :
                            job.workLocation === "Remote"    ? "bg-[#7b1fa2]" :
                            "bg-[#00796b]"
                          }`}>
                            {job.workLocation}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-gray-700">{job.org}</td>
                    <td className="px-4 py-2.5 text-gray-700">{job.division}</td>
                    <td className="px-4 py-2.5 text-gray-700 text-center font-semibold">{job.openings}</td>
                    <td className="px-4 py-2.5 text-gray-700">{job.location}</td>
                    <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{job.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function SearchResults() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const toggleSidebar = () => {
    setSidebarOpen((prev: boolean) => {
      const next = !prev;
      localStorage.setItem("sidebarOpen", JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f0f0" }}>
      {sidebarOpen && <Sidebar />}
      <MainContent onMenuToggle={toggleSidebar} />
    </div>
  );
}
