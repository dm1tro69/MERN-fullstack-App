import React from 'react';
import './UsersList.css'
import UserItem from "./UserItem";
import Card from "../../shared/comoponents/UiElements/Card";

const UsersList = ({items}) => {

    if (items.length === 0){
        return (
            <div className={'center'} >
                <Card>
                <h2>No users found</h2>
                </Card>
            </div>

        )
    }
    return (
        <ul className={'users-list'}>
            {items.map(el => (
                <UserItem
                    key={el.id}
                    id={el.id}
                    image={el.image}
                    name={el.name}
                    placeCount={el.places}
                />
            ))}
        </ul>
    );
};

export default UsersList;
