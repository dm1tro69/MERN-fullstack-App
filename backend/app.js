import express from 'express'
import bodyParser from "body-parser";
import {placesRouter} from "./routes/places-routes.js";
import {usersRouter} from "./routes/users-routes.js";
import {HttpError} from "./models/http-error.js";
import dotenv from 'dotenv'
import mongoose from "mongoose";

dotenv.config()

const app = express()

app.use(bodyParser.json())

app.use('/api/places', placesRouter)
app.use('/api/users', usersRouter)

app.use((req, res, next)=> {
    const error = new HttpError('Could not find this route', 404)
    throw error
})

app.use((err, req, res, next)=> {
    if (res.headerSent){
        return next(err)
    }
    res.status(err.code || 500)
    res.json({message: err.message || 'An unknown error'})
})

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_KEY, ()=> {
            console.log('connected db')
            app.listen(4000, ()=> {
                console.log('server started')
            })
        })
    }catch (e) {
        console.log(e)
    }
}
start()


