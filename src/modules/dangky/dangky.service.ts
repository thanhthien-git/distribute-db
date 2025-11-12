import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DangKy } from 'src/entities/dangky.entity';
import { SinhVien } from 'src/entities/sinhvien.entity';

@Injectable()
export class DangKyService {
    constructor(
        @InjectRepository(DangKy, 'node1') private dkRepo1: Repository<DangKy>,
        @InjectRepository(DangKy, 'node2') private dkRepo2: Repository<DangKy>,
        @InjectRepository(SinhVien, 'node1') private svRepo1: Repository<SinhVien>,
        @InjectRepository(SinhVien, 'node2') private svRepo2: Repository<SinhVien>,
    ) { }

    async findAll(): Promise<DangKy[]> {
        const list1 = await this.dkRepo1.find();
        const list2 = await this.dkRepo2.find();
        return [...list1, ...list2];
    }


    private getRepoByMssv(mssv: string) {
        return mssv.startsWith('1') ? this.dkRepo1 : this.dkRepo2;
    }

    async add(mssv: string, dk: DangKy) {
        const sv1 = await this.svRepo1.findOne({ where: { mssv } });
        const sv2 = sv1 ? null : await this.svRepo2.findOne({ where: { mssv } });
        if (!sv1 && !sv2) throw new Error('Sinh viên không tồn tại');

        const repo = sv1 ? this.dkRepo1 : this.dkRepo2;
        return repo.save({ ...dk, mssv });
    }

    async update(mssv: string, msmon: string, data: Partial<DangKy>) {
        const repo = this.getRepoByMssv(mssv);
        const dk = await repo.findOne({ where: { mssv, msmon } });
        if (!dk) throw new Error('Đăng ký không tồn tại');
        Object.assign(dk, data);
        return repo.save(dk);
    }

    async delete(mssv: string, msmon: string) {
        const repo = this.getRepoByMssv(mssv);
        return repo.delete({ mssv, msmon });
    }

    async findByStudent(mssv: string) {
        const repo = this.getRepoByMssv(mssv);
        return repo.find({ where: { mssv } });
    }

    async findByClass(classCode: 'L1' | 'L2'): Promise<DangKy[]> {
        if (classCode === 'L1') return this.dkRepo1.find();
        else return this.dkRepo2.find();
    }
}