import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { ArtistEntity } from 'src/modules/artists/entities';
import { ITrack } from '../interfaces';
import { AlbumEntity } from 'src/modules/album/entities';
import { FavoritesEntity } from 'src/modules/favorites/entities';

@Entity('tracks')
export class TrackEntity implements ITrack {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid', nullable: true }) //! check others
  artistId: string | null;

  @Column({ type: 'uuid', nullable: true }) //! check others
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
