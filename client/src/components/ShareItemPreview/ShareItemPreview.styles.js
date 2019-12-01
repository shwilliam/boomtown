import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
}))

export default useStyles
