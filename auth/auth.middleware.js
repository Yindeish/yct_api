const authorize_page = async (req, res, next) => {
    if (!req.cookies.token || req.cookies.token === '') {
        res.status(401).json({ msg: 'Unauthorized!', code: 401 })
    } else {
        console.log('req.cookies.token', req.cookies.token, req.cookies);
        next();
    }
}

export { authorize_page }