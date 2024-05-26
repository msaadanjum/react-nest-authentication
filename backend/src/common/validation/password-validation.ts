import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isCustomStrongPassword', async: false })
export class IsCustomStrongPasswordConstraint
    implements ValidatorConstraintInterface {
    validate(password: string, args: ValidationArguments) {
        // Custom validation logic
        return (
            /[A-Z]/.test(password) && // must have at least one uppercase letter
            /[a-z]/.test(password) && // must have at least one lowercase letter
            /[0-9]/.test(password) && // must have at least one digit
            /[\W_]/.test(password) && // must have at least one special character
            password.length >= 8 // must be at least 8 characters long
        );
    }

    defaultMessage(args: ValidationArguments) {
        const errors = [];
        const value = args.value as string;

        if (!/[A-Z]/.test(value)) {
            errors.push('at least one uppercase letter');
        }
        if (!/[a-z]/.test(value)) {
            errors.push('at least one lowercase letter');
        }
        if (!/[0-9]/.test(value)) {
            errors.push('at least one digit');
        }
        if (!/[\W_]/.test(value)) {
            errors.push('at least one special character');
        }
        if (value.length < 8) {
            errors.push('at least 8 characters long');
        }

        return `Password must contain ${errors.join(', ')}.`;
    }
}

export function IsCustomStrongPassword(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCustomStrongPasswordConstraint,
        });
    };
}
