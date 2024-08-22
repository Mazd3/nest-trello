import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignInDto, TokenDto, SignUpDto } from './auth.dto';
import { plainToInstance } from 'class-transformer';
import { ReadUserDto } from 'src/users/users.dto';
import { Public } from './public.decorator';

@ApiBadRequestResponse({ example: { message: 'Bad Request', statusCode: 400 } })
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @Public()
  @HttpCode(200)
  @ApiUnauthorizedResponse({
    example: { message: 'Unauthorized', statusCode: 401 },
  })
  @ApiOkResponse({ type: TokenDto })
  async signIn(@Body() signInDto: SignInDto) {
    const { accessToken: access_token } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    return plainToInstance(TokenDto, { access_token });
  }

  @Post('sign-up')
  @Public()
  @ApiConflictResponse({ example: { message: 'Conflict', statusCode: 409 } })
  @ApiCreatedResponse({ type: ReadUserDto })
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.signUp(
      signUpDto.email,
      signUpDto.password,
    );
    return plainToInstance(ReadUserDto, user);
  }
}
