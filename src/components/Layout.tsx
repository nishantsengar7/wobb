import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-light)",
          padding: "var(--space-lg) var(--space-md)",
          boxShadow: "var(--shadow-sm)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 var(--space-md)",
          }}
        >
          <Link
            to="/"
            style={{
              display: "inline-block",
              fontSize: "var(--fs-xl)",
              fontWeight: "var(--fw-semibold)",
              color: "var(--primary)",
              textDecoration: "none",
              marginBottom: title ? "var(--space-sm)" : 0,
              transition: "color var(--transition-fast)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--primary-dark)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--primary)")
            }
          >
            ✨ Influencer Search
          </Link>
          {title && (
            <h1
              style={{
                fontSize: "var(--fs-2xl)",
                fontWeight: "var(--fw-bold)",
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              {title}
            </h1>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
          padding: "var(--space-xl) var(--space-md)",
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border-light)",
          padding: "var(--space-lg) var(--space-md)",
          marginTop: "var(--space-2xl)",
          textAlign: "center",
          fontSize: "var(--fs-sm)",
          color: "var(--text-tertiary)",
        }}
      >
        <p style={{ margin: 0 }}>
          © 2026 Influencer Search. Built with React + TypeScript + Tailwind.
        </p>
      </footer>
    </div>
  );
}

