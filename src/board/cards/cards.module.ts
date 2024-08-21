import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [CardsService],
})
export class CardsModule {}
