import React, {useState, useEffect} from 'react';
import {Switch, List, Avatar, Button, Icon, notification} from 'antd';
import NoAvatar from '../../../../assets/png/no-avatar.png';
import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm';
import { getAvatarApi, activateUserApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';

import './ListUsers.scss';

export default function ListUsers(props) {
    const {usersActive, usersInactive, setReloadUsers} = props;
    const [viewUserActive, setViewUserActive] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);
    
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
            {viewUserActive ? 
            <UserActive 
                usersActive={usersActive} 
                setIsVisible={setIsVisible} 
                setModalTitle={setModalTitle} 
                setModalContent={setModalContent}
                setReloadUsers={setReloadUsers}/> : 
            <UserInactive 
            usersInactive={usersInactive} 
            setIsVisible={setIsVisible} 
            setReloadUsers={setReloadUsers} />}
            <Modal title={modalTitle} isVisible={isVisible} setIsVisible={setIsVisible}>
                {modalContent}
            </Modal>
        </div>
    )
}


function UserActive(props) {
    const {usersActive, setIsVisible, setModalTitle, setModalContent, setReloadUsers} = props;
    
    const editUser = user => {
        setModalTitle(`Editar ${user.name ? user.name : '...'} ${user.lsdtnsmr ? user.lastname : '...'}`);
        setModalContent(<EditUserForm user={user} setIsVisible={setIsVisible} setReloadUsers={setReloadUsers} ></EditUserForm>);
        setIsVisible(true);
    }

    return(
        <List
            className='users-active'
            itemLayout='horizontal'
            dataSource={usersActive}
            renderItem={user => <GetUserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers}  />}
        />
    );
}

function GetUserActive(props) {
    const { user, editUser, setReloadUsers } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if(user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        } else {
            setAvatar(null);
        }
    }, [user]);

    const desactiveUser = () => {
        const accesToken = getAccessTokenApi();

        activateUserApi(accesToken, user._id, false)
        .then(response => {
            notification['success']({
                message: response
            });
            setReloadUsers(true);
        })
        .catch(err => {
            notification['error']({
                message: err
            });
        })
    };

    return(
        <List.Item
                    actions = {[
                        <Button type='primary'
                        onClick={() => editUser(user)}>
                            <Icon type='edit'></Icon></Button>,

                        <Button type='danger'
                        onClick={desactiveUser}><Icon type='stop'></Icon></Button>,

                        <Button type='danger'
                        onClick={() => {console.log('Editar');
                        }}><Icon type='delete'></Icon></Button>
                    ]}
                >
                    <List.Item.Meta
                    avatar={<Avatar src={avatar ? avatar : NoAvatar}></Avatar>}
                    title={`${user.name ? user.name : '...'}
                            ${user.lastname ? user.lastname : '...'}
                          `}
                    description={user.email}>
                    </List.Item.Meta>
                </List.Item>
    );

}

function UserInactive(props) {
    const {usersInactive, setReloadUsers} = props;
    return(
        <List
            className='users-active'
            itemLayout='horizontal'
            dataSource={usersInactive}
            renderItem={user => <GetUserInactive user={user} setReloadUsers={setReloadUsers}/>}
        />
    );
}

function GetUserInactive(props) {
    const { user, setReloadUsers } = props;

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if(user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        } else {
            setAvatar(null);
        }
    }, [user]);

    const activeUser = () => {
        const accesToken = getAccessTokenApi();

        activateUserApi(accesToken, user._id, true)
        .then(response => {
            notification['success']({
                message: response
            });
            setReloadUsers(true);
        })
        .catch(err => {
            notification['error']({
                message: err
            });
        })
    };

    return(
        <List.Item
                    actions = {[
                        <Button type='primary'
                        onClick={activeUser}><Icon type='check'></Icon></Button>,

                        <Button type='danger'
                        onClick={() => {console.log('Editar');
                        }}><Icon type='delete'></Icon></Button>
                    ]}
                >
                    <List.Item.Meta
                    avatar={<Avatar src={avatar ? avatar : NoAvatar}></Avatar>}
                    title={`${user.name ? user.name : '...'}
                            ${user.lastname ? user.lastname : '...'}
                          `}
                    description={user.email}>
                    </List.Item.Meta>
                </List.Item>
    );

}