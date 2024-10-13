const clientMidd = (req, res, next) => {
    try {
        if (req.user && req.user.role !== 'client') {
            return res.status(403).json({ message: 'Access denied, for clients only' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = clientMidd;
