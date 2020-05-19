import React from 'react';
import { Button, Icon } from 'antd';
import Logo from '../../../assets/png/original.png';

import './MenuTop.scss';

export default function MenuTop() {
    return (
        <div className='menu-top'>
            <div className='menu-top__left'>
                <img 
                    className='menu-top__left-logo'
                    src={Logo}
                    alt='IUHM'>
                </img>
                <Button type='link' onClick={ () => console.log('click')}>
                    <Icon type='menu-fold'></Icon>
                </Button>
            </div>
            <div className='menu-top__right'>
                <Button type='link'>
                    <Icon type='poweroff'></Icon>
                </Button>
            </div>
        </div>
    );
}