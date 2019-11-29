import {red} from '@material-ui/core/colors'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '0 auto',
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
    fontSize: '2rem',
    fontWeight: 500,
  },
})

export default useStyles
