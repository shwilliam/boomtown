import {grey} from '@material-ui/core/colors'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
  },
  rootDark: {
    minHeight: '100vh',
    backgroundColor: grey[900],
  },
  body: {
    padding: theme.spacing(2),
  },
}))

export default useStyles
