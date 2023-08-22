import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  HttpException,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(
    @Body() { login, password }: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const data = await this.authService.signUp({ login, password });
      res.cookie('accessToken', data.accessToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie('refreshToken', data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return data.user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(
    @Body() { login, password }: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const tokenData = await this.authService.logIn({ login, password });
      res.cookie('accessToken', tokenData.accessToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie('refreshToken', tokenData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return tokenData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const refreshToken = req.cookies;
      const tokenData = await this.authService.refresh(refreshToken);
      res.cookie('accessToken', tokenData.accessToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie('refreshToken', tokenData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return tokenData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
