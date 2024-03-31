export const createAttendanceSchemaValidation = {
  notes: {
    trim: true,
    optional: true
  },
  proof_of_work_picture_url: {
    trim: true,
    notEmpty: true,
    errorMessage: 'Picture is required'
  }
}
