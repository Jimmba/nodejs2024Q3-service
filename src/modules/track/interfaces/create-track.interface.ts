export interface ICreateTrack {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
