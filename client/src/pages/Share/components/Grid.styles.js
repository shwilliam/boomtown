import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
    maxWidth: '960px',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
    },
  },
}))

export default useStyles
