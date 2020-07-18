import React, {useState, useEffect} from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';
import { updateMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

import './EditMenuWebForm.scss'

export default function EditMenuWebForm(props) {
    const { setVisibleModal, setReloadMenu, menu } = props;


    return (
        <div className='edit-menu-web-form'>
            <EditForm>

            </EditForm>
        </div>
    );
}

function EditForm(props) {
    //const { menuWebData, setMenuWebData, editMenu, menu } = props;

    return(
        <Form className='form-edit' onSubmit={() => {}}>
            <Form.Item>
                <Input
                    prefix={<Icon type='font-size'></Icon>}
                    placeholder= 'Titulo'
                    // value={}
                    // onClick={}
                >
                </Input>
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type='link'></Icon>}
                    placeholder= 'URL'
                    // value={}
                    // onClick={}
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