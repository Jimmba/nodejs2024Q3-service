import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IArtist } from '../interfaces';

@Entity('artists')
export class ArtistEntity implements IArtist {
  @PrimaryColumn()
  id: string;

  @Column()
  grammy: boolean;

  @Column()
  name: string;
}
