const express = require('express')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')


const router = new express.Router()

//REGISTER - POST
router.post('/register',userController.registerController)

//LOGIN - POST
router.post('/login',userController.loginController)

//ADD PROJECT - POST
router.post('/add-project',jwtMiddleware,multerMiddleware.single('projectImage'),projectController.addProjectController)

//HOME PROJECT - GET
router.get('/home-projects',projectController.getHomeProjectsController)

//USER PROJECT - GET
router.get('/user-projects',jwtMiddleware,projectController.getUserProjectsController)

//ALL PROJECT - GET
router.get('/all-projects',jwtMiddleware,projectController.getAllProjectsController)

//EDIT PROJECT - PUT
router.put('/projects/:id/edit',jwtMiddleware,multerMiddleware.single("projectImage"),projectController.editProjectController)

//REMOVE PROJECT - DELETE
router.delete('/projects/:id/remove',jwtMiddleware,projectController.removeProjectController)

//EDIT USER - PUT
router.put('/user/edit',jwtMiddleware,multerMiddleware.single("profilePic"),userController.editUserController)


module.exports = router