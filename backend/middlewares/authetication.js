import jwt from 'jsonwebtoken'

export const verifyJwtToken = (req,res,next)=>{

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
      
        if (token == null) return res.sendStatus(401)
      
        jwt.verify(token, process.env.JWT_SECRET_KEY , (err, user) => {
          if (err) {
            res.status(200).json({
                 message: "UnAuthenticated",
                success: false,
              });
          }
      else{
        console.log("this is user",user)
        req.user = user
        next()
      }
          
        })
      
}