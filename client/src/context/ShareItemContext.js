import React, {createContext, useState} from 'react'
import PropTypes from 'prop-types'

const ShareItemContext = createContext()

const initialValues = {
  title: '',
  desc: '',
  tags: [],
}

const ShareItemContextProvider = ({children}) => {
  const [formValues, setFormValues] = useState(initialValues)

  const setFormFieldValue = (name, value) =>
    setFormValues(formValues => ({...formValues, [name]: value}))

  const onFormReset = () => setFormValues(initialValues)

  return (
    <ShareItemContext.Provider
      value={{formValues, setFormFieldValue, onFormReset}}
    >
      {children}
    </ShareItemContext.Provider>
  )
}

ShareItemContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default ShareItemContext
export {ShareItemContextProvider}
