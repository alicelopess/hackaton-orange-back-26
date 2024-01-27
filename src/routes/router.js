import express from 'express'
import projectsController from '../controllers/projectsController.js'

const router = express.Router()

// TODO: Criação dos Endpoints
// GET http://localhost:3333/projects
router.get('/projects', projectsController.getAll)

// POST http://localhost:3333/projects
router.post('/projects', projectsController.create)

// PUT http://localhost:3333/projects/id
router.put('/projects/:id', projectsController.update)

// DELETE http://localhost:3333/projects/id
router.delete('/projects/:id', projectsController.remove)

export default router