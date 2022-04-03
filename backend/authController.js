const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('./config')

const User = require('./models/User')
const Role = require('./models/Role')

const generateAccessToken = (id, roles) => {
  const payload = { id, roles }

  return jwt.sign(payload, secret, { expiresIn: '24h' })
}

class AuthController {

  async registration(request, response) {
    try {
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        return response.json({ message: 'Ошибка регистрации', errors })
      }
      const { userName, password } = request.body

      const candidate = await User.findOne({ userName })
      if (candidate) {
        return response.json({ error: true, message: 'Пользователь с таким именем уже существует' },)
      }

      const userRole = await Role.findOne({ value: 'user' })
      const hashPassword = bcrypt.hashSync(password, 7)
      const user = new User({ userName, password: hashPassword, roles: ['user'] })
      await user.save()

      return response.json({ error: false, message: 'Пользователь успешно зарегестрирован' })
    } catch (error) {
      console.log(error)
      return response.json({ message: 'Ошибка регистрации' })
    }
  }

  async login(request, response) {
    try {
      const { userName, password } = request.body
      const user = await User.findOne({ userName })

      if (!user) {
        response.status(205).json({ message: `Пользователь с именем ${userName} не найден` })
      }

      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        response.status(205).json({ message: `Введен неверный пароль` })
      }

      const token = generateAccessToken(user._id, user.roles)

      return response.json({ token })

    } catch (error) {
      console.log(error)
      response.status(205).json({ message: 'Ошибка регистрации' })
    }
  }

  async getUsers(request, response) {
    try {
      const users = await User.find()
      return response.json(users)
    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = new AuthController()