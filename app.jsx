import React, { useState, useMemo } from "react";
import { Star, Search, Plus, ShieldCheck, MessageSquare, ArrowLeft, Phone, Mail, MapPin, Wrench, Hammer, Zap, Droplet, PaintRoller, TreePine, Home, Brush, LayoutGrid, X, Check } from "lucide-react";

const TRADES = [
  { key: "builder", label: "Builders & extensions", icon: Hammer },
  { key: "electrician", label: "Electricians", icon: Zap },
  { key: "plumber", label: "Plumbers & heating", icon: Droplet },
  { key: "decorator", label: "Decorators", icon: PaintRoller },
  { key: "gardener", label: "Gardeners & landscaping", icon: TreePine },
  { key: "roofer", label: "Roofers", icon: Home },
  { key: "handyman", label: "Handymen", icon: Wrench },
  { key: "cleaner", label: "Cleaners", icon: Brush },
];

const AREAS = ["Bedford town centre", "Kempston", "Biddenham", "Great Barford", "Wootton", "Shortstown", "Elstow", "Goldington"];

const seedCompanies = [
  {
    id: "c1", name: "Kempston Plumbing & Heating", trade: "plumber", area: "Kempston",
    phone: "01234 555 210", email: "info@kempstonph.co.uk",
    blurb: "Boiler installs, repairs and bathroom refits. Family-run, 15 years in Bedford.",
    verified: true, claimedBy: null, yearsActive: 15,
    reviews: [
      { id: "r1", author: "Sarah T.", rating: 5, text: "Fixed our boiler same day, really fair price and no upselling.", date: "2026-06-02", reply: "Thanks Sarah, glad we could sort it quickly!" },
      { id: "r2", author: "Dave M.", rating: 4, text: "Good work on the bathroom, took a day longer than quoted but kept us posted.", date: "2026-05-18", reply: null },
    ],
  },
  {
    id: "c2", name: "Bedford Sparks Electrical", trade: "electrician", area: "Bedford town centre",
    phone: "01234 555 118", email: "hello@bedfordsparks.co.uk",
    blurb: "NICEIC registered. Rewires, consumer units, EV chargers, EICRs.",
    verified: true, claimedBy: "owner1", yearsActive: 8,
    reviews: [
      { id: "r3", author: "Priya K.", rating: 5, text: "Installed our EV charger, tidy work and explained everything clearly.", date: "2026-07-01", reply: "Really appreciate the kind words, Priya!" },
    ],
  },
  {
    id: "c3", name: "GreenLeaf Gardens", trade: "gardener", area: "Biddenham",
    phone: "07700 900112", email: "greenleafbeds@gmail.com",
    blurb: "Garden maintenance, landscaping, fencing and patios across north Bedford.",
    verified: false, claimedBy: null, yearsActive: 4,
    reviews: [
      { id: "r4", author: "Michael O.", rating: 5, text: "Transformed our overgrown garden in a weekend, brilliant value.", date: "2026-04-22", reply: null },
    ],
  },
  {
    id: "c4", name: "AllTrade Handyman Services", trade: "handyman", area: "Wootton",
    phone: "07800 112233", email: "alltradebeds@outlook.com",
    blurb: "No job too small — flatpack, shelving, fence repairs, general odd jobs.",
    verified: false, claimedBy: null, yearsActive: 2,
    reviews: [],
  },
];

function starRow(rating, size = 14) {
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={size} fill={n <= rating ? "#B5502E" : "none"} color={n <= rating ? "#B5502E" : "#C9BFAF"} strokeWidth={1.5} />
      ))}
    </span>
  );
}

function avgRating(reviews) {
  if (!reviews.length) return 0;
  return reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
}

const inputStyle = {
  width: "100%", padding: "10px 12px", borderRadius: 4, border: "1px solid #C9BFAF",
  background: "#FBF9F4", fontFamily: "Inter, sans-serif", fontSize: 14, color: "#1F2A24",
  boxSizing: "border-box",
};
const labelStyle = { fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", color: "#8B8378", fontWeight: 600, display: "block", marginBottom: 6, fontFamily: "Inter, sans-serif" };
const btnPrimary = {
  background: "#B5502E", color: "#F6F2EA", border: "none", borderRadius: 4,
  padding: "11px 20px", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14,
  cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8,
};
const btnGhost = {
  background: "transparent", color: "#1F2A24", border: "1px solid #C9BFAF", borderRadius: 4,
  padding: "10px 18px", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14,
  cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8,
};

function StampBadge() {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700,
      color: "#2E5A3E", border: "1.5px solid #2E5A3E", borderRadius: 3, padding: "2px 7px",
      letterSpacing: "0.04em", textTransform: "uppercase", transform: "rotate(-2deg)",
      fontFamily: "Inter, sans-serif",
    }}>
      <ShieldCheck size={12} strokeWidth={2.5} /> Verified
    </span>
  );
}

function CompanyCard({ company, onOpen }) {
  const trade = TRADES.find((t) => t.key === company.trade);
  const Icon = trade ? trade.icon : Wrench;
  const rating = avgRating(company.reviews);
  return (
    <div onClick={() => onOpen(company.id)} style={{
      background: "#FBF9F4", border: "1px solid #DDD4C4", borderRadius: 6, padding: "18px 20px",
      cursor: "pointer", position: "relative", transition: "border-color 0.15s",
    }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#B5502E")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#DDD4C4")}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 4, background: "#EFE7D8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon size={20} color="#B5502E" strokeWidth={1.75} />
          </div>
          <div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, color: "#1F2A24", letterSpacing: "0.01em" }}>{company.name}</div>
            <div style={{ fontSize: 13, color: "#8B8378", marginTop: 2, fontFamily: "Inter, sans-serif" }}>{trade?.label} · {company.area}</div>
          </div>
        </div>
        {company.verified && <StampBadge />}
      </div>
      <p style={{ fontSize: 13.5, color: "#4A453D", marginTop: 12, marginBottom: 12, lineHeight: 1.5, fontFamily: "Inter, sans-serif" }}>{company.blurb}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "Inter, sans-serif" }}>
        {starRow(Math.round(rating))}
        <span style={{ fontSize: 13, color: "#4A453D", fontWeight: 600 }}>{rating ? rating.toFixed(1) : "New"}</span>
        <span style={{ fontSize: 12, color: "#8B8378" }}>({company.reviews.length} review{company.reviews.length !== 1 ? "s" : ""})</span>
      </div>
    </div>
  );
}

function CompanyProfile({ company, isOwner, onBack, onAddReview, onReply }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const trade = TRADES.find((t) => t.key === company.trade);
  const rating = avgRating(company.reviews);

  return (
    <div>
      <button onClick={onBack} style={{ ...btnGhost, border: "none", padding: "6px 0", marginBottom: 20 }}>
        <ArrowLeft size={16} /> Back to directory
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, fontWeight: 600, color: "#1F2A24", margin: 0 }}>{company.name}</h2>
          <div style={{ fontSize: 14, color: "#8B8378", marginTop: 4, fontFamily: "Inter, sans-serif" }}>{trade?.label} · {company.area} · {company.yearsActive} years trading</div>
        </div>
        {company.verified && <StampBadge />}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0 20px" }}>
        {starRow(Math.round(rating), 18)}
        <span style={{ fontSize: 16, fontWeight: 700, color: "#1F2A24", fontFamily: "Inter, sans-serif" }}>{rating ? rating.toFixed(1) : "No ratings yet"}</span>
        <span style={{ fontSize: 13, color: "#8B8378", fontFamily: "Inter, sans-serif" }}>{company.reviews.length} review{company.reviews.length !== 1 ? "s" : ""}</span>
      </div>

      <p style={{ fontSize: 15, color: "#3A362F", lineHeight: 1.6, fontFamily: "Inter, sans-serif", marginBottom: 20 }}>{company.blurb}</p>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 28, padding: "14px 0", borderTop: "1px solid #DDD4C4", borderBottom: "1px solid #DDD4C4" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#3A362F", fontFamily: "Inter, sans-serif" }}><Phone size={15} color="#B5502E" /> {company.phone}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#3A362F", fontFamily: "Inter, sans-serif" }}><Mail size={15} color="#B5502E" /> {company.email}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#3A362F", fontFamily: "Inter, sans-serif" }}><MapPin size={15} color="#B5502E" /> {company.area}</div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, color: "#1F2A24", margin: 0 }}>Reviews</h3>
        {!showReviewForm && (
          <button style={btnGhost} onClick={() => setShowReviewForm(true)}><MessageSquare size={15} /> Write a review</button>
        )}
      </div>

      {showReviewForm && (
        <div style={{ background: "#FBF9F4", border: "1px solid #DDD4C4", borderRadius: 6, padding: 18, marginBottom: 20 }}>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Your name</label>
            <input style={inputStyle} value={reviewName} onChange={(e) => setReviewName(e.target.value)} placeholder="Jo Smith" />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Rating</label>
            <div style={{ display: "flex", gap: 4 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={24} fill={n <= reviewRating ? "#B5502E" : "none"} color={n <= reviewRating ? "#B5502E" : "#C9BFAF"}
                  style={{ cursor: "pointer" }} onClick={() => setReviewRating(n)} />
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Your review</label>
            <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="How was the job done? Would you use them again?" />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={btnPrimary} onClick={() => {
              if (!reviewName.trim() || !reviewText.trim()) return;
              onAddReview(company.id, { author: reviewName, rating: reviewRating, text: reviewText });
              setReviewName(""); setReviewText(""); setReviewRating(5); setShowReviewForm(false);
            }}><Check size={15} /> Post review</button>
            <button style={btnGhost} onClick={() => setShowReviewForm(false)}><X size={15} /> Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {company.reviews.length === 0 && (
          <p style={{ color: "#8B8378", fontSize: 14, fontFamily: "Inter, sans-serif" }}>No reviews yet — be the first to share how the job went.</p>
        )}
        {company.reviews.slice().reverse().map((r) => (
          <div key={r.id} style={{ borderLeft: "3px solid #DDD4C4", paddingLeft: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#1F2A24", fontFamily: "Inter, sans-serif" }}>{r.author}</span>
                {starRow(r.rating, 13)}
              </div>
              <span style={{ fontSize: 12, color: "#8B8378", fontFamily: "Inter, sans-serif" }}>{r.date}</span>
            </div>
            <p style={{ fontSize: 14, color: "#3A362F", marginTop: 6, lineHeight: 1.5, fontFamily: "Inter, sans-serif" }}>{r.text}</p>
            {r.reply && (
              <div style={{ background: "#EFE7D8", borderRadius: 4, padding: "8px 12px", marginTop: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#B5502E", textTransform: "uppercase", letterSpacing: "0.03em", fontFamily: "Inter, sans-serif" }}>Response from {company.name}</div>
                <div style={{ fontSize: 13.5, color: "#3A362F", marginTop: 4, fontFamily: "Inter, sans-serif" }}>{r.reply}</div>
              </div>
            )}
            {isOwner && !r.reply && replyingTo !== r.id && (
              <button style={{ ...btnGhost, padding: "5px 12px", fontSize: 12, marginTop: 8 }} onClick={() => setReplyingTo(r.id)}>Reply as owner</button>
            )}
            {isOwner && replyingTo === r.id && (
              <div style={{ marginTop: 8 }}>
                <textarea style={{ ...inputStyle, minHeight: 60 }} value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Thanks for the feedback..." />
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button style={{ ...btnPrimary, padding: "7px 14px", fontSize: 13 }} onClick={() => {
                    if (!replyText.trim()) return;
                    onReply(company.id, r.id, replyText);
                    setReplyText(""); setReplyingTo(null);
                  }}>Post reply</button>
                  <button style={{ ...btnGhost, padding: "7px 14px", fontSize: 13 }} onClick={() => setReplyingTo(null)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AddCompanyForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({ name: "", trade: "builder", area: AREAS[0], phone: "", email: "", blurb: "", yearsActive: "" });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <div>
      <button onClick={onCancel} style={{ ...btnGhost, border: "none", padding: "6px 0", marginBottom: 20 }}><ArrowLeft size={16} /> Back to directory</button>
      <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 600, color: "#1F2A24", marginBottom: 6 }}>Add a company</h2>
      <p style={{ fontSize: 14, color: "#8B8378", marginBottom: 24, fontFamily: "Inter, sans-serif" }}>List a tradesperson you trust, or add your own business.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
        <div>
          <label style={labelStyle}>Company or trading name</label>
          <input style={inputStyle} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Bedford Roofing Co" />
        </div>
        <div>
          <label style={labelStyle}>Trade</label>
          <select style={inputStyle} value={form.trade} onChange={(e) => update("trade", e.target.value)}>
            {TRADES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Area</label>
          <select style={inputStyle} value={form.area} onChange={(e) => update("area", e.target.value)}>
            {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Phone</label>
          <input style={inputStyle} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="07000 000000" />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input style={inputStyle} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="name@company.co.uk" />
        </div>
        <div>
          <label style={labelStyle}>Years trading</label>
          <input style={inputStyle} type="number" min="0" value={form.yearsActive} onChange={(e) => update("yearsActive", e.target.value)} placeholder="5" />
        </div>
        <div>
          <label style={labelStyle}>Short description</label>
          <textarea style={{ ...inputStyle, minHeight: 80 }} value={form.blurb} onChange={(e) => update("blurb", e.target.value)} placeholder="What do they do, what makes them worth recommending?" />
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button style={btnPrimary} onClick={() => {
            if (!form.name.trim()) return;
            onSubmit({ ...form, yearsActive: Number(form.yearsActive) || 0 });
          }}><Plus size={16} /> Add to directory</button>
          <button style={btnGhost} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [companies, setCompanies] = useState(seedCompanies);
  const [view, setView] = useState("directory"); // directory | profile | add
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState("");
  const [tradeFilter, setTradeFilter] = useState("all");
  const [ownedIds, setOwnedIds] = useState(["c2"]); // simulate "logged in" as owner of c2

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const matchesSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.area.toLowerCase().includes(search.toLowerCase());
      const matchesTrade = tradeFilter === "all" || c.trade === tradeFilter;
      return matchesSearch && matchesTrade;
    });
  }, [companies, search, tradeFilter]);

  const activeCompany = companies.find((c) => c.id === activeId);

  function addReview(companyId, review) {
    setCompanies((cs) => cs.map((c) => c.id === companyId
      ? { ...c, reviews: [...c.reviews, { ...review, id: "r" + Date.now(), date: new Date().toISOString().slice(0, 10), reply: null }] }
      : c));
  }

  function addReply(companyId, reviewId, replyText) {
    setCompanies((cs) => cs.map((c) => c.id === companyId
      ? { ...c, reviews: c.reviews.map((r) => r.id === reviewId ? { ...r, reply: replyText } : r) }
      : c));
  }

  function addCompany(form) {
    const newCo = { id: "c" + Date.now(), ...form, verified: false, claimedBy: null, reviews: [] };
    setCompanies((cs) => [newCo, ...cs]);
    setOwnedIds((ids) => [...ids, newCo.id]);
    setActiveId(newCo.id);
    setView("profile");
  }

  return (
    <div style={{ background: "#F6F2EA", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        select { appearance: none; }
      `}</style>

      <header style={{ background: "#1F2A24", padding: "20px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setView("directory")}>
          <LayoutGrid size={22} color="#B5502E" />
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 700, color: "#F6F2EA", letterSpacing: "0.01em" }}>Bedford Trades</span>
        </div>
        <button style={{ ...btnPrimary }} onClick={() => setView("add")}><Plus size={16} /> Add a company</button>
      </header>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px 64px" }}>
        {view === "directory" && (
          <>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 32, fontWeight: 600, color: "#1F2A24", margin: "0 0 6px" }}>Trusted tradesmen, all in one place</h1>
              <p style={{ fontSize: 15, color: "#8B8378", margin: 0 }}>Everyone from the group chat, sorted and searchable — with real reviews from Bedford neighbours.</p>
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: "1 1 240px" }}>
                <Search size={16} color="#8B8378" style={{ position: "absolute", left: 12, top: 12 }} />
                <input style={{ ...inputStyle, paddingLeft: 36 }} placeholder="Search by name or area..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <select style={{ ...inputStyle, width: 220 }} value={tradeFilter} onChange={(e) => setTradeFilter(e.target.value)}>
                <option value="all">All trades</option>
                {TRADES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
              </select>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {TRADES.map((t) => {
                const Icon = t.icon;
                const active = tradeFilter === t.key;
                return (
                  <button key={t.key} onClick={() => setTradeFilter(active ? "all" : t.key)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 20,
                      border: `1px solid ${active ? "#B5502E" : "#DDD4C4"}`, background: active ? "#B5502E" : "transparent",
                      color: active ? "#F6F2EA" : "#4A453D", fontSize: 12.5, fontWeight: 600, cursor: "pointer",
                    }}>
                    <Icon size={13} /> {t.label}
                  </button>
                );
              })}
            </div>

            <div style={{ fontSize: 13, color: "#8B8378", marginBottom: 12 }}>{filtered.length} trade{filtered.length !== 1 ? "s" : ""} listed</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.map((c) => <CompanyCard key={c.id} company={c} onOpen={(id) => { setActiveId(id); setView("profile"); }} />)}
              {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "48px 0", color: "#8B8378" }}>
                  No matches yet. <span style={{ color: "#B5502E", cursor: "pointer", fontWeight: 600 }} onClick={() => setView("add")}>Add the first one</span>.
                </div>
              )}
            </div>
          </>
        )}

        {view === "profile" && activeCompany && (
          <CompanyProfile
            company={activeCompany}
            isOwner={ownedIds.includes(activeCompany.id)}
            onBack={() => setView("directory")}
            onAddReview={addReview}
            onReply={addReply}
          />
        )}

        {view === "add" && (
          <AddCompanyForm onSubmit={addCompany} onCancel={() => setView("directory")} />
        )}
      </main>

      <footer style={{ borderTop: "1px solid #DDD4C4", padding: "20px 32px", textAlign: "center", fontSize: 12.5, color: "#8B8378" }}>
        Built for the Bedford community. Owners can claim their listing to reply to reviews.
      </footer>
    </div>
  );
}
