import http from 'node:http'

const server = http.createServer((request, response) => {
  return response.end('Hello World')
})

// **Rotas**
// Criar usuário
// Criar novo projetos
// Editar projetos
// Excluir projetos
// Pesquisar projetos


server.listen(3333)