const jwt = require("jsonwebtoken");

exports.identifer =  (role = []) => async  (req ,res, next) => {

    console.log("Headers:");
    console.log("Cookies:", req.cookies);
    let token = req.headers.authorization || req.cookies['Authorization'];

    console.log("Received Token:", token);
    if(!token ){
        return res.status(401).json({
            message : "You are not authorized"
        })
    }
     try {
        if(token.startsWith("Bearer ")){
            token = token.split(" ")[1];
        }
        
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
         console.log( "Decoded JWT :" , decoded );

         if(role.length && !role.includes(decoded.role)){
            return res.status(401).json({
                message : "You are not authorized"
            })
         }
         
         req.user = decoded
         next();
     } catch (error) {
          return res.status(401).json({
            message : "You are not authorized"
        })
     }

}