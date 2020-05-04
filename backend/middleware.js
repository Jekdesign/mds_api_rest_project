const jwt = require('jsonwebtoken');

const withAuth = (req, res, next) => {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    //var token = req.headers['x-access-token'] || '';
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.email = decoded.email;
                next();
            }
        });
    }
}

module.exports = withAuth;