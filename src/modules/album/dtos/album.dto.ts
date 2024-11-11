import { IsDefined, IsNumber, IsString, IsUUID } from 'class-validator';

import { IsUUIDOrNull } from '../../../common/decorators';
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

  @IsUUIDOrNull()
  artistId: string | null;
}
