import { useState } from "react";
import { Search, Sliders, Heart, MapPin, ChevronRight, Users } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const FEATURED = {
  name: "Victoria Falls",
  location: "Livingstone, Southern Province",
  description: "One of the Seven Natural Wonders of the World.",
  img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
  visitors: "2.4K+",
};

const DESTINATIONS = [
  { name: "South Luangwa NP", province: "Eastern Province", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" },
  { name: "Lake Tanganyika", province: "Northern Province", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
  { name: "Kalambo Falls", province: "Northern Province", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400" },
  { name: "Lower Zambezi NP", province: "Southern Province", img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400" },
  { name: "Nsangwe Rock Paintings", province: "Central Province", img: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400" },
  { name: "Lake Kariba", province: "Southern Province", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400" },
];

export default function Destinations() {
  const [search, setSearch] = useState("");

  return (
    <div
      className="relative overflow-hidden"
      style={{ width: "100%", height: "100vh", maxWidth: "430px", margin: "0 auto" }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.62)", zIndex: 1 }} />

      <Header />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          paddingTop: "98px",
          paddingBottom: "70px",
          overflowY: "auto",
        }}
        className="scrollbar-hide"
      >
        {/* Hero text */}
        <div className="px-4 mb-4">
          <h1 style={{ color: "#fff", fontSize: "1.4rem", fontWeight: 700 }}>
            Discover{" "}
            <span style={{ color: "#3a7d44" }}>Zambia</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.75rem", marginTop: "2px" }}>
            Explore. Experience. Remember.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="px-4 mb-5 flex gap-2">
          <div
            className="glass-card flex items-center gap-2 px-3 flex-1"
            style={{ height: "44px" }}
          >
            <Search size={15} style={{ color: "rgba(255,255,255,0.5)", flexShrink: 0 }} />
            <input
              data-testid="input-search-destinations"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search destinations..."
              style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#fff", fontSize: "0.8rem" }}
            />
          </div>
          <button
            data-testid="button-filter"
            className="glass-card flex items-center gap-1.5 px-3"
            style={{ height: "44px", borderRadius: "12px", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem" }}
          >
            <Sliders size={14} />
            Filter
          </button>
        </div>

        {/* Featured Destinations */}
        <div className="px-4 mb-5">
          <div className="flex items-center justify-between mb-3">
            <p style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 600 }}>Featured Destinations</p>
            <button className="flex items-center gap-0.5" style={{ color: "#3a7d44", fontSize: "0.73rem" }}>
              View all <ChevronRight size={12} />
            </button>
          </div>

          {/* Large featured card */}
          <motion.div
            data-testid="card-featured-victoria-falls"
            whileTap={{ scale: 0.98 }}
            className="glass-card overflow-hidden"
            style={{ borderRadius: "18px", cursor: "pointer" }}
          >
            <div style={{ position: "relative", height: "180px" }}>
              <img src={FEATURED.img} alt={FEATURED.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)" }} />
              {/* Most popular badge */}
              <div
                className="absolute top-3 left-3"
                style={{
                  background: "rgba(58,125,68,0.9)",
                  borderRadius: "8px",
                  padding: "3px 9px",
                  fontSize: "0.62rem",
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                Most Popular
              </div>
              <button className="absolute top-3 right-3">
                <Heart size={16} style={{ color: "rgba(255,255,255,0.85)" }} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 style={{ color: "#fff", fontSize: "1.05rem", fontWeight: 700 }}>{FEATURED.name}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={10} style={{ color: "rgba(255,255,255,0.6)" }} />
                  <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.65rem" }}>{FEATURED.location}</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.65rem", marginTop: "4px" }}>{FEATURED.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <button
                    style={{
                      background: "rgba(58,125,68,0.9)",
                      border: "none",
                      borderRadius: "10px",
                      padding: "7px 14px",
                      color: "#fff",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    Explore Now <ChevronRight size={12} />
                  </button>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[1,2,3].map(i => (
                        <div key={i} style={{ width: "18px", height: "18px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.5)", overflow: "hidden", marginLeft: i > 1 ? "-6px" : 0 }}>
                          <img src={`https://i.pravatar.cc/40?img=${i + 10}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      ))}
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.62rem" }}>{FEATURED.visitors} visitors</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Dots */}
            <div className="flex items-center justify-center gap-1.5 py-2.5">
              {[0,1,2,3].map(i => (
                <div key={i} style={{ width: i === 0 ? "16px" : "5px", height: "5px", borderRadius: "3px", background: i === 0 ? "#3a7d44" : "rgba(255,255,255,0.3)", transition: "all 0.3s" }} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Grid of destinations */}
        <div className="px-4 mb-4">
          <div className="grid grid-cols-3 gap-2.5">
            {DESTINATIONS.map((dest, i) => (
              <motion.div
                key={dest.name}
                data-testid={`card-destination-${i}`}
                whileTap={{ scale: 0.96 }}
                className="glass-card overflow-hidden"
                style={{ borderRadius: "12px", cursor: "pointer" }}
              >
                <div style={{ position: "relative", height: "90px" }}>
                  <img src={dest.img} alt={dest.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
                  <button className="absolute top-1.5 right-1.5">
                    <Heart size={11} style={{ color: "rgba(255,255,255,0.8)" }} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p style={{ color: "#fff", fontSize: "0.62rem", fontWeight: 600, lineHeight: 1.2 }}>{dest.name}</p>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      <MapPin size={8} style={{ color: "rgba(255,255,255,0.5)" }} />
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.55rem" }}>{dest.province}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Find a stay banner */}
        <div className="px-4 mb-4">
          <motion.div
            className="glass-card flex items-center justify-between"
            style={{ padding: "14px 16px", borderRadius: "14px" }}
          >
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(58,125,68,0.15)",
                  border: "1px solid rgba(58,125,68,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>🏨</span>
              </div>
              <div>
                <p style={{ color: "#fff", fontSize: "0.78rem", fontWeight: 600 }}>Find the perfect stay</p>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.65rem" }}>Hotels, Lodges, Camps & More</p>
              </div>
            </div>
            <button
              style={{
                background: "#3a7d44",
                border: "none",
                borderRadius: "10px",
                padding: "8px 12px",
                color: "#fff",
                fontSize: "0.7rem",
                fontWeight: 600,
                cursor: "pointer",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              View Stays <ChevronRight size={11} />
            </button>
          </motion.div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
