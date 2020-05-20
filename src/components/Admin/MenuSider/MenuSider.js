import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import './MenuSider.scss';

export default function MenuSider(props) {
    
    const { menuCollapsed } = props;
    const { Sider } = Layout;

    return (
        <Sider className='admin-sider' collapsed={menuCollapsed}>
        <Menu theme='dark' mode='inline' defaultOpenKeys={['1']}>
            <Menu.Item key='1'>
                <Link to={'/admin'}>
                    <Icon type='home'></Icon>
                    <span className='nav-text'>Home</span>
                </Link>
            </Menu.Item>
            <Menu.Item key='2'>
                <Link to={'/admin/menu-web'}>
                    <Icon type='menu'></Icon>
                    <span className='nav-text'>Menu web</span>
                </Link>
            </Menu.Item>
        </Menu>
        </Sider>
    );
}