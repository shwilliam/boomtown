import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
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
    height: '2rem',
  },
}))

export default useStyles
