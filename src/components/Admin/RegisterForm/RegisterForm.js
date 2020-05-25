import React from 'react';
import { Form, Input, Icon, Button, Checkbox, notification } from 'antd';
import { Link } from 'react-router-dom';

import './RegisterForm.scss';

export default function RegisterForm(props) {
    return (
        <Form>
            <Form.Item>
                <Input
                    prefix={<Icon type='user' style={{ color:'rgb(0, 0, .25)'}}></Icon>}
                    type='email'
                    name='email'
                    placeholder='Correo electronico'
                    className='register-form__input'
                >
                </Input>
            </Form.Item>
            <Form.Item>
            <Input
                    prefix={<Icon type='lock' style={{ color:'rgb(0, 0, .25)'}}></Icon>}
                    type='password'
                    name='password'
                    placeholder='Contraseña'
                    className='register-form__input'
                >
                </Input>
            </Form.Item>
            <Form.Item>
            <Input
                    prefix={<Icon type='lock' style={{ color:'rgb(0, 0, .25)'}}></Icon>}
                    type='password'
                    name='repeatPassword'
                    placeholder='Repertir contraseña'
                    className='register-form__input'
                >
                </Input>
            </Form.Item>
            <Form.Item>
                <Checkbox name='privacyPolicy'>
                    He leido y acepto la politica de privacidad
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType='submit' className='register-form__button'>
                    Crear cuenta
                </Button>
            </Form.Item>
        </Form>
    );
}