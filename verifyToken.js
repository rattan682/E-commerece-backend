const { cookieExtractor } = require("./CookieExtractor")
const jwt=require("jsonwebtoken")
const verifytoken=(req,res,next)=> {
    const token = cookieExtractor(req);
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid Token');
      }
      
      req.user = decoded;
      next();
    });
  };
module.exports={
    verifytoken
}