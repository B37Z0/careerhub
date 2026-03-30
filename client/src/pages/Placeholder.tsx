import { Menu, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

// ─── Top Navigation ───────────────────────────────────────────────────────────

const TOP_NAV_ITEMS = [
  "DASHBOARD",
  "APPOINTMENTS",
  "CO-CURRICULAR RECORD",
  "EVENTS & WORKSHOPS",
  "EXPERIENTIAL RECORD",
  "JOBS & RECRUITMENT",
  "PROGRAMS",
  "STUDENT RESOURCES",
  "ST. GEORGE ONLINE STORE",
];

const APPOINTMENTS_SUBMENU = [
  "MY APPOINTMENTS",
];

interface SubMenuItem {
  label: string;
  children?: string[];
}

const JOBS_RECRUITMENT_SUBMENU: (string | SubMenuItem)[] = [
  "WORK STUDY",
  "ON-CAMPUS JOBS",
  {
    label: "OFF-CAMPUS JOBS",
    children: ["OFF-CAMPUS JOB BOARD", "OFF-CAMPUS JOB DOCUMENTS", "OFF-CAMPUS JOB APPLICATIONS"],
  },
  "CASUAL JOB BOARD",
  "RECRUITMENT",
  "VOLUNTEER POSTINGS",
];

interface TopNavItem {
  label: string;
  submenu?: (string | SubMenuItem)[];
}

const TOP_NAV_CONFIG: TopNavItem[] = [
  { label: "DASHBOARD" },
  { label: "APPOINTMENTS", submenu: APPOINTMENTS_SUBMENU },
  { label: "CO-CURRICULAR RECORD" },
  { label: "EVENTS & WORKSHOPS" },
  { label: "EXPERIENTIAL RECORD" },
  { label: "JOBS & RECRUITMENT", submenu: JOBS_RECRUITMENT_SUBMENU },
  { label: "PROGRAMS" },
  { label: "STUDENT RESOURCES" },
  { label: "ST. GEORGE ONLINE STORE" },
];

function TopNav({ onMenuToggle }: { onMenuToggle: () => void }) {
  const navRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const submenuItemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openSubSubmenu, setOpenSubSubmenu] = useState<string | null>(null);
  
  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  
  const handleMenuEnter = (item: any) => {
    if (item.submenu) {
      setOpenSubmenu(item.label);
    }
  };

  return (
    <div className="flex items-stretch bg-[#f0f0f0] border-b border-[#ccc] flex-shrink-0 flex-col relative">
      <div className="flex items-stretch h-[48px]" ref={navRef}>
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
        {TOP_NAV_CONFIG.map((item) => (
          <div 
            key={item.label}
            ref={(el) => {
              if (el) itemRefs.current[item.label] = el;
            }}
            className="relative flex items-stretch"
            onMouseEnter={() => handleMenuEnter(item)}
            onMouseLeave={() => item.submenu && setOpenSubmenu(null)}
          >
            <button
              className="flex items-center px-4 text-[12.5px] font-semibold tracking-wide whitespace-nowrap border-b-[3px] transition-all duration-150 flex-shrink-0 cursor-default gap-1"
              style={{
                color: "#444",
                borderBottomColor: "transparent",
              }}
            >
              {item.label}
              {item.submenu && <ChevronDown size={14} />}
            </button>
          </div>
        ))}
      </div>
      <button
        className="px-2 flex items-center text-gray-500 hover:text-gray-800 flex-shrink-0 border-l border-[#ccc]"
        onClick={() => scroll("right")}
      >
        <ChevronRight size={16} />
      </button>
      </div>
      
      {/* Dropdown Submenu - Rendered outside scroll container */}
      {openSubmenu && (
        <div className="absolute top-full z-50 pointer-events-none" style={{ left: (() => {
          const element = itemRefs.current[openSubmenu];
          const nav = navRef.current;
          if (element && nav) {
            return element.getBoundingClientRect().left - nav.getBoundingClientRect().left;
          }
          return 0;
        })() }}>
          <div 
            className="bg-white border border-[#ccc] shadow-lg pointer-events-auto max-w-xs relative"
            onMouseEnter={() => setOpenSubmenu(openSubmenu)}
            onMouseLeave={() => {
              setOpenSubmenu(null);
              setOpenSubSubmenu(null);
            }}
          >
            {TOP_NAV_CONFIG.find(item => item.label === openSubmenu)?.submenu?.map((item) => {
              const isObject = typeof item === 'object';
              const label = isObject ? item.label : item;
              const hasChildren = isObject && item.children && item.children.length > 0;
              
              return (
                <div 
                  key={label}
                  ref={(el) => {
                    if (el) submenuItemRefs.current[label] = el;
                  }}
                  onMouseEnter={() => hasChildren && setOpenSubSubmenu(label)}
                >
                  <button
                    onClick={() => {
                      if (!hasChildren) {
                        if (onSubmenuSelect) onSubmenuSelect(label);
                        setOpenSubmenu(null);
                        setOpenSubSubmenu(null);
                      }
                    }}
                    className="w-full text-left px-4 py-3 text-[12.5px] font-semibold text-gray-700 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                  >
                    <span>{label}</span>
                    {hasChildren && <ChevronDown size={12} className="rotate-90" />}
                  </button>
                </div>
              );
            })}
            
            {/* Nested submenu - positioned to the right */}
            {openSubSubmenu && (() => {
              const item = TOP_NAV_CONFIG.find(item => item.label === openSubmenu)?.submenu?.find((item) => {
                const isObject = typeof item === 'object';
                return (isObject ? item.label : item) === openSubSubmenu;
              }) as SubMenuItem;
              
              if (!item || !item.children) return null;
              
              const parentItem = submenuItemRefs.current[openSubSubmenu];
              if (!parentItem) return null;
              
              const mainDropdown = parentItem.closest('.max-w-xs') as HTMLElement;
              if (!mainDropdown) return null;
              
              const parentRect = parentItem.getBoundingClientRect();
              const dropdownRect = mainDropdown.getBoundingClientRect();
              const topOffset = parentRect.top - dropdownRect.top;
              
              return (
                <div 
                  className="absolute top-0 left-full z-50 pointer-events-auto ml-0 bg-white border border-[#ccc] shadow-lg"
                  style={{ top: topOffset }}
                  onMouseEnter={() => setOpenSubSubmenu(openSubSubmenu)}
                  onMouseLeave={() => setOpenSubSubmenu(null)}
                >
                  {item.children.map((child) => (
                    <button
                      key={child}
                      onClick={() => {
                        if (child === "OFF-CAMPUS JOB BOARD") {
                          window.location.href = "/";
                        } else {
                          if (onSubmenuSelect) onSubmenuSelect(child);
                        }
                        setOpenSubmenu(null);
                        setOpenSubSubmenu(null);
                      }}
                      className="w-full text-left px-4 py-3 text-[12.5px] font-semibold text-gray-700 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0 whitespace-nowrap"
                    >
                      {child}
                    </button>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      )}
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
  { label: "Appointments", expandable: true, children: [{ label: "My Appointments" }] },
  { label: "Co-Curricular Record", expandable: true, children: [{ label: "My Co-Curricular Record" }] },
  { label: "Events & Workshops", expandable: true, children: [{ label: "My Events" }] },
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
  breadcrumbPath,
}: {
  item: NavItem;
  depth?: number;
  expanded: Record<string, boolean>;
  onToggle: (key: string) => void;
  breadcrumbPath: string;
}) {
  const isExpanded = expanded[item.label];
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
          } else if (item.label.startsWith("My ") || item.label === "Student Resources") {
            window.location.href = `/placeholder?path=${encodeURIComponent(breadcrumbPath + " › " + item.label)}`;
          } else {
            window.location.href = `/placeholder?path=${encodeURIComponent(breadcrumbPath + " › " + item.label)}`;
          }
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
              breadcrumbPath={breadcrumbPath + " › " + item.label}
            />
          ))}
        </div>
      )}
    </>
  );
}

function Sidebar({ breadcrumbPath }: { breadcrumbPath: string }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("sidebarExpanded");
    if (saved) return JSON.parse(saved);
    return {};
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
            breadcrumbPath=""
          />
        ))}
      </nav>
    </div>
  );
}

// ─── Breadcrumb ──────────────────────────────────────────────────────────────

function Breadcrumb({ path }: { path: string }) {
  return (
    <div
      className="flex items-center gap-2 px-5 py-3 text-[13px] bg-[#f5f5f5] border-b border-[#d0d5de] flex-shrink-0"
      style={{ height: 40 }}
    >
      <span className="text-gray-700">{path}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Placeholder() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [activeNav, setActiveNav] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen((prev: boolean) => {
      const next = !prev;
      localStorage.setItem("sidebarOpen", JSON.stringify(next));
      return next;
    });
  };

  const handleNavSelect = (item: string) => {
    if (item === "DASHBOARD") {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/placeholder";
    }
  };

  // Get breadcrumb path from URL query parameter
  const params = new URLSearchParams(window.location.search);
  const breadcrumbPath = params.get("path") || "Feature Coming Soon";

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f0f0" }}>
      {/* Sidebar */}
      {sidebarOpen && <Sidebar breadcrumbPath={breadcrumbPath} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav onMenuToggle={toggleSidebar} />
        <Breadcrumb path={breadcrumbPath} />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Nothing here yet</h1>
              <p className="text-gray-600 text-lg mb-8">This feature is coming soon.</p>
              <button
                onClick={() => window.location.href = "/dashboard"}
                className="px-6 py-3 bg-[#2d5fa6] text-white font-semibold rounded hover:bg-[#244d8a] transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
