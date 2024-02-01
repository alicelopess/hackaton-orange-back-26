const usersDb = ["Usuário"]


// temporária
const getAll = (user) => {
  return usersDb
}

const create = (user) => {
  usersDb.push(user)
}

const update = (userId, userUpdated) => {
  const index = userDb.findIndex(user => user.id === userId)
  usersDb[index] = userUpdated
}

export default {
  usersDb,
  getAll,
  create,
  update
}