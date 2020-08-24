import React, { useState, useEffect } from 'react'
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { getMenuApi } from '../../../api/menu';
import logoWhite from '../../../assets/png/logo-white.png';
import SocialLinks from '../SocialLinks'

import './MenuTop.scss'

export default function MenuTop() {

    const [menuData, setMenuData] = useState([]);
    useEffect(() => {
        getMenuApi().then(response => {
            setMenuData(response.menus.filter(m => m.active));
            
        })
    }, [])

    return(
        <Menu className='menu-top-web' mode='horizontal'>
            <Menu.Item className='menu-top-web__logo'>
                <Link to={'/'}>
                    <img src={logoWhite} alt='logo' />
                </Link>
            </Menu.Item>
             {
                 menuData.map(item => {
                     const external = item.url.indexOf('http') > -1 ? true : false;

                     if(external) {
                         return (
                             <Menu.Item key={item._id} className='menu-top-web__item'>
                                 <a href={item.url} target='_blank' rel="noopener noreferrer">
                                     {item.title}
                                 </a>
                             </Menu.Item>
                         );
                     }

                     return (
                        <Menu.Item key={item._id} className='menu-top-web__item'>
                            <Link to={item.url}>{item.title}</Link>
                        </Menu.Item>
                     );
                 })
             }

            <SocialLinks></SocialLinks>
        </Menu>
    )
}
