import {useState} from 'react'

const useLocalStorage = (key, initialVal) => {
  const [localVal, setLocalVal] = useState(() => {
    try {
      const localVal = window.localStorage.getItem(key)
      return localVal && localVal !== 'undefined'
        ? JSON.parse(localVal)
        : initialVal
    } catch (e) {
      console.error(e)
      return initialVal
    }
  })

  const setVal = val => {
    try {
      setLocalVal(val)
      window.localStorage.setItem(key, JSON.stringify(val))
    } catch (e) {
      console.error(e)
    }
  }

  return [localVal, setVal]
}

export default useLocalStorage
