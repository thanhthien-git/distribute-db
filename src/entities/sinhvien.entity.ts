import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Lop } from './lop.entity';
import { DangKy } from './dangky.entity';

@Entity('sinhvien')
export class SinhVien {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  mssv: string;

  @Column({ type: 'nvarchar', length: 200 })
  hoten: string;

  @Column({ type: 'nchar', length: 1, nullable: true })
  phai: string;

  @Column({ type: 'date', nullable: true })
  ngaysinh: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  mslop: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  hocbong: number;

  @Column({ type: 'uniqueidentifier', default: () => 'newsequentialid()',select: false })
  rowguid: string;

  @ManyToOne(() => Lop, (lop) => lop.sinhviens, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'mslop' })
  lop: Lop;

  @OneToMany(() => DangKy, (dk) => dk.sinhvien, { cascade: true })
  dangkys: DangKy[];
}
