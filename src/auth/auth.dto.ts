import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

class AuthDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class TokenDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  access_token: string;
}

export class SignInDto extends AuthDto {}
export class SignUpDto extends AuthDto {}
