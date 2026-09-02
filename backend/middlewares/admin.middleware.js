


const isAdmin = (req, res, next) => {

    if(!req.user){
        return res.status(401).json({
            success : false,
            message : "Unauthorized user not authentificated"
        });
    }

    if(req.user.role !== "ADMIN"){
        return res.status(403).json({
            success : false,
            message : "Forbidden -admin access only"
        });
    }

    next();
}

export default isAdmin;