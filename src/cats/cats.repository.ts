import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findCatByEmail(email: string): Promise<Cat | null> {
    const user = await this.catModel.findOne({ email });
    return user;
  }

  async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
    // 해당하는 필드 중 password를 제외하고 가져온다. (원하는 것만 가져오려면 email name )
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result: any = await this.catModel.exists({ email });
    return result;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
