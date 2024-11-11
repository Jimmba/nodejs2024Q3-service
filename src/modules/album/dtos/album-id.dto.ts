import { PickType } from '@nestjs/mapped-types';
import { AlbumDto } from './album.dto';

export class AlbumIdDto extends PickType(AlbumDto, ['id']) {}
