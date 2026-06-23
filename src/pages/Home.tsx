import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronRight, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import GalleryModal from "@/components/GalleryModal";
import { PROVINCES, PROVINCE_PLACES } from "@/data/zambia";

const CARD_W = 132;
const ACTIVE_W = 148;
const CARD_H = 172;
const ACTIVE_H = 192;
const GAP = 8;
const STEP = CARD_W + GAP; // 140px per slot
const HIGHLIGHT_LEFT = 8;

type Place = { id: string; name: string; tagline: string; img: string };

export default function Home() {
  const [activeProvinceIdx, setActiveProvinceIdx] = useState(0);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [activePlaceIdx, setActivePlaceIdx] = useState(0);
  const [galleryPlace, setGalleryPlace] = useState<Place | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  // Separate animation flags for smooth infinite loops
  const [provAnimating, setProvAnimating] = useState(true);
  const [placeAnimating, setPlaceAnimating] = useState(true);

  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const safeProvinceIdx = activeProvinceIdx % PROVINCES.length;
  const currentProvince = PROVINCES[safeProvinceIdx];
  const places = selectedProvince ? PROVINCE_PLACES[selectedProvince] || [] : [];

  // Extended arrays for seamless infinite loop (original + 2 head copies)
  const extProvinces = [...PROVINCES, PROVINCES[0], PROVINCES[1]];
  const extPlaces = places.length > 0 ? [...places, places[0], places[1]] : [];

  const inProvinceView = !selectedProvince;
  const activeIdx = inProvinceView ? activeProvinceIdx : activePlaceIdx;
  const totalItems = inProvinceView ? PROVINCES.length : places.length;

  // Translate: active card aligns to the fixed highlight at HIGHLIGHT_LEFT
  const translateX = -(activeIdx * STEP) + HIGHLIGHT_LEFT;

  const navItems = inProvinceView
    ? PROVINCES.map((p, i) => ({ id: p.id, label: p.name, isActive: i === safeProvinceIdx }))
    : places.map((p, i) => ({ id: p.id, label: p.name, isActive: i === activePlaceIdx % places.length }));

  // ── Auto-slide (same mechanic for both province & place) ──────────────────
  const startAutoSlide = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      if (inProvinceView) {
        setActiveProvinceIdx(prev => {
          const next = prev + 1;
          if (next >= PROVINCES.length) {
            // Let the transition to the extended copy complete, then snap back
            setTimeout(() => {
              setProvAnimating(false);
              setActiveProvinceIdx(0);
              setTimeout(() => setProvAnimating(true), 30);
            }, 450);
            return next;
          }
          return next;
        });
      } else {
        setActivePlaceIdx(prev => {
          const next = prev + 1;
          if (next >= places.length) {
            setTimeout(() => {
              setPlaceAnimating(false);
              setActivePlaceIdx(0);
              setTimeout(() => setPlaceAnimating(true), 30);
            }, 450);
            return next;
          }
          return next;
        });
      }
    }, 5000);
  }, [inProvinceView, places.length]);

  useEffect(() => {
    startAutoSlide();
    return () => { if (autoTimerRef.current) clearInterval(autoTimerRef.current); };
  }, [startAutoSlide]);

  // ── Manual navigation ─────────────────────────────────────────────────────
  const goNext = () => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    if (inProvinceView) {
      setActiveProvinceIdx(prev => (prev + 1) % PROVINCES.length);
    } else {
      setActivePlaceIdx(prev => (prev + 1) % places.length);
    }
    startAutoSlide();
  };

  const goPrev = () => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    if (inProvinceView) {
      setActiveProvinceIdx(prev => (prev - 1 + PROVINCES.length) % PROVINCES.length);
    } else {
      setActivePlaceIdx(prev => (prev - 1 + places.length) % places.length);
    }
    startAutoSlide();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? goNext() : goPrev();
    }
  };

  // ── Province → Place transition ───────────────────────────────────────────
  const handleProvinceCardTap = (provinceId: string) => {
    if (transitioning) return;
    setTransitioning(true);
    setSelectedProvince(provinceId);
    setActivePlaceIdx(0);
    setPlaceAnimating(true);
    setTimeout(() => setTransitioning(false), 600);
  };

  const handleBack = () => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    setSelectedProvince(null);
    setActivePlaceIdx(0);
    setTimeout(startAutoSlide, 100);
  };

  const handleNavItemClick = (idx: number) => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    if (inProvinceView) setActiveProvinceIdx(idx);
    else setActivePlaceIdx(idx);
    startAutoSlide();
  };

  // Active province name shown above cards
  const displayProvinceName = inProvinceView
    ? currentProvince.name
    : PROVINCES.find(p => p.id === selectedProvince)?.name ?? "";

  return (
    <div
      className="relative overflow-hidden"
      style={{ width: "100%", height: "100vh", maxWidth: "430px", margin: "0 auto" }}
    >
      {/* ── Dynamic background crossfade ── */}
      <AnimatePresence>
        <motion.div
          key={currentProvince.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${currentProvince.bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
      </AnimatePresence>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.58)", zIndex: 1 }} />

      {/* ── Header (no subtitle – title moved below) ── */}
      <Header />

      {/* ── Content ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          paddingTop: "82px",   // tighter since header no longer has subtitle
          paddingBottom: "64px",
        }}
      >
        {/* Province / Place title — BIG, above cards */}
        <div className="px-4 pt-1 pb-1 flex items-center gap-2">
          {selectedProvince && (
            <button
              data-testid="button-back-to-provinces"
              onClick={handleBack}
              style={{
                background: "rgba(58,125,68,0.15)",
                border: "1px solid rgba(58,125,68,0.5)",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <ArrowLeft size={14} style={{ color: "#3a7d44" }} />
            </button>
          )}
          <AnimatePresence mode="wait">
            <motion.h2
              key={displayProvinceName}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              style={{
                color: "#fff",
                fontSize: "1.35rem",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              {displayProvinceName}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* ── Main body: left nav + carousel ── */}
        <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>

          {/* Left navigation */}
          <div
            className="flex flex-col justify-center overflow-y-auto scrollbar-hide"
            style={{ width: "115px", flexShrink: 0, paddingLeft: "10px", paddingRight: "4px" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProvince ?? "provinces"}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1.5"
              >
                {navItems.map((item, idx) => (
                  <button
                    key={item.id}
                    data-testid={`nav-item-${item.id}`}
                    onClick={() => handleNavItemClick(idx)}
                    className="flex items-center gap-1.5 text-left"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
                    {item.isActive ? (
                      <span
                        style={{
                          display: "block",
                          width: "3px",
                          height: "14px",
                          background: "#3a7d44",
                          borderRadius: "2px",
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <Heart size={10} style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
                    )}
                    <span
                      style={{
                        fontSize: "0.67rem",
                        color: item.isActive ? "#3a7d44" : "rgba(255,255,255,0.6)",
                        fontWeight: item.isActive ? 600 : 400,
                        lineHeight: 1.3,
                        transition: "color 0.3s",
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Carousel area ── */}
          <div
            className="flex-1 relative overflow-hidden"
            style={{ paddingTop: "4px", paddingBottom: "4px" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            data-testid="carousel-container"
          >
            {/* Fixed green highlight box */}
            <div
              className="province-highlight"
              style={{
                position: "absolute",
                left: HIGHLIGHT_LEFT - 4,
                top: "50%",
                transform: "translateY(-50%)",
                width: ACTIVE_W + 8,
                height: ACTIVE_H + 8,
                zIndex: 10,
                pointerEvents: "none",
              }}
            />

            {/* ── Province card track ── */}
            <AnimatePresence mode="wait">
              {inProvinceView ? (
                <motion.div
                  key="province-track"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "flex",
                    gap: `${GAP}px`,
                    transform: `translateX(${translateX}px)`,
                    transition: provAnimating
                      ? "transform 0.45s cubic-bezier(0.4,0,0.2,1)"
                      : "none",
                    alignItems: "center",
                    height: "100%",
                    willChange: "transform",
                  }}
                >
                  {extProvinces.map((prov, idx) => {
                    const isActive =
                      idx === activeProvinceIdx ||
                      (activeProvinceIdx >= PROVINCES.length && idx === 0);
                    const w = isActive ? ACTIVE_W : CARD_W;
                    const h = isActive ? ACTIVE_H : CARD_H;
                    return (
                      <button
                        key={`prov-${idx}`}
                        data-testid={`card-province-${prov.id}-${idx}`}
                        onClick={() => handleProvinceCardTap(prov.id)}
                        style={{
                          width: `${w}px`,
                          height: `${h}px`,
                          flexShrink: 0,
                          borderRadius: "14px",
                          overflow: "hidden",
                          position: "relative",
                          cursor: "pointer",
                          opacity: isActive ? 1 : 0.55,
                          transition: "width 0.45s cubic-bezier(0.4,0,0.2,1), height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease",
                          border: "none",
                          padding: 0,
                        }}
                      >
                        <img
                          src={prov.bg}
                          alt={prov.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.08) 60%)" }} />
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px" }}>
                          <p style={{ color: "#fff", fontSize: "0.72rem", fontWeight: 600, lineHeight: 1.3 }}>
                            {prov.name}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              ) : (
                /* ── Place card track — identical mechanics to province ── */
                <motion.div
                  key={`place-track-${selectedProvince}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "flex",
                    gap: `${GAP}px`,
                    transform: `translateX(${translateX}px)`,
                    transition: placeAnimating
                      ? "transform 0.45s cubic-bezier(0.4,0,0.2,1)"
                      : "none",
                    alignItems: "center",
                    height: "100%",
                    willChange: "transform",
                  }}
                >
                  {extPlaces.map((place, idx) => {
                    const isActive =
                      idx === activePlaceIdx ||
                      (activePlaceIdx >= places.length && idx === 0);
                    const w = isActive ? ACTIVE_W : CARD_W;
                    const h = isActive ? ACTIVE_H : CARD_H;
                    return (
                      <button
                        key={`place-${idx}`}
                        data-testid={`card-place-${place.id}-${idx}`}
                        onClick={() => setGalleryPlace(place)}
                        style={{
                          width: `${w}px`,
                          height: `${h}px`,
                          flexShrink: 0,
                          borderRadius: "14px",
                          overflow: "hidden",
                          position: "relative",
                          cursor: "pointer",
                          opacity: isActive ? 1 : 0.55,
                          transition: "width 0.45s cubic-bezier(0.4,0,0.2,1), height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease",
                          border: "none",
                          padding: 0,
                        }}
                      >
                        <img
                          src={place.img}
                          alt={place.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.05) 55%)" }} />
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px" }}>
                          <p style={{ color: "#fff", fontSize: "0.72rem", fontWeight: 700, lineHeight: 1.2 }}>
                            {place.name}
                          </p>
                          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.62rem", marginTop: "2px", lineHeight: 1.2 }}>
                            {place.tagline}
                          </p>
                          <div className="flex items-center gap-1 mt-1.5" style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.58rem" }}>
                            <span>Tap to view more</span>
                            <ChevronRight size={9} />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5 py-2">
          {Array.from({ length: Math.min(totalItems, 5) }).map((_, i) => {
            const safeIdx = inProvinceView ? safeProvinceIdx : activePlaceIdx % places.length;
            const isActive = i === safeIdx % 5;
            return (
              <div
                key={i}
                style={{
                  width: isActive ? "18px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: isActive ? "#3a7d44" : "rgba(255,255,255,0.3)",
                  transition: "all 0.3s ease",
                }}
              />
            );
          })}
        </div>
      </div>

      <BottomNav />

      <GalleryModal place={galleryPlace} onClose={() => setGalleryPlace(null)} />
    </div>
  );
}
