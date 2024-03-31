export const loginSchemaValidation = {
  email: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Email is required'
  },
  password: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Password is required',
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password minimum is 8 characters'
    }
  }
}
