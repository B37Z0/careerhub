import { useState, useRef } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

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

// ─── Secondary Tabs ───────────────────────────────────────────────────────────

const SECONDARY_TABS = [
  "Dashboard",
  "Experiential Record",
  "My Documents",
  "My Applications",
  "My Interviews",
  "My Appointments",
  "My Events",
  "My Programs",
];

function SecondaryTabs({ active, onSelect }: { active: string; onSelect: (v: string) => void }) {
  return (
    <div className="flex items-center gap-6 px-6 py-3 bg-white border-b border-[#e0e0e0] overflow-x-auto">
      {SECONDARY_TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelect(tab)}
          className="text-[13px] font-semibold whitespace-nowrap transition-colors pb-2"
          style={{
            color: active === tab ? "#2d5fa6" : "#666",
            borderBottom: active === tab ? "2px solid #2d5fa6" : "none",
          }}
        >
          {tab}
        </button>
      ))}
      <span className="text-[13px] text-gray-400 ml-auto">...</span>
    </div>
  );
}

// ─── Tertiary Tabs ───────────────────────────────────────────────────────────

const TERTIARY_TABS = [
  "Overview",
  "My Account",
  "My Messages",
  "My Calendar",
  "My Schedule",
  "Payments and Invoices",
];

function TertiaryTabs({ active, onSelect }: { active: string; onSelect: (v: string) => void }) {
  return (
    <div className="flex items-center gap-6 px-6 py-3 bg-white border-b border-[#e0e0e0]">
      {TERTIARY_TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelect(tab)}
          className="text-[13px] font-semibold whitespace-nowrap transition-colors pb-2"
          style={{
            color: active === tab ? "#2d5fa6" : "#666",
            borderBottom: active === tab ? "2px solid #2d5fa6" : "none",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const [activeTop, setActiveTop] = useState("OVERVIEW");
  const [activeSecondary, setActiveSecondary] = useState("Dashboard");
  const [activeTertiary, setActiveTertiary] = useState("Overview");

  const events = [
    {
      date: "Monday, March 23, 2026",
      time: "10:00 AM ET - 04:00 PM ET",
      title: "Career Talks: Chat with a Career Assistant (Drop in)",
      org: "UTM Career Centre Events & Workshops",
      location: "Career Comet in Student Services Hub Davis",
      status: "View",
    },
    {
      date: "Monday, March 23, 2026",
      time: "01:00 PM ET - 02:30 PM ET",
      title: "Expressive Career Writing Session #3",
      org: "St. George Career Exploration & Education Events & Workshops",
      location: "806 Bay St. 5th floor, Room A/B",
      status: "Registration Required",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      date: "Monday, March 23, 2026",
      time: "01:45 PM ET - 05:00 PM ET",
      title: "In the Field - EY",
      org: "St. George Career Exploration & Education Events & Workshops",
      location: "Experiential Learning Commons (ELC), Room 301, St. George Campus",
      status: "Registration Required",
      statusColor: "bg-green-100 text-green-800",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav active={activeTop} onSelect={setActiveTop} />
        <SecondaryTabs active={activeSecondary} onSelect={setActiveSecondary} />
        <TertiaryTabs active={activeTertiary} onSelect={setActiveTertiary} />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-[#f5f5f5]">
          <div className="px-6 py-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome Ben Zhou</h1>

            {/* Content Grid */}
            <div className="grid grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="col-span-2 space-y-6">
                {/* Scroll Message */}
                <div className="text-center py-6">
                  <p className="text-[#2d5fa6] font-semibold text-[14px]">
                    👇 Scroll to see the latest dashboard messages 👇
                  </p>
                </div>

                {/* Get Hired as a Tutor */}
                <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
                  <div className="p-6 flex gap-6">
                    <div className="flex-shrink-0 w-48 h-40 bg-gray-300 rounded-lg overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
                        alt="Tutoring"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Get hired as a Tutor!</h3>
                      <h4 className="text-2xl font-bold text-[#2d5fa6] mb-3">BECOME A TUTOR!</h4>
                      <p className="text-gray-700 mb-3">
                        Help others, set your own hours and make extra money by joining the U of T Tutor Training Program.
                      </p>
                      <a href="#" className="text-[#2d5fa6] font-semibold hover:underline mb-4 block">
                        uoft.me/UT3
                      </a>
                      <p className="text-gray-700 mb-4">
                        Hey upper year students! Interested in becoming helping other students learn and to make some extra money on your own schedule?
                      </p>
                      <button className="px-6 py-3 bg-[#2d5fa6] text-white rounded font-semibold hover:bg-[#1e4a7a] transition-colors">
                        Join the UT3 program to become a U of T trained tutor!
                      </button>
                    </div>
                  </div>
                </div>

                {/* Your Schedule */}
                <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
                  <h3 className="px-6 py-4 text-lg font-bold text-gray-900 border-b border-[#e0e0e0]">
                    Your Schedule
                  </h3>
                  <div className="px-6 py-4 text-gray-700">
                    <p>No upcoming schedules.</p>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Events */}
              <div>
                <div className="bg-white border border-[#e0e0e0] rounded-lg p-6 sticky top-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events / Workshops</h3>
                  <div className="space-y-4">
                    {events.map((event, idx) => (
                      <div key={idx} className="border-b border-[#e0e0e0] pb-4 last:border-b-0">
                        <p className="text-[12px] font-semibold text-gray-600 mb-1">{event.date}</p>
                        <p className="text-[12px] text-gray-500 mb-2">{event.time}</p>
                        <p className="text-[13px] font-semibold text-gray-900 mb-2">{event.title}</p>
                        <p className="text-[12px] text-gray-600 mb-1">{event.org}</p>
                        <p className="text-[12px] text-gray-600 mb-3">{event.location}</p>
                        <button
                          className={`px-4 py-2 rounded font-semibold text-[12px] transition-colors ${
                            event.statusColor
                              ? event.statusColor
                              : "bg-[#2d5fa6] text-white hover:bg-[#1e4a7a]"
                          }`}
                        >
                          {event.status}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
