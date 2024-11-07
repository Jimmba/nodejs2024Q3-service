import { OmitType } from '@nestjs/mapped-types';

import { AlbumDto } from './album.dto';
import { ICreateAlbum } from '../interfaces';

export class CreateAlbumDto
  extends OmitType(AlbumDto, ['id'])
  implements ICreateAlbum {}
