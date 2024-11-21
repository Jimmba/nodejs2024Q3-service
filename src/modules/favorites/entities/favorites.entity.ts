import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IAlbum } from 'src/modules/album/interfaces';
import { IArtist } from 'src/modules/artists/interfaces';
import { ITrack } from 'src/modules/track/interfaces';
import { ArtistEntity } from 'src/modules/artists/entities';
import { TrackEntity } from 'src/modules/track/entities';
import { AlbumEntity } from 'src/modules/album/entities';

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
