import { Controller, Get } from '@nestjs/common';

import { DbService } from './db';

@Controller()
export class AppController {
  constructor(private db: DbService) {}

  @Get()
  index() {
    return 'Hello API';
  }

  @Get('all')
  async getData() {
    const categories = await this.db.getCategories();
    const products = await this.db.getProducts();
    return { categories, products };
  }
}
