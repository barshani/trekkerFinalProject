const jwt = require('jsonwebtoken');
const config = require('../config/dev');

module.exports = (req, res, next) => {
    // קבל את הטוקן מהכותרת Authorization
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    // הפורמט הוא "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token missing' });

    try {
        const decoded = jwt.verify(token, config.jwt_token);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};