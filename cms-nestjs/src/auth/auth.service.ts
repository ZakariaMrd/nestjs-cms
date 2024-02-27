import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ReadUserDto } from './dto/read-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(readUserDto: ReadUserDto) {
    const foundUser = await this.userService.findOne(readUserDto.email);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    /*     if (foundUser.password !== readUserDto.password) {
      throw new NotFoundException('Password is incorrect');
    } */
    const match = await bcrypt.compare(
      readUserDto.password,
      foundUser.password,
    );
    if (!match) {
      throw new Error('Invalid credentials');
    }
    const payload = {
      createdAt: new Date().toISOString(),
      sub: foundUser._id,
      role: '',
    };
    if (foundUser.email === 'zakaria@gmail.com') {
      payload.role = 'admin';
    } else {
      payload.role = 'user';
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
