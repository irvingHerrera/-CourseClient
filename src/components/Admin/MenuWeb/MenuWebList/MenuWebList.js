import React, { useState, useEffect } from 'react';
import { Switch, List, Button, Icon, Modal as ModalAntd, notification } from 'antd';
import Modal from '../../../Modal';
import DragSortableList from 'react-drag-sortable'
import { updateMenuApi, activateMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';
import AddMenuWebForm from '../AddMenuWebForm'
import EditMenuWebForm from '../EditMenuWebForm'

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
                content: (<MenuItem item={item} 
                    activateMenu={activateMenu} 
                    editMenuWebmodal={editMenuWebmodal}></MenuItem>)
            });
        })
        setlistItems(listItemsArray);
    }, [menu]);

    const activateMenu = (menu, status) => {
        const token = getAccessTokenApi();
     console.log(token);

     activateMenuApi(token, menu._id, status)
        .then(response => {
            notification['success'](
                {
                    message: response
                }
            )
        });
    };

    const onSort = (sortedList, dropEvent) => {
        const token = getAccessTokenApi();

        sortedList.forEach(item => {
            const { _id } = item.content.props.item;
            const order = item.rank;

            updateMenuApi(token, _id, { order })
            .then(response => {

            });
        });

    };

    const addMenuWebModal = () => {
        setVisibleModal(true);
        setModalTitle('Creando nuevo menú');
        setModalContent(<AddMenuWebForm 
            setVisibleModal={setVisibleModal} 
            setReloadMenu={setReloadMenu}
        ></AddMenuWebForm>);
    }

    const editMenuWebmodal = menu => {
        setVisibleModal(true);
        setModalTitle(`Editanto menu: ${menu.title}`);
        setModalContent(
            <EditMenuWebForm setVisibleModal={setVisibleModal} 
            setReloadMenu={setReloadMenu}
            menu={menu}></EditMenuWebForm>
        );
    }

    return(
        <div className='menu-web-list'>
            <div className='menu-web-list__header'>
                <Button 
                type='primary' onClick={addMenuWebModal}>
                    Crear Menu
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

            <Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setVisibleModal}>
                {modalContent}
            </Modal>

        </div>
    );
}

function MenuItem(props) {
    const { item, activateMenu, editMenuWebmodal} = props;

    return (
        <List.Item
        actions={[
            <Switch defaultChecked={item.active}
                onChange={e => activateMenu(item, e)}
            ></Switch>,
            <Button type='primary' onClick={() =>editMenuWebmodal(item)}>
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