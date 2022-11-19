import {Router} from "express";
import {getUsers, login, signup} from "../controllers/users-controller.js";
import {check} from 'express-validator'



export const usersRouter = Router()



usersRouter.get('/', getUsers)
usersRouter.post('/signup', [
    check('name')
        .not()
        .isEmpty(),
    check('email')
        .normalizeEmail() // Test@test.com => test@test.com
        .isEmail(),
    check('password').isLength({ min: 6 })
], signup)
usersRouter.post('/login', login)

