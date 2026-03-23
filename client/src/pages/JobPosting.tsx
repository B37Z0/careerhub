import { Sidebar } from "@/components/Sidebar";
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

export default function JobPosting() {
  const [activeNav, setActiveNav] = useState("MY APPLICATIONS");

  const job = {
    id: "262153",
    title: "Full-Stack Engineer",
    organization: "Uncountable",
    division: "Head Office",
    location: "U.S.A",
    workTerm: "12 months",
    industry: "Computer, Information and Internet Services",
    type: "Full Time",
    salary: "$120K-$160K + Equity",
    description: `Thank you for your interest in Uncountable Engineering!

Description
Uncountable is seeking experienced platform engineers who are passionate about user experience and scaling web applications. Our goal is to revolutionize industrial research and development. We're looking for motivated engineers who can help to build a state of the art development platform that will be used across Fortune 500 companies.

Primary Responsibility
You primary responsibility will be to develop the Uncountable Web Platform where scientists upload and analyze their experiments. This role would be about half front-end and half back-end.`,
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
    preferred: [
      "B.S. in computer science",
      "Familiarity with React, ES6",
      "Familiarity with SQL Databases including query performance optimization",
    ],
    applicationInfo: {
      deadline: "June 1, 2026 11:59 PM",
      method: "Employer Website",
      url: "https://jobs.ashbyhq.com/uncountable/7f39fc4d-7cc5-42a8-8021-e30cfaa47470",
      documents: ["Resume", "Transcript (Unofficial)"],
      notes: "Applications will be considered on a rolling basis. Immediate start or post-graduate start dates in 2026 are both available.",
    },
    requiredDocs: ["Resume", "CV", "Cover Letter"],
    applicationMethods: ["External", "Direct"],
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav active={activeNav} onSelect={setActiveNav} />
        <Breadcrumb />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-[#f5f5f5]">
          <div className="px-6 py-6">
            {/* Header Section */}
            <div className="bg-gray-800 text-white rounded-lg p-8 mb-6 flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">
                  {job.id} - {job.title}
                </h1>
                <p className="text-lg text-gray-200 mb-4">
                  {job.organization} - {job.division}
                </p>
                <div className="flex gap-3">
                  <span className="px-3 py-1 bg-purple-600 text-white rounded text-[12px] font-semibold">
                    {job.workTerm}
                  </span>
                  <span className="px-3 py-1 bg-blue-600 text-white rounded text-[12px] font-semibold">
                    {job.industry}
                  </span>
                  <span className="px-3 py-1 bg-orange-600 text-white rounded text-[12px] font-semibold">
                    Incomplete
                  </span>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="col-span-2 space-y-6">
                {/* Job Posting Information */}
                <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
                  <h3 className="px-6 py-4 text-lg font-bold text-gray-900 border-b border-[#e0e0e0]">
                    Job Posting Information
                  </h3>
                  <div className="divide-y divide-[#e0e0e0]">
                    <div className="px-6 py-3 flex gap-4">
                      <span className="font-semibold text-gray-700 w-32">Job Type:</span>
                      <span className="text-gray-700">{job.type}</span>
                    </div>
                    <div className="px-6 py-3 flex gap-4">
                      <span className="font-semibold text-gray-700 w-32">Job Title:</span>
                      <span className="text-gray-700">{job.title}</span>
                    </div>
                    <div className="px-6 py-3 flex gap-4">
                      <span className="font-semibold text-gray-700 w-32">Salary:</span>
                      <span className="text-gray-700">{job.salary}</span>
                    </div>
                    <div className="px-6 py-3 flex gap-4">
                      <span className="font-semibold text-gray-700 w-32">Job Description:</span>
                      <span className="text-gray-700 whitespace-pre-wrap">{job.description}</span>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
                  <h3 className="px-6 py-4 text-lg font-bold text-gray-900 border-b border-[#e0e0e0]">
                    Our Current Stack
                  </h3>
                  <div className="divide-y divide-[#e0e0e0]">
                    <div className="px-6 py-3 flex gap-4">
                      <span className="font-semibold text-gray-700 w-32">Backend:</span>
                      <span className="text-gray-700">{job.stack.backend}</span>
                    </div>
                    <div className="px-6 py-3 flex gap-4">
                      <span className="font-semibold text-gray-700 w-32">Frontend:</span>
                      <span className="text-gray-700">{job.stack.frontend}</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
                  <h3 className="px-6 py-4 text-lg font-bold text-gray-900 border-b border-[#e0e0e0]">
                    Benefits
                  </h3>
                  <ul className="px-6 py-4 space-y-2">
                    {job.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start gap-3">
                        <span className="text-[#2d5fa6] font-bold">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Qualifications */}
                <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
                  <h3 className="px-6 py-4 text-lg font-bold text-gray-900 border-b border-[#e0e0e0]">
                    Job Qualifications
                  </h3>
                  <div className="px-6 py-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="text-gray-700 flex items-start gap-3 text-[13px]">
                            <span className="text-[#2d5fa6] font-bold">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Preferred Qualifications</h4>
                      <ul className="space-y-1">
                        {job.preferred.map((pref, idx) => (
                          <li key={idx} className="text-gray-700 flex items-start gap-3 text-[13px]">
                            <span className="text-[#2d5fa6] font-bold">•</span>
                            {pref}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Application Information */}
                <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
                  <h3 className="px-6 py-4 text-lg font-bold text-gray-900 border-b border-[#e0e0e0]">
                    Application Information
                  </h3>
                  <div className="divide-y divide-[#e0e0e0]">
                    <div className="px-6 py-3 flex gap-4">
                      <span className="font-semibold text-gray-700 w-32">Deadline:</span>
                      <span className="text-gray-700">{job.applicationInfo.deadline}</span>
                    </div>
                    <div className="px-6 py-3 flex gap-4">
                      <span className="font-semibold text-gray-700 w-32">Method:</span>
                      <span className="text-gray-700">{job.applicationInfo.method}</span>
                    </div>
                    <div className="px-6 py-3 flex gap-4">
                      <span className="font-semibold text-gray-700 w-32">Documents:</span>
                      <div className="flex gap-2 flex-wrap">
                        {job.requiredDocs.map((doc, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-[11px] font-semibold">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="px-6 py-3 flex gap-4">
                      <span className="font-semibold text-gray-700 w-32">Application:</span>
                      <div className="flex gap-2 flex-wrap">
                        {job.applicationMethods.map((method, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 rounded text-[11px] font-semibold">
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="px-6 py-3">
                      <p className="text-gray-700 text-[13px]">{job.applicationInfo.notes}</p>
                    </div>
                  </div>
                </div>

                {/* Organization Information */}
                <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
                  <h3 className="px-6 py-4 text-lg font-bold text-gray-900 border-b border-[#e0e0e0]">
                    Organization Information
                  </h3>
                  <div className="divide-y divide-[#e0e0e0]">
                    <div className="px-6 py-3 flex gap-4">
                      <span className="font-semibold text-gray-700 w-32">Organization:</span>
                      <span className="text-gray-700">{job.organization}</span>
                    </div>
                    <div className="px-6 py-3 flex gap-4">
                      <span className="font-semibold text-gray-700 w-32">Industry:</span>
                      <span className="text-gray-700">{job.industry}</span>
                    </div>
                    <div className="px-6 py-3 flex gap-4">
                      <span className="font-semibold text-gray-700 w-32">Website:</span>
                      <a href="https://www.uncountable.com/" className="text-[#2d5fa6] hover:underline">
                        https://www.uncountable.com/
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Tags */}
              <div>
                <div className="bg-white border border-[#e0e0e0] rounded-lg p-6 sticky top-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Job Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[12px] font-semibold text-gray-600 mb-2">Work Term</p>
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded text-[12px] font-semibold">
                        {job.workTerm}
                      </span>
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-gray-600 mb-2">Industry</p>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded text-[12px] font-semibold">
                        {job.industry}
                      </span>
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-gray-600 mb-2">Application Status</p>
                      <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded text-[12px] font-semibold">
                        Incomplete
                      </span>
                    </div>
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
