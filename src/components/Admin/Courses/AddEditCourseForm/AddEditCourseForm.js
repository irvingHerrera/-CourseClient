import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';
import { getAccessTokenApi } from '../../../../api/auth';
import {addCourseApi, updateCourseApi} from '../../../../api/courses';

import './AddEditCourseForm.scss'

export default function AddEditCourseForm(props) {
    const { setIsVisibleModel, setReloadCourses, course } = props;
    const [ courseData, setCourseData ] = useState({});

    useEffect(() => {
        course ? setCourseData(course) : setCourseData({});
        
    }, [course])

    const addCourse = e => {
        e.preventDefault();
        
        if(!courseData.idCourse) {
            notification['error']({
                message: 'El id del curso es obligatorio'
            });
        } else {
            const token = getAccessTokenApi();

            addCourseApi(token, courseData)
            .then(response => {
                const typeNotificacion = response.code === 200 ? 'success' : 'warning';

                notification[typeNotificacion]({
                    message: response.message
                });

                setIsVisibleModel(false);
                setReloadCourses(true);
                setCourseData({});
            })
            .catch(() => {
                notification['error']({
                    message: 'Error del servidor, intentelo más tarde.'
                });
            })
        }
    }

    const updateCourse = e => {
        e.preventDefault();
        const token = getAccessTokenApi();

        updateCourseApi(token, course._id, courseData)
            .then(response => {
                const typeNotificacion = response.code === 200 ? 'success' : 'warning';

                notification[typeNotificacion]({
                    message: response.message
                });

                setIsVisibleModel(false);
                setReloadCourses(true);
                setCourseData({});
            })
            .catch(() => {
                notification['error']({
                    message: 'Error del servidor, intentelo más tarde.'
                });
            })
    }

    return (
        <div className='add-edit-course-form'>
            <AddEditForm
                course={course}
                addCourse={addCourse}
                updateCourse={updateCourse}
                setCourseData={setCourseData}
                courseData={courseData}
            >

            </AddEditForm>
        </div>
    )
}

function AddEditForm(props) {
    const {course, addCourse, updateCourse, 
        setCourseData, courseData} = props;
    return(
        <Form className='form-add-edit' onSubmit={course ? updateCourse : addCourse}>
            <Form.Item>
                <Input
                    prefix={<Icon type='key'></Icon>}
                    placeholder='ID del curso'
                    value={courseData.idCourse}
                    onChange={e => setCourseData({...courseData, idCourse: e.target.value})}
                    disabled={course ? true : false}
                ></Input>
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type='link'></Icon>}
                    placeholder='Url del curso'
                    value={courseData.link}
                    onChange={e => setCourseData({...courseData, link: e.target.value})}
                ></Input>
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type='gift'></Icon>}
                    placeholder='Cupon de descuento'
                    value={courseData.coupon}
                    onChange={e => setCourseData({...courseData, coupon: e.target.value})}
                ></Input>
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type='dollar'></Icon>}
                    placeholder='Precio del curso'
                    value={courseData.price}
                    onChange={e => setCourseData({...courseData, price: e.target.value})}
                ></Input>
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' className='btn-submit'>
                    {course ? 'Actualizar curso' : 'Crear curso'}
                </Button>
            </Form.Item>
        </Form>
    )
}