import React, { useState } from 'react';
import { Form, Icon, Input, Button, Select, notification } from 'antd'

import './AddMenuWebForm.scss';

export default function AddMenuWebForm(props) {
    return(
        <div className='add-menu-web-form'>
            <AddForm></AddForm>
        </div>
    )
}

function AddForm(props) {

    const { Option } = Select;
    const selectBefore = (
        <Select defaultValue='http://'
        style={{ width: 90 }}
        //onChange={}
        >
            <Option value='http://'>http://</Option>
            <Option value='https://'>https://</Option>
        </Select>
    );

    return (
        <Form className='form-add'>
            <Form.Item>
                <Input
                    prefix={<Icon type='font-size'></Icon>}
                    placeholder={'Titulo'}
                    // value={}
                    // onChange={}
                ></Input>
            </Form.Item>
            <Form.Item>
                <Input
                   addonBefore={selectBefore}
                   placeholder='URL'
                   // value={}
                   // onChange={}
                ></Input>
            </Form.Item>    
            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    className='btn-submit'
                >Crear menu</Button>
            </Form.Item>
        </Form>
    );
}