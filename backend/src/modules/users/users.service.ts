import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';


// Should be coming from environment or config
const saltOrRounds = 10;

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }


    createHash(password: string) {
        return bcrypt.hashSync(password, saltOrRounds);
    }


    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new this.userModel({
            ...createUserDto,
            password: this.createHash(createUserDto.password)
        });
        return await user.save();
    }

    async findOne(query: FilterQuery<User> = {}): Promise<User> {
        return await this.userModel.findOne(query).lean()
    }
}
