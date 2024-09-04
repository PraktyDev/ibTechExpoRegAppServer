import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Unauthorized: No token provided or invalid format' });
    }
    const token = header.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_KEY);
        req.user = decodedToken;
        next(); 
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ msg: 'Unauthorized: Invalid token' });
    }
}
