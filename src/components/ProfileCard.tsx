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
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M followers";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K followers";
  return count + " followers";
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
      className="flex items-center gap-3 p-3 border border-gray-300 mb-2 cursor-pointer hover:bg-gray-50 w-[700px]"
      data-search={searchQuery}
      aria-label={`View profile for ${profile.fullname}`}
    >
      <img
        src={profile.picture}
        alt={`${profile.fullname} profile picture`}
        className="w-12 h-12 rounded-full"
      />
      <div className="text-left flex-1">
        <div className="font-bold">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-600">{profile.fullname}</div>
        <div className="text-sm">{formatFollowersLocal(profile.followers)}</div>
      </div>
      {/* TODO: candidates must implement Add to List feature */}
      {/* TODO: candidates must implement Add to List feature */}
      <button
        disabled
        className="px-3 py-1 bg-gray-300 text-gray-500 text-sm rounded cursor-not-allowed"
        onClick={(e) => e.stopPropagation()}
      >
        Add to List
      </button>
    </div>
  );
}
