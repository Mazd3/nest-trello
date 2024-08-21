import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto, SignInResDto, SignUpDto, SignUpResDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  //
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @ApiOkResponse({ type: SignInResDto })
  async signIn(@Body() body: SignInDto): Promise<SignInResDto> {
    const { accessToken } = await this.authService.signIn(
      body.email,
      body.password,
    );
    return { access_token: accessToken };
  }

  @Post('sign-up')
  @ApiCreatedResponse({ type: SignUpResDto })
  async signUp(@Body() body: SignUpDto): Promise<SignUpResDto> {
    const user = await this.authService.signUp(body.email, body.password);
    return { id: user.id, email: user.email };
  }
}
