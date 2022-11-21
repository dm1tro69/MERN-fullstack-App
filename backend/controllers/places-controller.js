import {HttpError} from "../models/http-error.js";
import {validationResult} from 'express-validator'
import {getCoordsForAddress} from "../utils/location.js";
import PlaceModel from "../models/place-model.js";
import UserModel from "../models/user-model.js";
import {startSession} from "mongoose";


export const getPlaceById = async (req, res, next)=> {
    const placeId = req.params.pid
    try {
        const place = await PlaceModel.findById(placeId)
        res.json({place})

    }catch (e) {
       const error = new HttpError('Could not find a place for the provided id', 500)
        return next(error)
    }

}

export const getPlaceByUserId = async (req, res, next)=> {
    try {
        const userId = req.params.uid
        const places = await PlaceModel.find({creator: userId})

        res.json({places})
    }catch (e) {
        const error = new HttpError('Could not find a place for the provided id', 500)
        return next(error)
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
    const createdPlace = new PlaceModel({
        title,
        description,
        address,
        location: coordinates,
        image: 'https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        creator
    })

    let user
    try {
        user = await UserModel.findById(creator)
    }catch (e) {
        const error = new HttpError('Creating place failed', 500)
        return next(error)
    }
    if (!user){
        const error = new HttpError('Invalid data', 500)
        return next(error)
    }

    try {
        const sess = await startSession()
        sess.startTransaction()
        await createdPlace.save({session: sess})
        user.places.push(createdPlace)
        await user.save({session: sess})
        await sess.commitTransaction()
    }catch (e) {
        const error = new HttpError('Creating failed', 500)
        return next(error)
    }

    res.status(201).json({place: createdPlace})
}
export const updatePlace = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        console.log(errors)
       return next(new HttpError('Invalid data', 422))
    }
    const {title, description} = req.body
    const placeId = req.params.pid
    try {
        const updatedPlace = await PlaceModel.findById(placeId)
        updatedPlace.title = title
        updatedPlace.description = description
        await updatedPlace.save()

        res.status(200).json({place: updatedPlace})
    }catch (e) {
        const error = new HttpError('Invalid data', 500)
        return next(error)
    }

}
export const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await PlaceModel.findById(placeId).populate('creator');
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete place.',
            500
        );
        return next(error);
    }

    if (!place) {
        const error = new HttpError('Could not find place for this id.', 404);
        return next(error);
    }

    try {
        const sess = await startSession();
        sess.startTransaction();
        await place.remove({ session: sess });
        place.creator.places.pull(place);
        await place.creator.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete place.',
            500
        );
        return next(error);
    }

    res.status(200).json({ message: 'Deleted place.' });

}
