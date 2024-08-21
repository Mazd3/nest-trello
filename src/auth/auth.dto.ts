import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

class AuthDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class SignInResponseDto {
  @ApiProperty()
  @Expose()
  access_token: string;
}

export class SignInDto extends AuthDto {}
export class SignUpDto extends AuthDto {}
