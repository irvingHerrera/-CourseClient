import React, { useState } from 'react';
import { Form, Icon, Input, Button, Select, notification } from 'antd'
import { getAccessTokenApi } from '../../../../api/auth'

import './AddMenuWebForm.scss';
import { addMenuApi } from '../../../../api/menu';

export default function AddMenuWebForm(props) {
    const { setVisibleModal, setReloadMenu } = props;
    const [menuWebData, setMenuWebData] = useState({});

    const addMenu = event => {
        event.preventDefault();
        let finalData = {
            title: menuWebData.title,
            url: (menuWebData.http ? menuWebData.http : 'http://') + menuWebData.url
        };

        if(!finalData.title || !finalData.url || !menuWebData.url) {
            notification['error']({
                message: 'Todos los campos son obligatorios.'
            });
        } else {
            const token = getAccessTokenApi();

            finalData.active = false;
            finalData.order = 100;

            addMenuApi(token, finalData)
            .then(response => {
                notification['success']({
                    message: response
                });
                setVisibleModal(false);
                setReloadMenu(true);
                setMenuWebData({});
                finalData = {};
            })
            .catch(() => {
                notification['error']({
                    message: 'Error en el servidor'
                });
            });
        }
    }

    return(
        <div className='add-menu-web-form'>
            <AddForm menuWebData={menuWebData} 
            setMenuWebData={setMenuWebData} 
            addMenu={addMenu}></AddForm>
        </div>
    )
}

function AddForm(props) {
    const { menuWebData, setMenuWebData, addMenu } = props;
    const { Option } = Select;
    const selectBefore = (
        <Select defaultValue='http://'
        style={{ width: 90 }}
        alue={menuWebData.http}
        onChange={e => setMenuWebData({ ...menuWebData, http: e })}
        >
            <Option value='http://'>http://</Option>
            <Option value='https://'>https://</Option>
        </Select>
    );

    return (
        <Form className='form-add' onSubmit={addMenu}>
            <Form.Item>
                <Input
                    prefix={<Icon type='font-size'></Icon>}
                    placeholder={'Titulo'}
                    value={menuWebData.title}
                    onChange={e => setMenuWebData({ ...menuWebData, title: e.target.value })}
                ></Input>
            </Form.Item>
            <Form.Item>
                <Input
                   addonBefore={selectBefore}
                   placeholder='URL'
                   value={menuWebData.url}
                   onChange={e => setMenuWebData({ ...menuWebData, url: e.target.value })}
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