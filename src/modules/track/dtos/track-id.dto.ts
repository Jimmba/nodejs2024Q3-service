import { PickType } from '@nestjs/mapped-types';

import { TrackDto } from './track.dto';

export class TrackIdDto extends PickType(TrackDto, ['id']) {}
