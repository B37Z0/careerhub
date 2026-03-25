/**
 * Career Portal — Jobs & Recruitment Page
 * Design: Institutional Precision
 * - Deep navy sidebar with purple active state
 * - Teal circular badge counters
 * - White content area with bordered section cards
 * - Horizontal scrollable top navigation bar
 */

import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { ChevronDown, ChevronLeft, ChevronRight, Menu, Info, Search } from "lucide-react";

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
  depth?: number;
  expandable?: boolean;
  activeHighlight?: "purple" | "purple-sub";
  children?: NavItem[];
}

const SIDEBAR_ITEMS: NavItem[] = [
  { label: "Dashboard" },
  { label: "Appointments", expandable: true },
  { label: "Co-Curricular Record", expandable: true },
  { label: "Events & Workshops", expandable: true },
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
  { label: "Programs", expandable: true },
  { label: "Student Resources", expandable: true },
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
  const isAllCaps = false;
  const isPurple = item.activeHighlight === "purple";
  const isPurpleSub = item.activeHighlight === "purple-sub";

  const paddingLeft = 20 + depth * 14;

  return (
    <>
      <button
        className="w-full text-left flex items-center justify-between transition-colors duration-150 group"
        style={{
          paddingLeft,
          paddingRight: 16,
          paddingTop: depth === 0 ? 10 : 8,
          paddingBottom: depth === 0 ? 10 : 8,
          backgroundColor:
            isPurple || isPurpleSub
              ? "#6b3fa0"
              : undefined,
        }}
        onMouseEnter={(e) => {
          if (!isPurple && !isPurpleSub) {
            (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isPurple && !isPurpleSub) {
            (e.currentTarget as HTMLElement).style.backgroundColor = "";
          }
        }}
        onClick={() => {
          if (item.label === "Dashboard") {
            window.location.href = "/dashboard";
          } else if (item.label === "Off-Campus Job Board") {
            window.location.href = "/";
          } else if (item.expandable) {
            onToggle(item.label);
          } else {
            toast.info("Feature coming soon");
          }
        }}
      >
        <span
          className="text-[13px] leading-tight"
          style={{
            color: isPurple || isPurpleSub ? "#fff" : "rgba(230,235,245,0.92)",
            fontWeight: isAllCaps || isPurple || isPurpleSub ? 700 : 400,
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

      {/* Children */}
      {item.children && isExpanded && (
        <div style={{ backgroundColor: "rgba(0,0,0,0.15)" }}>
          {item.children.map((child) => (
            <SidebarNavItem
              key={child.label}
              item={child}
              depth={depth + 1}
              expanded={expanded}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </>
  );
}

function Sidebar() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "Jobs & Recruitment": true,
    "Off-Campus Jobs": true,
  });

  const toggle = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div
      className="flex flex-col overflow-y-auto flex-shrink-0"
      style={{
        width: 280,
        minWidth: 280,
        backgroundColor: "#1e2a5e",
        minHeight: "calc(100vh - 0px)",
      }}
    >
      {/* User name */}
      <div
        className="px-5 py-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
      >
        <h2 className="text-white font-bold text-[22px] leading-tight">Ben Zhou</h2>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-1">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.label}
            item={item}
            depth={0}
            expanded={expanded}
            onToggle={toggle}
          />
        ))}
      </nav>
    </div>
  );
}

// ─── Quick Searches ───────────────────────────────────────────────────────────

const QUICK_SEARCHES = [
  { count: 12, label: "Applied To", color: "#2563eb" },
  { count: 5, label: "Shortlist", color: "#dc2626" },
  { count: 34, label: "New Postings", color: "#16a34a" },
  { count: 8, label: "Deadlines Soon", color: "#ea580c" },
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
  return (
    <SectionCard title="QUICK SEARCHES:">
      <div>
        {QUICK_SEARCHES.map((item, i) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-4 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left group"
            style={{ borderTop: i > 0 ? "1px solid #e8eaed" : undefined }}
            onClick={() => toast.info(`Searching: ${item.label}`)}
          >
            {/* Colored badge */}
            <span
              className="flex-shrink-0 flex items-center justify-center text-white text-[12px] font-semibold rounded-full"
              style={{
                backgroundColor: (item as any).color || "#3a8fa8",
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

function MySavedSearches() {
  return (
    <SectionCard title="MY SAVED SEARCHES">
      <div className="p-3 space-y-2">
        <div
          className="flex items-start gap-2 px-3 py-2.5 text-[13px] rounded-sm"
          style={{ backgroundColor: "#daeaf5", border: "1px solid #b8d4e8", color: "#2c5282" }}
        >
          <Info size={14} className="flex-shrink-0 mt-0.5" />
          <span>Saved searches will automatically expire 1 year after creation.</span>
        </div>
        <div
          className="px-3 py-2.5 text-[13px] rounded-sm"
          style={{ backgroundColor: "#eaf4fb", border: "1px solid #c8dff0", color: "#4a6fa5" }}
        >
          You have no saved searches
        </div>
      </div>
    </SectionCard>
  );
}

function SearchPosting() {
  const [jobId, setJobId] = useState("");

  return (
    <SectionCard title="SEARCH POSTING">
      <div className="p-4 space-y-3">
        <p className="text-[13px] text-gray-600">Enter the job ID you are searching for</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (jobId.trim()) toast.info(`Searching for job ID: ${jobId}`);
                else toast.error("Please enter a job ID");
              }
            }}
            className="flex-1 border border-[#aaa] rounded-sm px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#2d5fa6] focus:ring-1 focus:ring-[#2d5fa6]"
          />
          <button
            className="px-4 py-1.5 text-[13px] font-semibold text-white rounded-sm transition-colors"
            style={{ backgroundColor: "#2d5fa6" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = "#244d8a")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = "#2d5fa6")}
            onClick={() => {
              if (jobId.trim()) toast.info(`Searching for job ID: ${jobId}`);
              else toast.error("Please enter a job ID");
            }}
          >
            Search
          </button>
        </div>
      </div>
    </SectionCard>
  );
}

function ListManagementOptions() {
  const options = [
    "Select All",
    "Deselect All",
    "Add to Shortlist",
    "Remove from Shortlist",
    "Export Selected",
    "Email Selected",
  ];

  return (
    <SectionCard title="LIST MANAGEMENT OPTIONS">
      <div className="p-3 space-y-0.5">
        {options.map((opt) => (
          <button
            key={opt}
            className="block w-full text-left text-[13px] px-2 py-1.5 rounded-sm hover:bg-gray-50 transition-colors"
            style={{ color: "#2d5fa6" }}
            onClick={() => toast.info(`${opt} — Feature coming soon`)}
          >
            {opt}
          </button>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Breadcrumb ──────────────────────────────────────────────────────────────

function Breadcrumb() {
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
    </div>
  );
}

// ─── Main Content ─────────────────────────────────────────────────────────────

function MainContent({ onMenuToggle }: { onMenuToggle: () => void }) {
  const [activeNav, setActiveNav] = useState("MY APPLICATIONS");
  const [keyword, setKeyword] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [jobType, setJobType] = useState("");
  const [industry, setIndustry] = useState("");
  const [workTerm, setWorkTerm] = useState("");
  const [employer, setEmployer] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  const inputClass =
    "border border-[#aaa] rounded-sm px-2.5 py-1.5 text-[13px] focus:outline-none focus:border-[#2d5fa6] focus:ring-1 focus:ring-[#2d5fa6] bg-white w-full";
  const labelClass = "block text-[12px] font-semibold text-gray-600 mb-1";

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      <TopNav active={activeNav} onSelect={setActiveNav} onMenuToggle={onMenuToggle} />
      <Breadcrumb />

      <div className="flex-1 overflow-y-auto bg-white p-5">
        {/* Title */}
        <h2 className="text-[16px] font-bold text-gray-800 mb-4">Off-Campus Job Board</h2>

        {/* Two-column layout with isolated halves */}
        <div className="grid grid-cols-2 gap-5 mb-3">
          {/* Left half: Search widget */}
          <div className="border border-[#d0d5de] rounded-sm p-4 bg-white flex flex-col">
            <label className="block text-[13px] font-semibold text-gray-700 mb-2.5">
              Keyword Search
            </label>
            <div className="relative mb-4">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Keyword Search"
                className={inputClass}
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => toast.info("Searching...")}
              >
                <Search size={16} />
              </button>
            </div>
            
            {/* Information Summary */}
            <div className="text-[12px] text-gray-600 space-y-2 border-t border-[#e0e0e0] pt-3">
              <div>
                <button
                  className="text-[#2d5fa6] font-semibold hover:underline text-left"
                  onClick={() => toast.info("Non Endorsement: The University of Toronto does not endorse or recommend employers. Employment postings do not constitute endorsement. The University is not responsible for employer practices or off-campus employment conditions.")}
                >
                  Non Endorsement Statement →
                </button>
              </div>
              <div>
                <button
                  className="text-[#2d5fa6] font-semibold hover:underline text-left"
                  onClick={() => toast.info("Employer Participation: We welcome employers from all industries whose practices align with our Employer Guidelines. We encourage students to consider their interests and values when making career decisions.")}
                >
                  Employer Participation →
                </button>
              </div>
              <div>
                <button
                  className="text-[#2d5fa6] font-semibold hover:underline text-left"
                  onClick={() => toast.info("Job Fraud: Protect yourself by not sharing banking details, credit cards, SIN, or personal info early. Research organizations, learn about common scams, know your employment rights, and stay security savvy. Contact careerservices@utoronto.ca with concerns.")}
                >
                  Job Fraud Prevention →
                </button>
              </div>
              <div className="border-t border-[#e0e0e0] pt-3 mt-2">
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  If you have any questions or would like to discuss your concerns, please contact:
                </p>
                <p className="text-[11px] font-semibold text-gray-700 mt-1">
                  Career Exploration & Education
                </p>
                <a
                  href="mailto:careerservices@utoronto.ca"
                  className="text-[11px] text-[#2d5fa6] hover:underline"
                >
                  careerservices@utoronto.ca
                </a>
              </div>
            </div>
          </div>

          {/* Right half: Quick Searches widget */}
          <div>
            <QuickSearches />
          </div>
        </div>

        {/* Advanced filters dropdown */}
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

        {/* Additional filters - collapsible */}
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
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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

        {/* Search and Save Filters buttons */}
        <div className="flex items-center gap-3 mb-6">
          <button
            className="px-5 py-2 text-[14px] font-semibold text-white rounded-sm transition-colors"
            style={{ backgroundColor: "#2d5fa6" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = "#244d8a")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = "#2d5fa6")}
            onClick={() => toast.info("Searching job postings...")}
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
            onChange={(e) => {
              if (e.target.value) {
                toast.info(`Loaded: ${e.target.value}`);
              }
            }}
            defaultValue=""
          >
            <option value="">-- Load Saved Filters --</option>
            {SAVED_FILTERS.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>

        {/* Job Board Table */}
        <div className="mt-8">
          <h3 className="text-[14px] font-bold text-gray-800 mb-3">Job Postings</h3>
          <div className="border border-[#d0d5de] rounded-sm overflow-x-auto bg-white">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr className="bg-[#f5f5f5] border-b border-[#d0d5de]">
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 whitespace-nowrap">Status</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 whitespace-nowrap">ID</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 whitespace-nowrap">Position</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 whitespace-nowrap">Organization</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 whitespace-nowrap">Division</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 whitespace-nowrap">Openings</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 whitespace-nowrap">Location</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 whitespace-nowrap">App Deadline</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 262086, title: "Software Engineer (Co-op)", org: "Google Canada", division: "Engineering", type: "Co-op", months: 4, openings: 8, location: "Toronto", deadline: "2026-04-15", workLocation: "Hybrid" },
                  { id: 262088, title: "Data Analyst Intern", org: "Shopify", division: "Analytics", type: "Internship", months: 8, openings: 12, location: "Ottawa", deadline: "2026-04-20", workLocation: "Remote" },
                  { id: 262090, title: "Product Manager (New Grad)", org: "Shopify", division: "Product", type: "Full Time", months: 12, openings: 5, location: "Toronto", deadline: "2026-04-25", workLocation: "In-Person" },
                  { id: 262095, title: "UX Designer (Co-op)", org: "RBC", division: "Digital", type: "Co-op", months: 4, openings: 6, location: "Toronto", deadline: "2026-05-01", workLocation: "In-Person" },
                  { id: 262097, title: "Business Analyst", org: "Deloitte", division: "Consulting", type: "Full Time", months: 12, openings: 15, location: "Toronto", deadline: "2026-05-05", workLocation: "Hybrid" },
                  { id: 262153, title: "Full-Stack Engineer", org: "Uncountable", division: "Head Office", type: "Full Time", months: 12, openings: 3, location: "U.S.A", deadline: "2026-05-10", workLocation: "Remote" },
                  { id: 262155, title: "Marketing Coordinator", org: "Freshworks", division: "Marketing", type: "Part Time", months: 4, openings: 3, location: "Waterloo", deadline: "2026-05-12", workLocation: "In-Person" },
                  { id: 262156, title: "DevOps Engineer", org: "Hootsuite", division: "Infrastructure", type: "Full Time", months: 12, openings: 2, location: "Vancouver", deadline: "2026-05-15", workLocation: "Remote" },
                  { id: 262157, title: "Business Development Intern", org: "Stripe", division: "Partnerships", type: "Internship", months: 4, openings: 7, location: "Toronto", deadline: "2026-05-18", workLocation: "Hybrid" },
                  { id: 262190, title: "Data Science Co-op", org: "TD Bank", division: "Analytics", type: "Co-op", months: 8, openings: 10, location: "Toronto", deadline: "2026-05-20", workLocation: "In-Person" },
                ].map((job) => (
                  <tr key={job.id} className="border-b border-[#e0e0e0] hover:bg-[#f9f9f9] transition-colors">
                    <td className="px-4 py-2.5 text-gray-600">—</td>
                    <td className="px-4 py-2.5 text-gray-600 font-semibold">{job.id}</td>
                    <td className="px-4 py-2.5">
                      <div>
                        <a href={`/job/${job.id}`} className="text-[#2d5fa6] hover:underline font-semibold block mb-1.5">{job.title}</a>
                        <div className="flex gap-1.5 flex-wrap">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold text-white whitespace-nowrap ${
                            job.type === "Co-op" ? "bg-[#ff9800]" :
                            job.type === "Internship" ? "bg-[#e91e63]" :
                            job.type === "Full Time" ? "bg-[#4caf50]" :
                            job.type === "Part Time" ? "bg-[#2196f3]" :
                            "bg-[#9c27b0]"
                          }`}>
                            {job.type}
                          </span>
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold text-white bg-[#607d8b] whitespace-nowrap">
                            {job.months}m
                          </span>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold text-white whitespace-nowrap ${
                            job.workLocation === "In-Person" ? "bg-[#1976d2]" :
                            job.workLocation === "Remote" ? "bg-[#7b1fa2]" :
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

export default function Home() {
  const [, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f0f0" }}>
      {sidebarOpen && <Sidebar />}
      <MainContent onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
    </div>
  );
}
