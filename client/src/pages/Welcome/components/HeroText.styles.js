import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    fontWeight: 500,
    color: theme.palette.text.primary,
    fontSize: theme.typography.h3.fontSize,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.h1.fontSize,
    },
  },
}))

export default useStyles
