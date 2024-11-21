import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { IAlbum } from '../interfaces';
import { ArtistEntity } from 'src/modules/artists/entities';
import { TrackEntity } from 'src/modules/track/entities';
import { FavoritesEntity } from 'src/modules/favorites/entities';

@Entity('albums')
export class AlbumEntity implements IAlbum {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.album)
  tracks: TrackEntity[];

  @OneToMany(() => FavoritesEntity, (fav) => fav.album)
  favs: FavoritesEntity[];
}
