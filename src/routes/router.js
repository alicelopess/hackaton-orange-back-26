import express from 'express'
import projectsController from '../controllers/projectsController.js'
import usersController from '../controllers/usersController.js'
import authMiddleware from '../config/auth.js'

const router = express.Router()

// router.get('/projects', authMiddleware, projectsController.getAll)

router.get('/projects', authMiddleware, projectsController.getAllFromUser)

router.post('/projects', authMiddleware, projectsController.create)

router.get('/projects/:id', authMiddleware, projectsController.getOne)

router.put('/projects/:id', authMiddleware, projectsController.update)

router.delete('/projects/:id', authMiddleware, projectsController.remove)

router.post('/users', usersController.register)

router.put('/users/:id', authMiddleware, usersController.update)

router.post('/login', usersController.login)

//rota de logout

export default router