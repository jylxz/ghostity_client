export {};

declare global {
  interface Stream {
    stream: {
      title: string;
      thumbnail: string;
      url: string;
      game: string;
      viewers: number;
      time_started: string;
    };
    _id: string;
    channel_id: string;
    channel_img: string;
    channel_name: string;
    platform: string;
    language: string;
  }

  interface Streams {
    next?: {
      page: number;
      limit: number;
    };
    prev?: {
      page: number;
      limit: number;
    };
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
    language: string;
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
    }[];
    branches: {
      name: string;
      id: number;
    }[];
    members: Member[];
  }

  interface Profile {
    _id: string;
    name: string;
    profile: {
      img: string;
      social_media: {
        platform: string;
        url: string;
      }[];
      country: string;
      affiliations: {
        organization_name: string;
        organization_id: string;
      }[];
    };
    channels: Channel[];
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

  interface Games {
    next?: {
      page: number;
      limit: number;
    };
    prev?: {
      page: number;
      limit: number;
    };
    results: Game[];
  }

  interface Game {
    _id: string,
    name: string,
    cover_img: string,
    screenshot: string,
    summary: string,
    storyline: string,
    viewers: number,
    streams: number
  }
}
