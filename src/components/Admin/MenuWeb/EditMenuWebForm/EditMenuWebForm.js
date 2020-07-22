import React, {useState, useEffect} from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';
import { updateMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

import './EditMenuWebForm.scss'

export default function EditMenuWebForm(props) {
    const { setVisibleModal, setReloadMenu, menu } = props;
    const [menuWebData, setMenuWebData] = useState(menu);


    useEffect(() => {
        setMenuWebData(menu);
    }, [menu])

    const editMenu = event => {
        event.preventDefault();
        if(!menuWebData.title || !menuWebData.url) {
            notification['error']({
                message: 'Todos los campos son obligatorios'
            });
        } else {
            const token = getAccessTokenApi();
            updateMenuApi(token, menuWebData._id, menuWebData)
            .then(response => {
                notification['success']({
                    message: response
                });
                setVisibleModal(false);
                setReloadMenu(true);
            })
            .catch(() => {
                notification['error']({
                    message: 'Error de servidor, intentelo mas tarde'
                });
            });
        }
    }

    return (
        <div className='edit-menu-web-form'>
            <EditForm
                menuWebData={menuWebData}
                setMenuWebData ={setMenuWebData}
                editMenu={editMenu}>

            </EditForm>
        </div>
    );
}

function EditForm(props) {
    const { menuWebData, setMenuWebData, editMenu } = props;
    console.log('EditForm',menuWebData);
    return(
        <Form className='form-edit' onSubmit={editMenu}>
            <Form.Item>
                <Input
                    prefix={<Icon type='font-size'></Icon>}
                    placeholder= 'Titulo'
                    value={menuWebData.title}
                    onChange={e => setMenuWebData({ ...menuWebData, title: e.target.value})}
                >
                </Input>
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type='link'></Icon>}
                    placeholder= 'URL'
                    value={menuWebData.url}
                    onChange={e => setMenuWebData({ ...menuWebData, url: e.target.value})}
                >
                </Input>
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' className='btn-submit'>
                    Actualizar menú
                </Button>
            </Form.Item>
        </Form>
    )
}