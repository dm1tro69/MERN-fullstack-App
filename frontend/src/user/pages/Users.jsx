import React from 'react';
import UsersList from "../components/UsersList";

const Users = () => {
    const USERS = [{id: 'u1', name: 'Dmytro Voronov', image: 'https://images.pexels.com/photos/10568929/pexels-photo-10568929.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load', places: 3}]
    return (
        <>
            <UsersList items={USERS}/>
        </>
    );
};

export default Users;
