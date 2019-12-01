import {makeStyles} from '@material-ui/styles'

const useModalStyles = makeStyles(theme => ({
  modal: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    margin: theme.spacing(2),
    padding: theme.spacing(2, 4, 3),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 3,
    boxShadow: theme.shadows[5],
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

export default useModalStyles
