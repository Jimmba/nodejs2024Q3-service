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
  UseGuards,
} from '@nestjs/common';

import { ArtistIdDto, CreateArtistDto } from '../dtos';
import { IArtist } from '../interfaces';
import { ArtistService } from '../services';
import { AuthGuard } from '../../auth/guards';
@UseGuards(AuthGuard)
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAllArtists(): Promise<IArtist[]> {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtistById(@Param() param: ArtistIdDto): Promise<IArtist> {
    const { id } = param;
    return this.artistService.getArtistByIdOrThrow(id);
  }

  @Post()
  createArtist(@Body() createArtist: CreateArtistDto): Promise<IArtist> {
    return this.artistService.createArtist(createArtist);
  }

  @Put(':id')
  updateArtist(
    @Param() param: ArtistIdDto,
    @Body() updateArtist: CreateArtistDto,
  ): Promise<IArtist> {
    const { id } = param;
    return this.artistService.updateArtist(id, updateArtist);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param() param: ArtistIdDto): Promise<void> {
    const { id } = param;
    return this.artistService.deleteArtist(id);
  }
}
