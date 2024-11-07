import { IAlbum } from '../../album/interfaces';
import { IArtist } from '../../artists/interfaces';
import { ITrack } from '../..//track/interfaces';

export interface IFavorites {
  albums: IAlbum[];
  artists: IArtist[];
  tracks: ITrack[];
}
