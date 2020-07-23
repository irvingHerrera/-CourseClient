import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import reactjHooks from '../../../assets/jpg/react-js-hooks.jpg';
import reactjNative from '../../../assets/jpg/react-native.jpg';
import javaScript from '../../../assets/jpg/javascript-es6.jpg';
import wordpress from '../../../assets/jpg/wordpress.jpg';
import prestashop from '../../../assets/jpg/prestashop-1-7.jpg';
import cssGrid from '../../../assets/jpg/css-grid.jpg';

import './HomeCourses.scss'


export default function HomeCourses() {

    return(
        <Row className='home-courses'>
            <Col lg={24} className='home-courses__title'>
                <h2>Aprende y mejora tus habilidades</h2>
            </Col>
            <Col lg={4}></Col>
            <Col lg={16}>
                <Row className='row-courses'>
                    <Col md={6}>
                        <CardCourse 
                            image={reactjHooks} 
                            link='http://www.google.com'
                            subtitle='Intermedio - Reactjs'
                            title='React Js Hooks'
                        ></CardCourse>
                    </Col>
                    <Col md={6}>
                        <CardCourse 
                            image={javaScript} 
                            link='http://www.google.com'
                            subtitle='JavaScript Intermedio'
                            title='JavaScript'
                        ></CardCourse>
                    </Col>
                    <Col md={6}>
                        <CardCourse 
                            image={reactjNative} 
                            link='http://www.google.com'
                            subtitle='Intermedio - React Native'
                            title='React Native'
                        ></CardCourse>
                    </Col>
                    <Col md={6}>
                        <CardCourse 
                            image={wordpress} 
                            link='http://www.google.com'
                            subtitle='Native Intermedio'
                            title='Native'
                        ></CardCourse>
                    </Col>
                </Row>
                <Row className='row-courses'>
                <Col md={6}>
                    <CardCourse 
                            image={prestashop} 
                            link='http://www.google.com'
                            subtitle='prestashop Intermedio'
                            title='prestashop'
                    ></CardCourse>
                </Col>
                <Col md={6}></Col>
                <Col md={6}></Col>
                <Col md={6}>
                    <CardCourse 
                            image={cssGrid} 
                            link='http://www.google.com'
                            subtitle='cssGrid Intermedio'
                            title='cssGrid'
                    ></CardCourse>
                </Col>
                </Row>
            </Col>
            <Col lg={4}></Col>
            <Col lg={24} className='home-courses__more'>
                <Link to='/course'>
                    <Button>
                        Ver mas
                    </Button>
                </Link>
            </Col>
        </Row>
    );
}

function CardCourse(props) {
    const { image, title, subtitle, link } = props;
    const { Meta } = Card;

    return(
    <a href={link} target='_blank' rel="noopener noreferrer">
        <Card
         className='home-courses__card'
         cover={<img src={image} alt={title}></img>}
         actions={[<Button>Ingresar</Button>]}
        >
            <Meta title={title} description={subtitle}></Meta>
        </Card>
    </a>
    );
}