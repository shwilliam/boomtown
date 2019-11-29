import isEmail from './isEmail'

export default function validate({
  isSignUp,
  fullname,
  email,
  password,
}) {
  const errors = {}

  if (isSignUp && !fullname) {
    errors.fullname = 'Please provide a name'
  } else if (isSignUp && fullname.length < 3) {
    errors.fullname = 'Name must at least 3 characters long'
  } else if (!email) {
    errors.email = `Please provide ${isSignUp ? 'an' : 'your'} email`
  } else if (isSignUp && !isEmail(email)) {
    errors.email = `Please provide a valid email`
  } else if (!password) {
    errors.password = `Please enter ${
      isSignUp ? 'a' : 'your'
    } password`
  } else if (isSignUp && password.length < 6) {
    errors.password = 'Password must at least 6 characters long'
  }

  return errors
}
