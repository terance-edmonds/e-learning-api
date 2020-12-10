const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, "asdasdasscvsuhsfkjsf54f1s21f0s3afasfasdfawer01");
        req.userData = decode;
        next();
    }catch{
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}