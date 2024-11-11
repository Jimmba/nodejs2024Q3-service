import { PickType } from '@nestjs/mapped-types';

import { ArtistDto } from './artist.dto';

export class ArtistIdDto extends PickType(ArtistDto, ['id']) {}
