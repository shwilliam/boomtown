import React, {useState} from 'react'
import {Field, Form} from 'react-final-form'
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {useAuth} from '../../hooks'
import validate from './helpers/validate'

const useAccountFormStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },
  },
  formControl: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  formButton: {
    marginTop: theme.spacing(2),
  },
  formToggle: {
    background: 'none',
    border: 'none',
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  errorMessage: {
    color: 'firebrick',
  },
}))

const AccountForm = props => {
  const [isSignUp, setIsSignUp] = useState(false)
  const {signIn, signUp} = useAuth()
  const {
    root,
    formControl,
    formButton,
    formToggle,
    errorMessage,
  } = useAccountFormStyles()

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
      : signIn({
          variables: {
            user: {email, password},
          },
        })

  return (
    <Form
      onSubmit={onSubmit}
      validate={values => validate({isSignUp, ...values})}
      render={({handleSubmit}) => (
        <form onSubmit={handleSubmit} className={root} {...props}>
          {isSignUp && (
            <FormControl fullWidth className={formControl}>
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
          <FormControl fullWidth className={formControl}>
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
          <FormControl fullWidth className={formControl}>
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
          <FormControl className={formControl}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Button
                type="submit"
                className={formButton}
                variant="contained"
                size="large"
                color="secondary"
                disabled={false}
              >
                {isSignUp ? 'Create Account' : 'Enter'}
              </Button>
              <Typography>
                <button
                  className={formToggle}
                  type="button"
                  onClick={() => setIsSignUp(isSignUp => !isSignUp)}
                >
                  {isSignUp
                    ? 'Login to existing account.'
                    : 'Create an account.'}
                </button>
              </Typography>
            </Grid>
          </FormControl>
          <Typography className={errorMessage}>
            {/* errors */}
          </Typography>
        </form>
      )}
    />
  )
}

export default AccountForm
