const styles = theme => ({
  title: {
    fontWeight: 400,
    color: 'white',
  },
  heroText: {
    fontWeight: 500,
    color: theme.palette.text.primary,
    fontSize: theme.typography.h3.fontSize,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.h1.fontSize,
    },
  },
  grid: {
    minHeight: '100vh',
    background: theme.palette.primary.main,
    padding: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(20),
    },
  },
})

export default styles
