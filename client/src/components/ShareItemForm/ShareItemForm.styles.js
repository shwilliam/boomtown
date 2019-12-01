import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
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
  errorMessage: {
    color: 'firebrick',
    height: '2rem',
  },
  inlineIcon: {
    verticalAlign: 'text-bottom',
  },
}))

export default useStyles
