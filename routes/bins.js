const express = require('express')
const BinsController = require('../controller/bins')
const router = express.Router()

router.get('/',BinsController.getUsers)

router.get('/:id',BinsController.getUserById)

router.post('/',BinsController.createUser)

router.put('/:id',BinsController.editUserById)

router.delete('/:id',BinsController.deleteUserById)

module.exports = router