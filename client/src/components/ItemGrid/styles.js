import {red} from '@material-ui/core/colors'

const styles = ({theme}) => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
    fontSize: '1.6rem',
  },
  grid: {
    flexGrow: 1,
  },
})

export default styles
