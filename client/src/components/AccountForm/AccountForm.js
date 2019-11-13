import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import styles from './styles'

class AccountForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formToggle: true,
    }
  }

  render() {
    const {classes} = this.props

    return (
      <form
        onSubmit={e => {
          e.preventDefault()
          console.log('Submitted')
        }}
        className={classes.accountForm}
      >
        {!this.state.formToggle && (
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
              disabled={
                false // @TODO: This prop should depend on pristine or valid state of form
              }
            >
              {this.state.formToggle ? 'Enter' : 'Create Account'}
            </Button>
            <Typography>
              <button
                className={classes.formToggle}
                type="button"
                onClick={() => {
                  // @TODO: Reset the form on submit
                  this.setState({
                    formToggle: !this.state.formToggle,
                  })
                }}
              >
                {this.state.formToggle
                  ? 'Create an account.'
                  : 'Login to existing account.'}
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
}

export default withStyles(styles)(AccountForm)
