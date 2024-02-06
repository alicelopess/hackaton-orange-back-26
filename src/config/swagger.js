const options = {
  "definition": {
    "openapi": "3.0.0",
    "info": {
      "title": "Orange portfolio",
      "description": "Portfolio de projetos",
      "version": "1.0.0",
    },
    "paths": {
        "/projects": {
          "get": {
            "summary": "Retorne um array de projetos",
            "description": "Retorna um array com todos os projetos criados",
            "tags": ['Projects'],
            "responses": {
              "200": {
                "description": "OK"
              }
            }
          },
          "post": {
            "summary": "Cria um projeto",
            "description": "Cria um novo projeto",
            "tags": ["Projects"],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "title": {
                        "type": "string"
                      },
                      "tag": {
                        "type": "string"
                      },
                      "link": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string"
                      },
                      "image": {
                        "type": "string",
                        "format": "binary"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": "Projeto Criado!",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                    }
                  }
                }
              }
            }
          },
        },
        "/projects/{id}": {
          "put": {
            "summary": "Altera um projeto",
            "description": "Altera um projeto de acordo com o ID",
            "tags": ["Projects"],
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "description": "ID do projeto que será atualizado",
                "required": true,
              },
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "title": {
                        "type": "string"
                      },
                      "tag": {
                        "type": "string"
                      },
                      "link": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string"
                      },
                      "image": {
                        "type": "string",
                        "format": "binary"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "203": {
                "description": "Projeto Atualizado!",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                    }
                  }
                }
              }
            }
          },
          "delete": {
            "summary": "Deleta um projeto",
            "description": "Deleta um projeto de acordo com o ID",
            "tags": ["Projects"],
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "description": "ID do projeto que será deletado",
                "required": true,
              },
            ],
            "responses": {
              "203": {
                "description": "Projeto Deletado!",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                    }
                  }
                }
              }
            }
          }
        },
        "/users": {
          "post": {
            "summary": "Criar usuário",
            "description": "Cria um novo usuário",
            "tags": ["Users"],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "email": {
                        "type": "string"
                      },
                      "password": {
                        "type": "string"
                      },
                      "firstname": {
                        "type": "string"
                      },
                      "lastname": {
                        "type": "string"
                      },
                    }
                  }
                }
              }
            },
            "responses": {
              "203": {
                "description": "Projeto Atualizado!",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                    }
                  }
                }
              }
            }
          },
          
        },
        "/users/{id}": {
          "put": {
            "summary": "Alterar usuário",
            "description": "Altera um usuário de acordo com o ID",
            "tags": ["Users"],
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "description": "ID do usuário que será atualizado",
                "required": true,
              },
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "email": {
                        "type": "string"
                      },
                      "password": {
                        "type": "string"
                      },
                      "firstname": {
                        "type": "string"
                      },
                      "lastname": {
                        "type": "string"
                      },
                      "country": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "203": {
                "description": "Usuário Atualizado!",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                    }
                  }
                }
              }
            }
          },
        }
      }
    },
  "apis": ["../routes/router.js"]
}

export default options