import { basePath, apiVersion } from './config';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';

export function getCoursesApi() {
    const url = `${basePath}/${apiVersion}/getCourse`;

    return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err.message;
    });
};

export function getCourseDataUdemyApi(id) {
    const baseUrl = `https://www.udemy.com/api-2.0/courses/${id}/`;
    const coursesParams = `?fields[course]=title,headline,url,price,image_480x270`;
    const url = baseUrl + coursesParams;

    return fetch(url)
    .then(async response => {
        return { code: response.status, data: await response.json() };
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err.message;
    });
}

export function deleteCourseApí(token, id) {
    const url = `${basePath}/${apiVersion}/deleteCourse/${id}`;

    const params = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
        }
    };

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err.message;
    });
}
