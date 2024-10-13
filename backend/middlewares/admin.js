
module.exports = function (req,res,next) {
    try {
        console.log(`User role: ${req.user.role}`);

        if(req.user && req.user.role === 'admin'){
            next();
        }else{
            res.status(403).json({message: 'acces denied , for admin only'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

