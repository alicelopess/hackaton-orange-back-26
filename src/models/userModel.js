const userDb = ["Usuário"]

const create = (user) => {
  userDb.push(user)
}

const update = (userId, userUpdated) => {
  const index = userDb.findIndex(user => user.id === userId)
  userDb[index] = userUpdated
}

export default {
  usersDb,
  create,
  update,
}