import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Icon, Input, Button, DatePicker, notification } from 'antd';
import { Editor } from '@tinymce/tinymce-react'
import moment from 'moment';
import {getAccessTokenApi} from '../../../../api/auth';

import './AddEditPostForm.scss';

export default function AddEditPostForm(props) {
    const { setIsVisible, setReloadPosts, post } = props;
    const [postData, setPostData] = useState({});

    useEffect(() => {
        if(post) {
            setPostData(post);
        } else {
            setPostData({});
        }
    }, [post]);


    return (
        <div className='add-edit-post-form'>
            <AddEditForm postData={postData} setPostData={setPostData} post={post}></AddEditForm>
        </div>
    );
}

function AddEditForm(props) {
    const { postData, setPostData, post } = props;

    return(
        <Form
            className='add-edit-post-form'
            layout='inline'
        >
            <Row gutter={24}>
                <Col span={8}>
                    <Input
                        prefix={<Icon type='font-size'></Icon>}
                        placeholder='Titulo'
                        //value={}
                        //onChange={}
                    >
                    </Input>
                </Col>
                <Col span={8}>
                    <Input
                        prefix={<Icon type='link'></Icon>}
                        placeholder='url'
                        //value={}
                        //onChange={}
                    >
                    </Input>
                </Col>
                <Col span={8}>
                    <DatePicker 
                        style={{width: '100%'}}
                        format='DD/MM/YYYY HH:mm:ss'
                        placeholder='Fecha de publicación'
                        // value={}
                        // onChange={}
                    >

                    </DatePicker>
                </Col>
            </Row>
            <Editor
         value=""
         init={{
           height: 500,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
         //onEditorChange={this.handleEditorChange}
       />
       <Button type='primary' htmlType='submit' className='btn-submit'>
           { post ? 'Actualizar post' : 'Crear post' }
       </Button>
        </Form>
    );
}
