import React from 'react'
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
import validate from './helpers/validate'
import useStyles from './AccountForm.styles'

const AccountForm = props => {
  const {
    authenticate,
    isSignUp,
    error: authError,
    toggleSignUp,
  } = useAuth()
  const styles = useStyles()

  return (
    <Form
      onSubmit={authenticate}
      validate={values => validate({isSignUp, ...values})}
      render={({
        handleSubmit,
        pristine,
        touched,
        errors,
        invalid,
      }) => (
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
          <Typography className={styles.errorMessage}>
            {authError
              ? authError.message.includes('ECONNREFUSED')
                ? 'Unable to establish database connection'
                : authError.message.replace(/GraphQL error: /, '')
              : (errors && (touched.fullname && errors.fullname)) ||
                (touched.email && errors.email) ||
                (touched.password && errors.password)}
          </Typography>
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
                disabled={pristine || invalid}
              >
                {isSignUp ? 'Create Account' : 'Enter'}
              </Button>
              <Typography>
                <button
                  className={styles.formToggle}
                  type="button"
                  onClick={toggleSignUp}
                >
                  {isSignUp
                    ? 'Login to existing account.'
                    : 'Create an account.'}
                </button>
              </Typography>
            </Grid>
          </FormControl>
        </form>
      )}
    />
  )
}

export default AccountForm
