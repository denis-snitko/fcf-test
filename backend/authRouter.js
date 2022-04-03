const Router = require('express')
const controller = require('./authController')
const { check } = require('express-validator')

const router = new Router

router.post('/registration', [
  check('userName', 'Имя пользователя не может быть пустым').notEmpty(),
  check('password', 'Пороль должен быть минимум 4 символа').isLength({ min: 4 })
], controller.registration)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)

module.exports = router
