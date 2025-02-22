const jwt = require("jsonwebtoken");

exports.identifer = (req ,res, next) => {
    let token = rq.headers.authorization || req.cookies['Authorization'];
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

         if(role.length && !roles.includes(decoded.role)){
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