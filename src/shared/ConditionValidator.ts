interface ValidationI {
  condition: boolean;
  message: string;
}
export class ConditionValidator {
  errors: string[] = [];

  constructor({ validations }: { validations?: ValidationI[] }) {
    validations && this.validate(validations);
  }

  validate(validations: ValidationI[]): void {
    validations.forEach((validation) => {
      if (validation.condition) this.errors.push(validation.message);
    });
  }

  isEmpty = () => {
    return this.errors.length === 0;
  };

  isValid(): boolean {
    return this.isEmpty();
  }

  toString = () => {
    return `${this.errors.join("; ")}`;
  };
}
