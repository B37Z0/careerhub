import { FileText, ChevronDown, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useRoute, useLocation } from "wouter";
import { useState, useRef } from "react";
import { toast } from "sonner";

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

// ─── Top Navigation ─────────────────────────────────────────────────────────────

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
        minHeight: "calc(100vh - 48px)",
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

export default function JobPosting() {
  const [match, params] = useRoute("/job/:id");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("MY APPLICATIONS");

  const handleNavSelect = (item: string) => {
    window.location.href = "/placeholder";
  };

  if (!match) return null;

  const jobId = params?.id;

  // Job posting data
  const jobData = {
    id: "262153",
    title: "Full-Stack Engineer",
    organization: "Uncountable",
    division: "Head Office",
    status: "Approved",
    jobType: "Full Time Undergraduate",
    occupation: "Software Engineering",
    description: "Thank you for your interest in Uncountable Engineering!\n\nDescription\nUncountable is seeking experienced platform engineers who are passionate about user experience and scaling web applications. Our goal is to revolutionize industrial research and development. We're looking for motivated engineers who can help to build a state of the art development platform that will be used across Fortune 500 companies.\n\nPrimary Responsibility\nYour primary responsibility will be to develop the Uncountable Web Platform where scientists upload and analyze their experiments. This role would be about half front-end and half back-end.",
    salaryRange: "$22 - 27.50/hour",
    stack: {
      backend: "Flask (Python), Postgres",
      frontend: "React (Typescript), Redux, Sass",
    },
    benefits: [
      "Competitive Salary and Equity",
      "Health and Dental Insurance",
      "401K with Employer Contribution",
    ],
    requirements: [
      "2 years of development experience",
      "Strong interest in developing data analysis-driven user interfaces and experiences",
      "Experience with modern Javascript best practices",
      "Solid computer science and software engineering fundamentals",
    ],
    preferredQualifications: [
      "B.S. in computer science",
      "Familiarity with React, ES6",
      "Familiarity with SQL Databases including query performance optimization",
    ],
    degree: "Bachelor degree in progress",
    location: "Toronto, Ontario, Canada",
    country: "Canada",
    compensation: "Paid - Hourly",
    annualSalary: 125000,
    hoursPerWeek: "35+",
    positions: 3,
    deadline: "June 1, 2026 11:59 PM",
    applicationProcedure: "Employer Website",
    applicationLink: "https://jobs.ashbyhq.com/uncountable/7f39fc4d-7cc5-42a8-8021-e30cfaa47470",
    documentsRequired: "Resume, Transcript (Unofficial)",
    additionalInfo: "Applications will be considered on a rolling basis. Immediate start or post-graduate start dates in 2026 are both available.",
    website: "https://www.uncountable.com/",
    industry: "Computer, Information and Internet Services",
    funding: "Private for Profit",
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f0f0" }}>
      {sidebarOpen && <Sidebar />}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation */}
        <TopNav active={activeNav} onSelect={handleNavSelect} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <Breadcrumb />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-white">
          {/* Header Section */}
          <div className="bg-[#4a4a4a] text-white px-8 py-8">
            <div className="flex items-start gap-6 max-w-6xl mx-auto">
              <div className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center flex-shrink-0">
                <FileText size={48} className="text-white" />
              </div>
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-gray-300">Job Posting</span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{jobData.id} - {jobData.title}</h1>
                <p className="text-lg text-gray-200">{jobData.organization} - {jobData.division}</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="inline-block px-3 py-1 bg-[#ff9800] text-white text-[11px] font-semibold rounded-full">
                    {jobData.jobType}
                  </span>
                  <span className="inline-block px-3 py-1 bg-[#607d8b] text-white text-[11px] font-semibold rounded-full">
                    {jobData.compensation}
                  </span>
                  <span className="inline-block px-3 py-1 bg-[#d32f2f] text-white text-[11px] font-semibold rounded-full">
                    Incomplete
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                  <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                  Job Posting
                </div>
              </div>
            </div>
          </div>



          {/* Tabs Section */}
          <div className="border-b border-gray-200 px-8 max-w-6xl mx-auto">
            <div className="flex gap-8">
              <button className="py-4 px-2 font-semibold text-gray-800 border-b-4 border-[#ff9800]">
                Overview
              </button>
              <button className="py-4 px-2 font-semibold text-[#2d5fa6] hover:text-gray-800">
                Map
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-8 py-8 max-w-6xl mx-auto grid grid-cols-3 gap-8">
            {/* Left Column - Job Information */}
            <div className="col-span-2">
              {/* Job Posting Information */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-6 pb-3 border-b-2 border-[#ff9800]">Job Posting Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                    <div>
                      <p className="font-semibold text-gray-700">Job Type:</p>
                      <p className="text-gray-600">{jobData.jobType}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">Job Title:</p>
                      <p className="text-gray-600">{jobData.title}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                    <div>
                      <p className="font-semibold text-gray-700">Occupation:</p>
                      <p className="text-gray-600">{jobData.occupation}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">Salary Range:</p>
                      <p className="text-gray-600">{jobData.salaryRange}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                    <div>
                      <p className="font-semibold text-gray-700">Job Location:</p>
                      <p className="text-gray-600">{"(Remote) " + jobData.location}</p>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <p className="font-semibold text-gray-700 mb-2">Job Description:</p>
                    <p className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">{jobData.description}</p>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Our Current Stack</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-semibold text-gray-700 mb-2">Backend:</p>
                    <p className="text-gray-600">{jobData.stack.backend}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-semibold text-gray-700 mb-2">Frontend:</p>
                    <p className="text-gray-600">{jobData.stack.frontend}</p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Benefits</h3>
                <ul className="space-y-2">
                  {jobData.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-gray-600 flex items-start gap-2">
                      <span className="text-[#ff9800] mt-1">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Job Qualifications */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Job Qualifications</h3>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Requirements</h4>
                  <ul className="space-y-2">
                    {jobData.requirements.map((req, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start gap-2">
                        <span className="text-[#ff9800] mt-1">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Preferred Qualifications</h4>
                  <ul className="space-y-2">
                    {jobData.preferredQualifications.map((qual, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start gap-2">
                        <span className="text-[#ff9800] mt-1">•</span>
                        {qual}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Application Information */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Application Information</h3>
                <div className="space-y-4 bg-gray-50 p-4 rounded">
                  <div>
                    <p className="font-semibold text-gray-700">Application Deadline:</p>
                    <p className="text-gray-600">{jobData.deadline}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Application Procedure:</p>
                    <p className="text-gray-600">{jobData.applicationProcedure}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Application Link:</p>
                    <a href={jobData.applicationLink} target="_blank" rel="noopener noreferrer" className="text-[#2d5fa6] hover:underline">
                      {jobData.applicationLink}
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Documents Required:</p>
                    <p className="text-gray-600">{jobData.documentsRequired}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Additional Information:</p>
                    <p className="text-gray-600">{jobData.additionalInfo}</p>
                  </div>
                </div>
              </div>

              {/* Organization Information */}
              <div>
                <h3 className="text-lg font-bold mb-4">Organization Information</h3>
                <div className="space-y-3 bg-gray-50 p-4 rounded">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-gray-700">Organization:</p>
                      <p className="text-gray-600">{jobData.organization}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">Industry:</p>
                      <p className="text-gray-600">{jobData.industry}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-gray-700">Funding:</p>
                      <p className="text-gray-600">{jobData.funding}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">Division:</p>
                      <p className="text-gray-600">{jobData.division}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Website:</p>
                    <a href={jobData.website} target="_blank" rel="noopener noreferrer" className="text-[#2d5fa6] hover:underline">
                      {jobData.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Tags and Actions */}
            <div>
              <div className="bg-gray-50 p-6 rounded sticky top-8">
                <h3 className="text-lg font-bold mb-4">TAGS</h3>
                <div className="space-y-2 mb-6">
                  <span className="inline-block px-3 py-1 bg-[#333] text-white text-xs font-semibold rounded">
                    Deadline in 78 day(s)
                  </span>
                  <span className="inline-block px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded ml-2">
                    Viewed
                  </span>
                </div>

                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-[#333] text-white font-semibold rounded hover:bg-[#222]">
                    Mark as applied
                  </button>
                  <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-100">
                    Shortlist
                  </button>
                  <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-100">
                    Not Interested
                  </button>
                  <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-100">
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
