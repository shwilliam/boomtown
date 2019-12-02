import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  menuButton: {
    marginRight: 'auto',
  },
  menuButtonIcon: {
    height: '50px',
  },
  shareButton: {
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: `${theme.palette.secondary.main}20`,
    },
  },
}))

export default useStyles
