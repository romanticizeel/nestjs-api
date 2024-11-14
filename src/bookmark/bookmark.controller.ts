import { BookmarkService } from './bookmark.service';
import { JwtGuard } from '@/auth/guard';
import {
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GetUser } from '@/auth/decorator';
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from './dto';
import {
  SwaggerCreateBookmark,
  SwaggerDeleteBookmark,
  SwaggerEditBookmark,
  SwaggerGetBookmarkById,
  SwaggerGetBookmarks,
} from './swagger';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private BookmarkService: BookmarkService,
  ) {}
  @Get()
  @SwaggerGetBookmarks()
  getBookmarks(@GetUser('id') userId: number) {
    return this.BookmarkService.getBookmarks(
      userId,
    );
  } /* end get bookmarks */

  @Get(':id')
  @SwaggerGetBookmarkById()
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.BookmarkService.getBookmarkById(
      userId,
      bookmarkId,
    );
  } /* end get bookmark by id */

  @Post()
  @SwaggerCreateBookmark()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.BookmarkService.createBookmark(
      userId,
      dto,
    );
  }

  @Patch(':id')
  @SwaggerEditBookmark()
  editBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.BookmarkService.editBookmarkById(
      userId,
      bookmarkId,
      dto,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @SwaggerDeleteBookmark()
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.BookmarkService.deleteBookmarkById(
      userId,
      bookmarkId,
    );
  }
}
