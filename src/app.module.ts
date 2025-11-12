import { Module } from '@nestjs/common';
import { StudentModule } from './modules/student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { distributorConfig, node1Config, node2Config } from './config/database.config';
import { LopModule } from './modules/lop/lop.module';
import { DangKyModule } from './modules/dangky/dangky.module';

@Module({
  imports:
    [
      TypeOrmModule.forRoot(distributorConfig),
      TypeOrmModule.forRoot(node1Config),
      TypeOrmModule.forRoot(node2Config),
      StudentModule,
      LopModule,
      DangKyModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule { }
