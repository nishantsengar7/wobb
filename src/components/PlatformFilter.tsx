import { useSearchStore } from "@/store/searchStore";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

export function PlatformFilter() {
  const selected = useSearchStore((state) => state.platform);
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setPlatform = useSearchStore((state) => state.setPlatform);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  return (
    <div style={{ marginBottom: "var(--space-2xl)" }}>
      {/* Platform Tabs */}
      <div
        style={{
          display: "flex",
          gap: "var(--space-md)",
          marginBottom: "var(--space-2xl)",
          borderBottom: "2px solid var(--border-light)",
          paddingBottom: "var(--space-md)",
        }}
      >
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPlatform(p)}
            style={{
              padding: "var(--space-sm) var(--space-md)",
              fontSize: "var(--fs-base)",
              fontWeight:
                selected === p ? "var(--fw-semibold)" : "var(--fw-normal)",
              color: selected === p ? "var(--primary)" : "var(--text-secondary)",
              background: "none",
              border: "none",
              borderBottom:
                selected === p ? "2px solid var(--primary)" : "2px solid transparent",
              cursor: "pointer",
              transition: "all var(--transition-fast)",
              position: "relative",
              bottom: "calc(-1 * var(--space-md))",
            }}
            onMouseEnter={(e) => {
              if (selected !== p) {
                e.currentTarget.style.color = "var(--text-primary)";
              }
            }}
            onMouseLeave={(e) => {
              if (selected !== p) {
                e.currentTarget.style.color = "var(--text-secondary)";
              }
            }}
          >
            {getPlatformLabel(p)}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div>
        <label
          htmlFor="search-input"
          style={{
            display: "block",
            marginBottom: "var(--space-sm)",
            fontSize: "var(--fs-sm)",
            fontWeight: "var(--fw-medium)",
            color: "var(--text-secondary)",
          }}
        >
          Search Creators
        </label>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "var(--space-md)",
              color: "var(--text-tertiary)",
              fontSize: "1.25rem",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by username or name..."
            aria-label="Search influencers by username or name"
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "var(--space-md) var(--space-md) var(--space-md) var(--space-2xl)",
              fontSize: "var(--fs-base)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--rounded-md)",
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-primary)",
              transition: "all var(--transition-fast)",
              boxShadow: "var(--shadow-sm)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--primary)";
              e.currentTarget.style.boxShadow = `var(--shadow-md), 0 0 0 3px rgba(79, 70, 229, 0.1)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--border-light)";
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
            }}
          />
        </div>
      </div>
    </div>
  );
}
