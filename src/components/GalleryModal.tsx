import { useState, useEffect, useRef } from "react";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Place {
  id: string;
  name: string;
  tagline: string;
  img: string;
}

interface GalleryModalProps {
  place: Place | null;
  onClose: () => void;
}

export default function GalleryModal({ place, onClose }: GalleryModalProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragDirection, setDragDirection] = useState(0); // -1 = left, 1 = right
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isDragging = useRef(false);

  const images = place ? [
    place.img.split("?")[0] + "?w=800&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
  ] : [];

  useEffect(() => {
    setImgIndex(0);
    setPaused(false);
  }, [place]);

  useEffect(() => {
    if (!place || paused) return;
    timerRef.current = setInterval(() => {
      setDragDirection(-1);
      setImgIndex(prev => (prev + 1) % images.length);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [place, paused, images.length]);

  const pauseTemporarily = () => {
    setPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => setPaused(false), 8000);
  };

  const prev = () => {
    pauseTemporarily();
    setDragDirection(1);
    setImgIndex(i => (i - 1 + images.length) % images.length);
  };

  const next = () => {
    pauseTemporarily();
    setDragDirection(-1);
    setImgIndex(i => (i + 1) % images.length);
  };

  // ── Touch/swipe handlers on the image area ──────────────────────────────
  const handleImgTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };

  const handleImgTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 8) isDragging.current = true;
    // Prevent vertical scroll when swiping horizontally
    if (isDragging.current && Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
    }
  };

  const handleImgTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
    }
  };

  // Slide animation variants — direction-aware
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir < 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence>
      {place && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ maxWidth: "430px", margin: "0 auto" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 320 }}
            className="relative w-full h-full flex flex-col"
            style={{ background: "#000", overflow: "hidden" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              data-testid="button-gallery-close"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 glass-card flex items-center justify-center"
              style={{ width: "36px", height: "36px", borderRadius: "50%" }}
            >
              <X size={18} className="text-white" />
            </button>

            {/* ── Image slider with swipe ── */}
            <div
              className="flex-1 relative overflow-hidden"
              onTouchStart={handleImgTouchStart}
              onTouchMove={handleImgTouchMove}
              onTouchEnd={handleImgTouchEnd}
              style={{ touchAction: "pan-y" }}
            >
              <AnimatePresence initial={false} custom={dragDirection} mode="wait">
                <motion.img
                  key={imgIndex}
                  src={images[imgIndex]}
                  alt={place.name}
                  custom={dragDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.32, ease: "easeInOut" }}
                  className="w-full h-full object-cover"
                  style={{ position: "absolute", inset: 0 }}
                  draggable={false}
                />
              </AnimatePresence>

              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 50%)",
                  pointerEvents: "none",
                  zIndex: 5,
                }}
              />

              {/* Arrow buttons */}
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 glass-card flex items-center justify-center"
                style={{ width: "36px", height: "36px", borderRadius: "50%", zIndex: 10 }}
              >
                <ChevronLeft size={18} className="text-white" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 glass-card flex items-center justify-center"
                style={{ width: "36px", height: "36px", borderRadius: "50%", zIndex: 10 }}
              >
                <ChevronRight size={18} className="text-white" />
              </button>

              {/* Image counter */}
              <div
                className="absolute top-4 left-4"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  borderRadius: "10px",
                  padding: "3px 10px",
                  zIndex: 10,
                }}
              >
                <span style={{ color: "#fff", fontSize: "0.7rem" }}>
                  {imgIndex + 1} / {images.length}
                </span>
              </div>

              {/* Place name overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5" style={{ zIndex: 10 }}>
                <h2 className="text-white font-bold text-xl">{place.name}</h2>
                <p className="text-white/70 text-sm mt-1">{place.tagline}</p>
              </div>
            </div>

            {/* Dots */}
            <div
              className="flex items-center justify-center gap-1.5 py-3"
              style={{ background: "#0a0a0a" }}
            >
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDragDirection(i > imgIndex ? -1 : 1);
                    setImgIndex(i);
                    pauseTemporarily();
                  }}
                  style={{
                    width: i === imgIndex ? "20px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    background: i === imgIndex ? "#3a7d44" : "rgba(255,255,255,0.3)",
                    transition: "all 0.3s ease",
                    border: "none",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            {/* Video placeholder */}
            <div
              className="glass-card mx-3 mb-3 flex items-center gap-3 cursor-pointer"
              style={{ padding: "12px 16px" }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(58,125,68,0.2)",
                  border: "1.5px solid rgba(58,125,68,0.6)",
                }}
              >
                <Play size={18} style={{ color: "#3a7d44", marginLeft: "2px" }} />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{place.name} — Experience Video</p>
                <p className="text-white/50 text-xs mt-0.5">Video coming soon</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
