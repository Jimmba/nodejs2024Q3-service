import { OmitType } from '@nestjs/mapped-types';

import { ArtistDto } from './artist.dto';
import { ICreateArtist } from '../interfaces';

export class CreateArtistDto
  extends OmitType(ArtistDto, ['id'])
  implements ICreateArtist {}
