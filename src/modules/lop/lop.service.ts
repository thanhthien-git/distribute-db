import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lop } from 'src/entities/lop.entity';

@Injectable()
export class LopService {
  constructor(
    @InjectRepository(Lop, 'node1') private lopRepo1: Repository<Lop>,
    @InjectRepository(Lop, 'node2') private lopRepo2: Repository<Lop>,
  ) {}

  async findAll() {
    const [l1, l2] = await Promise.all([this.lopRepo1.find(), this.lopRepo2.find()]);
    return [...l1, ...l2];
  }

  async add(lop: Lop) {
    const exists1 = await this.lopRepo1.findOne({ where: { mslop: lop.mslop } });
    const exists2 = await this.lopRepo2.findOne({ where: { mslop: lop.mslop } });
    if (exists1 || exists2) throw new Error('Mã lớp đã tồn tại');

    const repo = lop.mslop.startsWith('1') ? this.lopRepo1 : this.lopRepo2;
    return repo.save(lop);
  }

  async update(mslop: string, updateData: Partial<Lop>) {
    const l1 = await this.lopRepo1.findOne({ where: { mslop } });
    const l2 = l1 ? null : await this.lopRepo2.findOne({ where: { mslop } });
    const lopToUpdate = l1 || l2;
    if (!lopToUpdate) throw new Error('Lớp không tồn tại');

    Object.assign(lopToUpdate, updateData);
    const repo = l1 ? this.lopRepo1 : this.lopRepo2;
    return repo.save(lopToUpdate);
  }

  async delete(mslop: string) {
    const l1 = await this.lopRepo1.findOne({ where: { mslop } });
    const repo = l1 ? this.lopRepo1 : this.lopRepo2;
    return repo.delete({ mslop });
  }

  async search(keyword: string) {
    const [l1, l2] = await Promise.all([this.lopRepo1.find(), this.lopRepo2.find()]);
    const all = [...l1, ...l2];
    const lower = keyword.toLowerCase();
    return all.filter(l => l.tenlop.toLowerCase().includes(lower) || l.mslop.toLowerCase().includes(lower));
  }

}
