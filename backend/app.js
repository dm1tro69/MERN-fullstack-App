import express from 'express'
import BodyParser from 'body-parser'


const app = express()



app.listen(4000, ()=> {
    console.log('server started')
})
