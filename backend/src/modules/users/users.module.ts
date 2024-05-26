import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { IsUniqueConstraint } from 'src/common/validation/is-unique.decorator';

@Module({
  controllers: [UsersController],
  providers: [UsersService, IsUniqueConstraint],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  exports: [UsersService, IsUniqueConstraint]
})
export class UsersModule { }
