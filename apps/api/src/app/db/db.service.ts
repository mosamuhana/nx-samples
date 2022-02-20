import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { Category, Product } from '@org/models';

@Injectable()
export class DbService {
  private initialized = false;
  categories: Category[];
  products: Product[];

  async getCategories() {
    await this.initialize();
    return this.categories;
  }

  async getProducts() {
    await this.initialize();
    return this.products;
  }

  async getCategoryWithProducts(id: number) {
    await this.initialize();
    const category = this.categories.find(x => x.id === id);
    if (!category) return null;
    const products = this.products.filter(x => x.categoryId === id);
    return { ...category, products };
  }

  private async initialize() {
    if (this.initialized) return;
    const json = await readFile(join(__dirname, '/assets/data.json'), 'utf8');
    const data = JSON.parse(json);
    this.categories = data.categories.map(x => ({...x, image: fixImageUrl(x)}));
    this.products = data.products.map(x => ({...x, image: fixImageUrl(x)}));
    this.initialized = true;
  }
}

const fixImageUrl = (x: any) => x.image == null ? null : `assets/images/${x.image}.jpg`;
