const jwt = require('jsonwebtoken');
const SECURITY_KEY = process.env.SECURITY_KEY;

module.exports = (req, res, next)=>{
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access denied');
    try {
        const verified = jwt.verifief(token, SECURITY_KEY);
        req.user = verified
        next();
    } catch (error) {
        return res.status(400).send('Invalid token')
    }
}