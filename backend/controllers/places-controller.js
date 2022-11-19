import {HttpError} from "../models/http-error.js";
import { v4 as uuidv4 } from 'uuid';
import {validationResult} from 'express-validator'
import {getCoordsForAddress} from "../utils/location.js";

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrappers in the world',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: 'New York',
        creator: 'u1'
    }
]

export const getPlaceById = (req, res, )=> {
    const placeId = req.params.pid
    const place = DUMMY_PLACES.find(pl => pl.id === placeId)
    if (!place){
        throw new HttpError('Could not find a place for the provided id', 404)
    }
    res.json({place})

}

export const getPlaceByUserId = (req, res, next)=> {
    const userId = req.params.uid
    const places = DUMMY_PLACES.filter(pl => pl.creator === userId)
    if (!places || places.length ===0){
        return next(new HttpError('Could not find a places for the provided user id', 404))
    }else {
        res.json({places})
    }
}
export const createPlace = async (req, res, next) => {
   const errors = validationResult(req)
    if (!errors.isEmpty()){
      return next(new HttpError('Invalid data', 422))
    }
    const {title, description, address, creator} = req.body
    let coordinates
    try {
         coordinates = await getCoordsForAddress()
    }catch (e) {
         return next(e)
    }
    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    }
    DUMMY_PLACES.push(createdPlace)
    res.status(201).json({place: createdPlace})
}
export const updatePlace = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        console.log(errors)
        new HttpError('Invalid data', 422)
    }
    const {title, description} = req.body
    const placeId = req.params.pid
    const updatedPlace = {...DUMMY_PLACES.find(pl => pl.id === placeId)}
    const placeIndex = DUMMY_PLACES.findIndex(pl => pl.id === placeId)
    updatedPlace.title = title
    updatedPlace.description = description
    DUMMY_PLACES[placeIndex] = updatedPlace
    res.status(200).json({place: updatedPlace})

}
export const deletePlace = (req, res) => {
    const placeId = req.params.pid
    DUMMY_PLACES = DUMMY_PLACES.filter(pl => pl.id !== placeId)
    res.status(200).json({message: 'Deleted'})
}
