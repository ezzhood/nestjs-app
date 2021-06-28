import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) { }

  @Get()
  findAll(@Query() paginationQuery): Promise<Coffee[]> {
    const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll();
  }

  @Get('/:coffeeId')
  findOne(@Param('coffeeId') coffeeId: string): Promise<Coffee> {
    return this.coffeesService.findOne(coffeeId);
  }

  @Post()
  // @HttpCode(HttpStatus.GONE)
  create(@Body() body: CreateCoffeeDto): Promise<Coffee> {
    return this.coffeesService.create(body);
  }

  @Patch('/:coffeeId')
  update(@Param('coffeeId') coffeeId: string, @Body() body: UpdateCoffeeDto): Promise<Coffee> {
    return this.coffeesService.update(coffeeId, body);
  }

  @Delete('/:coffeeId')
  remove(@Param('coffeeId') coffeeId: string) {
    return this.coffeesService.remove(coffeeId);
  }
}
