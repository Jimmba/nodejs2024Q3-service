import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateTrackDto, TrackIdDto } from '../dtos';
import { ITrack } from '../interfaces';
import { TrackService } from '../services/track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAllTracks(): Promise<ITrack[]> {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrackById(@Param() param: TrackIdDto): Promise<ITrack> {
    const { id } = param;
    return this.trackService.getTrackByIdOrThrow(id);
  }

  @Post()
  createTrack(@Body() createTrack: CreateTrackDto): Promise<ITrack> {
    return this.trackService.createTrack(createTrack);
  }

  @Put(':id')
  updateTrack(
    @Param() param: TrackIdDto,
    @Body() updateTrack: CreateTrackDto,
  ): Promise<ITrack> {
    const { id } = param;
    return this.trackService.updateTrack(id, updateTrack);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param() param: TrackIdDto): Promise<void> {
    const { id } = param;
    return this.trackService.deleteTrack(id);
  }
}
