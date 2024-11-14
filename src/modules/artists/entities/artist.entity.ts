import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IArtist } from '../interfaces';
import { AlbumEntity } from 'src/modules/album/entities';

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
}
