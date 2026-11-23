import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search, Trash2, Check, EyeOff, ExternalLink, Newspaper,
  ShieldCheck, UserCog,
} from "lucide-react";
import {
  productCategories, allProducts, allBrands, featuredBrands,
  PRODUCT_RANGE_FALLBACK_IMAGE,
} from "../data/products";
import { blogPosts, initialLeads, reviews, stats } from "../data/content";
import { Card, PageTitle } from "./pages";

const badge = (status) => {
  const styles = {
    Completed: "bg-green-100 text-green-800", "In Progress": "bg-amber-100 text-amber-800",
    Active: "bg-green-100 text-green-800", New: "bg-blue-100 text-blue-800",
    Contacted: "bg-purple-100 text-purple-800", Approved: "bg-green-100 text-green-800",
    Pending: "bg-amber-100 text-amber-800", Hidden: "bg-stone-200 text-stone-600",
  };
  return <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${styles[status] || "bg-beige text-espresso"}`}>{status}</span>;
};

const initials = (name) =>
  name.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase();

function Thumb({ src, alt }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? PRODUCT_RANGE_FALLBACK_IMAGE : src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-11 w-11 shrink-0 rounded-lg object-cover"
    />
  );
}

function SearchBox({ value, onChange, placeholder }) {
  return (
    <label className="flex items-center gap-2 rounded-full border border-charcoal/10 bg-white px-4 py-2.5">
      <Search size={15} className="text-stonewarm" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm placeholder:text-stonewarm"
        style={{ boxShadow: "none" }}
      />
    </label>
  );
}

/* ------------------------------ PRODUCTS ------------------------------ */
export function DashProducts() {
  const [q, setQ] = useState("");
  const rows = useMemo(
    () => productCategories.filter((c) =>
      (c.name + " " + (c.brands || []).join(" ")).toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <>
      <PageTitle
        title="Products"
        desc={`${productCategories.length} categories · ${allProducts.length} products in the catalogue`}
        action={<Link to="/products" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-sm text-cream hover:bg-espresso"><ExternalLink size={15} /> View storefront</Link>}
      />
      <Card className="!p-0 overflow-hidden">
        <div className="border-b border-charcoal/5 p-4"><SearchBox value={q} onChange={setQ} placeholder="Search products or brands…" /></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-cream text-[10px] uppercase tracking-[0.16em] text-coffee">
              <tr><th className="px-5 py-3">Product</th><th className="px-5 py-3">Types</th><th className="px-5 py-3">Brands</th><th className="px-5 py-3">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5">
              {rows.map((c) => (
                <tr key={c.id} className="hover:bg-cream/60">
                  <td className="px-5 py-3"><div className="flex items-center gap-3"><Thumb src={c.image} alt={c.name} /><span className="font-medium">{c.name}</span></div></td>
                  <td className="px-5 py-3 text-coffee">{c.types?.length || 0}</td>
                  <td className="px-5 py-3 text-coffee">{c.brands?.length || 0}</td>
                  <td className="px-5 py-3">{badge("Active")}</td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={4} className="px-5 py-10 text-center text-coffee">No products found.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

/* ----------------------------- CATEGORIES ----------------------------- */
export function DashCategories() {
  const [q, setQ] = useState("");
  const rows = productCategories.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageTitle title="Categories" desc={`${productCategories.length} material families in the catalogue`} />
      <SearchBox value={q} onChange={setQ} placeholder="Search categories…" />
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((c) => (
          <Card key={c.id} className="flex items-center gap-4 !p-4">
            <Thumb src={c.image} alt={c.name} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-lg">{c.name}</p>
              <p className="mt-1 text-xs text-coffee">{c.types?.length || 0} types · {c.brands?.length || 0} brands</p>
            </div>
            <Link to={`/categories/${c.slug}`} target="_blank" rel="noreferrer" aria-label={`Open ${c.name}`} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-charcoal/10 hover:border-gold hover:text-golddark"><ExternalLink size={15} /></Link>
          </Card>
        ))}
        {rows.length === 0 && <Card className="text-center text-coffee">No categories found.</Card>}
      </div>
    </>
  );
}

/* ------------------------------- BRANDS ------------------------------- */
export function DashBrands() {
  const [q, setQ] = useState("");
  const logoMap = Object.fromEntries(featuredBrands.map((b) => [b.name.toLowerCase(), b.image]));
  const rows = allBrands.filter((name) => name.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageTitle title="Brands" desc={`${allBrands.length} trusted brands available in the studio`} />
      <SearchBox value={q} onChange={setQ} placeholder="Search brands…" />
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
        {rows.map((name) => {
          const logo = logoMap[name.toLowerCase()];
          return (
            <Card key={name} className="flex flex-col items-center gap-3 !p-5 text-center">
              {logo ? (
                <Thumb src={logo} alt={name} />
              ) : (
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-[#24160D] to-[#3A2A1B] font-serif text-sm text-[#D9B45B]">{initials(name)}</span>
              )}
              <p className="text-xs font-medium leading-tight">{name}</p>
              <p className="text-[10px] text-coffee">{productCategories.filter((c) => c.brands?.some((b) => b.toLowerCase() === name.toLowerCase())).length} categories</p>
            </Card>
          );
        })}
      </div>
    </>
  );
}

/* --------------------- CUSTOMERS & ENQUIRIES --------------------------- */
export function DashCustomers() {
  const [list, setList] = useState(initialLeads);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "New", "Contacted", "In Progress", "Completed"];

  const rows = list.filter((l) =>
    (filter === "All" || l.status === filter) &&
    (l.name + l.type + l.phone).toLowerCase().includes(q.toLowerCase())
  );

  const cycle = (lead) => {
    const order = statuses.slice(1);
    const next = order[(order.indexOf(lead.status) + 1) % order.length];
    setList(list.map((l) => l.id === lead.id ? { ...l, status: next } : l));
  };

  return (
    <>
      <PageTitle title="Customers & Enquiries" desc={`${list.length} enquiries received · click a status to advance it`} />
      <div className="mb-4 flex flex-wrap gap-2">
        {statuses.map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full px-4 py-2 text-xs ${filter === s ? "bg-charcoal text-cream" : "border border-charcoal/10 bg-white text-coffee hover:border-gold"}`}>{s}</button>
        ))}
      </div>
      <Card className="!p-0 overflow-hidden">
        <div className="border-b border-charcoal/5 p-4"><SearchBox value={q} onChange={setQ} placeholder="Search customers…" /></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-cream text-[10px] uppercase tracking-[0.16em] text-coffee">
              <tr><th className="px-5 py-3">Customer</th><th className="px-5 py-3">Interest</th><th className="px-5 py-3">Budget</th><th className="px-5 py-3">Date</th><th className="px-5 py-3">Status</th><th className="px-5 py-3" /></tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5">
              {rows.map((l) => (
                <tr key={l.id} className="hover:bg-cream/60">
                  <td className="px-5 py-3"><p className="font-medium">{l.name}</p><p className="text-xs text-coffee">{l.phone}</p></td>
                  <td className="px-5 py-3 text-coffee">{l.type}</td>
                  <td className="px-5 py-3 text-coffee">{l.budget}</td>
                  <td className="px-5 py-3 text-coffee">{l.date}</td>
                  <td className="px-5 py-3"><button onClick={() => cycle(l)} title="Click to advance status">{badge(l.status)}</button></td>
                  <td className="px-5 py-3"><button onClick={() => setList(list.filter((x) => x.id !== l.id))} aria-label={`Delete ${l.name}`} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={14} /></button></td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={6} className="px-5 py-10 text-center text-coffee">No enquiries match this filter.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

/* ----------------------------- TESTIMONIALS --------------------------- */
export function DashTestimonials() {
  const [list, setList] = useState(reviews);
  return (
    <>
      <PageTitle title="Testimonials" desc={`${list.length} client reviews · approve, hide or remove`} />
      <div className="grid gap-4 lg:grid-cols-2">
        {list.map((r) => (
          <Card key={r.id}>
            <div className="flex items-start justify-between gap-3">
              <div><p className="font-serif text-lg">{r.name}</p><p className="text-xs text-coffee">{r.location} · {r.date}</p></div>
              <div className="flex gap-2">{badge(r.status)}<span className="text-sm text-golddark">{"★".repeat(r.rating)}</span></div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-coffee">{r.text}</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => setList(list.map((x) => x.id === r.id ? { ...x, status: "Approved" } : x))} className="inline-flex items-center gap-1.5 rounded-full bg-green-700 px-4 py-2 text-xs text-white hover:bg-green-800"><Check size={13} /> Approve</button>
              <button onClick={() => setList(list.map((x) => x.id === r.id ? { ...x, status: "Hidden" } : x))} className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/15 px-4 py-2 text-xs hover:bg-beige"><EyeOff size={13} /> Hide</button>
              <button onClick={() => setList(list.filter((x) => x.id !== r.id))} className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-4 py-2 text-xs text-red-600 hover:bg-red-50"><Trash2 size={13} /> Delete</button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

/* -------------------------------- BLOGS -------------------------------- */
export function DashBlogs() {
  const [q, setQ] = useState("");
  const rows = blogPosts.filter((p) => (p.title + p.category).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageTitle title="Blogs" desc={`${blogPosts.length} published articles in the journal`} action={<Link to="/blog" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-sm text-cream hover:bg-espresso"><Newspaper size={15} /> View journal</Link>} />
      <SearchBox value={q} onChange={setQ} placeholder="Search articles…" />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {rows.map((p) => (
          <Card key={p.id} className="flex gap-4 !p-4">
            <img src={p.image} alt="" loading="lazy" className="h-24 w-28 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.14em] text-golddark">{p.category} · {p.date}</p>
              <p className="mt-1 font-serif text-lg leading-tight">{p.title}</p>
              <p className="mt-1 line-clamp-2 text-xs text-coffee">{p.excerpt}</p>
            </div>
          </Card>
        ))}
        {rows.length === 0 && <Card className="text-center text-coffee">No articles found.</Card>}
      </div>
    </>
  );
}

/* --------------------------- ANALYTICS & REPORT ------------------------ */
export function DashAnalytics() {
  const categoryCounts = productCategories.slice(0, 6).map((c) => ({
    name: c.name,
    value: c.types?.length || 0,
  }));
  const max = Math.max(...categoryCounts.map((c) => c.value), 1);

  return (
    <>
      <PageTitle title="Analytics & Report" desc="A snapshot of the catalogue and studio activity." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <p className="font-serif text-4xl">{s.value}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-coffee">{s.label}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-5">
        <h3 className="font-serif text-xl">Catalogue depth by category</h3>
        <p className="mt-1 text-xs text-coffee">Number of material types listed under each family.</p>
        <div className="mt-6 space-y-4">
          {categoryCounts.map((c) => (
            <div key={c.name}>
              <div className="mb-1.5 flex justify-between text-xs"><span>{c.name}</span><span className="text-coffee">{c.value}</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-beige"><div className="h-full rounded-full bg-gold" style={{ width: `${(c.value / max) * 100}%` }} /></div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

/* --------------------------- USERS & ADMIN ROLES ----------------------- */
const seedUsers = [
  { id: 1, name: "Vikas Bansal", email: "admin@ananyaagra.com", role: "Admin" },
  { id: 2, name: "Studio Manager", email: "studio@ananyaagra.com", role: "Editor" },
  { id: 3, name: "Site Coordinator", email: "site@ananyaagra.com", role: "Editor" },
  { id: 4, name: "Accounts Desk", email: "accounts@ananyaagra.com", role: "Viewer" },
];

export function DashUsers() {
  const [users, setUsers] = useState(seedUsers);
  const roles = ["Admin", "Editor", "Viewer"];
  return (
    <>
      <PageTitle title="Users & Admin Roles" desc={`${users.length} team members · change a role from the dropdown`} />
      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-cream text-[10px] uppercase tracking-[0.16em] text-coffee">
              <tr><th className="px-5 py-3">Member</th><th className="px-5 py-3">Email</th><th className="px-5 py-3">Role</th><th className="px-5 py-3" /></tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-cream/60">
                  <td className="px-5 py-3"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-beige text-golddark"><UserCog size={16} /></span><span className="font-medium">{u.name}</span></div></td>
                  <td className="px-5 py-3 text-coffee">{u.email}</td>
                  <td className="px-5 py-3">
                    <select value={u.role} onChange={(e) => setUsers(users.map((x) => x.id === u.id ? { ...x, role: e.target.value } : x))} className="rounded-full border border-charcoal/10 bg-white px-3 py-2 text-xs">
                      {roles.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-3"><button onClick={() => setUsers(users.filter((x) => x.id !== u.id))} aria-label={`Remove ${u.name}`} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <p className="mt-4 flex items-center gap-2 text-xs text-coffee"><ShieldCheck size={14} className="text-golddark" /> Role changes are stored in this demo session only.</p>
    </>
  );
}
