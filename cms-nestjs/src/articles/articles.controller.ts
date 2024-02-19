import {
  Body,
  Controller,
  Post,
  Get,
  UseInterceptors,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { CheckauthorInterceptor } from 'src/checkauthor/checkauthor.interceptor';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}
  @Post()
  @UseInterceptors(CheckauthorInterceptor)
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }
  @Get()
  async findAll() {
    return this.articleService.findAll();
  }
  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    return this.articleService.delete(id);
  }

  @Put(':id')
  async updateArticle(
    @Param('id') id: string,
    @Body() article: UpdateArticleDto,
  ) {
    return this.articleService.update(id, article);
  }
}
