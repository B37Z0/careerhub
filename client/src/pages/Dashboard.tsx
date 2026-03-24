/**
 * Career Portal — Dashboard Page
 * Design: Institutional Precision
 * - Deep navy sidebar with purple active state
 * - Multi-level navigation tabs
 * - White content area with promotional sections
 */

import { useState, useRef } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronLeft, ChevronRight, Menu, Info } from "lucide-react";

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

function TopNav({ active, onSelect }: { active: string; onSelect: (v: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });

  return (
    <div className="flex items-stretch h-[48px] bg-[#f0f0f0] border-b border-[#ccc] flex-shrink-0">
      <button
        className="px-3 flex items-center text-gray-500 hover:text-gray-800 flex-shrink-0 border-r border-[#ccc]"
        onClick={() => toast.info("Menu toggled")}
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
  { label: "Dashboard", activeHighlight: "purple" },
  { label: "Appointments", expandable: true },
  { label: "Co-Curricular Record", expandable: true },
  { label: "Events & Workshops", expandable: true },
  { label: "Experiential Learning" },
  {
    label: "Jobs & Recruitment",
    expandable: true,
    children: [
      { label: "Job Search Overview" },
      { label: "Work Study", expandable: true },
      { label: "On-Campus Jobs", expandable: true },
      {
        label: "Off-Campus Jobs",
        expandable: true,
        children: [
          { label: "Off-Campus Job Board" },
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
          if (item.label === "Off-Campus Job Board") {
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
    "Jobs & Recruitment": false,
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

// ─── Breadcrumb ──────────────────────────────────────────────────────────────

function Breadcrumb() {
  return (
    <div
      className="flex items-center gap-2 px-5 py-3 text-[13px] bg-[#f5f5f5] border-b border-[#d0d5de] flex-shrink-0"
      style={{ height: 40 }}
    >
      <button className="text-[#2d5fa6] hover:underline font-semibold">Dashboard</button>
    </div>
  );
}

// ─── Main Content ─────────────────────────────────────────────────────────────

function MainContent() {
  const [activeNav, setActiveNav] = useState("OVERVIEW");
  const [activeSecondary, setActiveSecondary] = useState("Dashboard");
  const [activeTertiary, setActiveTertiary] = useState("Overview");

  const secondaryTabs = ["Dashboard", "Experiential Record", "My Documents"];
  const tertiaryTabs = ["Overview", "My Account", "My Messages"];

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      <TopNav active={activeNav} onSelect={setActiveNav} />
      <Breadcrumb />

      <div className="flex-1 overflow-y-auto bg-white p-5">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-[14px] font-semibold text-gray-600 mb-2">Welcome</h2>
          <h1 className="text-[24px] font-bold text-gray-900">Ben Zhou</h1>
        </div>

        {/* Secondary Tabs */}
        <div className="flex gap-6 mb-6 border-b border-gray-200 pb-0">
          {secondaryTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSecondary(tab)}
              className="pb-3 text-[13px] font-semibold transition-colors"
              style={{
                color: activeSecondary === tab ? "#2d5fa6" : "#666",
                borderBottom: activeSecondary === tab ? "3px solid #2d5fa6" : "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tertiary Tabs */}
        <div className="flex gap-6 mb-6 border-b border-gray-200 pb-0">
          {tertiaryTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTertiary(tab)}
              className="pb-3 text-[12px] font-semibold transition-colors"
              style={{
                color: activeTertiary === tab ? "#2d5fa6" : "#999",
                borderBottom: activeTertiary === tab ? "2px solid #2d5fa6" : "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="col-span-2">
            {/* Promotional Section */}
            <div className="border border-[#d0d5de] rounded-sm overflow-hidden bg-white mb-6">
              <div className="flex">
                <div className="flex-1 p-6">
                  <h3 className="text-[16px] font-bold text-gray-900 mb-2">Get hired as a Tutor</h3>
                  <p className="text-[13px] text-gray-600 mb-4">
                    Join our network of experienced tutors and help students succeed while earning competitive rates.
                  </p>
                  <button className="px-4 py-2 bg-[#2d5fa6] text-white text-[12px] font-semibold rounded hover:bg-[#1e4a8a] transition-colors">
                    Learn More
                  </button>
                </div>
                <div className="w-40 h-40 bg-gradient-to-br from-[#e0e7ff] to-[#c7d2fe] flex-shrink-0"></div>
              </div>
            </div>

            {/* Your Schedule Section */}
            <div className="border border-[#d0d5de] rounded-sm p-6 bg-white">
              <h3 className="text-[14px] font-bold text-gray-900 mb-4">Your Schedule</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                  <div className="w-2 h-2 bg-[#2d5fa6] rounded-full"></div>
                  <span className="text-[13px] text-gray-700">No events scheduled for today</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div>
            <div className="border border-[#d0d5de] rounded-sm p-6 bg-white sticky top-5">
              <h3 className="text-[14px] font-bold text-gray-900 mb-4">Upcoming Events / Workshops</h3>
              <div className="space-y-3">
                <div className="pb-3 border-b border-gray-200">
                  <p className="text-[12px] font-semibold text-gray-700">Career Fair 2026</p>
                  <p className="text-[11px] text-gray-500">March 28, 2026</p>
                </div>
                <div className="pb-3 border-b border-gray-200">
                  <p className="text-[12px] font-semibold text-gray-700">Resume Workshop</p>
                  <p className="text-[11px] text-gray-500">April 5, 2026</p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-gray-700">Interview Prep Session</p>
                  <p className="text-[11px] text-gray-500">April 12, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f0f0" }}>
      <Sidebar />
      <MainContent />
    </div>
  );
}
