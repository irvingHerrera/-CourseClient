import React from 'react';
import { List, Button, Icon, Modal, notification} from 'antd';
import { Link } from 'react-router-dom';

import './PostsList.scss';

const { confirm } = Modal;

export default function PostsList(props) {

    const { posts } = props; 

    console.log(posts);

    return (
        <div className='posts-list'>
            <List
                dataSource={posts.docs}
                renderItem={post =><Post post={post}></Post>}
            >
                
            </List>
        </div>
    )
}

function Post(props) {
    const { post } = props;

    return(
        <List.Item
            actions={[
                <Link to={`/blog/${post.url}`} target='_blank'>
                    <Button 
                        type='primary'>
                        <Icon type='eye'></Icon>
                    </Button>
                </Link>,
                <Button
                    type='primary'>
                    <Icon type='edit'></Icon>
                </Button>,
                <Button
                    type='danger'>
                    <Icon type='delete'></Icon>
                </Button>
            ]}>
                <List.Item.Meta title={post.title}></List.Item.Meta>
        </List.Item>
    )
}
