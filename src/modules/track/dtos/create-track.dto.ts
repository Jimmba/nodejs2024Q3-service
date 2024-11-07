import { OmitType } from '@nestjs/mapped-types';
import { TrackDto } from './track.dto';

export class CreateTrackDto extends OmitType(TrackDto, ['id']) {}
