import jwt from 'jsonwebtoken'

function authMiddleware (request, response, next) {
  const authHeader = request.headers.authorization
  if(!authHeader)
    return response.status(401).send({error: "Token não gerado"})

  const parts = authHeader.split(' ')

  if(!parts.length === 2)
    return response.status(401).send({error: "Erro no token"})

  const [ scheme, token ] = parts

    if(!/^Bearer/i.test(scheme)){
      return response.status(401).send({ error: 'Formato do token incorreto'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return response.status(401).send({ error: 'Token inválido'})
      request.userId = decoded.id
      return next()
    })
} 

export default authMiddleware