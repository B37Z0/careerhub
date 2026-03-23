import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export interface NavItem {
  label: string;
  href?: string;
  expandable?: boolean;
  children?: NavItem[];
  highlight?: "purple";
}

const SIDEBAR_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
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
          { label: "Off-Campus Job Board", href: "/" },
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
  currentPath,
}: {
  item: NavItem;
  depth?: number;
  expanded: Record<string, boolean>;
  onToggle: (key: string) => void;
  currentPath: string;
}) {
  const isExpanded = expanded[item.label];
  const isAllCaps = item.label === item.label.toUpperCase() && item.label.replace(/\s/g, "").length > 4;
  const isActive = item.href === currentPath || (item.label === "Off-Campus Job Board" && currentPath === "/");
  const isPurple = isActive && item.href;

  const paddingLeft = 18 + depth * 16;

  return (
    <>
      <button
        className="w-full text-left flex items-center justify-between transition-colors duration-150 group"
        style={{
          paddingLeft,
          paddingRight: 16,
          paddingTop: depth === 0 ? 12 : 10,
          paddingBottom: depth === 0 ? 12 : 10,
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
          <ChevronRight
            size={14}
            className="flex-shrink-0 transition-transform duration-200"
            style={{
              transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
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
              currentPath={currentPath}
            />
          ))}
        </div>
      )}
    </>
  );
}

export function Sidebar() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "Jobs & Recruitment": true,
    "Off-Campus Jobs": true,
  });
  const [location] = useLocation();

  const toggle = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div
      className="flex flex-col overflow-y-auto flex-shrink-0"
      style={{
        width: 280,
        minWidth: 280,
        backgroundColor: "#1e2a5e",
        minHeight: "100vh",
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
            currentPath={location}
          />
        ))}
      </nav>
    </div>
  );
}
