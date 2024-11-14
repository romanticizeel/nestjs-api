import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto'; // import all the files in the dto folder, and we can use the AuthDto type, if there else we can add it to the brackets
import {
  SwaggerSignin,
  SwaggerSignup,
} from './swagger';
import { GoogleOAuthGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @SwaggerSignup()
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  } /* end of signup */

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @SwaggerSignin()
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  } /* end of signin */

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }
}
