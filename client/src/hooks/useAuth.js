import {useContext, useEffect, useState} from 'react'
import {useMutation} from '@apollo/react-hooks'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../context'
import {LOGIN_MUTATION, SIGNUP_MUTATION} from '../graphql'

const formatAuthParams = d => ({
  variables: {
    user: {...d},
  },
})

const useAuth = () => {
  const history = useHistory()
  const [isSignUp, setIsSignUp] = useState(false)
  const {setActiveUser} = useContext(AuthContext)
  const [
    signIn,
    {data: signInData, error: signInError},
  ] = useMutation(LOGIN_MUTATION)
  const [
    signUp,
    {data: signUpData, error: signUpError},
  ] = useMutation(SIGNUP_MUTATION)

  useEffect(() => {
    const userData = signUpData
      ? signUpData.signup
      : signInData && signInData.login

    if (userData) {
      setActiveUser(userData)
      history.push('/')
    }
  }, [signUpData, signInData, setActiveUser, history])

  const authenticate = ({email, password, fullname}) =>
    isSignUp
      ? signUp(
          formatAuthParams({
            fullname,
            email,
            password,
          }),
        ).catch(console.error) // HACK: avoid throwing
      : signIn(formatAuthParams({email, password})).catch(
          console.error, // HACK: avoid throwing
        )

  const toggleSignUp = () => setIsSignUp(s => !s)

  return {
    authenticate,
    isSignUp,
    toggleSignUp,
    error: isSignUp ? signUpError : signInError,
  }
}

export default useAuth
