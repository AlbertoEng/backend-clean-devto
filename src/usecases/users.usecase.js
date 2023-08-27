const mongoose = require('mongoose');
const User = require('../models/User');
const createError = require('http-errors');
const bcrypt = require('../lib/bcrypt');

// POST /user
async function create( userData ){
    // verificar que el user existe  sino mandar un error
    const existUser = await User.findOne({ email: userData.email});
    if(existUser) throw new createError(412, "email already exist");
    
    const passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-.+]).{8,}$");
    if( !passwordRegex.test( userData.password )) throw new createError(400, "passwaord too weak");

    // guardar password encriptado
    userData.password = bcrypt.encrypt(userData.password);
    const newUser = await User.create( userData );
    return userData;
}

// GET /user/:id
async function getById( id ){
    // validar id antes de consultarlo en base de datos
    if( !mongoose.isValidObjectId(id) ) throw new createError(404, "invalid id");
    const user = await User.findById( id );
    if( !user ) throw new createError(404, "user not found");
     
}


module.exports = {
    create,
    getById
}