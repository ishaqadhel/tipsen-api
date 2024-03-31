export const createUserSchemaValidation = {
  name: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Name is required'
  },
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
  },
  gender: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Gender is required',
    isIn: { options: ['M', 'W'], errorMessage: 'Gender must M or W' }
  },
  position_id: {
    trim: true,
    notEmpty: true,
    isNumeric: true,
    errorMessage: 'Position id is required and must be a number'
  }
}
