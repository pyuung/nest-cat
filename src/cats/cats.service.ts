import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;

    // email 중복 체크
    const isCatExist = await this.catsRepository.existsByEmail(email);
    if (isCatExist) {
      // 403 http exception과 동일
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    // 패스워드 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 디비에 저장
    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    // 만든 virtual data를 return 한다.
    return cat.readOnlyData;
  }
}
