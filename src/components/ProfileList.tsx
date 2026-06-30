import type { UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
}

export function ProfileList({ profiles }: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-16) var(--space-6)",
        textAlign: "center",
        border: "1px dashed var(--border)",
        borderRadius: "var(--rounded-xl)",
        backgroundColor: "var(--bg-surface)",
        gap: "var(--space-3)",
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "var(--space-2)" }}>🔍</div>
        <h3 style={{ color: "var(--text-primary)", fontWeight: "var(--fw-semibold)" }}>No creators found</h3>
        <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)", maxWidth: "320px" }}>
          Try a different search term, or switch to another platform to explore more creators.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
    }}>
      {profiles.map((profile) => (
        <ProfileCard key={profile.user_id} profile={profile} />
      ))}
    </div>
  );
}
