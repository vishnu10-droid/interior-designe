import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, FolderKanban, Layers, Images, Users, Star, MessageSquare, Settings, Menu, X, Search, Bell, Sun, Moon, LogOut, ChevronRight } from "lucide-react";

export const dashLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { to: "/dashboard/services", label: "Services", icon: Layers },
  { to: "/dashboard/gallery", label: "Gallery", icon: Images },
  { to: "/dashboard/leads", label: "Leads", icon: Users },
  { to: "/dashboard/reviews", label: "Reviews", icon: Star },
  { to: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

function SidebarContent({ onNav }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full">
      <button onClick={() => { navigate("/"); onNav?.(); }} className="flex items-center gap-3 px-6 h-[72px] text-left">
        <span className="w-10 h-10 rounded-lg bg-charcoal text-gold grid place-items-center font-serif text-lg">AF</span>
        <span><span className="block font-serif tracking-[0.15em] text-[15px]">AF INTERIOR</span><span className="block text-[10px] tracking-[0.3em] text-coffee">ADMIN PANEL</span></span>
      </button>
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {dashLinks.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} onClick={onNav}
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${isActive ? "bg-charcoal text-cream shadow-card" : "text-charcoal/70 hover:bg-beige"}`}>
            <l.icon size={18} /><span className="font-medium">{l.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4">
        <button onClick={() => { navigate("/"); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-700 bg-red-50 hover:bg-red-100 transition-colors"><LogOut size={17} /> Back to Website</button>
      </div>
    </div>
  );
}

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [q, setQ] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const { pathname } = useLocation();
  const current = [...dashLinks].reverse().find((l) => pathname === l.to || (l.to !== "/dashboard" && pathname.startsWith(l.to))) || dashLinks[0];

  return (
    <div className={dark ? "bg-[#141210] text-cream min-h-screen" : "bg-cream text-charcoal min-h-screen"}>
      {/* desktop sidebar */}
      <aside className={`hidden lg:block fixed left-0 top-0 bottom-0 w-64 border-r z-40 ${dark ? "bg-[#1C1917] border-white/10" : "bg-white/80 backdrop-blur border-charcoal/10"}`}>
        <SidebarContent />
      </aside>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-charcoal/60" onClick={() => setOpen(false)} />
            <motion.aside className="absolute left-0 top-0 bottom-0 w-[82%] max-w-xs bg-cream shadow-lift"
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 30, stiffness: 280 }}>
              <div className="flex justify-end p-3"><button onClick={() => setOpen(false)} aria-label="Close sidebar" className="w-9 h-9 rounded-full bg-white border border-charcoal/10 grid place-items-center"><X size={16} /></button></div>
              <div className="h-[calc(100%-60px)]"><SidebarContent onNav={() => setOpen(false)} /></div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="lg:pl-64">
        {/* top navbar */}
        <header className={`sticky top-0 z-30 border-b backdrop-blur-xl ${dark ? "bg-[#141210]/85 border-white/10" : "bg-cream/85 border-charcoal/10"}`}>
          <div className="flex items-center gap-3 px-4 md:px-8 h-[72px]">
            <button onClick={() => setOpen(true)} aria-label="Open sidebar" className={`lg:hidden w-10 h-10 rounded-full grid place-items-center border ${dark ? "border-white/15" : "border-charcoal/15 bg-white"}`}><Menu size={18} /></button>
            <div className={`hidden sm:flex items-center gap-2 rounded-full px-4 py-2.5 border flex-1 max-w-md ${dark ? "bg-white/5 border-white/10" : "bg-white border-charcoal/10"}`}>
              <Search size={16} className="text-stonewarm" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects, leads, reviews…" className="bg-transparent text-sm w-full placeholder:text-stonewarm" style={{ boxShadow: "none" }} />
            </div>
            <div className="ml-auto flex items-center gap-2.5">
              <div className="relative">
                <button onClick={() => setShowNotif((v) => !v)} aria-label="Notifications" className={`w-10 h-10 rounded-full grid place-items-center border relative ${dark ? "border-white/15 bg-white/5" : "border-charcoal/15 bg-white"}`}>
                  <Bell size={17} /><span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-gold" />
                </button>
                {showNotif && (
                  <div className={`absolute right-0 mt-2 w-72 rounded-2xl shadow-lift border p-2 z-50 ${dark ? "bg-[#1C1917] border-white/10" : "bg-white border-charcoal/10"}`}>
                    {[["New lead: Rahul Mehta", "Home Interior • 2h ago"], ["Review approved: Priya V.", "5 stars • 5h ago"], ["Project update: Kitchen", "In Progress • 1d ago"]].map(([t, s]) => (
                      <div key={t} className={`px-4 py-3 rounded-xl text-sm ${dark ? "hover:bg-white/5" : "hover:bg-cream"}`}><p className="font-medium">{t}</p><p className="text-xs opacity-60 mt-0.5">{s}</p></div>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={() => setDark((v) => !v)} aria-label="Toggle theme" className={`w-10 h-10 rounded-full grid place-items-center border ${dark ? "border-white/15 bg-white/5" : "border-charcoal/15 bg-white"}`}>
                {dark ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <div className="flex items-center gap-2.5 pl-1">
                <span className="w-10 h-10 rounded-full bg-charcoal text-gold grid place-items-center font-serif">A</span>
                <div className="hidden md:block leading-tight"><p className="text-sm font-medium">Admin</p><p className="text-xs opacity-60">AF Interior</p></div>
              </div>
            </div>
          </div>
          <div className={`px-4 md:px-8 pb-3 flex items-center gap-1.5 text-xs opacity-60`}>
            <span>Dashboard</span><ChevronRight size={12} /><span className="opacity-100 font-medium">{current.label}</span>
            {q && <span className="ml-2">• results for “{q}”</span>}
          </div>
        </header>
        <main className="p-4 md:p-8 max-w-6xl"><Outlet /></main>
      </div>
    </div>
  );
}
