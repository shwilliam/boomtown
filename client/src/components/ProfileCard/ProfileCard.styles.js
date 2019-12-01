import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: theme.spacing(3),
  },
  title: {
    fontSize: '2rem',
    fontWeight: 500,
  },
}))

export default useStyles
