module.exports = function authorizationMiddleware(roles) {
  return (req, res, next) => {
      console.log('Authorization middleware invoked');
      const userRole = req.user.role;
      console.log('User role:', userRole);
      console.log('Allowed roles:', roles);
      if (!roles.includes(userRole)) {
          console.log('Unauthorized access');
          return res.status(403).json("Unauthorized access");
      }
      console.log('Authorized access');
      next();
  };
};
