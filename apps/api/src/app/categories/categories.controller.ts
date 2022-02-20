import { Controller, Get } from '@nestjs/common';

import { IntParam } from '../common';
import { CategoriesService } from './categories.service';

@Controller('category')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getOne(@IntParam() id: number) {
    return this.service.getOne(id);
  }

  @Get(':id/products')
  getProducts(@IntParam() id: number) {
    return this.service.getProducts(id);
  }
}
