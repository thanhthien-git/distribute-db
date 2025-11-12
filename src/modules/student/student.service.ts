import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferService } from '../transfer/transfer.service';
import { SinhVien } from 'src/entities/sinhvien.entity';
import { getDbByClass } from 'src/utils/distributed.helper';

@Injectable()
export class StudentsService {
    constructor(
        private transferService: TransferService,
        @InjectRepository(SinhVien, 'node1') private svRepo1: Repository<SinhVien>,
        @InjectRepository(SinhVien, 'node2') private svRepo2: Repository<SinhVien>,
    ) { }

    async findByClass(mslop: string) {
        const repo = getDbByClass(mslop, this.svRepo1, this.svRepo2);
        return repo.find({
            where: { mslop },
            relations: ['lop', 'dangkys'],
        });
    }

    async add(student: SinhVien) {
        const exists1 = await this.svRepo1.findOne({ where: { mssv: student.mssv } });
        const exists2 = await this.svRepo2.findOne({ where: { mssv: student.mssv } });
        if (exists1 || exists2) throw new Error('Mã sinh viên đã tồn tại');

        const repo = getDbByClass(student.mslop, this.svRepo1, this.svRepo2);
        return await repo.save(student);
    }

    async delete(mssv: string) {
        const sv1 = await this.svRepo1.findOne({ where: { mssv } });
        const repo = sv1 ? this.svRepo1 : this.svRepo2;
        return await repo.delete({ mssv });
    }

    async updateMslop(mssv: string, newClass: string) {
        return await this.transferService.transfer(mssv, newClass);
    }

    async search(keyword: string) {
        const [sv1, sv2] = await Promise.all([
            this.svRepo1.find(),
            this.svRepo2.find(),
        ]);

        const all = [...sv1, ...sv2];
        const lowerKeyword = keyword.toLowerCase();

        return all.filter(sv =>
            sv.hoten.toLowerCase().includes(lowerKeyword) ||
            sv.mssv.toLowerCase().includes(lowerKeyword)
        );
    }


    async updateInfo(mssv: string, updateData: Partial<SinhVien>) {
        const sv1 = await this.svRepo1.findOne({ where: { mssv } });
        const sv2 = sv1 ? null : await this.svRepo2.findOne({ where: { mssv } });

        const svToUpdate = sv1 || sv2;
        if (!svToUpdate) throw new Error('Sinh viên không tồn tại');

        Object.assign(svToUpdate, updateData);
        const repo = sv1 ? this.svRepo1 : this.svRepo2;

        return await repo.save(svToUpdate);
    }

}
