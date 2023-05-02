const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        try {
            const decoded = jwt.verify(token.split(" ")[1],"masai");
            if(decoded){
                req.body.authorId= decoded.authorId;
                req.body.author = decoded.author;
                next();
            }else{
                res.status(200).send({"message":"Please Login"})
            }
        } catch (error) {
            res.status(200).send({"message":error.message})
        }
    }else{
        res.status(200).send({"message":"Please Login"})
    }
}

module.exports={
    auth,
}