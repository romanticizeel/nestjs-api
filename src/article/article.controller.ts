import { ArticleService } from './article.service';
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
  CreateArticleDto,
  EditArticleDto,
} from './dto';
import {
  SwaggerCreateArticle,
  SwaggerDeleteArticle,
  SwaggerEditArticle,
  SwaggerGetArticleById,
  SwaggerGetArticles,
} from './swagger';

@UseGuards(JwtGuard)
@Controller('articles')
export class ArticlesController {
  constructor(
    private ArticleService: ArticleService,
  ) {}
  @Get()
  @SwaggerGetArticles()
  getArticles(@GetUser('id') userId: number) {
    return this.ArticleService.getArticles(
      userId,
    );
  } /* end get articles */

  @Get(':id')
  @SwaggerGetArticleById()
  getArticleById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) articleId: number,
  ) {
    return this.ArticleService.getArticleById(
      userId,
      articleId,
    );
  } /* end get article by id */

  @Post()
  @SwaggerCreateArticle()
  createArticle(
    @GetUser('id') userId: number,
    @Body() dto: CreateArticleDto,
  ) {
    return this.ArticleService.createArticle(
      userId,
      dto,
    );
  }

  @Patch(':id')
  @SwaggerEditArticle()
  editArticle(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) articleId: number,
    @Body() dto: EditArticleDto,
  ) {
    return this.ArticleService.editArticle(
      userId,
      articleId,
      dto,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @SwaggerDeleteArticle()
  deleteArticle(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) articleId: number,
  ) {
    return this.ArticleService.deleteArticle(
      userId,
      articleId,
    );
  }
}
