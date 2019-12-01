import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    border: 'none',
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

export default useStyles
