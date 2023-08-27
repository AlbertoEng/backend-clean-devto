const express = require('express')
const users = require("../usecases/users.usecase")
const router = express.Router()

// Obtener informacion de un usuario por id 
router.get('/:id', async (request, response) => {
    try {
        const id = request.params.id
        const user = await users.getById(id)
    
        response.json({
            message: `User: ${user.name} id: ${id}`,
            data: { user }
        })
    } catch (error) {
            response.status(error.status || 500)
            response.json({
                message:"Something went wrong",
                error: error.message
            })
        }
    })
// Registrar un nuevo usuario
router.post('/', async (request, response) => {
    try {
        console.log('pase aqui')
        const userData = request.body
        const newUser = await users.create(userData)
    
        response.status(201)
        response.json({
            message: "User created",
            data: {
                user: newUser
            }
        })
    } catch (error) {
        const status = error.name === `ValidaitionError` ? 400 : 500
        response.status(status)
        response.json({
            message: "something went wrong",
            error: error.message
        })
    }
})

module.exports = router

