import express from 'express'
import projectsController from '../controllers/projectsController.js'
import usersController from '../controllers/usersController.js'
import authMiddleware from '../config/auth.js'

const router = express.Router()

// TODO: Criação dos Endpoints
// GET http://localhost:3333/projects
router.get('/projects', projectsController.getAll)

// POST http://localhost:3333/projects
router.post('/projects', projectsController.create)

// GET http://localhost:3333/projects/id
router.get('/projects/:id', projectsController.getOne)

// PUT http://localhost:3333/projects/id
router.put('/projects/:id', projectsController.update)

// DELETE http://localhost:3333/projects/id
router.delete('/projects/:id', projectsController.remove)

router.post('/users', usersController.register)

router.put('/users/:id', authMiddleware, usersController.update)

router.post('/login', usersController.login)

export default router