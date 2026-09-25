import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FolderKanban, Layers, Users, Star, TrendingUp, Eye, Pencil, Trash2, Plus, X, Search, Upload, Check, EyeOff, Image as ImageIcon, Save } from "lucide-react";
import { projects } from "../data/projects";
import { services } from "../data/services";
import { galleryItems, initialLeads, reviews } from "../data/content";

function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-2xl shadow-card border border-charcoal/5 p-6 ${className}`}>{children}</div>;
}
function PageTitle({ title, desc, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
      <div><h1 className="font-serif text-3xl">{title}</h1>{desc && <p className="text-sm text-coffee mt-1">{desc}</p>}</div>
      {action}
    </div>
  );
}
const badge = (s) => {
  const m = { Completed: "bg-green-100 text-green-800", "In Progress": "bg-amber-100 text-amber-800", Active: "bg-green-100 text-green-800", New: "bg-blue-100 text-blue-800", Contacted: "bg-purple-100 text-purple-800", Approved: "bg-green-100 text-green-800", Pending: "bg-amber-100 text-amber-800", Hidden: "bg-stone-200 text-stone-600" };
  return <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${m[s] || "bg-beige text-espresso"}`}>{s}</span>;
};

/* ---------- HOME ---------- */
export function DashHome() {
  const stats = [
    { icon: FolderKanban, label: "Total Projects", value: 24, change: "+12% this year" },
    { icon: Layers, label: "Services", value: 8, change: "+2 new" },
    { icon: Users, label: "New Leads", value: 18, change: "+6 this month" },
    { icon: Star, label: "Reviews", value: 254, change: "4.9 avg rating" },
  ];
  return (
    <>
      <PageTitle title="Welcome back, Admin" desc="Here is what is happening at AF Interior today." />
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Card className="hover:shadow-lift transition-shadow">
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 rounded-xl bg-beige text-espresso grid place-items-center"><s.icon size={20} /></span>
                <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full"><TrendingUp size={12} />{s.change}</span>
              </div>
              <p className="font-serif text-4xl mt-4">{s.value}</p>
              <p className="text-xs tracking-[0.18em] uppercase text-coffee mt-1">{s.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mt-4">
        <Card>
          <h3 className="font-serif text-lg">Recent projects</h3>
          <div className="mt-4 space-y-3">
            {projects.slice(0, 3).map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.image} alt={p.name} className="w-14 h-14 rounded-xl object-cover" loading="lazy" />
                <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{p.name}</p><p className="text-xs text-coffee">{p.location}</p></div>
                {badge(p.status)}
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-serif text-lg">Latest leads</h3>
          <div className="mt-4 space-y-3">
            {initialLeads.slice(0, 3).map((l) => (
              <div key={l.id} className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-beige grid place-items-center font-serif text-espresso">{l.name[0]}</span>
                <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{l.name}</p><p className="text-xs text-coffee">{l.type} • {l.budget}</p></div>
                {badge(l.status)}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

/* ---------- PROJECTS ---------- */
export function DashProjects() {
  const [list, setList] = useState(projects);
  const [q, setQ] = useState("");
  const [view, setView] = useState(null);
  const filtered = list.filter((p) => (p.name + p.category + p.location).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageTitle title="Projects" desc={`${filtered.length} projects`} action={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white border border-charcoal/10 rounded-full px-4 py-2.5"><Search size={15} className="text-stonewarm" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="text-sm bg-transparent w-32" style={{ boxShadow: "none" }} /></div>
        </div>} />
      {filtered.length === 0 ? (
        <Card className="text-center py-16"><FolderKanban size={36} className="mx-auto text-sand" /><p className="font-serif text-xl mt-4">No projects found</p><p className="text-sm text-coffee mt-1">Try a different search.</p></Card>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <Card key={p.id} className="!p-0 overflow-hidden">
              <img src={p.image} alt={p.name} loading="lazy" className="w-full h-44 object-cover" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-2"><p className="font-serif text-lg leading-tight">{p.name}</p>{badge(p.status)}</div>
                <p className="text-xs text-coffee mt-1">{p.category} • {p.location} • {p.date}</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => setView(p)} className="flex-1 flex items-center justify-center gap-1.5 text-xs bg-charcoal text-cream rounded-lg py-2.5 hover:bg-espresso"><Eye size={13} /> View</button>
                  <button onClick={() => setView(p)} className="flex-1 flex items-center justify-center gap-1.5 text-xs border border-charcoal/15 rounded-lg py-2.5 hover:bg-beige"><Pencil size={13} /> Edit</button>
                  <button onClick={() => setList(list.filter((x) => x.id !== p.id))} className="w-10 grid place-items-center text-xs border border-red-200 text-red-600 rounded-lg py-2.5 hover:bg-red-50" aria-label={`Delete ${p.name}`}><Trash2 size={14} /></button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      {view && (
        <div className="fixed inset-0 z-[70] grid place-items-center p-4">
          <div className="absolute inset-0 bg-charcoal/60" onClick={() => setView(null)} />
          <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-cream rounded-3xl overflow-hidden max-w-lg w-full shadow-lift">
            <img src={view.image} alt={view.name} className="w-full h-60 object-cover" />
            <button onClick={() => setView(null)} aria-label="Close" className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream grid place-items-center"><X size={16} /></button>
            <div className="p-7"><div className="flex items-center justify-between"><h3 className="font-serif text-2xl">{view.name}</h3>{badge(view.status)}</div>
              <p className="text-sm text-coffee mt-2">{view.category} • {view.location} • {view.date}</p>
              <p className="text-sm mt-3 leading-relaxed">{view.description}</p></div>
          </motion.div>
        </div>
      )}
    </>
  );
}

/* ---------- SERVICES ---------- */
export function DashServices() {
  const [list, setList] = useState(services);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", desc: "" });
  const add = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setList([{ id: form.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(), name: form.name, desc: form.desc || "Custom design service.", icon: Layers, image: services[0].image, status: "Active" }, ...list]);
    setForm({ name: "", desc: "" });
    setModal(false);
  };
  return (
    <>
      <PageTitle title="Services" desc={`${list.length} active services`} action={
        <button onClick={() => setModal(true)} className="flex items-center gap-2 bg-charcoal text-cream text-sm px-5 py-3 rounded-full hover:bg-espresso"><Plus size={16} /> Add New Service</button>} />
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map((s) => (
          <Card key={s.id}>
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl bg-beige text-espresso grid place-items-center"><s.icon size={19} /></span>
              <div className="flex-1"><p className="font-serif text-lg leading-tight">{s.name}</p>{badge(s.status)}</div>
            </div>
            <p className="text-sm text-coffee mt-3 leading-relaxed">{s.desc}</p>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 text-xs border border-charcoal/15 rounded-lg py-2.5 hover:bg-beige flex items-center justify-center gap-1.5"><Pencil size={13} /> Edit</button>
              <button onClick={() => setList(list.filter((x) => x.id !== s.id))} className="w-10 grid place-items-center border border-red-200 text-red-600 rounded-lg hover:bg-red-50" aria-label={`Delete ${s.name}`}><Trash2 size={14} /></button>
            </div>
          </Card>
        ))}
      </div>
      {modal && (
        <div className="fixed inset-0 z-[70] grid place-items-center p-4">
          <div className="absolute inset-0 bg-charcoal/60" onClick={() => setModal(false)} />
          <motion.form onSubmit={add} initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-cream rounded-3xl p-8 max-w-md w-full shadow-lift">
            <button type="button" onClick={() => setModal(false)} aria-label="Close" className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border border-charcoal/10 grid place-items-center"><X size={16} /></button>
            <h3 className="font-serif text-2xl">Add New Service</h3>
            <label className="block text-xs uppercase tracking-wider text-coffee mt-5">Service name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Lighting Design" className="mt-1.5 w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-sm" />
            <label className="block text-xs uppercase tracking-wider text-coffee mt-4">Description</label>
            <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={3} placeholder="Short description…" className="mt-1.5 w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-sm resize-none" />
            <button className="mt-6 w-full bg-charcoal text-cream rounded-full py-3.5 text-sm hover:bg-espresso">Save Service</button>
          </motion.form>
        </div>
      )}
    </>
  );
}

/* ---------- GALLERY ---------- */
const gCats = ["All", "Living Rooms", "Bedrooms", "Kitchens", "Offices", "Commercial Spaces"];
export function DashGallery() {
  const [list, setList] = useState(galleryItems);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const filtered = useMemo(() => list.filter((g) => (cat === "All" || g.category === cat) && g.title.toLowerCase().includes(q.toLowerCase())), [list, cat, q]);
  const simulateUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setList([{ id: Date.now(), category: cat === "All" ? "Living Rooms" : cat, src: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1200&auto=format&fit=crop", title: "New Upload " + (list.length + 1) }, ...list]);
      setUploading(false);
    }, 1200);
  };
  return (
    <>
      <PageTitle title="Gallery" desc={`${filtered.length} images`} action={
        <button onClick={simulateUpload} disabled={uploading} className="flex items-center gap-2 bg-charcoal text-cream text-sm px-5 py-3 rounded-full hover:bg-espresso disabled:opacity-60">
          <Upload size={15} /> {uploading ? "Uploading…" : "Upload Image"}</button>} />
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {gCats.map((c) => <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-full text-xs ${cat === c ? "bg-charcoal text-cream" : "bg-white border border-charcoal/10 text-coffee"}`}>{c}</button>)}
        <div className="ml-auto flex items-center gap-2 bg-white border border-charcoal/10 rounded-full px-4 py-2"><Search size={14} className="text-stonewarm" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="text-xs bg-transparent w-28" style={{ boxShadow: "none" }} /></div>
      </div>
      {uploading && <div className="h-1.5 rounded-full bg-beige overflow-hidden mb-4"><motion.div className="h-full bg-gold" initial={{ width: "5%" }} animate={{ width: "90%" }} transition={{ duration: 1.1 }} /></div>}
      {filtered.length === 0 ? (
        <Card className="text-center py-16"><ImageIcon size={36} className="mx-auto text-sand" /><p className="font-serif text-xl mt-4">No images found</p></Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((g) => (
            <div key={g.id} className="group bg-white rounded-2xl overflow-hidden shadow-card border border-charcoal/5">
              <div className="relative h-40 overflow-hidden"><img src={g.src} alt={g.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <button onClick={() => setPreview(g)} className="absolute inset-0 grid place-items-center bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors" aria-label={`Preview ${g.title}`}><Eye size={20} className="text-white opacity-0 group-hover:opacity-100" /></button></div>
              <div className="p-3.5 flex items-center justify-between gap-2">
                <div className="min-w-0"><p className="text-[13px] font-medium truncate">{g.title}</p><p className="text-[11px] text-coffee">{g.category}</p></div>
                <button onClick={() => setList(list.filter((x) => x.id !== g.id))} aria-label={`Delete ${g.title}`} className="w-8 h-8 shrink-0 grid place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {preview && (
        <div className="fixed inset-0 z-[70] grid place-items-center p-4">
          <div className="absolute inset-0 bg-charcoal/80" onClick={() => setPreview(null)} />
          <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative max-w-3xl w-full bg-cream rounded-2xl overflow-hidden">
            <img src={preview.src} alt={preview.title} className="w-full max-h-[70vh] object-cover" />
            <div className="flex items-center justify-between px-6 py-4"><p className="font-serif text-lg">{preview.title} <span className="text-xs text-coffee font-sans">• {preview.category}</span></p>
              <button onClick={() => setPreview(null)} aria-label="Close" className="w-9 h-9 rounded-full bg-charcoal text-cream grid place-items-center"><X size={15} /></button></div>
          </motion.div>
        </div>
      )}
    </>
  );
}

/* ---------- LEADS ---------- */
export function DashLeads() {
  const [list, setList] = useState(initialLeads);
  const [filter, setFilter] = useState("All");
  const shown = list.filter((l) => filter === "All" || l.status === filter);
  const cycle = (l) => {
    const order = ["New", "Contacted", "In Progress", "Completed"];
    const next = order[(order.indexOf(l.status) + 1) % order.length];
    setList(list.map((x) => (x.id === l.id ? { ...x, status: next } : x)));
  };
  return (
    <>
      <PageTitle title="Leads" desc={`${shown.length} enquiries`} action={
        <div className="flex gap-2 flex-wrap">{["All", "New", "Contacted", "In Progress", "Completed"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-full text-xs ${filter === s ? "bg-charcoal text-cream" : "bg-white border border-charcoal/10"}`}>{s}</button>))}</div>} />
      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead><tr className="text-left text-[11px] uppercase tracking-[0.15em] text-coffee border-b border-charcoal/10">
              {["Name", "Phone", "Project Type", "Budget", "Status", "Date", "Action"].map((h) => <th key={h} className="px-5 py-4 font-medium">{h}</th>)}
            </tr></thead>
            <tbody>
              {shown.map((l) => (
                <tr key={l.id} className="border-b border-charcoal/5 last:border-0 hover:bg-cream/60">
                  <td className="px-5 py-4 font-medium">{l.name}</td>
                  <td className="px-5 py-4 text-coffee">{l.phone}</td>
                  <td className="px-5 py-4">{l.type}</td>
                  <td className="px-5 py-4 text-coffee">{l.budget}</td>
                  <td className="px-5 py-4"><button onClick={() => cycle(l)} title="Click to advance status">{badge(l.status)}</button></td>
                  <td className="px-5 py-4 text-coffee">{l.date}</td>
                  <td className="px-5 py-4"><button onClick={() => setList(list.filter((x) => x.id !== l.id))} className="text-red-600 hover:bg-red-50 rounded-lg p-2" aria-label={`Delete lead ${l.name}`}><Trash2 size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {shown.length === 0 && <p className="text-center text-coffee py-12">No leads with this status.</p>}
      </Card>
      <p className="text-xs text-stonewarm mt-3">Tip: click a status badge to move the lead to the next stage.</p>
    </>
  );
}

/* ---------- REVIEWS ---------- */
export function DashReviews() {
  const [list, setList] = useState(reviews);
  const setStatus = (id, status) => setList(list.map((r) => (r.id === id ? { ...r, status } : r)));
  return (
    <>
      <PageTitle title="Reviews" desc="254 total • 4.9 average" />
      <div className="space-y-4">
        {list.map((r) => (
          <Card key={r.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-full bg-beige grid place-items-center font-serif text-espresso">{r.name[0]}</span>
                <div><p className="font-medium text-sm">{r.name} <span className="text-coffee font-normal">• {r.location}</span></p>
                  <p className="text-gold text-sm tracking-widest">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)} <span className="text-coffee text-xs tracking-normal">• {r.date}</span></p></div>
              </div>
              {badge(r.status)}
            </div>
            <p className="text-sm text-charcoal/80 leading-relaxed mt-3">“{r.text}”</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <button onClick={() => setStatus(r.id, "Approved")} className="flex items-center gap-1.5 text-xs bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800"><Check size={13} /> Approve</button>
              <button onClick={() => setStatus(r.id, "Hidden")} className="flex items-center gap-1.5 text-xs border border-charcoal/15 px-4 py-2 rounded-full hover:bg-beige"><EyeOff size={13} /> Hide</button>
              <button onClick={() => setList(list.filter((x) => x.id !== r.id))} className="flex items-center gap-1.5 text-xs border border-red-200 text-red-600 px-4 py-2 rounded-full hover:bg-red-50"><Trash2 size={13} /> Delete</button>
            </div>
          </Card>
        ))}
      </div>
      <p className="text-[11px] text-stonewarm mt-6">Customer feedback displayed for presentation purposes.</p>
    </>
  );
}

/* ---------- MESSAGES / SETTINGS ---------- */
export function DashMessages() {
  const [msgs] = useState([
    { id: 1, from: "Rahul Mehta", text: "Hi, I want a 3BHK interior quote for Kamla Nagar.", time: "2h ago" },
    { id: 2, from: "Sana Khan", text: "Can you share modular kitchen designs under 3 lakh?", time: "5h ago" },
    { id: 3, from: "Deepak Yadav", text: "Office site visit possible this Saturday?", time: "1d ago" },
  ]);
  const [active, setActive] = useState(msgs[0]);
  const [reply, setReply] = useState("");
  const [sent, setSent] = useState([]);
  return (
    <>
      <PageTitle title="Messages" desc="Frontend-only preview — replies are visual only." />
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="!p-3">
          {msgs.map((m) => (
            <button key={m.id} onClick={() => setActive(m)} className={`w-full text-left px-4 py-3.5 rounded-xl ${active.id === m.id ? "bg-charcoal text-cream" : "hover:bg-cream"}`}>
              <p className="text-sm font-medium">{m.from}</p><p className={`text-xs mt-0.5 truncate ${active.id === m.id ? "text-cream/60" : "text-coffee"}`}>{m.text}</p>
            </button>
          ))}
        </Card>
        <Card className="md:col-span-2 flex flex-col min-h-[320px]">
          <p className="font-serif text-lg">{active.from} <span className="text-xs font-sans text-coffee">• {active.time}</span></p>
          <div className="flex-1 bg-cream rounded-xl p-4 mt-3 text-sm space-y-2.5">
            <p className="bg-white border border-charcoal/10 rounded-xl px-4 py-3 w-fit max-w-[85%]">{active.text}</p>
            {sent.filter((s) => s.id === active.id).map((s, i) => <p key={i} className="bg-charcoal text-cream rounded-xl px-4 py-3 w-fit max-w-[85%] ml-auto">{s.text}</p>)}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (!reply.trim()) return; setSent([...sent, { id: active.id, text: reply }]); setReply(""); }} className="flex gap-2 mt-3">
            <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type a reply…" className="flex-1 bg-white border border-charcoal/10 rounded-full px-5 py-3 text-sm" />
            <button className="bg-charcoal text-cream rounded-full px-6 text-sm hover:bg-espresso">Send</button>
          </form>
        </Card>
      </div>
    </>
  );
}

export function DashSettings() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ studio: "AF Interior", phone: "098973 13419", hours: "Open 24 Hours", address: "Sanjay Place, Civil Lines, Agra – 282002" });
  return (
    <>
      <PageTitle title="Settings" desc="Studio profile (stored in UI state only)." />
      <Card className="max-w-2xl">
        <div className="grid sm:grid-cols-2 gap-4">
          {[["studio", "Studio name"], ["phone", "Phone"], ["hours", "Business hours"], ["address", "Address"]].map(([k, label]) => (
            <div key={k} className={k === "address" ? "sm:col-span-2" : ""}>
              <label className="text-xs uppercase tracking-wider text-coffee">{label}</label>
              <input value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="mt-1.5 w-full bg-cream border border-charcoal/10 rounded-xl px-4 py-3 text-sm" />
            </div>
          ))}
        </div>
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }} className="mt-6 flex items-center gap-2 bg-charcoal text-cream px-7 py-3 rounded-full text-sm hover:bg-espresso">
          <Save size={15} /> {saved ? "Saved!" : "Save Changes"}</button>
        {saved && <p className="text-sm text-green-700 mt-3 flex items-center gap-1.5"><Check size={15} /> Settings saved locally (demo).</p>}
      </Card>
    </>
  );
}
