import { Injectable } from '@nestjs/common';

import { DbService } from '../db';
import { Product } from '@org/models';

@Injectable()
export class ProductsService {
  constructor(private readonly db: DbService) {}

  async getAll(): Promise<Product[]> {
    return await this.db.getProducts();
  }

  async getOne(id: number): Promise<Product | null> {
    const items = await this.db.getProducts();
    return items.find(x => x.id == id) ?? null;
  }

  async getCategoryProducts(id: number): Promise<Product[]> {
    const items = await this.db.getProducts();
    return items.filter(x => x.categoryId == id);
  }
}
