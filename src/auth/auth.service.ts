import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from 'src/user/dto';
import { User, UserResponse } from 'src/types';
import { REQUEST_ERRORS } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private async validateUser({ login, password }: CreateUserDto) {
    const user = await await this.prisma.user.findFirst({
      where: { login },
    });

    const passwordEquals = await bcrypt.compare(password, user.password);

    if (user && passwordEquals) {
      return user;
    } else {
      throw new HttpException(
        REQUEST_ERRORS.AUTH.NO_USER,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  private async generateToken(user) {
    const pyaload = {
      userId: user.id,
      login: user.login,
      expiration: '24h',
    };

    return {
      accessTocken: this.jwtService.sign(pyaload, { expiresIn: '24h' }),
      refreshTocken: this.jwtService.sign(pyaload, { expiresIn: '30d' }),
    };
  }

  async saveTocken(userId: string, refreshTocken: string) {
    const tockenData = await this.prisma.tocken.findUnique({
      where: { userId },
    });
    let tocken;
    if (tockenData) {
      const updateTockenData = {
        userId: tockenData.userId,
        refreshTocken,
      };

      await this.prisma.tocken.update({
        where: { userId },
        data: { ...updateTockenData },
      });

      tocken = tockenData;
    } else {
      tocken = await this.prisma.tocken.create({
        data: { userId, refreshTocken },
      });
    }

    return tocken;
  }

  async signUp({ login, password }: CreateUserDto) {
    const newUser = await this.usersService.createUser({ login, password });
    const tockenData = await this.generateToken(newUser);
    this.saveTocken(newUser.id, tockenData.refreshTocken);
    return { user: newUser, ...tockenData };
  }

  async logIn({ login, password }: CreateUserDto) {
    const user = await this.validateUser({ login, password });
    const tocken = await this.generateToken(user);

    await this.saveTocken(user.id, tocken.refreshTocken);

    return { ...tocken };
  }

  async refresh(refreshTocken: { refreshTocken: string }) {
    if (!refreshTocken) {
      throw new HttpException('No refreshTocken!', HttpStatus.UNAUTHORIZED);
    }
    const refreshTokenInDataBase = await this.prisma.tocken.findFirst({
      where: { refreshTocken: refreshTocken.refreshTocken },
    });
    if (!refreshTokenInDataBase) {
      throw new HttpException('No tocken found!', HttpStatus.FORBIDDEN);
    }
    const user = await this.usersService.getUserById(
      refreshTokenInDataBase.userId,
    );
    const tokenData = await this.generateToken(user);
    this.saveTocken(user.id, tokenData.refreshTocken);
    return {
      ...tokenData,
    };
  }
}
