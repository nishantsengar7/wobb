import { useNavigate } from "react-router-dom";
import type { KeyboardEvent } from "react";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K";
  return count.toString();
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-search={searchQuery}
      aria-label={`View profile for ${profile.fullname}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-md)",
        padding: "var(--space-md)",
        marginBottom: "var(--space-md)",
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--rounded-md)",
        cursor: "pointer",
        transition: "all var(--transition-fast)",
        boxShadow: "var(--shadow-sm)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--primary-light)";
        el.style.boxShadow = "var(--shadow-md)";
        el.style.transform = "translateY(-2px)";
        el.style.backgroundColor = "var(--bg-primary)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--border-light)";
        el.style.boxShadow = "var(--shadow-sm)";
        el.style.transform = "translateY(0)";
        el.style.backgroundColor = "var(--bg-secondary)";
      }}
    >
      {/* Profile Image */}
      <img
        src={profile.picture}
        alt={`${profile.fullname} profile picture`}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "var(--rounded-full)",
          objectFit: "cover",
          border: "2px solid var(--border-light)",
          flexShrink: 0,
        }}
      />

      {/* Profile Info */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-sm)",
            marginBottom: "var(--space-xs)",
          }}
        >
          <span
            style={{
              fontSize: "var(--fs-base)",
              fontWeight: "var(--fw-semibold)",
              color: "var(--text-primary)",
            }}
          >
            @{profile.username}
          </span>
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <p
          style={{
            fontSize: "var(--fs-sm)",
            color: "var(--text-secondary)",
            margin: "0 0 var(--space-xs) 0",
          }}
        >
          {profile.fullname}
        </p>
        <p
          style={{
            fontSize: "var(--fs-sm)",
            color: "var(--text-tertiary)",
            margin: 0,
          }}
        >
          {formatFollowersLocal(profile.followers)} followers
        </p>
      </div>

      {/* Stats Preview */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "var(--space-xs)",
          fontSize: "var(--fs-sm)",
        }}
      >
        {profile.engagement_rate !== undefined && (
          <div
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--text-inverse)",
              padding: "var(--space-xs) var(--space-sm)",
              borderRadius: "var(--rounded-sm)",
              fontWeight: "var(--fw-medium)",
            }}
          >
            {(profile.engagement_rate * 100).toFixed(1)}% eng.
          </div>
        )}
      </div>

      {/* TODO: Add to List button - hidden for now */}
    </div>
  );
}
