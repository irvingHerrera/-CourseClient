import React, {useState, useEffect} from 'react';
import { Button, notification } from 'antd';
import queryString from 'query-string';
import Modal from '../../../components/Modal';
import { withRouter } from 'react-router-dom';
import {getPostApi} from '../../../api/post';

import './Blog.scss';

function Blog(props) {
    const { location, history } = props;
    const [modalTitle, setModalTitle] = useState('');
    const [isVisible, setisVisible] = useState(false);
    const [modalContent, setmodalContent] = useState(null);
    const [reloadPosts, setReloadPosts] = useState(false)
    const [post, setPost] = useState(null)
    const {page = 1} = queryString.parse(location.search);

    console.log(post);

    useEffect(() => {
        getPostApi(12, page)
        .then(response => {
            if(response?.code !== 200) {
                notification['warning']({
                    message: response.message
                });
            } else {
                setPost(response.posts);
            }
        })
        .catch(err => {
            notification['error']({
                message: 'Error del servidor.'
            });
        });
        setReloadPosts(false);
    }, [page])

    return (
        <div className='blog'>
            <div className='blog__add-post'>
                <Button type='primary'>Nuevo post</Button>
            </div>
            <h1>Post list</h1>
            <h2>Paginación</h2>

            <Modal 
                title={modalTitle}
                isVisible={isVisible}
                setIsvisible={setisVisible}
                width='75%'
            ></Modal>
        </div>
    )
}

export default withRouter(Blog);