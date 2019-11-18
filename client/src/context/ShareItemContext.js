import React, {createContext, useState} from 'react'

const ShareItemContext = createContext()

const ShareItemContextProvider = ({children}) => {
  const [formValues, setFormValues] = useState({
    title: '',
    desc: '',
    tags: [],
  })

  const setFormFieldValue = (name, value) =>
    setFormValues({...formValues, [name]: value})

  return (
    <ShareItemContext.Provider
      value={{formValues, setFormFieldValue}}
    >
      {children}
    </ShareItemContext.Provider>
  )
}

export default ShareItemContext
export {ShareItemContextProvider}
