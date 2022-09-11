
const roleValidation = (roles) => (req, res, next) => {
    // ['ADMIN', 'USER']
    if (req.session.user && roles.includes(req.session.user.role)) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}


module.exports = {
    roleValidation
}