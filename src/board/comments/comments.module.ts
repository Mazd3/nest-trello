import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { DbModule } from 'src/db/db.module';
import { CommentsController } from './comments.controller';

@Module({
  imports: [DbModule],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
