import { v4 as uuidv4 } from 'uuid';
import {HttpError} from "../models/http-error.js";
import {validationResult} from 'express-validator'

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Dmytro Voronov',
        email: 'teats@test.com',
        password: 'tester'
    }
]

export const getUsers = (req, res) => {

   res.json({users: DUMMY_USERS})
}
export const signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
     const {name, email, password} = req.body
    const hasUser = DUMMY_USERS.find(u => u.email === email)
    if (hasUser){
        throw new HttpError('Email already exists', 401)
    }
    const createdUser = {
        id: uuidv4(),
        name,
        email,
        password
    }
    DUMMY_USERS.push(createdUser)
    res.json({user: createdUser})
}
export const login = (req, res) => {
    const {email, password} = req.body

    const identifiedUser = DUMMY_USERS.find(u => u.email === email)
    if (!identifiedUser || identifiedUser.password !== password){
        throw new HttpError('Could not identify user', 401)
    }
    res.json({message: 'Logged in'})
}
