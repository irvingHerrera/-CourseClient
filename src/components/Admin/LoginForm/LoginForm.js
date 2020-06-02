import React, {useState} from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';

import './LoginForm.scss';

export default function LoginForm() {
    return (
        <Form>
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