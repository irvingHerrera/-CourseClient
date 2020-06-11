import React, {useState} from 'react';
import { Form, Input, Icon, Button, Checkbox, notification } from 'antd';
import { emailValidation, inputValidation, minLengthValidation } from '../../../utils/formValidation';
import { signUpApi } from '../../../api/user'
import { Link } from 'react-router-dom';

import './RegisterForm.scss';

export default function RegisterForm(props) {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        privacyPolicy: false
    });

    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    });

    const changeForm = e => {
        if(e.target.name === 'privacyPolicy') {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.checked
            })
        } else {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            })
        }
        
    };

    const inputValidation = e => {
        const { type, name } = e.target;

        if(type === 'email') {
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target)
            });
        }

        if(type === 'password') {
            setFormValid({
                ...formValid, 
                [name]: minLengthValidation(e.target, 6)
            });
        }

        if(type === 'checkbox') {
            setFormValid({
                ...formValid, 
                [name]: e.target.checked
            });
        }
    };

    const register = async (e) => {
        e.preventDefault();
        
        const passwordVal = inputs.password;
        const repeatPasswordVal = inputs.repeatPassword;

        if(!inputs.email || !inputs.privacyPolicy || !passwordVal || !repeatPasswordVal) {
            notification['error']({
                message: 'Todos los campos son obligatorios'
            });
        } else {
            if(passwordVal !== repeatPasswordVal) {
                notification['error']({
                    message: 'Las contraseñas deben ser iguales'
                });
            } else {
                const result = await signUpApi(inputs);
                if(!result.ok) {
                    notification['error']({
                        message: result.message
                    });
                } else {
                    notification['success']({
                        message: result.message
                    });
                    resetForm();
                }
            }
        }
    }

    const resetForm = () => {
        const inputs = document.getElementsByTagName('input');
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove('success');
            inputs[i].classList.remove('error');
        }

        setInputs({
            email: '',
            password: '',
            repeatPassword: '',
            privacyPolicy: false
        });

        setFormValid({
            email: false,
            password: false,
            repeatPassword: false,
            privacyPolicy: false
        });
    };

    return (
        <Form className='register-form' onSubmit={register} onChange={changeForm}>
            <Form.Item>
                <Input
                    prefix={<Icon type='user' style={{ color:'rgb(0, 0, .25)'}}></Icon>}
                    type='email'
                    name='email'
                    placeholder='Correo electronico'
                    className='register-form__input'
                    value={inputs.email}
                    onChange={inputValidation}
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
                    value={inputs.password}
                    onChange={inputValidation}
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
                    value={inputs.repeatPassword}
                    onChange={inputValidation}
                >
                </Input>
            </Form.Item>
            <Form.Item>
                <Checkbox 
                    name='privacyPolicy' 
                    checked={inputs.privacyPolicy} 
                     onChange={inputValidation}>
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