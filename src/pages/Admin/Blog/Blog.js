import React, {useState, useEffect} from 'react';
import { Button, notification } from 'antd';
import Modal from '../../../components/Modal';

import './Blog.scss';

export default function Blog() {
    const [modalTitle, setModalTitle] = useState('');
    const [isVisible, setisVisible] = useState(false);
    const [modalContent, setmodalContent] = useState(null);

    return (
        <div className='blog'>
            <div className='blog__add-post'>
                <Button type='primary'>Nuevo post</Button>
            </div>
            <h1>Post list</h1>
            <h2>Paginación</h2>

            <Modal 
                title={modalTitle}
                isVisible={isVisible}
                setIsvisible={setisVisible}
                width='75%'
            ></Modal>
        </div>
    )
}
