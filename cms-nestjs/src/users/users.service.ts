import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashPassword;
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async loginUser(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      const match = await bcrypt.compare(createUserDto.password, user.password);
      if (match) return 'Credentials are correct!';
      else throw new Error('Wrong Credentials');
    }
    throw new Error('User not found');
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
}
