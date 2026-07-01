export type Platform = "instagram" | "youtube" | "tiktok";

export interface UserProfileSummary {
  user_id: string;
  username?: string;       // May be absent on some YouTube accounts
  custom_name?: string;    // YouTube-specific alternative identifier
  handle?: string;         // YouTube handle (e.g. @MrBeast)
  url: string;
  picture: string;
  fullname: string;
  is_verified: boolean;
  followers: number;
  engagements?: number;
  engagement_rate?: number;
  avg_views?: number;
}

export interface SearchAccount {
  account: {
    user_profile: UserProfileSummary;
    audience_source: string;
  };
}

export interface SearchData {
  total: number;
  accounts: SearchAccount[];
}

export interface FullUserProfile extends UserProfileSummary {
  type?: string;
  description?: string;
  is_business?: boolean;
  posts_count?: number;
  avg_likes?: number;
  avg_comments?: number;
  avg_reels_plays?: number;
  gender?: string;
  age_group?: string;
}

export interface ProfileDetailResponse {
  cached?: boolean;
  data: {
    success: boolean;
    user_profile: FullUserProfile;
  };
}
