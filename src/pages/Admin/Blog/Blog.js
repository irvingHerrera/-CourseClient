import React, {useState, useEffect} from 'react';
import { Button, notification } from 'antd';
import queryString from 'query-string';
import Modal from '../../../components/Modal';
import { withRouter } from 'react-router-dom';
import {getPostApi} from '../../../api/post';
import PostsList from '../../../components/Admin/Blog/PostsList';
import AddEditPostForm from '../../../components/Admin/Blog/AddEditPostForm';
import Pagination from '../../../components/Pagination';

import './Blog.scss';

function Blog(props) {
    const { location, history } = props;
    const [modalTitle, setModalTitle] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [reloadPosts, setReloadPosts] = useState(false)
    const [post, setPost] = useState(null)
    const {page = 1} = queryString.parse(location.search);

    useEffect(() => {
        getPostApi(10, page)
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
    }, [page, reloadPosts]);

    const addPost= () => {
        setIsVisible(true);
        setModalTitle('Creando nuevo post');
        setModalContent(<AddEditPostForm 
            setIsVisible ={setIsVisible} 
            setReloadPosts={setReloadPosts}
            post={null}></AddEditPostForm>);
        
    }

    const editPosts = post => {
        setIsVisible(true);
        setModalTitle('Editando post');
        setModalContent(<AddEditPostForm 
            setIsVisible ={setIsVisible} 
            setReloadPosts={setReloadPosts}
            post={post}></AddEditPostForm>);
    }

    if(!post) {
        return null;
    }

    return (
        <div className='blog'>
            <div className='blog__add-post'>
                <Button type='primary' onClick={addPost}>Nuevo post</Button>
            </div>
            <PostsList posts={post} setReloadPosts={setReloadPosts} editPosts={editPosts}></PostsList>
            <Pagination posts={post} location={location} history={history}></Pagination>

            <Modal 
                title={modalTitle}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                width='75%'
            >{modalContent}</Modal>
        </div>
    )
}

export default withRouter(Blog);