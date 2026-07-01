import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { KeyboardEvent } from "react";
import { AddToListButton } from "@/components/ui/AddToListButton";
import { Avatar } from "@/components/ui/Avatar";
import { useSearchStore } from "@/store/searchStore";
import { createSelectedProfile } from "@/store/selectedProfilesStore";
import type { Platform, UserProfileSummary } from "@/types";
import { resolveDisplayName, resolveUsername } from "@/utils/formatters";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";

interface ProfileCardProps {
  profile: UserProfileSummary;
}

function formatFollowers(count: number) {
  if (count >= 1_000_000_000) return (count / 1_000_000_000).toFixed(1) + "B";
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + "M";
  if (count >= 1_000) return (count / 1_000).toFixed(0) + "K";
  return count.toString();
}

function PlatformBadge({ platform }: { platform: Platform }) {
  const configs = {
    instagram: {
      label: "Instagram",
      style: {
        background: "linear-gradient(135deg, var(--platform-instagram-from), var(--platform-instagram-to))",
        color: "#fff",
      },
    },
    youtube: {
      label: "YouTube",
      style: { background: "var(--platform-youtube)", color: "#fff" },
    },
    tiktok: {
      label: "TikTok",
      style: {
        background: "var(--bg-elevated)",
        color: "var(--platform-tiktok)",
        border: "1px solid var(--platform-tiktok)",
      },
    },
  };
  const cfg = configs[platform];
  return (
    <span style={{
      ...cfg.style,
      fontSize: "var(--fs-xs)",
      fontWeight: "var(--fw-semibold)",
      padding: "2px var(--space-2)",
      borderRadius: "var(--rounded-full)",
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      flexShrink: 0,
    }}>
      {cfg.label}
    </span>
  );
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const navigate = useNavigate();
  const platform = useSearchStore((state) => state.platform);
  const recordProfileClick = useSearchStore((state) => state.recordProfileClick);
  const selectedProfile = useMemo(
    () => createSelectedProfile(profile, platform),
    [platform, profile]
  );

  const effectiveUsername = resolveUsername(profile);
  const displayHandle = resolveDisplayName(profile);

  const handleClick = () => {
    recordProfileClick(effectiveUsername);
    navigate(`/profile/${effectiveUsername}?platform=${platform}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      padding: "var(--space-4) var(--space-5)",
      backgroundColor: "var(--bg-surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--rounded-lg)",
      transition: "all var(--transition-base)",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget;
      el.style.borderColor = "var(--primary)";
      el.style.boxShadow = "var(--shadow-glow)";
      el.style.transform = "translateY(-2px)";
      el.style.background = `linear-gradient(135deg, rgba(124,58,237,0.06) 0%, var(--bg-surface) 100%)`;
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget;
      el.style.borderColor = "var(--border)";
      el.style.boxShadow = "none";
      el.style.transform = "translateY(0)";
      el.style.background = "var(--bg-surface)";
    }}
    >
      {/* Clickable area */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={`View profile for ${profile.fullname}`}
        style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", flex: 1, minWidth: 0 }}
      >
        {/* Avatar with gradient ring + fallback */}
        <Avatar
          src={profile.picture}
          alt={displayHandle}
          size={52}
          withRing
        />

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-1)", flexWrap: "wrap" }}>
            <span style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              @{displayHandle}
            </span>
            <VerifiedBadge verified={profile.is_verified} />
            <PlatformBadge platform={platform} />
          </div>
          <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)", marginBottom: "var(--space-1)" }}>
            {profile.fullname}
          </p>
          <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>
            {formatFollowers(profile.followers)} followers
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "var(--space-1)", flexShrink: 0 }}>
          {profile.engagement_rate !== undefined && (
            <span style={{
              fontSize: "var(--fs-xs)",
              fontWeight: "var(--fw-semibold)",
              color: "var(--accent)",
              backgroundColor: "var(--accent-dim)",
              padding: "3px var(--space-2)",
              borderRadius: "var(--rounded-full)",
              border: "1px solid rgba(236,72,153,0.2)",
            }}>
              {(profile.engagement_rate * 100).toFixed(1)}% eng
            </span>
          )}
          {profile.avg_views !== undefined && profile.avg_views > 0 && (
            <span style={{
              fontSize: "var(--fs-xs)",
              color: "var(--text-muted)",
            }}>
              {formatFollowers(profile.avg_views)} avg views
            </span>
          )}
        </div>
      </div>

      <AddToListButton profile={selectedProfile} compact />
    </div>
  );
}
