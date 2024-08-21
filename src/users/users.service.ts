import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  getAllUsers() {
    return this.db.user.findMany();
  }

  async getUserByEmail(email: string) {
    const user = await this.db.user.findFirst({ where: { email } });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.db.user.findFirst({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  createUser(email: string, hash: string, salt: string) {
    return this.db.user.create({ data: { email, hash, salt } });
  }

  async deleteUserById(id: number) {
    await this.getUserById(id);
    return this.db.user.delete({ where: { id } });
  }
}
