import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    background: theme.palette.primary.main,
    padding: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(20),
    },
  },
}))

export default useStyles
