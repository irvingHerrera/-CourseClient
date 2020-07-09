import React, {useState, useEffect} from 'react';
import {Switch, List, Avatar, Button, Icon, notification, Modal as ModalAnt} from 'antd';
import NoAvatar from '../../../../assets/png/no-avatar.png';
import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm';
import { getAvatarApi, activateUserApi, deteleUserApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';

import './ListUsers.scss';

const { confirm } = ModalAnt;

export default function ListUsers(props) {
    const {usersActive, usersInactive, setReloadUsers} = props;
    const [viewUserActive, setViewUserActive] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);
    
    const showModalDeleteUser = (user) => {

        confirm({ 
            title: 'Eliminando usuario',
            content: `Estas seguro que quieres eliminar ${user.email}?`,
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                const accesToken = getAccessTokenApi();
    
                deteleUserApi(accesToken, user._id, false)
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
    
            }
        });
    
    };

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
                setReloadUsers={setReloadUsers}
                showModalDeleteUser={showModalDeleteUser}/> : 
            <UserInactive 
            usersInactive={usersInactive} 
            setIsVisible={setIsVisible} 
            setReloadUsers={setReloadUsers}
            showModalDeleteUser={showModalDeleteUser} />}
            <Modal title={modalTitle} isVisible={isVisible} setIsVisible={setIsVisible}>
                {modalContent}
            </Modal>
        </div>
    )
}


function UserActive(props) {
    const {usersActive, setIsVisible, setModalTitle, 
           setModalContent, setReloadUsers, showModalDeleteUser} = props;
    
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
            renderItem={user => <GetUserActive 
                user={user} 
                editUser={editUser} 
                setReloadUsers={setReloadUsers} 
                showModalDeleteUser={showModalDeleteUser}  />}
        />
    );
}

function GetUserActive(props) {
    const { user, editUser, setReloadUsers, showModalDeleteUser } = props;
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
                        onClick={() => {showModalDeleteUser(user);}}><Icon type='delete'></Icon></Button>
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
    const {usersInactive, setReloadUsers, showModalDeleteUser} = props;
    return(
        <List
            className='users-active'
            itemLayout='horizontal'
            dataSource={usersInactive}
            renderItem={user => <GetUserInactive user={user} setReloadUsers={setReloadUsers} showModalDeleteUser={showModalDeleteUser}/>}
        />
    );
}

function GetUserInactive(props) {
    const { user, setReloadUsers, showModalDeleteUser } = props;

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
                        onClick={() => {showModalDeleteUser(user);}}><Icon type='delete'></Icon></Button>
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

