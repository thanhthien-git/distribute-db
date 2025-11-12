import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DangKyService } from './dangky.service';
import { DangKyController } from './dangky.controller';
import { SinhVien } from 'src/entities/sinhvien.entity';
import { DangKy } from 'src/entities/dangky.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DangKy, SinhVien], 'distributor'),
    TypeOrmModule.forFeature([DangKy, SinhVien], 'node1'),
    TypeOrmModule.forFeature([DangKy, SinhVien], 'node2'),],
    providers: [DangKyService],
    controllers: [DangKyController],
    exports: [DangKyService],
})
export class DangKyModule { }
