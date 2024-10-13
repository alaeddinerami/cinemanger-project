const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = function(roles = []){
 return async function (req, res, next) {
  
  let token;
  if (req.headers.authorization ){
    token = req.headers.authorization.split(" ")[1];
    // console.log(token);
  }
  if(!token){
    return res.status(401).json({ message: "you are not logged" });
    
  }
  try{
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decoded);
  const currentUser = await User.findById(decoded.id );
  if(!currentUser){
     return res.status(401).json({ message: "the user deos not belong to this token" });
  }
    req.user = currentUser;
    // console.log(currentUser)
    if (roles.length && !roles.includes(currentUser.role)) {
      return res.status(403).json({ message: "Access forbidden: You do not have the required role" });
    }
    next(); 
  
  }catch(error){
      res.status(401).json({ message: "Token is not valid" });
  }
};
}
