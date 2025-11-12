const jwt = require("jsonwebtoken")
const verifyJWT = (req, res, next) => {
    const autHeader = req.headers.authorization || req.headers.Authorization
    if (!autHeader?.startsWith("Bearer"))
        return res.status(401).send("Unautorized")
    const token = autHeader.split(" ")[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decode) => {
            if (err) 
                return res.status(403).send("forbidden" + err)
            req.user = decode
            next()
        }
    )
}
module.exports = verifyJWT