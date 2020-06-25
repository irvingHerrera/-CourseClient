import React, {useState, useCallback, useEffect} from 'react';
import {Avatar, Form, Input, Select, Row, Col, Button, Icon} from 'antd';
import { useDropzone } from 'react-dropzone';
import NoAvatar from '../../../../assets/png/no-avatar.png';

import './EditUserForm.scss';

export default function EditUserForm(props) {
    const {user} = props;
    const [avatar, setAvatar] = useState(null);
    const [userData, setUserData] = useState({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        avatr: user.avatar
    });

    useEffect(() => {
        if(avatar) {
            setUserData({ ...userData, avatar });
        }
    }, [avatar])

    const updateUser = e => {
        e.preventDefault();
        console.log(userData);
    };

    return(
        <div className='edit-user-form'>
            <UploadAvatar avatar={avatar} setAvatar={setAvatar}></UploadAvatar>
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser}></EditForm>
        </div>
    );
}

function UploadAvatar(props) {
    const { avatar, setAvatar } = props;

    const onDrop = useCallback(
        acceptedFiles => {
          const file = acceptedFiles[0];
          setAvatar({ file, preview: URL.createObjectURL(file) });
        },
        [setAvatar]
      );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
      });

    return (
        <div className='upload-avatar' {...getRootProps()}>
            <input {...getInputProps()}/>
            {isDragActive ? ( <Avatar size={150} src={NoAvatar}></Avatar>) : 
            ( <Avatar size={150} src={avatar ? avatar.preview : NoAvatar}></Avatar>) }
        </div>
    );
}

function EditForm(props) {
    const { userData, setUserData, updateUser } = props;
    const { Option } = Select;

    return (
       <Form className='form-edit' onSubmit={updateUser}>
           <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                         prefix={<Icon type='user'></Icon>}
                         placeholder='Nombre'
                         defaultValue={userData.name}
                         onChange={e => setUserData({ ...userData, name: e.target.value })}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                        <Input 
                         prefix={<Icon type='user'></Icon>}
                         placeholder='Apellidos'
                         defaultValue={userData.lastname}
                         onChange={e => setUserData({ ...userData, lastname: e.target.value })}
                        ></Input>
                    </Form.Item>
                </Col>
           </Row>
           <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                        <Input 
                         prefix={<Icon type='mail'></Icon>}
                         placeholder='Correo electronico'
                         defaultValue={userData.email}
                         onChange={e => setUserData({ ...userData, email: e.target.value })}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Select 
                        placeholder='Selecciona un rol'
                        onChange={e => setUserData({ ...userData, role: e})}
                        defaultValue={userData.role}
                    >
                        <Option value='admin'>Administrador</Option>
                        <Option value='editor'>Editor</Option>
                        <Option value='reviewr'>Revisor</Option>
                    </Select>
                </Col>
           </Row>
           <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                         prefix={<Icon type='lock'></Icon>}
                         type='password'
                         placeholder='Contraseña' 
                         onChange={e => setUserData({ ...userData, password: e.target.value })}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                            <Input 
                            prefix={<Icon type='lock'></Icon>}
                            type='password'
                            placeholder='Repetir contraseña'
                            onChange={e => setUserData({ ...userData, repeatPass : e.target.value })}
                            ></Input>
                        </Form.Item>
                </Col>
           </Row>
           <Form.Item>
               <Button type='primary' htmlType='submit' className='btn-submit'>
                   Actualizar Usuario
                </Button>
           </Form.Item>
       </Form>
    );
}