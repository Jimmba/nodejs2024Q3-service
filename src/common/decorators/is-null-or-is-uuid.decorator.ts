import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { validate } from 'uuid';

export function IsUUIDOrNull(validationOptions?: ValidationOptions) {
  return function (object: Record<string, unknown>, propertyName: string) {
    registerDecorator({
      name: 'isUUIDOrNull',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value === null || validate(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a UUID or null`;
        },
      },
    });
  };
}
