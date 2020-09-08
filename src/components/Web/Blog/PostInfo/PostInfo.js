import React, { useState, useEffect } from 'react';
import { Spin, notification } from 'antd';
import moment from 'moment';
import {getPostUrlApi} from '../../../../api/post';
import 'moment/locale/es';

import './PostInfo.scss';

export default function PostInfo(props) {
    const { url } = props;
    const [postInfo, setPostInfo] = useState(null);

    useEffect(() => {
        getPostUrlApi(url)
        .then(response => {
            if(response.code !== 200) {
                notification['warning']({
                    message: response.message
                });
            } else {
                setPostInfo(response.post);
            }
        })
        .catch(e =>{
            notification['warning']({
                message: 'Error del servidor'
            });
        })
       
    }, [url])

    if(!postInfo) {
        return <Spin tip='Cargando...' style={{ width: '100%', padding: '200px 0' }}></Spin>
    }

    return (
        <div className='post-info'>
            <h1 className='post-info__title'>{postInfo.title}</h1>
            <div className='post-info__create-date'>
                {
                    moment(postInfo.date)
                    .local('es')
                    .format('LL')
                }
            </div>

            <div className='post-info__description'
            dangerouslySetInnerHTML={{ __html: postInfo.description}}></div>

        </div>
    )
}
