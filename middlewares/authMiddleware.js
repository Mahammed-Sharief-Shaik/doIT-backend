import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'Hello@123';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {res.status(401).json({
        message: "Unauthorized access (no token)"
    });return;}

    const token = authHeader.split(' ')[1];

    try {
        const decodedUser = jwt.verify(token, JWT_SECRET);
        req.user = decodedUser;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token", error });
    }
}

export default authMiddleware;