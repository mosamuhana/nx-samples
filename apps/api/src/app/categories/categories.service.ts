import { Injectable } from '@nestjs/common';

import { DbService } from '../db';
import { Category, Product } from '@org/models';

@Injectable()
export class CategoriesService {
  constructor(private readonly db: DbService) {}

  async getAll(): Promise<Category[]> {
    return await this.db.getCategories();
  }

  async getOne(id: number): Promise<Category | null> {
    const items = await this.db.getCategories();
    return items.find(x => x.id == id) ?? null;
  }

  async getProducts(id: number) {
    //const items = await this.db.getProducts();
    //return items.filter(x => x.categoryId == id);
    return this.db.getCategoryWithProducts(id);
  }
}
