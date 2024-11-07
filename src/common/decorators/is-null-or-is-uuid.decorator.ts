import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { validate } from 'uuid';

export function IsUUIDOrNull<T>(validationOptions?: ValidationOptions) {
  return function (object: T, propertyName: string) {
    registerDecorator({
      name: 'isUUIDOrNull',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (typeof value === 'string') {
            return validate(value);
          }
          return value === null;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a UUID or null`;
        },
      },
    });
  };
}
