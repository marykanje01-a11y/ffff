import { useState } from "react";
import { Search, Calendar, Sliders, Star, Heart, MapPin, Wifi, Shield, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const CATEGORIES = ["All", "Hotels", "Lodges", "Guest Houses", "BnBs", "Camps"];

const STAYS = [
  {
    name: "Latitude 15°",
    location: "Livingstone, Southern Province",
    price: "K1,600",
    rating: 4.8,
    reviews: 246,
    img: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400",
    featured: true,
    amenities: ["Pool", "Wi-Fi", "Restaurant", "AC"],
  },
  {
    name: "Mukambi Safari Lodge",
    location: "South Luangwa, Eastern Province",
    price: "K2,850",
    rating: 4.9,
    reviews: 318,
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    featured: false,
    amenities: ["Safari", "Wi-Fi", "Restaurant", "Bar"],
  },
  {
    name: "Fallsway Guest House",
    location: "Livingstone, Southern Province",
    price: "K980",
    rating: 4.6,
    reviews: 182,
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
    featured: false,
    amenities: ["Wi-Fi", "Breakfast", "Parking", "AC"],
  },
  {
    name: "Zambezi River BnB",
    location: "Siavonga, Southern Province",
    price: "K1,250",
    rating: 4.7,
    reviews: 143,
    img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400",
    featured: false,
    amenities: ["Wi-Fi", "Breakfast", "River View", "AC"],
  },
];

export default function Bookings() {
  const [activeCategory, setActiveCategory] = useState("All");

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
          backgroundImage: "url(https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 1 }} />

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
        {/* Title */}
        <div className="px-4 mb-4">
          <h1 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700 }}>Bookings</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.75rem", marginTop: "2px" }}>
            Stay. Relax. Experience{" "}
            <span style={{ color: "#3a7d44" }}>Zambia.</span>
          </p>
        </div>

        {/* Search row */}
        <div className="px-4 mb-3">
          <div
            className="glass-card flex items-center gap-2 px-3"
            style={{ height: "46px" }}
          >
            <Search size={15} style={{ color: "rgba(255,255,255,0.5)", flexShrink: 0 }} />
            <input
              data-testid="input-search-bookings"
              placeholder="Where do you want to stay?"
              style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#fff", fontSize: "0.78rem" }}
            />
            <div className="flex items-center gap-1.5 border-l border-white/10 pl-2">
              <div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.58rem" }}>Check-in</p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.62rem" }}>Add date</p>
              </div>
              <Calendar size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
              <div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.58rem" }}>Check-out</p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.62rem" }}>Add date</p>
              </div>
              <Calendar size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
            </div>
            <button className="glass-card flex items-center justify-center" style={{ width: "30px", height: "30px", borderRadius: "8px" }}>
              <Sliders size={13} style={{ color: "rgba(255,255,255,0.7)" }} />
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div className="px-4 mb-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                data-testid={`tab-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                style={{
                  flexShrink: 0,
                  padding: "6px 14px",
                  borderRadius: "10px",
                  fontSize: "0.72rem",
                  fontWeight: cat === activeCategory ? 600 : 400,
                  color: cat === activeCategory ? "#fff" : "rgba(255,255,255,0.6)",
                  background: cat === activeCategory ? "#3a7d44" : "rgba(255,255,255,0.08)",
                  border: cat === activeCategory ? "none" : "1px solid rgba(255,255,255,0.12)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Section header */}
        <div className="px-4 mb-3 flex items-center justify-between">
          <p style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 600 }}>Top Stays in Zambia</p>
          <button className="flex items-center gap-0.5" style={{ color: "#3a7d44", fontSize: "0.73rem" }}>
            View all <ChevronRight size={12} />
          </button>
        </div>

        {/* Stay cards */}
        <div className="px-4 flex flex-col gap-3 mb-4">
          {STAYS.map((stay, i) => (
            <motion.div
              key={stay.name}
              data-testid={`card-stay-${i}`}
              whileTap={{ scale: 0.98 }}
              className="glass-card flex gap-3 overflow-hidden"
              style={{ padding: "10px", borderRadius: "16px", cursor: "pointer" }}
            >
              <div style={{ position: "relative", width: "90px", height: "90px", flexShrink: 0, borderRadius: "12px", overflow: "hidden" }}>
                <img src={stay.img} alt={stay.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {stay.featured && (
                  <div
                    style={{
                      position: "absolute",
                      top: "5px",
                      left: "5px",
                      background: "#f5a623",
                      borderRadius: "5px",
                      padding: "1px 5px",
                      fontSize: "0.55rem",
                      color: "#fff",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    <Star size={7} fill="#fff" color="#fff" /> Featured
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <p style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 700, lineHeight: 1.2 }}>{stay.name}</p>
                  <button style={{ flexShrink: 0, marginLeft: "6px" }}>
                    <Heart size={14} style={{ color: "rgba(255,255,255,0.6)" }} />
                  </button>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={9} style={{ color: "rgba(255,255,255,0.5)" }} />
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.6rem" }}>{stay.location}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={9} style={{ color: "#f5a623", fill: "#f5a623" }} />
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.62rem" }}>{stay.rating} ({stay.reviews} reviews)</span>
                </div>
                {/* Amenities */}
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  {stay.amenities.slice(0, 3).map(a => (
                    <span key={a} style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.57rem", display: "flex", alignItems: "center", gap: "2px" }}>
                      <Wifi size={8} /> {a}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.58rem" }}>From </span>
                    <span style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 700 }}>{stay.price}</span>
                    <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.58rem" }}> /night</span>
                  </div>
                  <button
                    style={{
                      background: "#3a7d44",
                      border: "none",
                      borderRadius: "8px",
                      padding: "5px 12px",
                      color: "#fff",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Best Price Guarantee */}
        <div className="px-4 mb-3">
          <div
            className="glass-card-green flex items-center gap-3"
            style={{ padding: "12px 16px" }}
          >
            <Shield size={20} style={{ color: "#3a7d44", flexShrink: 0 }} />
            <div>
              <p style={{ color: "#fff", fontSize: "0.78rem", fontWeight: 600 }}>Best Price Guarantee</p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.64rem" }}>Found a better price elsewhere? We'll match it.</p>
              <button className="flex items-center gap-0.5 mt-1" style={{ color: "#3a7d44", fontSize: "0.65rem" }}>
                Learn more <ChevronRight size={10} />
              </button>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="px-4 mb-4 grid grid-cols-3 gap-2">
          {[
            { icon: Shield, label: "Secure Booking", sub: "Your data is safe with us" },
            { icon: Calendar, label: "Flexible Options", sub: "Free cancellation on selected stays" },
            { icon: Clock, label: "24/7 Support", sub: "We're here to help" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="glass-card flex flex-col items-center text-center" style={{ padding: "10px 8px" }}>
              <Icon size={16} style={{ color: "#3a7d44", marginBottom: "5px" }} />
              <p style={{ color: "#fff", fontSize: "0.62rem", fontWeight: 600, lineHeight: 1.3 }}>{label}</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.55rem", lineHeight: 1.3, marginTop: "2px" }}>{sub}</p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
