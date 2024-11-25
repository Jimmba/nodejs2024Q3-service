import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { ArtistEntity } from '../../../modules/artists/entities';
import { AlbumEntity } from '../../../modules/album/entities';
import { FavoritesEntity } from '../../../modules/favorites/entities';

import { ITrack } from '../interfaces';

@Entity('tracks')
export class TrackEntity implements ITrack {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;

  @Column()
  duration: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  album: AlbumEntity;

  @OneToMany(() => FavoritesEntity, (fav) => fav.track)
  favs: FavoritesEntity[];
}
