interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <span
      title="Verified creator"
      aria-label="Verified creator"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "16px",
        height: "16px",
        backgroundColor: "var(--status-info)",
        borderRadius: "var(--rounded-full)",
        fontSize: "9px",
        fontWeight: "var(--fw-bold)",
        color: "#fff",
        flexShrink: 0,
      }}
    >
      ✓
    </span>
  );
}
