import { Camera, ChevronRight, LogOut, User, Briefcase, Bookmark, Heart, Clock, Bell, Globe, Lock, HelpCircle, Info, UserPlus, Settings, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const SETTINGS_ITEMS = [
  { icon: User, label: "Personal Information" },
  { icon: Briefcase, label: "My Bookings" },
  { icon: Bookmark, label: "Saved Destinations" },
  { icon: Heart, label: "Favorites" },
  { icon: Clock, label: "Travel History" },
  { icon: Bell, label: "Notifications" },
  { icon: Globe, label: "Language" },
  { icon: Lock, label: "Security & Privacy" },
  { icon: HelpCircle, label: "Help & Support" },
  { icon: Info, label: "About Zambia Kuchalo" },
];

const ACCOUNT_ITEMS = [
  { icon: UserPlus, label: "Create Contributor Account" },
  { icon: Settings, label: "Become a Contributor" },
  { icon: BookOpen, label: "Contributor Guidelines" },
];

export default function Profile() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: "100%", height: "100vh", maxWidth: "430px", margin: "0 auto" }}
    >
      {/* Background - blurred landscape */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          transform: "scale(1.05)",
          zIndex: 0,
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.72)", zIndex: 1 }} />

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
        {/* Profile card */}
        <div className="px-4 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card flex items-center gap-4"
            style={{ padding: "16px" }}
          >
            <div style={{ position: "relative" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(58,125,68,0.7)" }}>
                <img
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200"
                  alt="John Banda"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <button
                data-testid="button-change-avatar"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "#3a7d44",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Camera size={12} color="#fff" />
              </button>
            </div>
            <div className="flex-1">
              <p style={{ color: "#fff", fontSize: "1rem", fontWeight: 700 }}>John Banda</p>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.72rem" }}>john@email.com</p>
            </div>
            <button
              data-testid="button-edit-profile"
              className="glass-card flex items-center gap-1.5"
              style={{ padding: "7px 12px", borderRadius: "10px", fontSize: "0.7rem", color: "rgba(255,255,255,0.8)" }}
            >
              <Settings size={12} />
              Edit Profile
            </button>
          </motion.div>
        </div>

        {/* Settings section */}
        <div className="px-4 mb-3">
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Settings
          </p>
          <div className="glass-card overflow-hidden" style={{ borderRadius: "16px" }}>
            {SETTINGS_ITEMS.map(({ icon: Icon, label }, i) => (
              <motion.button
                key={label}
                data-testid={`setting-${label.toLowerCase().replace(/\s+/g, "-")}`}
                whileTap={{ scale: 0.99 }}
                className="flex items-center justify-between w-full"
                style={{
                  padding: "13px 16px",
                  background: "none",
                  border: "none",
                  borderBottom: i < SETTINGS_ITEMS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  cursor: "pointer",
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} style={{ color: "#3a7d44" }} />
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.8rem" }}>{label}</span>
                </div>
                <ChevronRight size={15} style={{ color: "rgba(255,255,255,0.3)" }} />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Account section */}
        <div className="px-4 mb-3">
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Account
          </p>
          <div className="glass-card overflow-hidden" style={{ borderRadius: "16px" }}>
            {ACCOUNT_ITEMS.map(({ icon: Icon, label }, i) => (
              <motion.button
                key={label}
                data-testid={`account-${label.toLowerCase().replace(/\s+/g, "-")}`}
                whileTap={{ scale: 0.99 }}
                className="flex items-center justify-between w-full"
                style={{
                  padding: "13px 16px",
                  background: "none",
                  border: "none",
                  borderBottom: i < ACCOUNT_ITEMS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  cursor: "pointer",
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} style={{ color: "#3a7d44" }} />
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.8rem" }}>{label}</span>
                </div>
                <ChevronRight size={15} style={{ color: "rgba(255,255,255,0.3)" }} />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="px-4 mb-4">
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Danger Zone
          </p>
          <div
            className="glass-card overflow-hidden"
            style={{ borderRadius: "16px", border: "1px solid rgba(200,16,46,0.2)" }}
          >
            <motion.button
              data-testid="button-logout"
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between w-full"
              style={{
                padding: "14px 16px",
                background: "rgba(200,16,46,0.05)",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div className="flex items-center gap-3">
                <LogOut size={16} style={{ color: "#c8102e" }} />
                <span style={{ color: "#c8102e", fontSize: "0.8rem", fontWeight: 500 }}>Logout</span>
              </div>
              <ChevronRight size={15} style={{ color: "rgba(200,16,46,0.4)" }} />
            </motion.button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
