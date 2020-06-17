import React, { useState, useEffect } from 'react';
import { getAccessTokenApi } from '../../../api/auth';
import { getUsersActiveApi } from '../../../api/user';

import './User.scss'

export default function Users() {
    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const token = getAccessTokenApi();

    console.log(usersActive);
    console.log(usersInactive);
    

    useEffect(() => {
        getUsersActiveApi(token, true).then(response => {
            setUsersActive(response);
        });
        getUsersActiveApi(token, false).then(response => {
            setUsersInactive(response);
        });
    }, [token]);

    return (
        <div>
            <h1>Lista de Usuarios</h1>
        </div>
    );
}