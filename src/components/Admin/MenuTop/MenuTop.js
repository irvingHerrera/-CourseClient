import React from 'react';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/png/original.png';
import { logout } from '../../../api/auth'

import './MenuTop.scss';

export default function MenuTop(props) {

    const {menuCollapsed, setMenuCollapsed} = props;

    const logoutUser = () => {
        logout();
        window.location.reload();
    };

    return (
        <div className='menu-top'>
            <div className='menu-top__left'>
                <Link to={'/admin'}>
                    <img 
                        className='menu-top__left-logo'
                        src={Logo}
                        alt='IUHM'>
                    </img>
                </Link>
                <Button type='link' onClick={ () => setMenuCollapsed(!menuCollapsed) }>
                    <Icon type={menuCollapsed ? 'menu-unfold' : 'menu-fold'}></Icon>
                </Button>
            </div>
            <div className='menu-top__right'>
                <Button type='link' onClick={() => logoutUser()}>
                    <Icon type='poweroff'></Icon>
                </Button>
            </div>
        </div>
    );
}