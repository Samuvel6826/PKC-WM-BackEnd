const express = require('express')
const UsersController = require('../controller/users')
const router = express.Router()
const auth = require('../common/Auth')

router.get('/',auth.validate,auth.adminGuard,UsersController.getUsers)

router.get('/:id',auth.validate, UsersController.getUserById)

router.post('/',UsersController.createUser)

router.put('/:id',auth.validate,auth.adminGuard,UsersController.editUserById)

router.delete('/:id',auth.validate,auth.adminGuard,UsersController.deleteUserById)

router.post('/login',UsersController.loginUser)

router.put('/change-password/:id',auth.validate,UsersController.changePassword)

module.exports = router
