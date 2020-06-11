import React, {useState} from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';
import {  signInApi } from '../../../api/user'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants'

import './LoginForm.scss';

export default function LoginForm() {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const changeForm = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    };

    const login = async (e) => {
        e.preventDefault();
        const result = await signInApi(inputs);
        
        if(!result.ok) {
            notification['error']({
                message: result.message
            });
        } else {
            const {token, refreshToken} = result.data;

            localStorage.setItem(ACCESS_TOKEN, token);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);

            notification['success']({
                message: 'Login correcto'
            });
        }  
        
        window.location.href = '/admin';
    };

    return (
        <Form className='login-form' onChange={changeForm} onSubmit={login}>
            <Form.Item>
                <Input
                prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)'}}></Icon>}
                type='email'
                name='email'
                placeholder='Correo electronico'
                className='login-form__input'
                ></Input>
            </Form.Item>
            <Form.Item>
                <Input
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)'}}></Icon>}
                type='password'
                name='password'
                placeholder='Contraseña'
                className='login-form__input'
                ></Input>
            </Form.Item>
            <Form.Item>
                <Button htmlType='submit' className='login-form__button'>Entrar</Button>
            </Form.Item>
        </Form>
    )
}