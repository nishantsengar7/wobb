import { useState } from "react";

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  /** Show the gradient ring around the avatar */
  withRing?: boolean;
}

function getInitials(name: string): string {
  return name
    .replace(/^@/, "")
    .split(/[\s_\-.]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

// Stable gradient based on name string so same creator always gets same color
function getGradient(name: string): string {
  const gradients = [
    "linear-gradient(135deg, #7C3AED, #EC4899)",
    "linear-gradient(135deg, #3B82F6, #06B6D4)",
    "linear-gradient(135deg, #10B981, #3B82F6)",
    "linear-gradient(135deg, #F59E0B, #EF4444)",
    "linear-gradient(135deg, #8B5CF6, #3B82F6)",
    "linear-gradient(135deg, #EC4899, #F59E0B)",
    "linear-gradient(135deg, #06B6D4, #10B981)",
    "linear-gradient(135deg, #EF4444, #8B5CF6)",
  ];
  const idx =
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    gradients.length;
  return gradients[idx];
}

export function Avatar({ src, alt, size = 48, withRing = false }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const initials = getInitials(alt);
  const gradient = getGradient(alt);

  const imgSize = withRing ? size - 4 : size; // account for ring padding
  const borderPx = withRing ? "2px solid var(--bg-surface)" : undefined;

  const fallback = (
    <div
      aria-label={alt}
      style={{
        width: `${imgSize}px`,
        height: `${imgSize}px`,
        borderRadius: "var(--rounded-full)",
        background: gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: `${Math.round(imgSize * 0.35)}px`,
        fontWeight: "var(--fw-bold)",
        color: "#fff",
        flexShrink: 0,
        border: borderPx,
        letterSpacing: "-0.02em",
      }}
    >
      {initials || "?"}
    </div>
  );

  const image = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width={imgSize}
      height={imgSize}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      style={{
        width: `${imgSize}px`,
        height: `${imgSize}px`,
        borderRadius: "var(--rounded-full)",
        objectFit: "cover",
        flexShrink: 0,
        border: borderPx,
        display: "block",
      }}
    />
  );

  const inner = failed ? fallback : image;

  if (!withRing) return inner;

  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "var(--rounded-full)",
      padding: "2px",
      background: "var(--gradient-brand)",
      flexShrink: 0,
    }}>
      {inner}
    </div>
  );
}
