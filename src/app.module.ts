import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DbModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
