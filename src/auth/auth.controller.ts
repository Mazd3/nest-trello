import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto, SignInResponseDto, SignUpDto } from './auth.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from 'src/users/users.dto';
import { Public } from './public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  //
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @Public()
  @HttpCode(200)
  @ApiOkResponse({ type: SignInResponseDto })
  async signIn(@Body() body: SignInDto) {
    const { accessToken: access_token } = await this.authService.signIn(
      body.email,
      body.password,
    );
    return plainToInstance(SignInResponseDto, { access_token });
  }

  @Post('sign-up')
  @Public()
  @ApiCreatedResponse({ type: UserResponseDto })
  async signUp(@Body() body: SignUpDto) {
    const user = await this.authService.signUp(body.email, body.password);
    return plainToInstance(UserResponseDto, user);
  }
}
