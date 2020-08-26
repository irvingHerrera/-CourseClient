import React, {useState, useEffect} from 'react';
import {Row, Col, Card, Button, Rate, notification} from 'antd';
import {getCourseDataUdemyApi} from '../../../../api/courses';

import './CourseList.scss';
import Course from '../../../../pages/Course';
export default function CourseList(props) {
    const { courses } = props;

    return (
        <div className='course-list'>
            <Row>
                {
                    courses.map(course => (
                        <Col key={course._id} md={8} className='course-list__course'>
                            <Courses course={course}></Courses>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

function Courses(props) {
    const {course} = props;
    const [courseInfo, setCourseInfo] = useState({});
    const [urlCurse, setUrlCurse] = useState('')
    const {Meta} = Card;

    useEffect(() => {
        getCourseDataUdemyApi(course.idCourse)
        .then(response => {
            if(response?.code !== 200) {
                notification['warning']({
                    message: response.message
                });
            } else {
                setCourseInfo(response.data);
                mountUrl(response.data.url);
            }
        })
        .catch(() => {
            notification['error']({
                message: 'Error del servidor, intentelo mas tarde'
            });
        });
    }, [course])

    const mountUrl = url => {
        if(!course.link) {
            const baseUrl = `https://www.udemy.com${url}`;
            const finalUrl = baseUrl + (course.coupon ? `?couponCode=${course.coupon}` : '');
            setUrlCurse(finalUrl);
        } else {
            setUrlCurse(course.link);
        }
    };

    return (
        <a href={urlCurse} target='_blank' rel=''>
            <Card
                cover={<img src={courseInfo.image_480x270} alt={courseInfo.title}></img>}
            >
                <Meta title={courseInfo.title} description={courseInfo.headline}>
                </Meta>
                <Button>Entrar en el curso</Button>
                <div className='course-list__course-footer'>
                    <span>{course.price ? `${course.price}` : courseInfo.price}</span>
                    <div>
                        <Rate disabled defaultValue={5}></Rate>
                    </div>
                </div>
            </Card>
        </a>
    )
}
