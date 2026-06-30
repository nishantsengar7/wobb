import { useSearchStore } from "@/store/searchStore";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

const PLATFORM_COLORS: Record<string, { active: string; icon: string }> = {
  instagram: { active: "linear-gradient(135deg, #F77737, #E1306C)", icon: "📸" },
  youtube:   { active: "#FF0000", icon: "▶" },
  tiktok:    { active: "var(--platform-tiktok)", icon: "♪" },
};

export function PlatformFilter() {
  const selected = useSearchStore((state) => state.platform);
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setPlatform = useSearchStore((state) => state.setPlatform);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  return (
    <div style={{ marginBottom: "var(--space-8)" }}>

      {/* Platform Tabs */}
      <div style={{
        display: "flex",
        gap: "var(--space-2)",
        marginBottom: "var(--space-6)",
        padding: "var(--space-1)",
        backgroundColor: "var(--bg-surface)",
        borderRadius: "var(--rounded-lg)",
        border: "1px solid var(--border)",
        width: "fit-content",
      }}>
        {PLATFORMS.map((p) => {
          const isActive = selected === p;
          const cfg = PLATFORM_COLORS[p];
          return (
            <button
              key={p}
              type="button"
              onClick={() => setPlatform(p)}
              aria-pressed={isActive}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-2)",
                padding: "var(--space-2) var(--space-4)",
                borderRadius: "var(--rounded-md)",
                border: "none",
                cursor: "pointer",
                fontSize: "var(--fs-sm)",
                fontWeight: isActive ? "var(--fw-semibold)" : "var(--fw-medium)",
                color: isActive ? "#fff" : "var(--text-secondary)",
                background: isActive ? cfg.active : "transparent",
                transition: "all var(--transition-base)",
                boxShadow: isActive ? "var(--shadow-md)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              <span aria-hidden="true">{cfg.icon}</span>
              {getPlatformLabel(p)}
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div style={{ position: "relative", maxWidth: "560px" }}>
        <span style={{
          position: "absolute",
          left: "var(--space-4)",
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--text-muted)",
          fontSize: "16px",
          pointerEvents: "none",
          zIndex: 1,
        }}>
          🔍
        </span>
        <input
          id="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search creators by name or @username..."
          aria-label="Search influencers by username or name"
          style={{
            width: "100%",
            padding: "var(--space-3) var(--space-4) var(--space-3) 48px",
            fontSize: "var(--fs-base)",
            backgroundColor: "var(--bg-surface)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "var(--rounded-lg)",
            outline: "none",
            transition: "all var(--transition-base)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--primary)";
            e.currentTarget.style.boxShadow = "var(--shadow-focus)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
            style={{
              position: "absolute",
              right: "var(--space-3)",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              fontSize: "16px",
              padding: "var(--space-1)",
              borderRadius: "var(--rounded-sm)",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
