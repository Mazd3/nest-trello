import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

class AuthDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class SignInResDto {
  @ApiProperty()
  access_token: string;
}

export class SignUpResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;
}

export class SignInDto extends AuthDto {}
export class SignUpDto extends AuthDto {}
