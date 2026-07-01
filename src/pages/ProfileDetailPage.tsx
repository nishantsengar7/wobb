import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { AddToListButton } from "@/components/ui/AddToListButton";
import { Avatar } from "@/components/ui/Avatar";
import { Layout } from "@/components/layout/Layout";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { useSearchStore } from "@/store/searchStore";
import { createSelectedProfile } from "@/store/selectedProfilesStore";
import type { FullUserProfile, Platform, ProfileDetailResponse } from "@/types";
import { findProfileSummaryByUsername } from "@/utils/dataHelpers";
import { resolveDisplayName } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";

function formatNum(count: number) {
  if (count >= 1_000_000_000) return (count / 1_000_000_000).toFixed(2) + "B";
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(2) + "M";
  if (count >= 1_000) return (count / 1_000).toFixed(1) + "K";
  return String(count);
}

function getPlatformParam(value: string | null): Platform | null {
  if (value === "instagram" || value === "youtube" || value === "tiktok") return value;
  return null;
}

function StatCard({ label, value, icon }: { label: string; value: string; icon?: string }) {
  return (
    <div style={{
      backgroundColor: "var(--bg-surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--rounded-lg)",
      padding: "var(--space-5)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      transition: "border-color var(--transition-fast)",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
    >
      {icon && <span style={{ fontSize: "1.4rem" }}>{icon}</span>}
      <p style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: "var(--fw-semibold)" }}>
        {label}
      </p>
      <p style={{ fontSize: "var(--fs-xl)", fontWeight: "var(--fw-bold)", color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
        {value}
      </p>
    </div>
  );
}

const PLATFORM_BADGE: Record<Platform, { label: string; style: React.CSSProperties }> = {
  instagram: { label: "Instagram", style: { background: "linear-gradient(135deg, #F77737, #E1306C)", color: "#fff" } },
  youtube:   { label: "YouTube",   style: { background: "#FF0000", color: "#fff" } },
  tiktok:    { label: "TikTok",    style: { background: "var(--bg-elevated)", color: "var(--platform-tiktok)", border: "1px solid var(--platform-tiktok)" } },
};

function LoadingState() {
  return (
    <Layout>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>
      <div style={{ width: "80px", height: "16px", backgroundColor: "var(--bg-elevated)", borderRadius: "var(--rounded-sm)", marginBottom: "var(--space-8)", animation: "pulse 1.5s ease-in-out infinite" }} />
      <div style={{
        display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-8)",
        backgroundColor: "var(--bg-surface)", borderRadius: "var(--rounded-xl)",
        padding: "var(--space-8)", border: "1px solid var(--border)", marginBottom: "var(--space-8)",
      }}>
        <div style={{ width: "120px", height: "120px", borderRadius: "var(--rounded-full)", backgroundColor: "var(--bg-elevated)", animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <div style={{ width: "220px", height: "28px", backgroundColor: "var(--bg-elevated)", borderRadius: "var(--rounded-sm)", animation: "pulse 1.5s ease-in-out infinite" }} />
          <div style={{ width: "160px", height: "18px", backgroundColor: "var(--bg-elevated)", borderRadius: "var(--rounded-sm)", animation: "pulse 1.5s ease-in-out infinite" }} />
          <div style={{ width: "100px", height: "14px", backgroundColor: "var(--bg-elevated)", borderRadius: "var(--rounded-sm)", animation: "pulse 1.5s ease-in-out infinite" }} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: "var(--space-4)" }}>
        {[1,2,3,4].map((i) => (
          <div key={i} style={{ height: "100px", backgroundColor: "var(--bg-surface)", borderRadius: "var(--rounded-lg)", border: "1px solid var(--border)", animation: "pulse 1.5s ease-in-out infinite" }} />
        ))}
      </div>
    </Layout>
  );
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const currentSearchPlatform = useSearchStore((state) => state.platform);
  const platform = getPlatformParam(searchParams.get("platform")) ?? currentSearchPlatform;

  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!username) { setLoaded(true); return; }
    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  // Primary source: dedicated profile JSON
  const fullUser: FullUserProfile | undefined = profileData?.data?.user_profile;

  // Fallback: search summary data (covers profiles without a dedicated JSON)
  const fallbackResult = useMemo(() => {
    if (!loaded || fullUser || !username) return null;
    return findProfileSummaryByUsername(username, platform);
  }, [loaded, fullUser, username, platform]);

  const user = fullUser ?? (fallbackResult?.profile as FullUserProfile | undefined);
  const effectivePlatform = fallbackResult?.platform ?? platform;

  const selectedProfile = useMemo(
    () => (user ? createSelectedProfile(user, effectivePlatform) : null),
    [effectivePlatform, user]
  );

  const backLink = (
    <Link
      to="/"
      style={{
        display: "inline-flex", alignItems: "center", gap: "var(--space-2)",
        color: "var(--text-secondary)", textDecoration: "none",
        fontSize: "var(--fs-sm)", fontWeight: "var(--fw-medium)",
        marginBottom: "var(--space-8)",
        transition: "color var(--transition-fast)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
    >
      ← Back to search
    </Link>
  );

  if (!username) {
    return (
      <Layout>
        {backLink}
        <p style={{ color: "var(--status-error)" }}>Invalid profile URL.</p>
      </Layout>
    );
  }

  if (!loaded) return <LoadingState />;

  if (!user || !selectedProfile) {
    return (
      <Layout>
        {backLink}
        <div style={{ textAlign: "center", padding: "var(--space-16)" }}>
          <p style={{ fontSize: "2rem", marginBottom: "var(--space-4)" }}>😕</p>
          <p style={{ color: "var(--status-error)", fontWeight: "var(--fw-semibold)" }}>
            Could not load @{username}
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--fs-sm)", marginTop: "var(--space-2)" }}>
            Profile data may not be available for this creator.
          </p>
        </div>
      </Layout>
    );
  }

  const badge = PLATFORM_BADGE[effectivePlatform];
  const displayUsername = resolveDisplayName(user);

  return (
    <Layout>
      {backLink}

      {/* ── Hero card ── */}
      <div style={{
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--rounded-xl)",
        padding: "var(--space-8)",
        marginBottom: "var(--space-8)",
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "var(--space-8)",
        alignItems: "start",
        background: "linear-gradient(135deg, rgba(124,58,237,0.06) 0%, var(--bg-surface) 60%)",
      }}>
        {/* Avatar with gradient ring + fallback */}
        <Avatar
          src={user.picture}
          alt={displayUsername}
          size={120}
          withRing
        />

        {/* Info */}
        <div>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
            <h1 style={{ fontSize: "var(--fs-2xl)", letterSpacing: "-0.02em" }}>
              @{displayUsername}
            </h1>
            <VerifiedBadge verified={user.is_verified} />
            <span style={{
              ...badge.style,
              fontSize: "var(--fs-xs)", fontWeight: "var(--fw-semibold)",
              padding: "3px var(--space-3)", borderRadius: "var(--rounded-full)",
              textTransform: "uppercase", letterSpacing: "0.04em",
            }}>
              {badge.label}
            </span>
          </div>

          <p style={{ fontSize: "var(--fs-lg)", color: "var(--text-secondary)", marginBottom: "var(--space-3)", fontWeight: "var(--fw-medium)" }}>
            {user.fullname}
          </p>

          {user.description && (
            <p style={{ fontSize: "var(--fs-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-relaxed)", marginBottom: "var(--space-6)", maxWidth: "600px" }}>
              {user.description}
            </p>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
            {user.url && (
              <a
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "var(--space-2)",
                  padding: "var(--space-2) var(--space-4)",
                  background: "var(--gradient-brand)",
                  color: "#fff", textDecoration: "none",
                  borderRadius: "var(--rounded-md)",
                  fontSize: "var(--fs-sm)", fontWeight: "var(--fw-semibold)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                View on {badge.label} →
              </a>
            )}
            <AddToListButton profile={selectedProfile} />
          </div>
        </div>
      </div>

      {/* ── Stats grid ── */}
      <section style={{ marginBottom: "var(--space-8)" }}>
        <h2 style={{ fontWeight: "var(--fw-semibold)", marginBottom: "var(--space-5)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "var(--fs-xs)" }}>
          Performance Metrics
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "var(--space-4)" }}>
          <StatCard label="Followers" value={formatNum(user.followers)} icon="👥" />
          {user.engagement_rate !== undefined && (
            <StatCard label="Engagement Rate" value={`${(user.engagement_rate * 100).toFixed(2)}%`} icon="📈" />
          )}
          {user.posts_count !== undefined && (
            <StatCard label="Total Posts" value={user.posts_count.toLocaleString()} icon="📸" />
          )}
          {user.avg_likes !== undefined && (
            <StatCard label="Avg Likes" value={formatNum(user.avg_likes)} icon="❤️" />
          )}
          {user.avg_comments !== undefined && (
            <StatCard label="Avg Comments" value={user.avg_comments.toString()} icon="💬" />
          )}
          {user.avg_views !== undefined && user.avg_views > 0 && (
            <StatCard label="Avg Views" value={formatNum(user.avg_views)} icon="👁️" />
          )}
          {user.engagements !== undefined && (
            <StatCard label="Total Engagements" value={formatNum(user.engagements)} icon="🔥" />
          )}
        </div>
      </section>

      {/* ── Profile details ── */}
      {(user.gender || user.age_group || user.is_business !== undefined) && (
        <section>
          <h2 style={{ fontWeight: "var(--fw-semibold)", marginBottom: "var(--space-5)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "var(--fs-xs)" }}>
            Profile Details
          </h2>
          <div style={{
            backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)",
            borderRadius: "var(--rounded-lg)", padding: "var(--space-6)",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "var(--space-6)",
          }}>
            {user.gender && (
              <div>
                <p style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "var(--space-1)" }}>Gender</p>
                <p style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>{user.gender}</p>
              </div>
            )}
            {user.age_group && (
              <div>
                <p style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "var(--space-1)" }}>Age Group</p>
                <p style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>{user.age_group}</p>
              </div>
            )}
            {user.is_business !== undefined && (
              <div>
                <p style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "var(--space-1)" }}>Account Type</p>
                <p style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>{user.is_business ? "Business" : "Personal"}</p>
              </div>
            )}
          </div>
        </section>
      )}
    </Layout>
  );
}
