import React from 'react'
import { getCourseDataUdemyApi } from '../../../../api/courses'

export default function CoursesList(props) {
    const { courses, setReloadCourses } = props;
    if(courses.length > 0) {
        courses.forEach(element => {
            getCourseDataUdemyApi(element.idCourse)
            .then(response => {
                console.log('sss',response);
            })
        });
    }

    return (
        <div>
            <h1>Courses List...</h1>
        </div>
    )
}
