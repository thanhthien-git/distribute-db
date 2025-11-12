import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DangKyService } from './dangky.service';
import { DangKy } from 'src/entities/dangky.entity';

@Controller('dangky')
export class DangKyController {
    constructor(private readonly dangKyService: DangKyService) { }

    @Get()
    findAll() {
        return this.dangKyService.findAll();
    }

    @Get('/student/:mssv')
    findByStudent(@Param('mssv') mssv: string) {
        return this.dangKyService.findByStudent(mssv);
    }

    @Post('/:mssv')
    add(@Param('mssv') mssv: string, @Body() dk: DangKy) {
        return this.dangKyService.add(mssv, dk);
    }

    @Put('/:mssv/:msmon')
    update(@Param('mssv') mssv: string, @Param('msmon') msmon: string, @Body() data: Partial<DangKy>) {
        return this.dangKyService.update(mssv, msmon, data);
    }

    @Delete('/:mssv/:msmon')
    delete(@Param('mssv') mssv: string, @Param('msmon') msmon: string) {
        return this.dangKyService.delete(mssv, msmon);
    }

    @Get('class/:classCode')
    getByClass(@Param('classCode') classCode: 'L1' | 'L2'): Promise<DangKy[]> {
        return this.dangKyService.findByClass(classCode);
    }
}
