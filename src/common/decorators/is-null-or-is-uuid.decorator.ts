import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { validate } from 'uuid';

export function IsUUIDOrNull(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUUIDOrNull',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value === null || validate(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a UUID or null`;
        },
      },
    });
  };
}
