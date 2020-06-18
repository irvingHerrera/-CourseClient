import React, {useState} from 'react';
import {Switch, List, Avatar, Button, Icon} from 'antd';
import NoAvatar from '../../../../assets/png/no-avatar.png';

import './ListUsers.scss';

export default function ListUsers(props) {
    const {usersActive, usersInactive} = props;
    const [viewUserActive, setViewUserActive] = useState(true);
    
    return (
        <div className='list-users'>
            <div className='list-user__switch'>
                <Switch
                defaultChecked
                onChange={ () => {setViewUserActive(!viewUserActive)} }
                >
                </Switch>
                <span>
                    {viewUserActive ? 'Usuarios Activos' : 'Usuarios Inactivos'}
                </span>
            </div>
            {viewUserActive ? userActive() : userInactive()}
        </div>
    )
}

function userActive() {
    return(
        <di>
            <h3>Usuarios Activos</h3>
        </di>
    );
}

function userInactive() {
    return(
        <di>
            <h3>Usuarios Inactivos</h3>
        </di>
    );
}