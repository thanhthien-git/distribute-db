import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LopService } from './lop.service';
import { Lop } from 'src/entities/lop.entity';

@Controller('lop')
export class LopController {
  constructor(private readonly lopService: LopService) {}

  @Get()
  findAll() {
    return this.lopService.findAll();
  }

  @Post()
  add(@Body() lop: Lop) {
    return this.lopService.add(lop);
  }

  @Put('/:mslop')
  update(@Param('mslop') mslop: string, @Body() updateData: Partial<Lop>) {
    return this.lopService.update(mslop, updateData);
  }

  @Delete('/:mslop')
  delete(@Param('mslop') mslop: string) {
    return this.lopService.delete(mslop);
  }

  @Get('/search/:keyword')
  search(@Param('keyword') keyword: string) {
    return this.lopService.search(keyword);
  }
}
