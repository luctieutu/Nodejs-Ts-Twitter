export const USER_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_MUST_BE_FROM_6_TO_50: 'Password length must between from 6 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Passowrd must be leat 6 characters and contain at leats 1 lowercase letter, 1 uppercase letterm, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_BE_STRONG:
    'Confirm passowrd must be leat 6 characters and contain at leats 1 lowercase letter, 1 uppercase letterm, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Password confirmation does not match password',
  DATE_OF_BIRH_MUST_BE_ISO8601: 'Date of birth must be ISO8601'
} as const
