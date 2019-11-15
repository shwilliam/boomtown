export default function validate(values) {
  const errors = {}
  if (!values.title) {
    // TODO: min length
    errors.title = 'Required'
  }
  if (!values.desc) {
    // TODO: min length
    errors.desc = 'Required'
  }
  return errors
}
