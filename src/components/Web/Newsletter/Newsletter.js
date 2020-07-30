import React from 'react';
import { Form, Icon, Input, Button, notification} from 'antd';

import './Newsletter.scss';

export default function Newsletter() {

    const onSubmit = (e) => {
        console.log('newsletter enviada');
    }

    return (
        <div className='newsletter'>
            <h3>Newsletter</h3>
            <Form onSubmit={onSubmit}>
                <Form.Item>
                    <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,0.25)'}}></Icon>}
                        placeholder='Correo electronico'
                        //value=''
                        //onChange=''
                    ></Input>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' 
                    htmlType='submit' 
                    className='login-form-button'>Me suscrubo</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
