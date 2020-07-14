import React, {useState} from 'react'
import {Form, Input, Select, Row, Col, Button, Icon, notification} from 'antd';
import {singUpAdminApi} from '../../../../api/user';
import {getAccessTokenApi} from '../../../../api/auth';

import './AddUserForm.scss';

export default function AddUserForm(props) { 

    const {setIsVisible, setReloadUsers} = props;
    const [userData, setUserData] = useState({});

    const addUser = event => {
        event.preventDefault();
        console.log(userData);
        if(!userData.name ||
            !userData.lastname ||
            !userData.role ||
            !userData.email ||
            !userData.password || 
            !userData.repeatPassword) {
                notification['error']( {
                    message: 'Todos los campos son obligatorios'
                });
            } else if(userData.password !== userData.repeatPassword) {
                notification['error']( {
                    message: 'Las contraseñas deben ser iguales.'       
                });
            } else {
                const accesToken = getAccessTokenApi();

                singUpAdminApi(accesToken, userData)
                .then(response => {
                    notification['success']( {
                        message: response          
                    });
                    setIsVisible(false);
                    setReloadUsers(true);
                    setUserData({});
                })
                .catch(err => {
                    notification['error']( {
                        message: err    
                    });
                });
            }

    };

    return(<div className='add-user-form'>
        <AddForm userData={userData}
                 setUserData={setUserData}
                 addUser={addUser}></AddForm>
    </div>)
}

function AddForm(props) {
    const {userData, setUserData, addUser} = props;
    const { Option } = Select;

    return(
        <Form className='form-add' onSubmit={addUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<Icon type='user'></Icon>}
                            placeholder='Nombre'
                            value={userData.name}
                            onChange={e => setUserData({ ...userData, name: e.target.value})}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<Icon type='user'></Icon>}
                            placeholder='Apellidos'
                            value={userData.lastname}
                            onChange={e => setUserData({ ...userData, lastname: e.target.value})}
                        ></Input>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<Icon type='mail'></Icon>}
                            type='email'
                            placeholder='Correo electronico'
                            value={userData.email}
                            onChange={e => setUserData({ ...userData, email: e.target.value})}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                       <Select 
                       placeholder='Selecciona un rol'
                       value={userData.role}
                       onChange={e => setUserData({ ...userData, role: e})}>
                           <Option value='admin'>Administrador</Option>
                           <Option value='editor'>Editor</Option>
                           <Option value='revisor'>Revisor</Option>
                       </Select>
                    </Form.Item>
                </Col>
            </Row>
            
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<Icon type='lock'></Icon>}
                            type='password'
                            placeholder='Contraseña'
                            value={userData.password}
                            onChange={e => setUserData({ ...userData, password: e.target.value})}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                    <Input 
                            prefix={<Icon type='lock'></Icon>}
                            type='password'
                            placeholder='Repetir contraseña'
                            value={userData.repeatPassword}
                            onChange={e => setUserData({ ...userData, repeatPassword: e.target.value})}
                        ></Input>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type='primary' htmlType='submit' className='btn-submit'>
                    Crear Usuario
                </Button>
            </Form.Item>
        </Form>
    );
}