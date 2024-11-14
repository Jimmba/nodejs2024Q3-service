import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IArtist } from '../interfaces';
import { AlbumEntity } from '../../../modules/album/entities';
import { TrackEntity } from '../../../modules/track/entities';
import { FavoritesEntity } from 'src/modules/favorites/entities';

@Entity('artists')
export class ArtistEntity implements IArtist {
  @PrimaryColumn()
  id: string;

  @Column()
  grammy: boolean;

  @Column()
  name: string;

  @OneToMany(() => FavoritesEntity, (fav) => fav.artist)
  favs: FavoritesEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artist)
  tracks: TrackEntity[];
}
