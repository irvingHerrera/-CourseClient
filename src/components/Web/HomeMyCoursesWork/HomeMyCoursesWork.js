import React from 'react'
import { Row, Col, Card, Icon} from 'antd';

import './HomeMyCoursesWork.scss';

export default function HomeMyCoursesWork() {
    return (
        <Row className='home-my-courses-work'>
            <Col lg={24} className='home-my-courses-work__title'>
                <h2>¿Como funciona mis cursos?</h2>
                <h3>Cada curso cuenta con contenido bajo la web de Udemy, activa las 
                    24 horas del dia los 365 días del año
                </h3>
            </Col>
            <Col lg={4}></Col>
            <Col lg={16}>
                <Row className='row-cards'>
                    <Col md={8}>
                        <CardInfo
                            icon='clock-circle'
                            title='Cursos y clases'
                            description='Cursos entre 10 y 30 horas y cada clase del curso con duracion maxima de 15 minutos'
                        ></CardInfo>
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon='key'
                            title='Acceso 24/7'
                            description='Cursos entre 10 y 30 horas y cada clase del curso con duracion maxima de 15 minutos'
                        ></CardInfo>
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon='message'
                            title='Aprendizaje colaborativo'
                            description='Cursos entre 10 y 30 horas y cada clase del curso con duracion maxima de 15 minutos'
                        ></CardInfo>
                    </Col>
                </Row>
                <Row className='row-cards'>
                    <Col md={8}>
                        <CardInfo
                            icon='user'
                            title='Mejora tu perfil'
                            description='Cursos entre 10 y 30 horas y cada clase del curso con duracion maxima de 15 minutos'
                        ></CardInfo>
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon='dollar'
                            title='Precios bajos'
                            description='Cursos entre 10 y 30 horas y cada clase del curso con duracion maxima de 15 minutos'
                        ></CardInfo>
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon='check-circle'
                            title='Certificados de finalizacion'
                            description='Cursos entre 10 y 30 horas y cada clase del curso con duracion maxima de 15 minutos'
                        ></CardInfo>
                    </Col>
                </Row>
            </Col>
            <Col lg={4}></Col>
        </Row>
    )
}

function CardInfo(props) {
    const { icon, title, description } = props;
    const { Meta } = Card;

    return(
        <Card className='home-my-courses-work__card'>
            <Icon type={icon}></Icon>
            <Meta title={title} description={description}></Meta>
        </Card>
    )

}
