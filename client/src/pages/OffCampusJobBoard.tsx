import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { ChevronDown, ChevronLeft, ChevronRight, Menu, Info, Search } from "lucide-react";

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

function TopNav({
  active,
  onSelect,
  onMenuToggle,
  onSubmenuSelect,
}: {
  active: string;
  onSelect: (item: string) => void;
  onMenuToggle: () => void;
  onSubmenuSelect: (item: string) => void;
}) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openSubSubmenu, setOpenSubSubmenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const navItems = useRef<Record<string, HTMLDivElement | null>>({});

  const getSubmenuPosition = (itemLabel: string) => {
    const navElement = navRef.current;
    const itemElement = navItems.current[itemLabel];

    if (!navElement || !itemElement) return { left: 0, top: 0 };

    const navRect = navElement.getBoundingClientRect();
    const itemRect = itemElement.getBoundingClientRect();
    const left = itemRect.left - navRect.left;
    const top = itemRect.bottom - navRect.top;

    return { left, top };
  };

  const openedSubSubmenuPosition = openSubSubmenu && {
    left: 200,
    top: 0,
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div
        ref={navRef}
        className="flex items-center justify-between h-16 px-4 relative"
      >
        <button
          onClick={onMenuToggle}
          className="p-2 hover:bg-gray-100 rounded lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="hidden lg:flex items-center overflow-x-auto gap-8">
          {TOP_NAV_CONFIG.map((item) => (
            <div
              key={item.label}
              ref={(el) => el && (navItems.current[item.label] = el)}
              className="relative group"
            >
              <button
                onClick={() => item.submenu ? setOpenSubmenu(openSubmenu === item.label ? null : item.label) : onSelect(item.label)}
                className={`whitespace-nowrap py-2 px-1 flex items-center gap-2 text-sm font-medium transition-colors ${
                  active === item.label
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {item.label}
                {item.submenu && (
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openSubmenu === item.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {item.submenu && openSubmenu === item.label && (
                <div
                  className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                  style={{
                    top: `${getSubmenuPosition(item.label).top}px`,
                    left: `${getSubmenuPosition(item.label).left}px`,
                  }}
                  onMouseLeave={() => {
                    setOpenSubmenu(null);
                    setOpenSubSubmenu(null);
                  }}
                >
                  {item.submenu.map((subitem) => {
                    const isSubMenu = typeof subitem === "object";
                    const label = isSubMenu ? subitem.label : subitem;
                    const hasChildren = isSubMenu && subitem.children;

                    return (
                      <div key={label} className="relative">
                        <button
                          onClick={() => {
                            if (label === "OFF-CAMPUS JOB BOARD") {
                              window.location.href = "/";
                            } else {
                              if (onSubmenuSelect) onSubmenuSelect(label);
                              setOpenSubmenu(null);
                              setOpenSubSubmenu(null);
                            }
                          }}
                          onMouseEnter={() => hasChildren && setOpenSubSubmenu(label)}
                          onMouseLeave={() => hasChildren && setOpenSubSubmenu(null)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between items-center"
                        >
                          {label}
                          {hasChildren && <ChevronRight size={14} />}
                        </button>

                        {hasChildren && openSubSubmenu === label && (
                          <div className="absolute left-full top-0 ml-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                            {subitem.children!.map((child) => (
                              <button
                                key={child}
                                onClick={() => {
                                  if (child === "OFF-CAMPUS JOB BOARD") {
                                    window.location.href = "/";
                                  } else {
                                    if (onSubmenuSelect) onSubmenuSelect(child);
                                    setOpenSubmenu(null);
                                    setOpenSubSubmenu(null);
                                  }
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                {child}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded">
            <Search size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
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
          } else if (item.label.startsWith("My ") || item.label === "Student Resources") {
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
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("sidebarExpanded");
    if (saved) return JSON.parse(saved);
    return {
      "Jobs & Recruitment": true,
      "Off-Campus Jobs": true,
    };
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
          />
        ))}
      </nav>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OffCampusJobBoard() {
  const [, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    if (saved) return JSON.parse(saved);
    return true;
  });

  const toggleSidebar = () => {
    setSidebarOpen((prev: boolean) => {
      const next = !prev;
      localStorage.setItem("sidebarOpen", JSON.stringify(next));
      return next;
    });
  };

  const handleNavSelect = (item: string) => {
    const routes: { [key: string]: string } = {
      DASHBOARD: "/dashboard",
      HOME: "/",
    };
    if (routes[item]) {
      navigate(routes[item]);
    }
  };

  const handleSubmenuSelect = (item: string) => {
    if (item === "OFF-CAMPUS JOB BOARD") {
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {sidebarOpen && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav
          active="JOBS & RECRUITMENT"
          onSelect={handleNavSelect}
          onMenuToggle={toggleSidebar}
          onSubmenuSelect={handleSubmenuSelect}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Off-Campus Job Board</h1>
            
            <div className="bg-white border border-[#ddd] rounded-lg p-6">
              <p className="text-gray-600 mb-4">
                Browse available off-campus job opportunities here.
              </p>
              
              <div className="grid gap-4">
                <div className="border border-[#ccc] rounded p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">Sample Job Posting</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    This is a sample job posting on the off-campus job board.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
