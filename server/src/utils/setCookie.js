const setCookie = ({tokenName, token, res}) => {
  res.cookie(tokenName, token, {
    // httpOnly: true,
    secure: Boolean(process.env.NODE_ENV === 'production'),
    maxAge: 7200000, // 2 hrs
  })
}

module.exports = {setCookie}
