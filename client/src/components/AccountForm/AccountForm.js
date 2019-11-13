import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import styles from './styles'
import {LOGIN_MUTATION} from '../../apollo/queries'
import {useMutation} from '@apollo/react-hooks'

const AccountForm = ({classes, ...props}) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [logIn, {data}] = useMutation(LOGIN_MUTATION)

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        isSignUp
          ? console.log('sign up')
          : logIn({
              variables: {
                user: {email: 'mail@mail.com', password: 'password'},
              },
            })
      }}
      className={classes.accountForm}
      {...props}
    >
      {isSignUp && (
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="fullname">Username</InputLabel>
          <Input
            id="fullname"
            type="text"
            inputProps={{
              autoComplete: 'off',
            }}
          />
        </FormControl>
      )}
      <FormControl fullWidth className={classes.formControl}>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          type="text"
          inputProps={{
            autoComplete: 'off',
          }}
        />
      </FormControl>
      <FormControl fullWidth className={classes.formControl}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          type="password"
          inputProps={{
            autoComplete: 'off',
          }}
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
            {!isSignUp ? 'Enter' : 'Create Account'}
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
  )
}

export default withStyles(styles)(AccountForm)
