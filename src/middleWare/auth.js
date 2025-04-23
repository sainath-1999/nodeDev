
const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminAuthurization = token === "xynjz";

    if(!isAdminAuthurization) {
        res.status(401).send("Unauthorised resquest!!!")
    }else{
        next();
    }
}

const userAuth = (req,res,next) => {
    const token = "xyx";
    const isUserAuthenticated = token ==="xyx";

    if(!isUserAuthenticated){
        res.status(401).send("Unauthorised user request!!!")
    }else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}