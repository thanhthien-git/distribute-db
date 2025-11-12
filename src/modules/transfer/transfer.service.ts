import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DangKy } from 'src/entities/dangky.entity';
import { SinhVien } from 'src/entities/sinhvien.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(SinhVien, 'node1') private svRepo1: Repository<SinhVien>,
    @InjectRepository(SinhVien, 'node2') private svRepo2: Repository<SinhVien>,
    @InjectRepository(DangKy, 'node1') private dkRepo1: Repository<DangKy>,
    @InjectRepository(DangKy, 'node2') private dkRepo2: Repository<DangKy>,
  ) {}

  async transfer(mssv: string, newClass: string) {
    const sourceRepo = await this.findRepoByStudent(mssv);
    const targetRepo = newClass === 'L1' ? this.svRepo1 : this.svRepo2;
    const targetDkRepo = newClass === 'L1' ? this.dkRepo1 : this.dkRepo2;

    const sv = await sourceRepo.findOne({ where: { mssv } });
    if (!sv) throw new Error('Không tìm thấy sinh viên');

    sv.mslop = newClass;

    const dkSourceRepo = sourceRepo === this.svRepo1 ? this.dkRepo1 : this.dkRepo2;
    const dkList = await dkSourceRepo.find({ where: { mssv } });

    await targetRepo.save(sv);
    for (const dk of dkList) {
      await targetDkRepo.save(dk);
    }

    await sourceRepo.delete({ mssv });
    for (const dk of dkList) {
      await dkSourceRepo.delete({ mssv: dk.mssv });
    }

    return { message: `Đã chuyển sinh viên ${mssv} sang lớp ${newClass}` };
  }

  private async findRepoByStudent(mssv: string) {
    const sv1 = await this.svRepo1.findOne({ where: { mssv } });
    return sv1 ? this.svRepo1 : this.svRepo2;
  }
}
