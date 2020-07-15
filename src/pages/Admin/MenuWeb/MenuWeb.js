import React, { useState, useEffect } from 'react';
import { getMenuApi } from '../../../api/menu';
import MenuWebList from '../../../components/Admin/MenuWeb/MenuWebList';

import './MenuWeb.scss'

export default function MenuWeb() {

    const [menu, setMenu] = useState([]);
    const [reloadMenu, setReloadMenu] = useState(false);

    useEffect(() => {
        getMenuApi().then(response => {
            setMenu(response.menus);
        });

        setReloadMenu(false);
    }, [reloadMenu]);

    return(
        <div className='menu-web'>
            <MenuWebList menu={menu} setReloadMenu={setReloadMenu}></MenuWebList>
        </div>
    );
}