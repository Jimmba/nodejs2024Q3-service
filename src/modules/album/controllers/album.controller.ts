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

import { AlbumIdDto, CreateAlbumDto } from '../dtos';
import { IAlbum } from '../interfaces';
import { AlbumService } from '../services';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAllAlbums(): Promise<IAlbum[]> {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getAlbumById(@Param() param: AlbumIdDto): Promise<IAlbum> {
    const { id } = param;
    return this.albumService.getAlbumByIdOrThrow(id);
  }

  @Post()
  createAlbum(@Body() createAlbum: CreateAlbumDto): Promise<IAlbum> {
    return this.albumService.createAlbum(createAlbum);
  }

  @Put(':id')
  updateAlbum(
    @Param() param: AlbumIdDto,
    @Body() updateAlbum: CreateAlbumDto,
  ): Promise<IAlbum> {
    const { id } = param;
    return this.albumService.updateAlbum(id, updateAlbum);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param() param: AlbumIdDto): Promise<void> {
    const { id } = param;
    return this.albumService.deleteAlbum(id);
  }
}
