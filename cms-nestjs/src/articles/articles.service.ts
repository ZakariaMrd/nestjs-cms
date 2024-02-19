import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './interfaces/article.interface';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}
  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel(createArticleDto);
    return await createdArticle.save();
  }
  async findAll(): Promise<Article[]> {
    return await this.articleModel.find().sort({ createdDate: -1 }).exec();
  }
  async delete(id: string): Promise<Article> {
    return await this.articleModel.findByIdAndDelete(id);
    console.log('delete article with id -> ', id);
  }
  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const updatedArticle = this.articleModel.findByIdAndUpdate(
      id,
      updateArticleDto,
      {
        new: true,
      },
    );
    console.log(updatedArticle);
    return updatedArticle;
  }
}
