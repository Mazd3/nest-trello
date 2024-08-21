import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [CommentsService],
})
export class CommentsModule {}
