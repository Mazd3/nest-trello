import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  getUserByEmail(email: string) {
    return this.db.user.findFirst({ where: { email } });
  }

  createUser(email: string, hash: string, salt: string) {
    return this.db.user.create({ data: { email, hash, salt } });
  }
}
