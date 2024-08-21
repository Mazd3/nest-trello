import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [ColumnsService],
})
export class ColumnsModule {}
