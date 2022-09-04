import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;

    // email 중복 체크
    const isCatExist = await this.catModel.exists({ email });
    if (isCatExist) {
      // 403 http exception과 동일
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    // 패스워드 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 디비에 저장
    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });

    // 만든 virtual data를 return 한다.
    return cat.readOnlyData;
  }
}
