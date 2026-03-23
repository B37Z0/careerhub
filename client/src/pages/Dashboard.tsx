import { useState, useRef } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { toast } from "sonner";

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
  activeHighlight?: "purple";
  children?: NavItem[];
  href?: string;
}

const SIDEBAR_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", activeHighlight: "purple" },
  { label: "Appointments", expandable: true },
  { label: "Co-Curricular Record", expandable: true },
  { label: "Events & Workshops", expandable: true },
  { label: "Experiential Learning" },
  { label: "Jobs & Recruitment", expandable: true },
  { label: "Programs", expandable: true },
  { label: "Student Resources", expandable: true },
  { label: "St. George Online Store", expandable: true },
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
  const isAllCaps = item.label === item.label.toUpperCase() && item.label.replace(/\s/g, "").length > 4;
  const isPurple = item.activeHighlight === "purple";

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
          backgroundColor: isPurple ? "#6b3fa0" : undefined,
        }}
        onMouseEnter={(e) => {
          if (!isPurple) {
            (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isPurple) {
            (e.currentTarget as HTMLElement).style.backgroundColor = "";
          }
        }}
        onClick={() => {
          if (item.href) {
            window.location.href = item.href;
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
            color: isPurple ? "#fff" : "rgba(230,235,245,0.92)",
            fontWeight: isAllCaps || isPurple ? 700 : 400,
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
              color: isPurple ? "#fff" : "rgba(180,190,210,0.7)",
            }}
          />
        )}
      </button>

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
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

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

// ─── Dashboard Tabs ───────────────────────────────────────────────────────────

const DASHBOARD_TABS = [
  { label: "Dashboard", id: "dashboard" },
  { label: "Experiential Record", id: "exp-record" },
  { label: "My Documents", id: "documents" },
  { label: "My Applications", id: "applications" },
  { label: "My Interviews", id: "interviews" },
  { label: "My Appointments", id: "appointments" },
  { label: "My Events", id: "events" },
  { label: "My Programs", id: "programs" },
  { label: "...", id: "more" },
];

const DASHBOARD_SUBTABS = [
  { label: "Overview", id: "overview" },
  { label: "My Account", id: "account" },
  { label: "My Messages", id: "messages" },
  { label: "My Calendar", id: "calendar" },
  { label: "My Schedule", id: "schedule" },
  { label: "Payments and Invoices", id: "payments" },
];

// ─── Dashboard Content ────────────────────────────────────────────────────────

function DashboardContent() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeSubtab, setActiveSubtab] = useState("overview");

  const upcomingEvents = [
    {
      date: "Monday, March 23, 2026",
      time: "10:00 AM ET - 04:00 PM ET",
      title: "Career Talks: Chat with a Career Assistant (Drop in)",
      location: "UTM Career Centre Events & Workshops",
      venue: "Career Comet in Student Services Hub Davis",
      status: "normal",
    },
    {
      date: "Monday, March 23, 2026",
      time: "01:00 PM ET - 02:30 PM ET",
      title: "Expressive Career Writing Session #3",
      location: "St. George Career Exploration & Education Events & Workshops",
      venue: "806 Bay St. 5th floor, Room A/B",
      status: "required",
    },
    {
      date: "Monday, March 23, 2026",
      time: "01:45 PM ET - 05:00 PM ET",
      title: "In the Field - EY",
      location: "St. George Career Exploration & Education Events & Workshops",
      venue: "Experiential Learning Commons (ELC), Room 301, St. George Campus",
      status: "required",
    },
    {
      date: "Monday, March 23, 2026",
      time: "05:00 PM ET - 08:00 PM ET",
      title: "BIPOC Mentoring Circle for Biology Students",
      location: "UTSC Academic Advising & Career Centre Events & Workshops",
      venue: "CATALYST CENTRE",
      status: "required",
    },
    {
      date: "Tuesday, March 24, 2026",
      time: "10:00 AM ET - 12:00 PM ET",
      title: "Indigenous Career Educator - In-Person DROP IN Office Hours",
      location: "St. George Career Exploration & Education Events & Workshops",
      venue: "First Nations House - North Borden Building, 563 Spadina Ave, Toronto ON M5S 2J7",
      status: "normal",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {/* Welcome Header */}
      <div className="bg-white border-b border-[#e0e0e0] px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Ben Zhou</h1>
      </div>

      {/* Main Tabs */}
      <div className="border-b border-[#e0e0e0] bg-white px-8">
        <div className="flex gap-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {DASHBOARD_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-3 text-[13px] font-semibold border-b-2 whitespace-nowrap transition-colors"
              style={{
                borderBottomColor: activeTab === tab.id ? "#ff9800" : "transparent",
                color: activeTab === tab.id ? "#1a1a1a" : "#666",
                backgroundColor: activeTab === tab.id ? "#fafafa" : "transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subtabs */}
      <div className="border-b border-[#e0e0e0] bg-white px-8">
        <div className="flex gap-6">
          {DASHBOARD_SUBTABS.map((subtab) => (
            <button
              key={subtab.id}
              onClick={() => setActiveSubtab(subtab.id)}
              className="px-2 py-3 text-[13px] font-semibold transition-colors"
              style={{
                color: activeSubtab === subtab.id ? "#2d5fa6" : "#666",
                borderBottomColor: activeSubtab === subtab.id ? "#2d5fa6" : "transparent",
              }}
            >
              {subtab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-8 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2">
            {/* Scroll Message */}
            <div className="text-center py-8 mb-8">
              <p className="text-[#2d5fa6] text-lg font-semibold italic">
                ⬇ Scroll to see the latest dashboard messages ⬇
              </p>
            </div>

            {/* Promotional Section */}
            <div className="bg-white border border-[#e0e0e0] rounded p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Get hired as a Tutor!</h2>
              <div className="flex gap-8 items-center">
                <div className="flex-1">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
                    alt="Become a Tutor"
                    className="w-full rounded"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-[#2d5fa6] mb-4">BECOME A TUTOR!</h3>
                  <p className="text-gray-700 mb-4">
                    Help others, set your own hours and make extra money by joining the U of T Tutor Training Program.
                  </p>
                  <p className="text-[#2d5fa6] font-semibold mb-6">uoft.me/UT3</p>
                  <p className="text-gray-700 mb-6">
                    Hey upper year students! Interested in becoming helping other students learn and to make some extra money on your own schedule?
                  </p>
                  <button className="bg-[#2d5fa6] text-white px-6 py-3 rounded font-semibold hover:bg-[#1e4a7a] transition-colors">
                    Join the UT3 program to become a U of T trained tutor!
                  </button>
                </div>
              </div>
            </div>

            {/* Your Schedule Section */}
            <div className="bg-white border border-[#e0e0e0] rounded p-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Your Schedule</h3>
              <p className="text-gray-600">No upcoming schedules.</p>
            </div>
          </div>

          {/* Right Sidebar - Upcoming Events */}
          <div>
            <div className="bg-white border border-[#e0e0e0] rounded p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Upcoming Events / Workshops</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event, idx) => (
                  <div key={idx} className="border-b border-[#e0e0e0] pb-4 last:border-b-0">
                    <p className="text-[12px] font-semibold text-gray-600 mb-1">{event.date}</p>
                    <p className="text-[12px] text-gray-600 mb-2">{event.time}</p>
                    <p className="text-[13px] font-semibold text-gray-800 mb-1">{event.title}</p>
                    {event.status === "required" && (
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-[10px] font-semibold rounded mb-2">
                        Registration Required
                      </span>
                    )}
                    <p className="text-[12px] text-gray-600 mb-1">{event.location}</p>
                    <p className="text-[12px] text-gray-600 mb-3">{event.venue}</p>
                    <button className="w-full bg-[#2d5fa6] text-white py-2 rounded text-[12px] font-semibold hover:bg-[#1e4a7a] transition-colors">
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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("OVERVIEW");

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f0f0" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav active={activeNav} onSelect={setActiveNav} />
        <DashboardContent />
      </div>
    </div>
  );
}
