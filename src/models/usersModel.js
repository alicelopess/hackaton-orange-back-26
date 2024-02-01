const usersDb = ["Usuário"]

const register = (user) => {
  usersDb.push(user)
}

const findOne = (userEmail) => {
  const index = usersDb.findIndex(user => user.email === userEmail)
  return usersDb[index]
}

const update = (userId, userUpdated) => {
  const index = usersDb.findIndex(user => user.id === userId)
  usersDb[index] = userUpdated
}

export default {
  usersDb,
  register,
  update,
  findOne
}