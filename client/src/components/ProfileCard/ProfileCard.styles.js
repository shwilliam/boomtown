import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      width: '650px',
    },
  },
  title: {
    fontSize: '2rem',
    fontWeight: 500,
  },
}))

export default useStyles
