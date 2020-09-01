import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Icon, Input, Button, DatePicker, notification } from 'antd';
import { Editor } from '@tinymce/tinymce-react'
import moment from 'moment';
import {getAccessTokenApi} from '../../../../api/auth';
import { addPostApi } from '../../../../api/post';

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

    const processPost = e => {
        e.preventDefault();
        const { title, url, description, date } = postData;

        if(!title || !url || !description || !date) {
            notification['error']({
                message: 'Todos los campos son obligatorios'
            });
        } else {
            if(!post) {
                addPost();
            } else {
    
            }
        }
    }

    const addPost = () => {
        const token = getAccessTokenApi();

        addPostApi(token, postData)
        .then(response => {
            const typeNotification = response.code === 200 ? 'success' : 'warning';

            notification[typeNotification]({
                message: response.message
            });
            setIsVisible(false);
            setReloadPosts(true);
            setPostData({});
        })
        .catch(err => {
            notification['error']({
                message: 'Error del servidor'
            });
        });
    }

    return (
        <div className='add-edit-post-form'>
            <AddEditForm postData={postData} setPostData={setPostData} 
            post={post} processPost={processPost}></AddEditForm>
        </div>
    );
}

function AddEditForm(props) {
    const { postData, setPostData, post, processPost } = props;

    return(
        <Form
            className='add-edit-post-form'
            layout='inline'
            onSubmit={processPost}
        >
            <Row gutter={24}>
                <Col span={8}>
                    <Input
                        prefix={<Icon type='font-size'></Icon>}
                        placeholder='Titulo'
                        value={postData.title}
                        onChange={e => setPostData({...postData, title: e.target.value})}
                    >
                    </Input>
                </Col>
                <Col span={8}>
                    <Input
                        prefix={<Icon type='link'></Icon>}
                        placeholder='url'
                        value={postData.url}
                        onChange={e => setPostData({...postData, url: trasformTextToUrl(e.target.value)})}
                    >
                    </Input>
                </Col>
                <Col span={8}>
                    <DatePicker 
                        style={{width: '100%'}}
                        format='DD/MM/YYYY HH:mm:ss'
                        placeholder='Fecha de publicación'
                        value={postData.date && moment(postData.date)}
                        onChange={(e, value) => 
                            setPostData({...postData, date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString()
                    })}
                    />
                </Col>
            </Row>
            <Editor
         value={postData.description ? postData.description : ''}
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
         onBlur={e => setPostData({ ...postData, description: e.target.getContent()})}
       />
       <Button type='primary' htmlType='submit' className='btn-submit'>
           { post ? 'Actualizar post' : 'Crear post' }
       </Button>
        </Form>
    );
}

function trasformTextToUrl(text) {
    const url = text.replace(' ', '-');
    return url.toLowerCase();
}