import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SinhVien } from 'src/entities/sinhvien.entity';
import { TransferService } from './transfer.service';
import { DangKy } from 'src/entities/dangky.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SinhVien, DangKy], 'distributor'),
    TypeOrmModule.forFeature([SinhVien, DangKy], 'node1'),
    TypeOrmModule.forFeature([SinhVien, DangKy], 'node2'),],
    providers: [TransferService],
    exports: [TransferService]
})
export class TransferModule { }
