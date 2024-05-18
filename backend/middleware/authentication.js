const jwt = require('jsonwebtoken');

module.exports = function authenticationMiddleware(allowedRoles) {
    return (req, res, next) => {
        const secretKey = process.env.SECRET_KEY;
        const cookies = req.cookies;

        if (!cookies) {
            return res.status(401).json({ message: "No Cookie provided" });
        }

        const token = cookies.jwt;
        if (!token) {
            return res.status(405).json({ message: "No token provided" });
        }

        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return res.status(403).json({ message: "Invalid token" });
            }

            const userRole = decoded.role;
            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({ message: "Access forbidden: Insufficient rights" });
            }

            req.user = decoded;
            next();
        });
    };
};
