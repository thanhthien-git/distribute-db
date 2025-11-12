import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DangKy } from 'src/entities/dangky.entity';
import { Lop } from 'src/entities/lop.entity';
import { SinhVien } from 'src/entities/sinhvien.entity';

export const distributorConfig: TypeOrmModuleOptions = {
  name: 'distributor',
  type: 'mssql',
  host: 'THIEN',
  port: 1433,
  username: 'sa',
  password: 'sa',
  database: 'QLSV',
  entities: [SinhVien, Lop, DangKy],
  synchronize: false,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const node1Config: TypeOrmModuleOptions = {
  name: 'node1',
  type: 'mssql',
  host: 'THIEN\\NGUYEN1',
  port: 1436,
  username: 'sa',
  password: 'sa',
  database: 'QLSV_L1',
  entities: [SinhVien, Lop, DangKy],
  synchronize: false,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const node2Config: TypeOrmModuleOptions = {
  name: 'node2',
  type: 'mssql',
  host: 'THIEN\\NGUYEN2',
  port: 1435,
  username: 'sa',
  password: 'sa',
  database: 'QLSV_L2',
  entities: [SinhVien, Lop, DangKy],
  synchronize: false,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};
