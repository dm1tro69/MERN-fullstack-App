import React from 'react';
import {useParams} from "react-router-dom";
import Input from "../../shared/comoponents/FormElements/Input";
import {VALIDATOR_REQUIRE} from "../../Utils/validators";
import Button from "../../shared/comoponents/FormElements/Button";
import './NewPlace.css'

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

const UpdatePlace = () => {
    const {placeId} = useParams()
    const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId)
    if (!identifiedPlace){
        return (
            <div className={'center'}>
                <h2>Could not find place!</h2>
            </div>
        )
    }
    return (
        <form className={'place-form'}>
            <Input
                id={'title'}
                element={'input'}
                type={'text'}
                label={'Title'}
                validators={[VALIDATOR_REQUIRE()]}
                errorText={'Please enter a valid title'}
                onInput={()=> {}}
                value={identifiedPlace.title}
                valid={true}
            />
            <Input
                id={'description'}
                element={'textarea'}
                label={'Description'}
                validators={[VALIDATOR_REQUIRE()]}
                errorText={'Please enter a valid description'}
                onInput={()=> {}}
                value={identifiedPlace.description}
                valid={true}
            />
            <Button type={'submit'} disabled={true}>UPDATE PLACE</Button>
        </form>
    );
};

export default UpdatePlace;
