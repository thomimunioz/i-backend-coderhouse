export const isUser = (req, res, next) => {

    if (!req.session.user) {
        return res.redirect('/login')
    }

    if (req.session.user.role !== 'user') {
        return res.status(403).send('Acceso denegado')
    }

    next()
}