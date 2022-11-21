
import {HttpError} from "../models/http-error.js";
import {validationResult} from 'express-validator'
import UserModel from "../models/user-model.js";

export const getUsers =async (req, res, next) => {
    try {
        const users = await UserModel.find({}, '-password')
        res.json(users)
    }catch (e) {
        const error = new HttpError('Invalid data', 500)
        return next(error)
    }
}
export const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422))

    }
     const {name, email, password} = req.body
    try {
        const existingUser = await UserModel.findOne({email: email})
        if (existingUser){
            const error = new HttpError('Please login instead', 422)
            return next(error)
        }
        const createdUser = new UserModel({
            name,
            password,
            email,
            image: 'https://images.pexels.com/photos/14239995/pexels-photo-14239995.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load',
            places: []
        })
        await createdUser.save()
        res.json({user: createdUser})
    }catch (e) {
        const error = new HttpError('Signing failed', 500)
        return next(error)
    }
}
export const login = async (req, res, next) => {
    const {email, password} = req.body

   try {
       const existingUser = await UserModel.findOne({email: email})
       if (!existingUser || existingUser.password !== password){
           const error = new HttpError('Invalid credential, could not log you in', 401)
           return next(error)
       }

       res.json({message: 'Logged in'})
   }catch (e) {
       const error = new HttpError('Login failed', 500)
       return next(error)
   }
}
