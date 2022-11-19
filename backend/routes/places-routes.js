import {Router} from "express";
import {
    createPlace,
    deletePlace,
    getPlaceById,
    getPlaceByUserId,
    updatePlace,

} from "../controllers/places-controller.js";
import {check} from 'express-validator'


export const placesRouter = Router()



placesRouter.get('/:pid', getPlaceById)
placesRouter.get('/user/:uid', getPlaceByUserId)
placesRouter.post('/', [
    check('title').not().isEmpty(),
    check('description').isLength({min: 5}),
    check('address').not().isEmpty()
] , createPlace)
placesRouter.patch('/:pid', [
    check('title').not().isEmpty(),
    check('description').isLength({min: 5})
], updatePlace)
placesRouter.delete('/:pid', deletePlace)
