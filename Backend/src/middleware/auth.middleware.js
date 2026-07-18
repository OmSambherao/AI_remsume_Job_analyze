const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklist.model');

async function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Token not provided ' });
    }

    const tokenBlackListed = await blackListTokenModel.findOne({ token });

    if( tokenBlackListed ){
        return res.status( 400 ).json({
            massage: " token no valid "
        })
    }

    try{

        const decoded = await jwt.verify(token , process.env.JWT_SECRET);

        req.user = decoded;

        next();

    }catch{
        return res.status( 400).json({
            massage: " token no valid "
        })
    }

}

module.exports = authMiddleware;
