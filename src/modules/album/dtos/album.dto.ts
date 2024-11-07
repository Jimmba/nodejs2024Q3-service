import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IAlbum } from '../interfaces';

export class AlbumDto implements IAlbum {
  @IsUUID()
  @IsDefined()
  id: string;

  @IsString()
  @IsDefined()
  name: string;

  @IsNumber()
  @IsDefined()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null;
}
