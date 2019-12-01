import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  submitBtn: {
    display: 'block',
  },
}))

export default useStyles
