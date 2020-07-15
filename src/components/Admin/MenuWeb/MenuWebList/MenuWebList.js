import React, { useState, useEffect } from 'react';
import { Switch, List, Button, Icon, Modal as ModalAntd, notification } from 'antd';
import Modal from '../../../Modal';
import DragSortableList from 'react-drag-sortable'
import { updateMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

import './MenuWebList.scss'

const { confirm } = ModalAntd;

export default function MenuWebList(props) {
    const { menu, setReloadMenu } = props;
    const [listItems, setlistItems] = useState([]);
    const [isVisibleModal, setVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listItemsArray = [];

        menu.forEach(item => {
            console.log(item);
            listItemsArray.push({
                content: (<MenuItem item={item}></MenuItem>)
            });
        })
        setlistItems(listItemsArray);
    }, [menu])

    const onSort = (sortedList, dropEvent) => {
        const token = getAccessTokenApi();

        sortedList.forEach(item => {
            const { _id } = item.content.props.item;
            const order = item.rank;

            updateMenuApi(token, _id, { order })
            .then(response => {

            });
        });

        console.log(sortedList);
    };

    return(
        <div className='menu-web-list'>
            <div className='menu-web-list__header'>
                <Button 
                type='primary'>
                    Nuevo Menu
                </Button>
            </div>
            <div className='menu-web-list__items'>
                <DragSortableList
                 items={listItems}
                 onSort={onSort}
                 type='vertical'
                >
                </DragSortableList>
            </div>
        </div>
    );
}

function MenuItem(props) {
    const { item } = props;

    return (
        <List.Item
        actions={[
            <Switch defaultChecked={item.active}></Switch>,
            <Button type='primary'>
                <Icon type='edit'></Icon>
            </Button>,
            <Button type='danger'>
            <Icon type='delete'></Icon>
        </Button>
        ]}
        >
            <List.Item.Meta title={item.title} description={item.url}></List.Item.Meta>
        </List.Item>
    );
}