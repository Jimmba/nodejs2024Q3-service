import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { IAlbum } from '../interfaces';
import { ArtistEntity } from 'src/modules/artists/entities';

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
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;
}
