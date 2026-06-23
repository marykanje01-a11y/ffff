import { useState } from "react";
import { Search, Sliders, Heart, Star, MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const CATEGORIES = [
  { label: "Waterfalls", icon: "🌊" },
  { label: "Wildlife", icon: "🦁" },
  { label: "Adventure", icon: "⛰️" },
  { label: "Culture", icon: "🎭" },
  { label: "Lakes & Rivers", icon: "💧" },
  { label: "History", icon: "🏛️" },
  { label: "Food & Drink", icon: "🍽️" },
];

const TRENDING = [
  { name: "Victoria Falls", location: "Livingstone, Southern Province", rating: 4.9, img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400" },
  { name: "South Luangwa NP", location: "Eastern Province", rating: 4.8, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" },
  { name: "Lake Tanganyika", location: "Northern Province", rating: 4.7, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
  { name: "Lower Zambezi NP", location: "Southern Province", rating: 4.6, img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400" },
];

const EXPERIENCES = [
  { name: "Bungee Jumping Victoria Falls Bridge", location: "Livingstone", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400" },
  { name: "Sunset Cruise Zambezi River", location: "Livingstone", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400" },
  { name: "Game Drive South Luangwa", location: "Eastern Province", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" },
  { name: "Kayaking Lake Kariba", location: "Southern Province", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400" },
];

export default function Explore() {
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
          backgroundImage: "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.62)", zIndex: 1 }} />

      <Header />

      {/* Scrollable content */}
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
            Explore{" "}
            <span style={{ color: "#3a7d44" }}>Zambia</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.78rem", marginTop: "4px", lineHeight: 1.5 }}>
            Discover places, experiences and hidden gems across the land of natural wonders.
          </p>
        </div>

        {/* Search */}
        <div className="px-4 mb-5">
          <div
            className="glass-card flex items-center gap-2 px-3"
            style={{ height: "44px" }}
          >
            <Search size={16} style={{ color: "rgba(255,255,255,0.5)", flexShrink: 0 }} />
            <input
              data-testid="input-search-explore"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search destinations, activities..."
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: "0.82rem",
              }}
            />
            <button
              className="glass-card flex items-center justify-center"
              style={{ width: "32px", height: "32px", borderRadius: "8px" }}
            >
              <Sliders size={14} style={{ color: "rgba(255,255,255,0.7)" }} />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <p style={{ color: "#fff", fontSize: "0.88rem", fontWeight: 600 }}>Categories</p>
            <button className="flex items-center gap-0.5" style={{ color: "#3a7d44", fontSize: "0.73rem" }}>
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat.label}
                data-testid={`button-category-${cat.label.toLowerCase()}`}
                whileTap={{ scale: 0.94 }}
                className="glass-card flex flex-col items-center gap-1 flex-shrink-0"
                style={{ padding: "10px 12px", minWidth: "70px" }}
              >
                <span style={{ fontSize: "1.2rem" }}>{cat.icon}</span>
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.62rem", textAlign: "center" }}>
                  {cat.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Trending Now */}
        <div className="px-4 mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <p style={{ color: "#fff", fontSize: "0.88rem", fontWeight: 600 }}>Trending Now</p>
            <button className="flex items-center gap-0.5" style={{ color: "#3a7d44", fontSize: "0.73rem" }}>
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {TRENDING.map((item, i) => (
              <motion.div
                key={item.name}
                data-testid={`card-trending-${i}`}
                whileTap={{ scale: 0.97 }}
                className="glass-card flex-shrink-0 overflow-hidden"
                style={{ width: "160px", borderRadius: "14px", cursor: "pointer" }}
              >
                <div style={{ position: "relative", height: "100px" }}>
                  <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
                  <div
                    className="absolute top-2 left-2 flex items-center gap-1"
                    style={{
                      background: "rgba(58,125,68,0.85)",
                      borderRadius: "6px",
                      padding: "2px 6px",
                    }}
                  >
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#7fff7f" }} />
                    <span style={{ color: "#fff", fontSize: "0.6rem", fontWeight: 600 }}>Trending</span>
                  </div>
                  <button className="absolute top-2 right-2">
                    <Heart size={14} style={{ color: "rgba(255,255,255,0.8)" }} />
                  </button>
                </div>
                <div style={{ padding: "8px 10px 10px" }}>
                  <p style={{ color: "#fff", fontSize: "0.72rem", fontWeight: 600, lineHeight: 1.3 }}>{item.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={9} style={{ color: "rgba(255,255,255,0.5)" }} />
                    <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.6rem" }}>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={9} style={{ color: "#f5a623", fill: "#f5a623" }} />
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.6rem" }}>{item.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Nearby Experiences */}
        <div className="px-4 mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <p style={{ color: "#fff", fontSize: "0.88rem", fontWeight: 600 }}>Nearby Experiences</p>
            <button className="flex items-center gap-0.5" style={{ color: "#3a7d44", fontSize: "0.73rem" }}>
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex gap-3">
            <div
              className="glass-card flex-1"
              style={{ padding: "12px", borderRadius: "14px" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} style={{ color: "#3a7d44" }} />
                <span style={{ color: "#fff", fontSize: "0.72rem", fontWeight: 600 }}>Experiences near you</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.62rem" }}>See what's around your location</p>
              <button
                className="mt-2 flex items-center gap-1.5"
                style={{
                  background: "rgba(58,125,68,0.2)",
                  border: "1px solid rgba(58,125,68,0.5)",
                  borderRadius: "8px",
                  padding: "5px 10px",
                  color: "#3a7d44",
                  fontSize: "0.64rem",
                  fontWeight: 600,
                }}
              >
                Enable Location
              </button>
            </div>
            <div
              className="glass-card"
              style={{ padding: "12px", borderRadius: "14px", minWidth: "110px" }}
            >
              <div className="flex items-center gap-1 mb-1">
                <Star size={12} style={{ color: "#f5a623", fill: "#f5a623" }} />
                <span style={{ color: "#fff", fontSize: "0.7rem", fontWeight: 600 }}>Top Rated</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.6rem", lineHeight: 1.4 }}>
                Highest rated experiences
              </p>
              <button className="flex items-center gap-0.5 mt-1" style={{ color: "#3a7d44", fontSize: "0.62rem" }}>
                See all <ChevronRight size={10} />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Experiences */}
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between mb-2.5">
            <p style={{ color: "#fff", fontSize: "0.88rem", fontWeight: 600 }}>Featured Experiences</p>
            <button className="flex items-center gap-0.5" style={{ color: "#3a7d44", fontSize: "0.73rem" }}>
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.name}
                data-testid={`card-experience-${i}`}
                whileTap={{ scale: 0.97 }}
                className="glass-card overflow-hidden"
                style={{ borderRadius: "14px", cursor: "pointer" }}
              >
                <div style={{ position: "relative", height: "80px" }}>
                  <img src={exp.img} alt={exp.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)" }} />
                  <button className="absolute top-2 right-2">
                    <Heart size={13} style={{ color: "rgba(255,255,255,0.8)" }} />
                  </button>
                </div>
                <div style={{ padding: "8px" }}>
                  <p style={{ color: "#fff", fontSize: "0.67rem", fontWeight: 600, lineHeight: 1.3 }}>{exp.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={8} style={{ color: "rgba(255,255,255,0.5)" }} />
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.58rem" }}>{exp.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
