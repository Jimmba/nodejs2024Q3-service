import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IArtist } from '../interfaces';
import { AlbumEntity } from '../../../modules/album/entities';
import { TrackEntity } from '../../../modules/track/entities';

@Entity('artists')
export class ArtistEntity implements IArtist {
  @PrimaryColumn()
  id: string;

  @Column()
  grammy: boolean;

  @Column()
  name: string;

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artist)
  tracks: TrackEntity[];
}
