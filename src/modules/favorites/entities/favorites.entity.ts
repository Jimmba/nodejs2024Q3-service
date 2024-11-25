import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { IAlbum } from '../../../modules/album/interfaces';
import { IArtist } from '../../../modules/artists/interfaces';
import { ITrack } from '../../../modules/track/interfaces';

import { AlbumEntity } from '../../../modules/album/entities';
import { ArtistEntity } from '../../../modules/artists/entities';
import { TrackEntity } from '../../../modules/track/entities';

@Entity('favs')
export class FavoritesEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;

  @Column({ type: 'uuid', nullable: true })
  trackId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  artist: IArtist | null;

  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  album: IAlbum | null;

  @ManyToOne(() => TrackEntity, (track) => track.id, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  track: ITrack | null;
}
