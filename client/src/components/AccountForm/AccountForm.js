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
import {useAuth} from '../../hooks'
import useAccountFormStyles from './AccountForm.styles'
import validate from './helpers/validate'

const AccountForm = props => {
  const [isSignUp, setIsSignUp] = useState(false)
  const {signIn, signUp} = useAuth()
  const styles = useAccountFormStyles()

  const onSubmit = ({email, password, fullname}) =>
    isSignUp
      ? signUp({
          fullname,
          email,
          password,
        })
      : signIn({email, password})

  return (
    <Form
      onSubmit={onSubmit}
      validate={values => validate({isSignUp, ...values})}
      render={({handleSubmit, pristine, errors, touched}) => (
        <form
          onSubmit={handleSubmit}
          className={styles.root}
          {...props}
        >
          {isSignUp && (
            <FormControl fullWidth className={styles.formControl}>
              <InputLabel htmlFor="fullname">Full name</InputLabel>
              <Field name="fullname">
                {({input, meta}) => (
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
              </Field>
            </FormControl>
          )}
          <FormControl fullWidth className={styles.formControl}>
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
          <FormControl fullWidth className={styles.formControl}>
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
          <FormControl className={styles.formControl}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Button
                type="submit"
                className={styles.formButton}
                variant="contained"
                size="large"
                color="secondary"
                disabled={pristine}
              >
                {isSignUp ? 'Create Account' : 'Enter'}
              </Button>
              <Typography>
                <button
                  className={styles.formToggle}
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
          <Typography className={styles.errorMessage}>
            {(errors && (touched.fullname && errors.fullname)) ||
              (touched.email && errors.email) ||
              (touched.password && errors.password)}
          </Typography>
        </form>
      )}
    />
  )
}

export default AccountForm
