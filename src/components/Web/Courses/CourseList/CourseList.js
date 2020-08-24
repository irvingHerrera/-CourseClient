import React, {useState, useEffect} from 'react';
import {Row, Col, Card, Button, Rate, notification} from 'antd';
import {getCourseDataUdemyApi} from '../../../../api/courses';

import './CourseList.scss';
import Course from '../../../../pages/Course';
export default function CourseList(props) {
    const { courses } = props;
    console.log(courses);
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
    const [courseInfo, setCourseInfo] = useState(null);
    console.log(courseInfo);
    useEffect(() => {
        getCourseDataUdemyApi(course.idCourse)
        .then(response => {
            if(response?.code !== 200) {
                notification['warning']({
                    message: response.message
                });
            } else {
                setCourseInfo(response.data);
            }
        })
        .catch(() => {
            notification['error']({
                message: 'Error del servidor, intentelo mas tarde'
            });
        });
    }, [course])

    return <p>ff</p>
}
