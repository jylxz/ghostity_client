export {};

declare global {
  interface APINextPrev {
    next?: {
      total: number;
      page: number;
      limit: number;
    };
    prev?: {
      total: number;
      page: number;
      limit: number;
    };
  }

  interface Stream {
    stream: {
      title: string;
      thumbnail: string;
      url: string;
      game: string;
      viewers: number;
      time_started: string;
      language: string;
    };
    _id: string;
    channel_id: string;
    channel_img: string;
    channel_name: string;
    channel_info: {
      main_affiliation?: {
        full_name: string;
        organization_name: string;
        organization_logo: string;
      };
    };
    platform: string;
  }

  interface Streams extends APINextPrev {
    results: Stream[];
  }

  interface OrganizationLogos {
    logos: {
      _id: string;
      name: string;
      logo: string;
    }[];
  }

  interface Stats {
    stats: {
      possible_languages: { [key: string]: number }[];
      total_viewers: number;
      total_organizations: number;
      number_of_channels_live: number;
      number_of_channels_in_db: number;
      number_live_twitch: number;
      number_live_youtube: number;
    };
  }

  interface Member {
    _id: string;
    name: string;
    alt_name: string;
    profile_id: string;
    profile_img: string;
    branch_id: number;
    branch_name: string;
    primary_language: string;
    branches?: { branch_name: string; branch_id: number }[];
  }

  interface Organization {
    _id: string;
    name: string;
    based: string;
    logo: string;
    website: string;
    main_channel?: string;
    languages: string[];
    social_media: {
      platform: string;
      url: string;
      tag?: string;
    }[];
    branches: {
      name: string;
      id: number;
    }[];
    members: Member[];
  }

  interface Organizations extends APINextPrev {
    results: Organization[];
  }

  interface Profile {
    _id: string;
    name: string;
    profile: {
      img: string;
      country: string;
      affiliations: [
        {
          organization_name: string;
          organization_id: string;
        }
      ];
      social_media: [
        {
          platform: string;
          url: string;
        }
      ];
    };
    channels: Channel[];
  }

  interface Profiles extends APINextPrev {
    results: Profile[];
  }

  interface Channel {
    channel_name: string;
    platform: string;
    id: string;
    link: string;
    description: string;
    view_count: number;
    sub_count: number;
  }
  interface Games extends APINextPrev {
    results: Game[];
  }

  interface Game {
    _id: string;
    name: string;
    cover_img: string;
    screenshot: string;
    summary: string;
    storyline: string;
    viewers: number;
    streams: number;
  }

  interface LiveStat {
    current_live: number;
    previous_live: number;
    difference: number;
    current_youtube_live: number;
    previous_youtube_live: number;
    difference_youtube: number;
    current_twitch_live: number;
    previous_twitch_live: number;
    difference_twitch: number;
    updatedAt: Date;
    createdAt: Date;
  }

  interface WatchingStat {
    current_watching: number;
    previous_watching: number;
    difference: number;
    updatedAt: Date;
    createdAt: Date;
  }

  interface TotalStat {
    current_total: number;
    previous_total: number;
    difference: number;
    current_twitch: number;
    previous_twitch: number;
    difference_twitch: number;
    current_youtube: number;
    previous_youtube: number;
    difference_youtube: number;
    updatedAt: Date;
    createdAt: Date;
  }

  interface Search {
    query: {
      string: string;
      total: number;
    };
    results: {
      streams: SearchItem<Stream>;
      organizations: SearchItem<Organization>;
      games: SearchItem<Game>;
      profiles: SearchItem<Profile>;
    };
  }

  interface SearchItem<T> {
    more: boolean;
    total: number;
    results: T[];
  }
}
