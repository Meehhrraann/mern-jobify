// use it after create token in controller
const attachCookies = ({res, token}) => {
    const oneDay = 1000 * 24 * 60 * 60 // expires date
    res.cookie('token', token,{
        httpOnly: true, // only the browser can access to the cookie
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    })
}

export default attachCookies