export interface Episode {
  uuid: string;
  name: string;
  episode: number;
  skips: {
    opening: number[] | null;
    ending: number[] | null;
  };
  hls: {
    fhd: string | null;
    hd: string | null;
    sd: string | null;
  };

  isPlaying?: boolean;
}
