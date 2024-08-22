import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UpdateUserDto } from './users.dto';

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

  async createUser(email: string, hash: string, salt: string) {
    const user = await this.db.user.create({ data: { email, hash, salt } });
    return user;
  }

  async updateUser(authId: number, id: number, updateUserDto: UpdateUserDto) {
    if (authId !== id) throw new ForbiddenException();
    return this.db.user.update({ where: { id }, data: updateUserDto });
  }

  async deleteUserById(authId: number, id: number) {
    if (authId !== id) throw new ForbiddenException();
    return this.db.user.delete({ where: { id } });
  }
}
