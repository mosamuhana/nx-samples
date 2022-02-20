import { Controller, Get } from '@nestjs/common';

import { IntParam } from '../common';
import { ProductsService } from './products.service';

@Controller('product')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getOne(@IntParam() id: number) {
    return this.service.getOne(id);
  }
}
