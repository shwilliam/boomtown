import React, {useState, useEffect} from 'react'
import {Form, Field} from 'react-final-form'
import {useMutation} from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {LOGIN_MUTATION, SIGNUP_MUTATION} from '../../graphql'
import styles from './styles'
import validate from './helpers/validate'

const AccountForm = ({classes, ...props}) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [logIn, {data: signInData}] = useMutation(LOGIN_MUTATION)
  const [signUp, {data: signUpData}] = useMutation(SIGNUP_MUTATION)

  useEffect(() => {
    // TODO: store user data in context
    if (signUpData) {
      console.log(signUpData.signup)
    } else if (signInData) {
      console.log(signInData.login)
    }
  }, [signUpData, signInData])

  const onSubmit = ({email, password, fullname}) => {
    console.log(email, password, fullname)
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
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
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
                render={({input}) => (
                  <Input
                    id="fullname"
                    type="text"
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
