import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelectedProfilesStore } from "@/store/selectedProfilesStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const selectedCount = useSelectedProfilesStore((state) => state.items.length);
  const location = useLocation();
  const isListPage = location.pathname === "/list";

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "var(--bg-base)" }}>

      {/* ── Header ── */}
      <header style={{
        backgroundColor: "var(--bg-surface)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}>
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 var(--space-6)",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
        }}>

          {/* Logo */}
          <Link
            to="/"
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "var(--space-2)" }}
          >
            <span style={{
              width: "28px",
              height: "28px",
              borderRadius: "var(--rounded-md)",
              background: "var(--gradient-brand)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              flexShrink: 0,
            }}>✦</span>
            <span style={{
              fontSize: "var(--fs-md)",
              fontWeight: "var(--fw-bold)",
              background: "var(--gradient-brand)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.01em",
            }}>Influur</span>
          </Link>

          {/* Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <Link
              to="/"
              style={{
                fontSize: "var(--fs-sm)",
                fontWeight: "var(--fw-medium)",
                color: location.pathname === "/" ? "var(--text-primary)" : "var(--text-secondary)",
                textDecoration: "none",
                padding: "var(--space-1) var(--space-3)",
                borderRadius: "var(--rounded-md)",
                backgroundColor: location.pathname === "/" ? "var(--bg-elevated)" : "transparent",
              }}
            >
              Search
            </Link>

            <Link
              to="/list"
              aria-label={`My list — ${selectedCount} selected`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-2)",
                fontSize: "var(--fs-sm)",
                fontWeight: "var(--fw-medium)",
                color: isListPage ? "var(--text-primary)" : "var(--text-secondary)",
                textDecoration: "none",
                padding: "var(--space-1) var(--space-3)",
                borderRadius: "var(--rounded-md)",
                backgroundColor: isListPage ? "var(--bg-elevated)" : "transparent",
              }}
            >
              My List
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "20px",
                height: "20px",
                padding: "0 var(--space-1)",
                borderRadius: "var(--rounded-full)",
                fontSize: "var(--fs-xs)",
                fontWeight: "var(--fw-bold)",
                background: selectedCount > 0 ? "var(--gradient-brand)" : "var(--bg-elevated)",
                color: selectedCount > 0 ? "#fff" : "var(--text-muted)",
                transition: "all var(--transition-base)",
              }}>
                {selectedCount}
              </span>
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Main ── */}
      <main style={{
        flex: 1,
        maxWidth: "1280px",
        width: "100%",
        margin: "0 auto",
        padding: "var(--space-8) var(--space-6)",
      }}>
        {title && (
          <h1 style={{ marginBottom: "var(--space-8)", fontSize: "var(--fs-2xl)", fontWeight: "var(--fw-extrabold)", letterSpacing: "-0.02em" }}>
            {title}
          </h1>
        )}
        {children}
      </main>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: "1px solid var(--border)",
        padding: "var(--space-6)",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>
          Built with React · TypeScript · Vite · Zustand
        </p>
      </footer>
    </div>
  );
}
