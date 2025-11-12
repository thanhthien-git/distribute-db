import { Module } from '@nestjs/common';
import { StudentsController } from './student.controller';
import { StudentsService } from './student.service';
import { TransferService } from '../transfer/transfer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SinhVien } from 'src/entities/sinhvien.entity';
import { DangKy } from 'src/entities/dangky.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([SinhVien, DangKy], 'distributor'),
        TypeOrmModule.forFeature([SinhVien, DangKy], 'node1'),
        TypeOrmModule.forFeature([SinhVien, DangKy], 'node2'),
    ],
    controllers: [StudentsController],
    providers: [StudentsService, TransferService]
})
export class StudentModule { }
