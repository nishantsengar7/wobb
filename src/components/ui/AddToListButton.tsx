import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { type SelectedProfile, useSelectedProfilesStore } from "@/store/selectedProfilesStore";

interface AddToListButtonProps {
  profile: SelectedProfile;
  compact?: boolean;
}

export function AddToListButton({ profile, compact = false }: AddToListButtonProps) {
  const isSelected = useSelectedProfilesStore((state) =>
    state.items.some((item) => item.id === profile.id)
  );
  const toggleProfile = useSelectedProfilesStore((state) => state.toggleProfile);
  const [justChanged, setJustChanged] = useState(false);

  useEffect(() => {
    if (!justChanged) return;
    const id = window.setTimeout(() => setJustChanged(false), 800);
    return () => window.clearTimeout(id);
  }, [justChanged]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleProfile(profile);
    setJustChanged(true);
  };

  const ariaLabel = isSelected
    ? `Remove ${profile.fullName} from list`
    : `Add ${profile.fullName} to list`;

  if (compact) {
    return (
      <button
        type="button"
        aria-label={ariaLabel}
        aria-pressed={isSelected}
        onClick={handleClick}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          borderRadius: "var(--rounded-md)",
          border: isSelected ? "1px solid var(--status-success)" : "1px solid var(--border)",
          backgroundColor: isSelected ? "var(--status-success-dim)" : "var(--bg-elevated)",
          color: isSelected ? "var(--status-success)" : "var(--text-secondary)",
          cursor: "pointer",
          fontSize: "15px",
          flexShrink: 0,
          transform: justChanged ? "scale(1.2)" : "scale(1)",
          transition: "all var(--transition-base)",
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.borderColor = "var(--primary)";
            e.currentTarget.style.backgroundColor = "var(--primary-dim)";
            e.currentTarget.style.color = "var(--primary)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.backgroundColor = "var(--bg-elevated)";
            e.currentTarget.style.color = "var(--text-secondary)";
          }
        }}
      >
        {isSelected ? "✓" : "+"}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={isSelected}
      onClick={handleClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: "var(--space-2) var(--space-4)",
        borderRadius: "var(--rounded-md)",
        border: isSelected ? "1px solid var(--status-success)" : "1px solid var(--border)",
        backgroundColor: isSelected ? "var(--status-success-dim)" : "var(--bg-elevated)",
        color: isSelected ? "var(--status-success)" : "var(--text-secondary)",
        cursor: "pointer",
        fontSize: "var(--fs-sm)",
        fontWeight: "var(--fw-semibold)",
        transform: justChanged ? "scale(1.04)" : "scale(1)",
        transition: "all var(--transition-base)",
        minWidth: "120px",
        justifyContent: "center",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = "var(--primary)";
          e.currentTarget.style.backgroundColor = "var(--primary-dim)";
          e.currentTarget.style.color = "var(--primary)";
          e.currentTarget.style.boxShadow = "var(--shadow-focus)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.backgroundColor = "var(--bg-elevated)";
          e.currentTarget.style.color = "var(--text-secondary)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      <span aria-hidden="true" style={{ fontSize: "13px" }}>{isSelected ? "✓" : "+"}</span>
      {isSelected ? "Added" : "Add to List"}
      <span aria-live="polite" className="sr-only">
        {justChanged ? (isSelected ? "Added to list" : "Removed from list") : ""}
      </span>
    </button>
  );
}
