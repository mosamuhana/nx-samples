import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CategoriesModule } from './categories';
import { ProductsModule } from './products';
import { DbService } from './db/db.service';

@Module({
  imports: [
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [DbService],
})
export class AppModule {}
