import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      minWidth: '400px',
    },
    margin: theme.spacing(2),
    padding: theme.spacing(2, 4, 3),
    backgroundColor: '#fff',
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 3,
    boxShadow: theme.shadows[5],
  },
}))

export default useStyles
