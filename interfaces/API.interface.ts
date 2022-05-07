export interface Stream {
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

export interface Streams {
  next?: {
    page: number,
    limit: number
  };
  prev?: {
    page: number,
    limit: number,
  };
  results: Stream[]
}

export interface OrganizationLogos {
  logos: {
    _id: string;
    name: string;
    logo: string;
  }[];
}

export interface Stats {
  stats: {
    possible_languages: { [key: string]: number }[];
    total_viewers: number;
    number_of_channels_live: number;
    number_of_channels_in_db: number;
    number_live_twitch: number;
    number_live_youtube: number;
  };
}
