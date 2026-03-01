import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isMatchedWithConstraint', async: false })
class IsMatchedWithConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    return args.object[args.constraints[0] as string] == value;
  }
  defaultMessage(args: ValidationArguments): string {
    // return `${args.object[args.constraints[0] as string]} Doesn't match ${args.object[args.property]}`;

    return `${args.constraints[0]} Doesn't match ${args.property}`;
  }
}

export function IsMatchedWith(
  matchWith: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isMatchedWith',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [matchWith],
      options: validationOptions,
      validator: IsMatchedWithConstraint,
    });
  };
}
