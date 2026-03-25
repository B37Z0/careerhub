import { Menu } from "lucide-react";
import { useState } from "react";

function Placeholder() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const SidebarNavItem = ({ label, onClick }: { label: string; onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-white hover:bg-[#5a4a7a] transition-colors text-sm"
    >
      {label}
    </button>
  );

  const TopNav = ({ onMenuToggle }: { onMenuToggle: () => void }) => (
    <div className="bg-[#2d3e50] text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="p-2 hover:bg-[#3a4a5a] rounded transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold">Ben Zhou</h1>
      </div>
    </div>
  );

  const Breadcrumb = () => (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-2 text-sm text-gray-600">
      <span className="text-[#2d5fa6] hover:underline cursor-pointer">Jobs & Recruitment</span>
      <span>›</span>
      <span>Feature Coming Soon</span>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 bg-[#3d3d5c] text-white flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-[#4a4a6a]">
            <h2 className="font-bold text-lg">Ben Zhou</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="space-y-1 p-2">
              <button
                onClick={() => window.location.href = "/"}
                className="w-full text-left px-4 py-2 text-white hover:bg-[#5a4a7a] transition-colors text-sm"
              >
                Dashboard
              </button>

              {/* Appointments */}
              <div>
                <button className="w-full text-left px-4 py-2 text-white hover:bg-[#5a4a7a] transition-colors text-sm font-medium">
                  Appointments
                </button>
                <SidebarNavItem label="Dummy Tab" onClick={() => {}} />
              </div>

              {/* Co-Curricular Record */}
              <div>
                <button className="w-full text-left px-4 py-2 text-white hover:bg-[#5a4a7a] transition-colors text-sm font-medium">
                  Co-Curricular Record
                </button>
                <SidebarNavItem label="Dummy Tab" onClick={() => {}} />
              </div>

              {/* Events & Workshops */}
              <div>
                <button className="w-full text-left px-4 py-2 text-white hover:bg-[#5a4a7a] transition-colors text-sm font-medium">
                  Events & Workshops
                </button>
                <SidebarNavItem label="Dummy Tab" onClick={() => {}} />
              </div>

              {/* Experiential Learning */}
              <div>
                <button className="w-full text-left px-4 py-2 text-white hover:bg-[#5a4a7a] transition-colors text-sm font-medium">
                  Experiential Learning
                </button>
                <SidebarNavItem label="Dummy Tab" onClick={() => {}} />
              </div>

              {/* Jobs & Recruitment */}
              <div>
                <button className="w-full text-left px-4 py-2 text-white hover:bg-[#5a4a7a] transition-colors text-sm font-medium">
                  Jobs & Recruitment
                </button>
                <SidebarNavItem label="Off-Campus Job Board" onClick={() => window.location.href = "/"} />
              </div>

              {/* Programs */}
              <div>
                <button className="w-full text-left px-4 py-2 text-white hover:bg-[#5a4a7a] transition-colors text-sm font-medium">
                  Programs
                </button>
                <SidebarNavItem label="Dummy Tab" onClick={() => {}} />
              </div>

              {/* Student Resources */}
              <div>
                <button className="w-full text-left px-4 py-2 text-white hover:bg-[#5a4a7a] transition-colors text-sm font-medium">
                  Student Resources
                </button>
                <SidebarNavItem label="Dummy Tab" onClick={() => {}} />
              </div>

              {/* St. George Online Store */}
              <button className="w-full text-left px-4 py-2 text-white hover:bg-[#5a4a7a] transition-colors text-sm">
                St. George Online Store
              </button>

              {/* Logout */}
              <button className="w-full text-left px-4 py-2 text-white hover:bg-[#5a4a7a] transition-colors text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <Breadcrumb />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Nothing here yet</h1>
              <p className="text-gray-600 text-lg mb-8">This feature is coming soon.</p>
              <button
                onClick={() => window.location.href = "/"}
                className="px-6 py-3 bg-[#2d5fa6] text-white font-semibold rounded hover:bg-[#244d8a] transition-colors"
              >
                Back to Job Board
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Placeholder;
