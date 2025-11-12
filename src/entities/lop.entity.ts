import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { SinhVien } from './sinhvien.entity';

@Entity('lop')
export class Lop {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  mslop: string;

  @Column({ type: 'nvarchar', length: 100 })
  tenlop: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  khoa: string;

  @Column({ type: 'uniqueidentifier', default: () => 'newsequentialid()',select: false })
  rowguid: string;

  @OneToMany(() => SinhVien, (sv) => sv.lop)
  sinhviens: SinhVien[];
}
