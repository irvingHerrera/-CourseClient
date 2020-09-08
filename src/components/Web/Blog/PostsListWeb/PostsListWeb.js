import React, {useState, useEffect} from 'react';
import {Spin, List, notification} from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import queryString from 'query-string';
import Pagination from '../../../Pagination';
import { getPostApi } from '../../../../api/post';
import 'moment/locale/es';

import './PostsListWeb.scss';

export default function PostsListWeb(props) {
    const { location, history } = props;
    const [posts, setPosts] = useState(null);
    const { page = 1 } = queryString.parse(location.search);

    useEffect(() => {
       getPostApi(10, page)
       .then(response => {
           console.log('response',response);
           if(response?.code !== 200) {
            notification['warning']({
                message: response.message
            });
           } else {
                setPosts(response.posts);
           }
       })
       .catch(err => {
        notification['warning']({
            message: 'Error del servidor'
        });
       });
    }, [page])

    if(!posts) {
        return(
            <Spin tip='Cargando...' style={{ width: '100%', padding: '200px 0'}}></Spin>
        );
    }

    return (
        <div className='posts-lits-web'>
            <h1>Blog</h1>
            <List dataSource={posts.docs}
                renderItem={post => <Post post={post}></Post>}>
            </List>
            <Pagination posts={posts} location={location} history={history}></Pagination>
        </div>
    )
}


function Post(props) {
    const { post } = props;
    console.log('post', post);
    const day = moment(post.date).format('DD');
    const month = moment(post.date).format('MMM');

    return (
        <List.Item className='post'>
            <div className='post__date'>
                <span>{day}</span>
                <span>{month}</span>
            </div>
            <Link to={`blog/${post.url}`}>
                <List.Item.Meta title={post.title}></List.Item.Meta>
            </Link>
        </List.Item>
    );
}