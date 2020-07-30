import React from 'react'
import { Row, Col, Icon } from 'antd';
import { Link } from 'react-router-dom';

import './NavigationFooter.scss';

export default function NavigationFooter() {
    return (
        <Row className='navigation-footer'>
            <Col>
                <h3>Navegación</h3>
            </Col>
            <Col md={12}>
                <RenderListLeft></RenderListLeft>
            </Col>
            <Col md={12}>
                <RenderListRight></RenderListRight>
            </Col>
        </Row>
    )
}

function RenderListLeft() {
    return(
        <ul>
            <li>
                <a href='#'>
                    <Icon type='book'></Icon>
                     Cursos Online
                </a>
            </li>
            <li>
                <a href='#'>
                    <Icon type='code'></Icon>
                    Desarrollo Web
                </a>
            </li>
            <li>
                <a href='#'>
                    <Icon type='database'></Icon>
                    Base de datos
                </a>
            </li>
            <li>
                <a href='#'>
                    <Icon type='right'></Icon>
                    Politica de Privacidad
                </a>
            </li>
        </ul>
    );
}

function RenderListRight() {
    return(
        <ul>
            <li>
                <a href='#'>
                    <Icon type='hdd'></Icon>
                     Sistemas / Servidores
                </a>
            </li>
            <li>
                <a href='#'>
                    <Icon type='appstore'></Icon>
                    CMS
                </a>
            </li>
            <li>
                <a href='#'>
                    <Icon type='user'></Icon>
                    Portafolio
                </a>
            </li>
            <li>
                <a href='#'>
                    <Icon type='right'></Icon>
                    Politica de cookies
                </a>
            </li>
        </ul>
    );
}