import { ICreateArtist } from '../interfaces';
import { OmitType } from '@nestjs/mapped-types';
import { ArtistDto } from './artist.dto';

export class CreateArtistDto
  extends OmitType(ArtistDto, ['id'])
  implements ICreateArtist {}
