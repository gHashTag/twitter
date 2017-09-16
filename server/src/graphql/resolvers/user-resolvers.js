import User from '../../models/User'

export default {
  singup: (_, { fullName, ...rest }) => {
    const [firstName, ...lastName] = fullName.split(' ')
    return User.create({ firstName, lastName, ...rest })
  },
  login: async (_, { email, password }) => {
    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('Пользователь не существует!')
    }

    if (!user.authenticateUser(password)) {
      throw new Error('Пароль не подходит!')
    }
    return user
  }
}
