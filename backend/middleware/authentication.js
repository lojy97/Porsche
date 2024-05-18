const jwt = require('jsonwebtoken');

module.exports = function authenticationMiddleware(allowedRoles) {
    return (req, res, next) => {
        const secretKey = process.env.SECRET_KEY;

        const token = req.cookies.jwt; // Retrieve JWT token from cookie

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return res.status(403).json({ message: "Invalid token" });
            }

            const userRole = decoded.role;
            console.log('User role:', userRole);
            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({ message: "Access forbidden: Insufficient rights" });
            }

            // Extract customer ID from the decoded JWT token and attach it to req.user
            req.user = {
                ...decoded,
                customerId: decoded.customerId // Assuming customerId is present in the JWT payload
            };
            
            next();
        });
    };
};
