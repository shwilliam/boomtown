const styles = theme => ({
  formControl: {
    marginBottom: theme.spacing.unit * 2,
    width: '100%',
  },
  formButton: {
    marginTop: theme.spacing.unit * 2,
  },
  form: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },
  },
  errorMessage: {
    color: 'firebrick',
  },
})

export default styles
