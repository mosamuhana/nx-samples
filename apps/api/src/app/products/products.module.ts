import { Module } from '@nestjs/common';

import { DbService } from '../db';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, DbService],
})
export class ProductsModule {}
