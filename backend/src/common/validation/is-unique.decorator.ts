import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';

interface UniqueValidationArguments extends ValidationArguments {
    constraints: [string];
}

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async validate(value: any, args: UniqueValidationArguments) {
        const [property] = args.constraints;
        const count = await this.userModel.countDocuments({ [property]: value });
        return count === 0;
    }

    defaultMessage(args: UniqueValidationArguments) {
        const [property] = args.constraints;
        return `${property} already exists`;
    }
}


export function IsUnique(
    property: string,
    validationOptions?: ValidationOptions,
) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsUniqueConstraint,
        });
    };
}
