const {verifyToken} = require('../helpers/generateToken');
const userModel = require('../models/user');

const checkRoleAuth = (roles) => async (req, res,next ) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token); 
        const userData = await userModel.findById(tokenData._id);

        if([].concat(roles).includes(userData.role)) {
            next();
        }else{
            res.status(409).send("No tienes permisos");
        }
    } catch (error) {
        res.status(500).send("Error en la validación del Rol");
    }
        
};

module.exports = checkRoleAuth;