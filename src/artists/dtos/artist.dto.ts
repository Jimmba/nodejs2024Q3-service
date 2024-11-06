import { IsBoolean, IsDefined, IsString, IsUUID } from 'class-validator';
import { IArtist } from '../interfaces';

export class ArtistDto implements IArtist {
  @IsUUID()
  @IsDefined()
  id: string;

  @IsBoolean()
  @IsDefined()
  grammy: boolean;

  @IsString()
  @IsDefined()
  name: string;
}
