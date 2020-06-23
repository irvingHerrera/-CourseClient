import React, {useState} from 'react';
import {Switch, List, Avatar, Button, Icon} from 'antd';
import NoAvatar from '../../../../assets/png/no-avatar.png';

import './ListUsers.scss';

export default function ListUsers(props) {
    const {usersActive, usersInactive} = props;
    const [viewUserActive, setViewUserActive] = useState(true);
 
    return (
        <div className='list-users'>
            <div className='list-users__switch'>
                <Switch
                defaultChecked
                onChange={ () => {setViewUserActive(!viewUserActive)} }
                >
                </Switch>
                <span>
                    {viewUserActive ? 'Usuarios Activos' : 'Usuarios Inactivos'}
                </span>
            </div>
            {viewUserActive ? <UserActive usersActive={usersActive} /> : <UserInactive usersInactive={usersInactive} />}
        </div>
    )
}

function UserActive(props) {
    const {usersActive} = props;
    
    return(
        <List
            className='users-active'
            itemLayout='horizontal'
            dataSource={usersActive}
            renderItem={user => (
                <List.Item
                    actions = {[
                        <Button type='primary'
                        onClick={() => {console.log('Editar');
                        }}><Icon type='edit'></Icon></Button>,

                        <Button type='danger'
                        onClick={() => {console.log('Editar');
                        }}><Icon type='stop'></Icon></Button>,

                        <Button type='danger'
                        onClick={() => {console.log('Editar');
                        }}><Icon type='delete'></Icon></Button>
                    ]}
                >
                    <List.Item.Meta
                    avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar}></Avatar>}
                    title={`${user.name ? user.name : '...'}
                            ${user.lastname ? user.lastname : '...'}
                          `}
                    description={user.email}>
                    </List.Item.Meta>
                </List.Item>
            )}
        />
    );
}

function UserInactive(props) {
    const {usersInactive} = props;
    return(
        <List
            className='users-active'
            itemLayout='horizontal'
            dataSource={usersInactive}
            renderItem={user => (
                <List.Item
                    actions = {[
                        <Button type='primary'
                        onClick={() => {console.log('Editar');
                        }}><Icon type='check'></Icon></Button>,

                        <Button type='danger'
                        onClick={() => {console.log('Editar');
                        }}><Icon type='delete'></Icon></Button>
                    ]}
                >
                    <List.Item.Meta
                    avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar}></Avatar>}
                    title={`${user.name ? user.name : '...'}
                            ${user.lastname ? user.lastname : '...'}
                          `}
                    description={user.email}>
                    </List.Item.Meta>
                </List.Item>
            )}
        />
    );
}