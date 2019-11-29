import {grey} from '@material-ui/core/colors'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  rootDark: {
    padding: theme.spacing(2),
    backgroundColor: grey[900],
  },
}))

export default useStyles
