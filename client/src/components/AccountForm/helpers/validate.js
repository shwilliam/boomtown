import isEmail from './isEmail'

const validate = ({isSignUp, fullname, email, password}) => {
  const errors = {}

  if (isSignUp && !fullname) {
    errors.fullname = 'Please provide a name'
  } else if (isSignUp && fullname.length < 3) {
    errors.fullname = 'Name must at least 3 characters long'
  }
  if (!email) {
    errors.email = `Please provide ${isSignUp ? 'an' : 'your'} email`
  } else if (!isEmail(email)) {
    errors.email = isSignUp
      ? 'Please provide a valid email'
      : "That email doesn't look quite right"
  }
  if (!password) {
    errors.password = `Please enter ${
      isSignUp ? 'a' : 'your'
    } password`
  } else if (isSignUp && password.length < 6) {
    errors.password = 'Password must at least 6 characters long'
  }

  return errors
}

export default validate
