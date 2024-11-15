import { Module } from '@nestjs/common';
import { ArticlesController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticleService],
})
export class ArticleModule {}
