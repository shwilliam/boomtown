const setCookie = ({tokenName, token, res}) => {
  res.cookie(tokenName, token, {
    // httpOnly: true,
    secure: Boolean(process.env.NODE_ENV === 'production'),
    maxAge: 1800000, // 30 min
  })
}

module.exports = {setCookie}
