import {
  ForbiddenException,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from './dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getBookmarks(userId: number) {
    try {
      const bookmarks =
        await this.prisma.bookmark.findMany({
          where: { userId },
        });

      if (!bookmarks || bookmarks.length === 0) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message:
            'No bookmarks found for this user.',
          data: [],
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message:
          'Bookmarks retrieved successfully.',
        data: bookmarks,
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new HttpException(
        'Something went wrong while retrieving bookmarks.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    try {
      const bookmark =
        await this.prisma.bookmark.findFirst({
          where: { userId, id: bookmarkId },
        });

      if (!bookmark) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Bookmark not found.',
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message:
          'Bookmark retrieved successfully.',
        data: bookmark,
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new HttpException(
        'Something went wrong while retrieving the bookmark.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createBookmark(
    userId: number,
    dto: CreateBookmarkDto,
  ) {
    try {
      const bookmark =
        await this.prisma.bookmark.create({
          data: {
            userId,
            ...dto,
          },
        });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Bookmark created successfully.',
        data: bookmark,
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new HttpException(
        'Something went wrong while creating the bookmark.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    try {
      // Get the bookmark by id
      const bookmark =
        await this.prisma.bookmark.findUnique({
          where: {
            id: bookmarkId,
          },
        });

      // Check if the user owns the bookmark
      if (
        !bookmark ||
        bookmark.userId !== userId
      ) {
        throw new ForbiddenException(
          'Access to resources denied',
        );
      }

      // Update the bookmark
      const updatedBookmark =
        await this.prisma.bookmark.update({
          where: {
            id: bookmark.id,
          },
          data: {
            ...dto,
          },
        });

      return {
        statusCode: HttpStatus.OK,
        message: 'Bookmark updated successfully',
        data: updatedBookmark,
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: error.message,
        };
      }

      // Handle other errors
      throw new HttpException(
        'Something went wrong while updating the bookmark',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async deleteBookmarkById(
  //   userId: number,
  //   bookmarkId: number,
  // ) {
  //   // get the bookmark by id
  //   const bookmark =
  //     await this.prisma.bookmark.findUnique({
  //       where: {
  //         id: bookmarkId,
  //       },
  //     });

  //   // check if the user owns the bookmark
  //   if (!bookmark || bookmark.userId !== userId)
  //     throw new ForbiddenException(
  //       'Access to resources denied',
  //     );

  //   await this.prisma.bookmark.delete({
  //     where: {
  //       id: bookmarkId,
  //     },
  //   });
  // }

  async deleteBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    try {
      // Get the bookmark by id
      const bookmark =
        await this.prisma.bookmark.findUnique({
          where: {
            id: bookmarkId,
          },
        });

      // Check if the user owns the bookmark
      if (
        !bookmark ||
        bookmark.userId !== userId
      ) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Access to resources denied',
        };
      }

      // Delete the bookmark
      await this.prisma.bookmark.delete({
        where: {
          id: bookmarkId,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Bookmark deleted successfully',
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: error.message,
        };
      }

      throw new HttpException(
        'Something went wrong while deleting the bookmark',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
