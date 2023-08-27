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
async function getById(){

}


module.exports = {
    create,
    getById
}