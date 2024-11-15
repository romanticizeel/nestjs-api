import {
  ForbiddenException,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  CreateArticleDto,
  EditArticleDto,
} from './dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async getArticles(userId: number) {
    try {
      const articles =
        await this.prisma.article.findMany({
          where: { userId },
        });

      if (!articles || articles.length === 0) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message:
            'No articles found for this user.',
          data: [],
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message:
          'Articles retrieved successfully.',
        data: articles,
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new HttpException(
        'Something went wrong while retrieving articles.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getArticleById(
    userId: number,
    articleId: number,
  ) {
    try {
      const article =
        await this.prisma.article.findFirst({
          where: { userId, id: articleId },
        });

      if (!article) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Article not found.',
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message:
          'Article retrieved successfully.',
        data: article,
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new HttpException(
        'Something went wrong while retrieving the article.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createArticle(
    userId: number,
    dto: CreateArticleDto,
  ) {
    try {
      const article =
        await this.prisma.article.create({
          data: {
            userId,
            ...dto,
          },
        });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Article created successfully.',
        data: article,
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new HttpException(
        'Something went wrong while creating the article.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async editArticle(
    userId: number,
    articleId: number,
    dto: EditArticleDto,
  ) {
    try {
      // Get the article by id
      const article =
        await this.prisma.article.findUnique({
          where: {
            id: articleId,
          },
        });

      // Check if the user owns the article
      if (!article || article.userId !== userId) {
        throw new ForbiddenException(
          'Access to resources denied',
        );
      }

      // Update the article
      const updatedArticle =
        await this.prisma.article.update({
          where: {
            id: article.id,
          },
          data: {
            ...dto,
          },
        });

      return {
        statusCode: HttpStatus.OK,
        message: 'Article updated successfully',
        data: updatedArticle,
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
        'Something went wrong while updating the article',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteArticle(
    userId: number,
    articleId: number,
  ) {
    try {
      // Get the article by id
      const article =
        await this.prisma.article.findUnique({
          where: {
            id: articleId,
          },
        });

      // Check if the user owns the article
      if (!article || article.userId !== userId) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Access to resources denied',
        };
      }

      // Delete the article
      await this.prisma.article.delete({
        where: {
          id: articleId,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Aricle deleted successfully',
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: error.message,
        };
      }

      throw new HttpException(
        'Something went wrong while deleting the article',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
