import React, {useState, useEffect} from 'react';
import { Row, Col, Spin, notification } from 'antd';
import { getCoursesApi } from '../api/courses';
import PresentationCourses from '../components/Web/Courses/PresentationCourses';
import CourseList from '../components/Web/Courses/CourseList';

export default function Course() {

    const [courses, setCourses] = useState(null);
    useEffect(() => {
       getCoursesApi()
       .then(response => {
            if(response?.code !== 200) {
                notification['warning']({
                    message: response.message
                });
            } else {
                setCourses(response.courses);
            }
       })
       .catch(() => {
            notification['error']({
                message: 'Error del servidor, intentelo mas tarde'
            });
       });
    }, []);

    return (
        <Row>
            <Col md={4}></Col>
            <Col md={16}>
            <PresentationCourses>

            </PresentationCourses>
                {!courses ? (
                    <Spin tip='Cargando cursos' style={{
                        textAlign: 'center', width:'100%', padding:'20px'
                    }}></Spin>
                ) : (<CourseList courses={courses}></CourseList>)}
            </Col>
            <Col md={4}></Col>
        </Row>
    )
}
