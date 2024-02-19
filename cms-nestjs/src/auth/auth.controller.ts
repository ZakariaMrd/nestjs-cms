import { Body, Controller, Post } from '@nestjs/common';
import { ReadUserDto } from './dto/read-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() readUserDto: ReadUserDto) {
    return this.authService.login(readUserDto);
  }
}
