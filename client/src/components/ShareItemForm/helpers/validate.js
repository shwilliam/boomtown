const validate = ({title, desc}) => {
  let errors = {}
  if (!title) {
    errors.title = 'Please enter a title'
  } else if (title.length < 3) {
    errors.title = 'Title must at least 3 characters long'
  }
  if (!desc) {
    errors.desc = 'Please include a description'
  } else if (desc.length < 8) {
    errors.desc = 'Item description must at least 8 characters long'
  }
  return errors
}

export default validate
