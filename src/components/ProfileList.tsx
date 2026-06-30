import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
  onProfileClick: (username: string) => void;
}

export function ProfileList({
  profiles,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "var(--space-3xl) var(--space-md)",
          color: "var(--text-secondary)",
        }}
      >
        <p style={{ fontSize: "var(--fs-lg)", marginBottom: "var(--space-md)" }}>
          😕 No creators found
        </p>
        <p style={{ fontSize: "var(--fs-base)", margin: 0 }}>
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "var(--space-md)",
      }}
    >
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          searchQuery={searchQuery}
          onProfileClick={onProfileClick}
        />
      ))}
    </div>
  );
}

