import { Bell } from "lucide-react";

export default function Header() {
  return (
    <div
      className="glass-header fixed top-0 left-0 right-0 z-50 px-4 pt-3 pb-2"
      style={{ maxWidth: "430px", margin: "0 auto" }}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <span
              className="logo-font text-white leading-none"
              style={{ fontSize: "2.1rem", lineHeight: 1.1 }}
            >
              Zambia
            </span>
            <span
              className="text-white font-light tracking-wide"
              style={{ fontSize: "0.95rem" }}
            >
              Kuchalo
            </span>
          </div>
          {/* Zambia flag colour stripes */}
          <div className="flex gap-1 mt-1" style={{ paddingLeft: "2px" }}>
            <span style={{ display: "block", height: "3px", width: "40px", borderRadius: "2px", background: "#3a7d44" }} />
            <span style={{ display: "block", height: "3px", width: "32px", borderRadius: "2px", background: "#c8102e" }} />
            <span style={{ display: "block", height: "3px", width: "24px", borderRadius: "2px", background: "#ef8c00" }} />
            <span style={{ display: "block", height: "3px", width: "18px", borderRadius: "2px", background: "#1a1a1a" }} />
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <button
            data-testid="button-notification"
            className="glass-card flex items-center justify-center"
            style={{ width: "38px", height: "38px", borderRadius: "50%" }}
          >
            <Bell size={16} className="text-white" />
          </button>
          <span
            style={{
              position: "absolute",
              top: "-1px",
              right: "-1px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#3a7d44",
              border: "1.5px solid #000",
            }}
          />
        </div>
      </div>
    </div>
  );
}
