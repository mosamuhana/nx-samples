import { Module } from '@nestjs/common';

import { DbService } from '../db';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, DbService],
})
export class CategoriesModule {}
