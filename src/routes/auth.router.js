const express = require("express")
const authUsecase = require("../usecases/auth.usecase")

const router = express.Router()

// /auth/login
router.post('/login', async (request, response) => {
    try {
        const {email, password} = request.body
        const token = await authUsecase.login(email, password)

        response.json({
            message: "logged in",
            data: {
                token
            }
        })
    } catch (error) {
        const status = error.name === "ValidationError" ? 404 : 500
        response.status(status)
        response.json({
            message: "something went wrong", 
            error: error.message
        })
    }
})



module.exports = router