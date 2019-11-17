import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {Form, Field} from 'react-final-form'
import {useMutation} from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import {LOGIN_MUTATION, SIGNUP_MUTATION} from '../../graphql'
import {withStyles} from '@material-ui/core/styles'
import styles from './styles'
import validate from './helpers/validate'
import {AuthContext} from '../../context'

const AccountForm = ({classes, ...props}) => {
  const history = useHistory()
  // TODO: refactor to custom auth hook
  const [logIn, {data: signInData}] = useMutation(LOGIN_MUTATION)
  const [signUp, {data: signUpData}] = useMutation(SIGNUP_MUTATION)
  const [isSignUp, setIsSignUp] = useState(false)
  const {setActiveUser} = useContext(AuthContext)

  useEffect(() => {
    const userData = signUpData
      ? signUpData.signup
      : signInData && signInData.login

    if (userData) {
      setActiveUser(userData)
      history.push('/')
    }
  }, [signUpData, signInData, setActiveUser, history])

  const onSubmit = ({email, password, fullname}) =>
    isSignUp
      ? signUp({
          variables: {
            user: {
              fullname,
              email,
              password,
            },
          },
        })
      : logIn({
          variables: {
            user: {email, password},
          },
        })

  return (
    <Form
      onSubmit={onSubmit}
      validate={values => validate({isSignUp, ...values})}
      render={({handleSubmit}) => (
        <form
          onSubmit={handleSubmit}
          className={classes.accountForm}
          {...props}
        >
          {isSignUp && (
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="fullname">Full name</InputLabel>
              <Field
                name="fullname"
                render={({input, meta}) => (
                  <Input
                    id="fullname"
                    type="text"
                    error={meta.touched && !!meta.error}
                    inputProps={{
                      ...input,
                      autoComplete: 'off',
                    }}
                  />
                )}
              />
            </FormControl>
          )}
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Field
              name="email"
              render={({input, meta}) => (
                <Input
                  id="email"
                  type="text"
                  error={meta.touched && !!meta.error}
                  inputProps={{
                    ...input,
                    autoComplete: 'off',
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Field
              name="password"
              render={({input, meta}) => (
                <Input
                  id="password"
                  type="password"
                  error={meta.touched && !!meta.error}
                  inputProps={{
                    ...input,
                    autoComplete: 'off',
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Button
                type="submit"
                className={classes.formButton}
                variant="contained"
                size="large"
                color="secondary"
                disabled={false}
              >
                {isSignUp ? 'Create Account' : 'Enter'}
              </Button>
              <Typography>
                <button
                  className={classes.formToggle}
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp
                    ? 'Login to existing account.'
                    : 'Create an account.'}
                </button>
              </Typography>
            </Grid>
          </FormControl>
          <Typography className={classes.errorMessage}>
            {/* errors */}
          </Typography>
        </form>
      )}
    />
  )
}

export default withStyles(styles)(AccountForm)
