export default function validate({isSignUp, ...values}) {
  const errors = {}
  if (!values.email) {
    // TODO: email regex
    errors.email = 'Required'
  }
  if (!values.password) {
    // TODO: min length
    errors.password = 'Required'
  }
  if (isSignUp && !values.fullname) {
    // TODO: min length?
    errors.fullname = 'Required'
  }
  return errors
}
