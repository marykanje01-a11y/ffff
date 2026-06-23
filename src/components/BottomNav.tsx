import { Home, Compass, MapPin, Briefcase, User } from "lucide-react";
import { Link, useLocation } from "wouter";

const TABS = [
  { path: "/", label: "Home", Icon: Home },
  { path: "/explore", label: "Explore", Icon: Compass },
  { path: "/destinations", label: "Destinations", Icon: MapPin },
  { path: "/bookings", label: "Bookings", Icon: Briefcase },
  { path: "/profile", label: "Profile", Icon: User },
];

export default function BottomNav() {
  const [location] = useLocation();

  return (
    <nav
      className="glass-nav fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2"
      style={{ maxWidth: "430px", margin: "0 auto", height: "64px" }}
    >
      {TABS.map(({ path, label, Icon }) => {
        const isActive = location === path || (path !== "/" && location.startsWith(path));
        return (
          <Link key={path} href={path}>
            <button
              data-testid={`nav-${label.toLowerCase()}`}
              className="flex flex-col items-center gap-0.5 px-3 py-1 transition-all duration-200"
              style={{ minWidth: "52px" }}
            >
              <Icon
                size={20}
                style={{ color: isActive ? "#3a7d44" : "rgba(255,255,255,0.55)" }}
              />
              <span
                style={{
                  fontSize: "0.65rem",
                  color: isActive ? "#3a7d44" : "rgba(255,255,255,0.55)",
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: "0.01em",
                }}
              >
                {label}
              </span>
            </button>
          </Link>
        );
      })}
    </nav>
  );
}
