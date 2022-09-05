import { LoginRequestDto } from './../auth/dto/login.request.dto';
import { AuthService } from './../auth/auth.service';
import { CatsService } from './cats.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly CatsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 200, description: '성공', type: ReadOnlyCatDto })
  @ApiResponse({ status: 500, description: 'Server Error' })
  async signUp(@Body() body: CatRequestDto) {
    return await this.CatsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: '업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
