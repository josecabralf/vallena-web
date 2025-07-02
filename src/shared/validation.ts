export class CheckValue {
  static isEmptyString = (value?: any) => {
    return value === "";
  };

  static isUndefined = (value?: any) => {
    return value === undefined || value === null;
  };

  static isArray = (value?: any) => {
    return Array.isArray(value);
  };

  static isObject = (value?: any) => {
    return value !== null && typeof value === "object";
  };

  static isEmptyArray = (value?: any) => {
    return Array.isArray(value) && value.length === 0;
  };

  static isEmptyObject = (value?: any) => {
    return CheckValue.isObject(value) && Object.keys(value).length === 0;
  };

  static arrayLength = (value?: any): number => {
    return CheckValue.isArray(value) ? value.length : 0;
  };
}

export class Phone {
  static readonly PHONE_REGEX = /^[0-9]{10}$/;

  static isValid = (phone?: string) => {
    return !CheckValue.isUndefined(phone) && Phone.PHONE_REGEX.test(phone!);
  };
}

export class Email {
  static readonly EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  static isValid = (mail?: string) => {
    return !CheckValue.isUndefined(mail) && Email.EMAIL_REGEX.test(mail!);
  };
}

export class DNI {
  static readonly DNI_REGEX = /^\d{7,8}$/;

  static isValid = (dni?: string) => {
    return !CheckValue.isUndefined(dni) && DNI.DNI_REGEX.test(dni!);
  };
}

export class DateValidator {
  static dateRegex = /^(?:\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2})$/;

  static isValidDate(date: string): boolean {
    return this.dateRegex.test(date);
  }
}

export class InputValidator {
  static requireDigit = (value: string) => {
    return /\d/.test(value);
  };

  static requireLowercase = (value: string) => {
    return /[a-z]/.test(value);
  };

  static requireUppercase = (value: string) => {
    return /[A-Z]/.test(value);
  };

  static requireNonAlphanumeric = (value: string) => {
    return /[^a-zA-Z0-9]/.test(value);
  };

  static requireLength = (value: string, length: number) => {
    return value.length >= length;
  };

  static requireExactLength = (value: string, length: number) => {
    return value.length === length;
  };

  static respectsAllowedCharacters = (value: string) => {
    return /^[a-zA-Z0-9]+$/.test(value);
  };
}
