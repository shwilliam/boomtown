import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: 'transparent',
  },
}))

export default useStyles
