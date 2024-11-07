import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { IsUUIDOrNull } from '../../../common/decorators';
import { ITrack } from '../interfaces';

export class TrackDto implements ITrack {
  @IsUUID()
  @IsDefined()
  id: string;

  @IsString()
  @IsDefined()
  name: string;

  @IsUUIDOrNull()
  artistId: string | null;

  @IsUUIDOrNull()
  albumId: string | null;

  @IsNumber()
  @IsDefined()
  duration: number;
}
