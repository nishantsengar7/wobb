import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import {
  type SelectedProfile,
  useSelectedProfilesStore,
} from "@/store/selectedProfilesStore";

interface AddToListButtonProps {
  profile: SelectedProfile;
  compact?: boolean;
}

export function AddToListButton({ profile, compact = false }: AddToListButtonProps) {
  const isSelected = useSelectedProfilesStore((state) =>
    state.items.some((item) => item.id === profile.id)
  );
  const toggleProfile = useSelectedProfilesStore((state) => state.toggleProfile);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!feedback) return;

    const timeoutId = window.setTimeout(() => setFeedback(""), 1200);

    return () => window.clearTimeout(timeoutId);
  }, [feedback]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleProfile(profile);
    setFeedback(isSelected ? "Removed from list" : "Added to list");
  };

  const label = isSelected ? "Remove" : "Add";
  const ariaLabel = isSelected
    ? `Remove ${profile.fullName} from list`
    : `Add ${profile.fullName} to list`;

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: compact ? "flex-end" : "flex-start",
        gap: "var(--space-xs)",
      }}
    >
      <button
        type="button"
        aria-label={ariaLabel}
        aria-pressed={isSelected}
        onClick={handleClick}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-xs)",
          minWidth: compact ? "84px" : "136px",
          padding: compact
            ? "var(--space-xs) var(--space-sm)"
            : "var(--space-sm) var(--space-md)",
          borderRadius: "var(--rounded-md)",
          border: isSelected
            ? "1px solid var(--status-success)"
            : "1px solid var(--primary)",
          backgroundColor: isSelected ? "var(--bg-secondary)" : "var(--primary)",
          color: isSelected ? "var(--status-success)" : "var(--text-inverse)",
          cursor: "pointer",
          fontSize: compact ? "var(--fs-xs)" : "var(--fs-sm)",
          fontWeight: "var(--fw-semibold)",
          boxShadow: isSelected ? "none" : "var(--shadow-sm)",
        }}
      >
        <span aria-hidden="true">{isSelected ? "✓" : "+"}</span>
        {label}
      </button>
      <span
        aria-live="polite"
        style={{
          minHeight: compact ? "14px" : "18px",
          fontSize: "var(--fs-xs)",
          color: isSelected ? "var(--status-success)" : "var(--text-tertiary)",
        }}
      >
        {feedback}
      </span>
    </div>
  );
}
