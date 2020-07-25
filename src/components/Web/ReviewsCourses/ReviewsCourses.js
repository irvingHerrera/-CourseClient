import React from 'react';
import { Row, Col, Card, Avatar} from 'antd';
import AvatarPersonal from '../../../assets/jpg/avatar.jpg'

import './ReviewsCourses.scss';

export default function ReviewsCourses() {
    return (
        <Row className='reviews-courses'>
            <Row>
                <Col lg={4}></Col>
                <Col lg={16} className='reviews-courses__title'>
                    <h2>Forma parte de los +35 estidiantes que estan aprendiendo con mis cursos</h2>
                </Col>
                <Col lg={4}></Col>
            </Row>
            <Row>
                <Col lg={4}></Col>
                <Col lg={16}>
                    <Row className='row-cards'>
                        <Col md={8}>
                            <CardReview
                                name='Irving Herrera'
                                subtitile='Alumno ude Udemy'
                                avatar={AvatarPersonal}
                                review='Un curso excelente, el profesor explica detalladamente....'
                            ></CardReview>
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name='David Herrera'
                                subtitile='Alumno ude Udemy'
                                avatar={AvatarPersonal}
                                review='Un curso excelente, el profesor explica detalladamente....'
                            ></CardReview>
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name='Fernando Herrera'
                                subtitile='Alumno ude Udemy'
                                avatar={AvatarPersonal}
                                review='Un curso excelente, el profesor explica detalladamente....'
                            ></CardReview>
                        </Col>
                    </Row>
                    <Row className='row-cards'>
                        <Col md={8}>
                            <CardReview
                                name='Jose Hernadez'
                                subtitile='Alumno ude Udemy'
                                avatar={AvatarPersonal}
                                review='Un curso excelente, el profesor explica detalladamente....'
                            ></CardReview>
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name='Vicente de Jesus'
                                subtitile='Alumno ude Udemy'
                                avatar={AvatarPersonal}
                                review='Un curso excelente, el profesor explica detalladamente....'
                            ></CardReview>
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name='Irving Irving'
                                subtitile='Alumno ude Udemy'
                                avatar={AvatarPersonal}
                                review='Un curso excelente, el profesor explica detalladamente....'
                            ></CardReview>
                        </Col>
                    </Row>
                </Col>
                <Col lg={4}></Col>
            </Row>
        </Row>
    )
}

function CardReview(props) {

    const { name, subtitile, avatar, review } = props;
    const { Meta } = Card;
    return(
        <Card className='reviews-courses__card'>
            <p>{review}</p>
            <Meta
                avatar={<Avatar src={avatar}></Avatar>}
                title={name}
                description={subtitile}
            >
            </Meta>
        </Card>
    );
}