import React from 'react';
import PlaceList from "../components/PlaceList";
import {useParams} from "react-router-dom";

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrappers in the world',
        imageUrl: 'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        address: 'New York',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrappers in the world',
        imageUrl: 'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        address: 'New York',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
]

const UserPlaces = () => {
    const {userId} = useParams()
    const loadedPlaces = DUMMY_PLACES.filter((el) => el.creator === userId)
    return (
        <>
            <PlaceList items={loadedPlaces}/>
        </>
    );
};

export default UserPlaces;
