export default function validate(values) {
  const errors = {}
  if (!values.email) {
    // TODO: email regex
    errors.email = 'Required'
  }
  if (!values.password) {
    // TODO: min length
    errors.password = 'Required'
  }
  // TODO: validate fullname
  return errors
}
