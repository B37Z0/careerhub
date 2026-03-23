import { useState, useRef } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

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
    <div className="flex items-stretch h-[48px] bg-white border-b border-[#e0e0e0] flex-shrink-0">
      <button
        className="px-3 flex items-center text-gray-500 hover:text-gray-800 flex-shrink-0"
        onClick={() => toast.info("Menu toggled")}
      >
        <ChevronLeft size={18} />
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
            className="flex items-center px-4 text-[13px] font-semibold tracking-wide whitespace-nowrap border-b-[3px] transition-all duration-150 flex-shrink-0"
            style={{
              color: active === item ? "#1a1a1a" : "#666",
              borderBottomColor: active === item ? "#2d5fa6" : "transparent",
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <button
        className="px-2 flex items-center text-gray-500 hover:text-gray-800 flex-shrink-0"
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

// ─── Dashboard Content ────────────────────────────────────────────────────────

function DashboardContent() {
  const [activeTab, setActiveTab] = useState("OVERVIEW");

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
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#f5f5f5]">
      {/* Top Nav */}
      <TopNav active={activeTab} onSelect={setActiveTab} />

      {/* Main Content */}
      <div className="px-8 py-8">
        {/* Welcome Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome Ben Zhou</h1>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="col-span-2 space-y-8">
            {/* Scroll Message */}
            <div className="text-center py-6">
              <p className="text-[#2d5fa6] text-lg font-semibold italic">
                ⬇ Scroll to see the latest dashboard messages ⬇
              </p>
            </div>

            {/* Promotional Section */}
            <div className="bg-white border border-[#e0e0e0] rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get hired as a Tutor!</h2>
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-48">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=250&fit=crop"
                    alt="Become a Tutor"
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-[#2d5fa6] mb-4">BECOME A TUTOR!</h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Help others, set your own hours and make extra money by joining the U of T Tutor Training Program.
                  </p>
                  <p className="text-[#2d5fa6] font-semibold mb-4">uoft.me/UT3</p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Hey upper year students! Interested in becoming helping other students learn and to make some extra money on your own schedule?
                  </p>
                  <button className="bg-[#2d5fa6] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1e4a7a] transition-colors">
                    Join the UT3 program to become a U of T trained tutor!
                  </button>
                </div>
              </div>
            </div>

            {/* Your Schedule Section */}
            <div className="bg-white border border-[#e0e0e0] rounded-lg p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Schedule</h3>
              <p className="text-gray-600">No upcoming schedules.</p>
            </div>
          </div>

          {/* Right Sidebar - Upcoming Events */}
          <div>
            <div className="bg-white border border-[#e0e0e0] rounded-lg p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Upcoming Events / Workshops</h3>
              <div className="space-y-6">
                {upcomingEvents.map((event, idx) => (
                  <div key={idx} className="pb-6 border-b border-[#e0e0e0] last:border-b-0 last:pb-0">
                    <p className="text-[13px] font-semibold text-gray-700 mb-1">{event.date}</p>
                    <p className="text-[12px] text-gray-600 mb-2">{event.time}</p>
                    <p className="text-[14px] font-semibold text-gray-900 mb-2">{event.title}</p>
                    {event.status === "required" && (
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-[11px] font-semibold rounded mb-2">
                        Registration Required
                      </span>
                    )}
                    <p className="text-[12px] text-gray-600 mb-1">{event.location}</p>
                    <p className="text-[12px] text-gray-600 mb-3">{event.venue}</p>
                    <button className="w-full bg-[#2d5fa6] text-white py-2 rounded-lg text-[13px] font-semibold hover:bg-[#1e4a7a] transition-colors">
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
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardContent />
      </div>
    </div>
  );
}
