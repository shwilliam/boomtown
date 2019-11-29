import {useContext, useEffect} from 'react'
import {useMutation} from '@apollo/react-hooks'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../context'
import {LOGIN_MUTATION, SIGNUP_MUTATION} from '../graphql'

const callableWithUserVariables = fn => d =>
  fn({
    variables: {
      user: {...d},
    },
  })

const useAuth = () => {
  const history = useHistory()
  const {setActiveUser} = useContext(AuthContext)
  const [signIn, {data: signInData}] = useMutation(LOGIN_MUTATION)
  const [signUp, {data: signUpData}] = useMutation(SIGNUP_MUTATION)

  useEffect(() => {
    const userData = signUpData
      ? signUpData.signup
      : signInData && signInData.login

    // TODO: render error msg

    if (userData) {
      setActiveUser(userData)
      history.push('/')
    }
  }, [signUpData, signInData, setActiveUser, history])

  return {
    signIn: callableWithUserVariables(signIn),
    signUp: callableWithUserVariables(signUp),
  }
}

export default useAuth
