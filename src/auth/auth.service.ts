import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  getSalt() {
    return genSalt();
  }

  getHashPassword(password: string, salt: string) {
    return hash(password, salt);
  }

  async signUp(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (user) throw new BadRequestException('Email already exists');

    const salt = await this.getSalt();
    const hash = await this.getHashPassword(password, salt);

    return this.usersService.createUser(email, hash, salt);
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new BadRequestException('User not found');

    const hash = await this.getHashPassword(password, user.salt);
    if (hash !== user.hash) throw new BadRequestException('Invalid password');

    const payload = { email: user.email, id: user.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
