interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <span
      style={{
        display: "inline-block",
        marginLeft: "var(--space-xs)",
        padding: "0 var(--space-xs)",
        backgroundColor: "var(--status-success)",
        color: "var(--text-inverse)",
        borderRadius: "var(--rounded-full)",
        fontSize: "var(--fs-xs)",
        fontWeight: "var(--fw-semibold)",
        lineHeight: "1.4",
      }}
      title="Verified creator"
    >
      ✓
    </span>
  );
}

