/**
 * Career Portal — Dashboard Page
 * Design: Institutional Precision
 * - Deep navy sidebar with purple active state
 * - Multi-level navigation tabs
 * - White content area with promotional sections
 */

import { useState, useRef } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronLeft, ChevronRight, Menu } from "lucide-react";

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
  { label: "Dashboard", activeHighlight: "purple" },
  { label: "Appointments", expandable: true, children: [{ label: "Dummy Tab" }] },
  { label: "Co-Curricular Record", expandable: true, children: [{ label: "Dummy Tab" }] },
  { label: "Events & Workshops", expandable: true, children: [{ label: "Dummy Tab" }] },
  { label: "Experiential Learning", expandable: true, children: [{ label: "Dummy Tab" }] },
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
  { label: "Programs", expandable: true, children: [{ label: "Dummy Tab" }] },
  { label: "Student Resources", expandable: true, children: [{ label: "Dummy Tab" }] },
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
            handleOffCampusJobBoardClick();
          } else if (item.expandable) {
            onToggle(item.label);
          } else if (item.label === "Dummy Tab") {
            window.location.href = "/placeholder";
          } else {
            window.location.href = "/placeholder";
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

// ─── Sidebar Navigation Item Helper ───────────────────────────────────────────

function handleOffCampusJobBoardClick() {
  window.location.href = "/";
}

// ─── Main Content ─────────────────────────────────────────────────────────────

const EVENTS = [
  {
    date: "Tuesday, March 24, 2026",
    time: "10:00 AM ET - 04:00 PM ET",
    title: "Peer Resume Review",
    day: "Tuesday",
    location: "UTM Career Centre",
    category: "Events & Workshops",
    organizer: "Career Corner in Student Services",
    host: "Hub Davis",
  },
  {
    date: "Tuesday, March 24, 2026",
    time: "10:00 AM ET - 04:00 PM ET",
    title: "Career Talks: Chat with a Career Assistant (Drop In)",
    day: "Tuesday",
    location: "UTM Career Centre",
    category: "Events & Workshops",
    organizer: "Career Corner in Student Services",
    host: "Hub Davis",
  },
  {
    date: "Tuesday, March 24, 2026",
    time: "11:00 AM ET - 12:30 PM ET",
    title: "Career Anxiety & Decision Paralysis - Session 3: Purpose, Meaning, and Identity (Without Pressure)",
    day: "Tuesday",
    location: "UTM Career Centre",
    category: "Events & Workshops",
    organizer: "Career Corner in Student Services",
    host: "Hub Davis",
    tag: "Registration Required",
    code: "DV2224",
  },
  {
    date: "Tuesday, March 24, 2026",
    time: "12:00 PM ET - 02:00 PM ET",
    title: "Resume & Cover Letter Review",
    day: "Tuesday",
    location: "UTM Career Centre",
    category: "Events & Workshops",
    organizer: "Career Corner in Student Services",
    host: "Hub Davis",
  },
  {
    date: "Wednesday, March 25, 2026",
    time: "02:00 PM ET - 03:30 PM ET",
    title: "LinkedIn Workshop: Building Your Professional Brand",
    day: "Wednesday",
    location: "Online",
    category: "Events & Workshops",
    organizer: "Career Corner in Student Services",
    host: "Sarah Chen",
  },
  {
    date: "Thursday, March 26, 2026",
    time: "01:00 PM ET - 02:30 PM ET",
    title: "Interview Preparation: Behavioral Questions",
    day: "Thursday",
    location: "UTM Career Centre",
    category: "Events & Workshops",
    organizer: "Career Corner in Student Services",
    host: "Michael Torres",
    tag: "Registration Required",
  },
];

function MainContent({ onMenuToggle }: { onMenuToggle: () => void }) {
  const [activeNav, setActiveNav] = useState("OVERVIEW");
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [activeSubTab, setActiveSubTab] = useState("Overview");

  const tabs = ["Dashboard", "Experiential Record", "My Documents", "My Applications", "My Interviews", "My Appointments", "My Events", "My Programs", "..."];
  const subTabs = ["Overview", "My Account", "My Messages", "My Calendar", "My Schedule", "Payments and Invoices"];

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      <TopNav active={activeNav} onSelect={setActiveNav} onMenuToggle={onMenuToggle} />
      <Breadcrumb />

      <div className="flex-1 overflow-y-auto bg-white p-5">
        {/* Welcome */}
        <h1 className="text-[28px] font-bold text-gray-900 mb-6">Welcome Ben Zhou</h1>

        {/* Primary Tabs */}
        <div className="flex gap-0 mb-6 border-b border-gray-300 pb-0 overflow-x-hidden" style={{ scrollbarWidth: "none" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => tab === "Dashboard" ? setActiveTab(tab) : window.location.href = "/placeholder"}
              className="px-2 py-2 text-[11px] font-semibold whitespace-nowrap border-b-4 transition-colors flex-shrink-0"
              style={{
                color: activeTab === tab ? "#333" : "#666",
                borderBottomColor: activeTab === tab ? "#ff9800" : "transparent",
                backgroundColor: activeTab === tab ? "#fff" : "#f5f5f5",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Secondary Tabs */}
        <div className="flex gap-4 mb-6 pb-3">
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => tab === "Overview" ? setActiveSubTab(tab) : window.location.href = "/placeholder"}
              className="px-3 py-2 text-[13px] font-semibold transition-colors"
              style={{
                color: activeSubTab === tab ? "#fff" : "#2d5fa6",
                backgroundColor: activeSubTab === tab ? "#000" : "transparent",
                borderRadius: activeSubTab === tab ? "4px" : "0px",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="col-span-2">
            {/* Dashboard Messages Section */}
            <div className="mb-8 p-3 bg-gray-50 rounded border border-gray-200">
              <div className="flex items-center justify-center gap-2">
                <div className="text-[16px] text-[#1e3a5f]">⋁</div>
                <h2 className="text-[12px] font-semibold text-[#1e3a5f] italic">Scroll to see the latest dashboard messages</h2>
                <div className="text-[16px] text-[#1e3a5f]">⋁</div>
              </div>
            </div>

            {/* Get Hired as Tutor Section */}
            <div className="border border-gray-200 rounded overflow-hidden bg-white">
              <div className="flex">
                <div className="flex-1 p-8">
                  <h3 className="text-[20px] font-bold text-gray-900 mb-4">Get hired as a Tutor!</h3>
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663377518546/64xvFQWAGw93WqkAsaFW8F/tutor-program-jKhCqBVbpohmmPetyJCzdD.webp"
                    alt="Tutor Program"
                    className="w-full rounded mb-4 h-40 object-cover"
                  />
                  <p className="text-[13px] text-gray-600 mb-4">
                    Help others, set your own hours and make extra money by joining the U of T Tutor Training Program.
                  </p>
                  <p className="text-[13px] font-semibold text-[#2d5fa6] mb-4">uoft.me/UT3</p>
                  <button className="px-4 py-2 bg-[#2d5fa6] text-white text-[12px] font-semibold rounded hover:bg-[#1e4a8a]">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Upcoming Events */}
          <div>
            <div className="border border-gray-200 rounded p-6 bg-white">
              <h3 className="text-[14px] font-bold text-gray-900 mb-4">Upcoming Events / Workshops</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                {EVENTS.map((event, idx) => (
                  <div key={idx} className="pb-2 border-b border-gray-200 last:border-b-0">
                    <p className="text-[10px] font-semibold text-gray-700">{event.date}</p>
                    <p className="text-[10px] text-gray-600">{event.time}</p>
                    <p className="text-[11px] font-semibold text-gray-900 mb-1">{event.title}</p>
                    <p className="text-[9px] text-gray-600">{event.location}</p>
                    <p className="text-[9px] text-gray-600">{event.category}</p>
                    <p className="text-[9px] text-gray-600 mb-1">{event.organizer}</p>
                    {event.tag && (
                      <span className="inline-block px-2 py-0.5 bg-[#4caf50] text-white text-[8px] font-semibold rounded mb-1">
                        {event.tag}
                      </span>
                    )}
                    <button className="mt-1 px-3 py-1 bg-[#2d5fa6] text-white text-[9px] font-semibold rounded hover:bg-[#1e4a8a]">
                      View
                    </button>
                  </div>
                ))}
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f0f0" }}>
      {sidebarOpen && <Sidebar />}
      <MainContent onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
    </div>
  );
}
