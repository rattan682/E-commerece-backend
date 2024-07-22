const cookieExtractor = (req) => {
    var token = null;
    if (req && req.cookies) {
      token = req.cookies['jwt']; // Adjust the cookie name if necessary
    }
    return token;
  };
  
  module.exports = {
    cookieExtractor
  };