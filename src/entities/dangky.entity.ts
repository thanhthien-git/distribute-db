import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SinhVien } from './sinhvien.entity';

@Entity('dangky')
export class DangKy {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  mssv: string;

  @PrimaryColumn({ type: 'varchar', length: 20 })
  msmon: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  diem1: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  diem2: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  diem3: number;

  @Column({ type: 'uniqueidentifier', default: () => 'newsequentialid()' ,select: false})
  rowguid: string;

  @ManyToOne(() => SinhVien, (sv) => sv.dangkys, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mssv' })
  sinhvien: SinhVien;
}
