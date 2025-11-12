import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { StudentsService } from './student.service';
import { SinhVien } from 'src/entities/sinhvien.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @Get('/by-class/:mslop')
  findByClass(@Param('mslop') mslop: string) {
    return this.studentsService.findByClass(mslop);
  }

  @Post()
  add(@Body() student: SinhVien) {
    return this.studentsService.add(student);
  }

  @Delete('/:mssv')
  delete(@Param('mssv') mssv: string) {
    return this.studentsService.delete(mssv);
  }

  @Put('/:mssv')
  updateClass(@Param('mssv') mssv: string, @Body('mslop') mslop: string) {
    return this.studentsService.updateMslop(mssv, mslop);
  }

  @Put('/update-info/:mssv')
  updateInfo(
    @Param('mssv') mssv: string,
    @Body() updateData: Partial<SinhVien>,
  ) {
    return this.studentsService.updateInfo(mssv, updateData);
  }


  @Get('/search/:keyword')
  search(@Param('keyword') keyword: string) {
    return this.studentsService.search(keyword);
  }
}
