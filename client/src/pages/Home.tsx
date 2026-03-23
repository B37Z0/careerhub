/*
 * Career Portal — Jobs & Recruitment Page
 * Design: Institutional Precision
 * - Deep navy sidebar with purple active state
 * - Teal circular badge counters
 * - White content area with bordered section cards
 * - Horizontal scrollable top navigation bar
 */

import { useState, useRef } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronLeft, ChevronRight, Menu, Info, Search } from "lucide-react";
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

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb() {
  return (
    <div className="px-6 py-3 bg-white border-b border-[#e0e0e0] text-[13px]">
      <button className="text-[#2d5fa6] hover:underline">Jobs & Recruitment</button>
      <span className="text-gray-400 mx-2">›</span>
      <button className="text-[#2d5fa6] hover:underline">Off Campus Jobs</button>
      <span className="text-gray-400 mx-2">›</span>
      <button className="text-[#2d5fa6] hover:underline">Off Campus Job Board</button>
    </div>
  );
}

// ─── Main Content ─────────────────────────────────────────────────────────────

function MainContent() {
  const [activeTab, setActiveTab] = useState("MY APPLICATIONS");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState({
    keyword: "",
    jobType: "",
    industry: "",
    workTerm: "",
    employer: "",
    location: "",
    salary: "",
  });

  const QUICK_SEARCHES = [
    { label: "Applied To", count: 12 },
    { label: "Shortlist", count: 5 },
    { label: "New Postings", count: 34 },
    { label: "Deadlines Soon", count: 8 },
  ];

  const JOB_DATA = [
    {
      id: "262086",
      title: "Software Engineer (Co-op)",
      organization: "Google Canada",
      division: "Engineering",
      workTerm: "4m",
      type: "Co-op",
      openings: 8,
      location: "Toronto",
      deadline: "2026-04-15",
    },
    {
      id: "262088",
      title: "Data Analyst Intern",
      organization: "Shopify",
      division: "Analytics",
      workTerm: "4m",
      type: "Internship",
      openings: 12,
      location: "Ottawa",
      deadline: "2026-04-20",
    },
    {
      id: "262090",
      title: "Product Manager (New Grad)",
      organization: "Uncountable",
      division: "Head Office",
      workTerm: "12m",
      type: "Full Time",
      openings: 3,
      location: "U.S.A",
      deadline: "2026-06-01",
    },
    {
      id: "262095",
      title: "Full-Stack Engineer",
      organization: "Uncountable",
      division: "Head Office",
      workTerm: "12m",
      type: "Full Time",
      openings: 3,
      location: "U.S.A",
      deadline: "2026-06-01",
    },
    {
      id: "262097",
      title: "Backend Engineer",
      organization: "RBC",
      division: "Technology",
      workTerm: "8m",
      type: "Co-op",
      openings: 15,
      location: "Toronto",
      deadline: "2026-05-10",
    },
    {
      id: "262153",
      title: "DevOps Engineer",
      organization: "Uncountable",
      division: "Head Office",
      workTerm: "12m",
      type: "Full Time",
      openings: 2,
      location: "U.S.A",
      deadline: "2026-06-01",
    },
    {
      id: "262155",
      title: "UX Designer",
      organization: "Shopify",
      division: "Design",
      workTerm: "4m",
      type: "Internship",
      openings: 5,
      location: "Waterloo",
      deadline: "2026-04-25",
    },
    {
      id: "262156",
      title: "Data Scientist",
      organization: "TD Bank",
      division: "Analytics",
      workTerm: "8m",
      type: "Co-op",
      openings: 10,
      location: "Toronto",
      deadline: "2026-05-15",
    },
    {
      id: "262157",
      title: "Frontend Engineer",
      organization: "Slack",
      division: "Engineering",
      workTerm: "4m",
      type: "Internship",
      openings: 8,
      location: "Vancouver",
      deadline: "2026-04-30",
    },
    {
      id: "262190",
      title: "Business Analyst",
      organization: "Deloitte",
      division: "Consulting",
      workTerm: "8m",
      type: "Co-op",
      openings: 20,
      location: "Toronto",
      deadline: "2026-05-20",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Co-op":
        return "bg-orange-100 text-orange-800";
      case "Internship":
        return "bg-pink-100 text-pink-800";
      case "Full Time":
        return "bg-green-100 text-green-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f5f5f5]">
      <TopNav active={activeTab} onSelect={setActiveTab} />
      <Breadcrumb />

      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Off-Campus Job Board</h1>

        {/* Search and Quick Searches */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Left Half - Search Widget */}
          <div className="col-span-2 bg-white border border-[#e0e0e0] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Keyword Search</h3>

            {/* Search Input */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Keyword Search"
                  value={filters.keyword}
                  onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                  className="w-full px-4 py-2 border border-[#ccc] rounded-lg text-[13px] focus:outline-none focus:border-[#2d5fa6]"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800">
                  <Search size={16} />
                </button>
              </div>
            </div>

            {/* Information Links */}
            <div className="space-y-2 text-[12px] text-[#2d5fa6] mb-4">
              <button className="block hover:underline">Non Endorsement Statement →</button>
              <button className="block hover:underline">Employer Participation →</button>
              <button className="block hover:underline">Job Fraud Prevention →</button>
            </div>

            {/* Contact Info */}
            <div className="pt-4 border-t border-[#e0e0e0] text-[12px] text-gray-700">
              <p className="mb-1">If you have any questions or would like to discuss your concerns, please contact:</p>
              <p className="font-semibold">Career Exploration & Education</p>
              <a href="mailto:careerservices@utoronto.ca" className="text-[#2d5fa6] hover:underline">
                careerservices@utoronto.ca
              </a>
            </div>
          </div>

          {/* Right Half - Quick Searches */}
          <div className="bg-white border border-[#e0e0e0] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">QUICK SEARCHES:</h3>
            <div className="space-y-3">
              {QUICK_SEARCHES.map((item) => (
                <button
                  key={item.label}
                  className="flex items-center gap-3 w-full hover:opacity-80 transition-opacity"
                  onClick={() => toast.info(`Filtering by ${item.label}`)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-[12px] font-bold">
                    {item.count}
                  </div>
                  <span className="text-[13px] text-[#2d5fa6] hover:underline">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="bg-white border border-[#e0e0e0] rounded-lg mb-8">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="text-[13px] font-semibold text-gray-900">Advanced search filters</span>
            <ChevronDown
              size={16}
              className="transition-transform"
              style={{ transform: showAdvanced ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>

          {showAdvanced && (
            <div className="px-6 pb-6 border-t border-[#e0e0e0] grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-semibold text-gray-700 mb-2">Job Type</label>
                <input
                  type="text"
                  placeholder="Enter job type"
                  className="w-full px-3 py-2 border border-[#ccc] rounded text-[12px] focus:outline-none focus:border-[#2d5fa6]"
                  onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-700 mb-2">Industry</label>
                <select className="w-full px-3 py-2 border border-[#ccc] rounded text-[12px] focus:outline-none focus:border-[#2d5fa6]">
                  <option>-- Any --</option>
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Consulting</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-700 mb-2">Work Term</label>
                <select className="w-full px-3 py-2 border border-[#ccc] rounded text-[12px] focus:outline-none focus:border-[#2d5fa6]">
                  <option>-- Any --</option>
                  <option>4 Months</option>
                  <option>8 Months</option>
                  <option>12 Months</option>
                  <option>Permanent</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-700 mb-2">Employer</label>
                <input
                  type="text"
                  placeholder="Enter employer"
                  className="w-full px-3 py-2 border border-[#ccc] rounded text-[12px] focus:outline-none focus:border-[#2d5fa6]"
                  onChange={(e) => setFilters({ ...filters, employer: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full px-3 py-2 border border-[#ccc] rounded text-[12px] focus:outline-none focus:border-[#2d5fa6]"
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-700 mb-2">Salary</label>
                <select className="w-full px-3 py-2 border border-[#ccc] rounded text-[12px] focus:outline-none focus:border-[#2d5fa6]">
                  <option>-- Any --</option>
                  <option>$15-$20/hr</option>
                  <option>$20-$25/hr</option>
                  <option>$25-$30/hr</option>
                  <option>$30-$40/hr</option>
                  <option>$40+/hr</option>
                </select>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="px-6 py-4 border-t border-[#e0e0e0] flex gap-3">
            <button className="px-6 py-2 bg-[#2d5fa6] text-white rounded text-[13px] font-semibold hover:bg-[#1e4a7a] transition-colors">
              Search
            </button>
            <button className="px-6 py-2 bg-gray-600 text-white rounded text-[13px] font-semibold hover:bg-gray-700 transition-colors">
              Save Filters
            </button>
            <select className="px-3 py-2 border border-[#ccc] rounded text-[13px] focus:outline-none focus:border-[#2d5fa6]">
              <option>-- Load Saved Filters --</option>
              <option>Tech Companies - Remote</option>
              <option>Finance - Toronto</option>
              <option>Summer Internships 2024</option>
              <option>4-Month Co-ops</option>
            </select>
          </div>
        </div>

        {/* Job Postings Table */}
        <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
          <h3 className="px-6 py-4 text-lg font-semibold text-gray-900 border-b border-[#e0e0e0]">Job Postings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b border-[#e0e0e0]">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Position</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Organization</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Division</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Openings</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Location</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">App Deadline</th>
                </tr>
              </thead>
              <tbody>
                {JOB_DATA.map((job) => (
                  <tr key={job.id} className="border-b border-[#e0e0e0] hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3 text-gray-600">{job.id}</td>
                    <td className="px-4 py-3">
                      <a
                        href={`/job/${job.id}`}
                        className="text-[#2d5fa6] hover:underline font-semibold"
                      >
                        {job.title}
                      </a>
                      <div className="flex gap-2 mt-1">
                        <span className={`px-2 py-1 rounded text-[11px] font-semibold ${getTypeColor(job.type)}`}>
                          {job.type}
                        </span>
                        <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-[11px] font-semibold">
                          {job.workTerm}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{job.organization}</td>
                    <td className="px-4 py-3 text-gray-700">{job.division}</td>
                    <td className="px-4 py-3 text-gray-700">{job.openings}</td>
                    <td className="px-4 py-3 text-gray-700">{job.location}</td>
                    <td className="px-4 py-3 text-gray-700">{job.deadline}</td>
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

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <MainContent />
    </div>
  );
}
