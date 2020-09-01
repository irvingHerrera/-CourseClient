import { basePath, apiVersion } from './config';

export function getPostApi(limit, page) {
    const url = `${basePath}/${apiVersion}/getpost/?limit=${limit}&page=${page}`;

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
}

export function deletePostApi(token, id) {
    const url = `${basePath}/${apiVersion}/deletePost/${id}`;

    const params = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
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
        return err;
    });

}

export function addPostApi(token, post) {
    const url = `${basePath}/${apiVersion}/addpost/`;

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify(post)
    };

    return fetch(url, params) 
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    }) 
    .catch(err => {
        return err;
    });


}

export function updatePostApi(token, id, data) {
    const url = `${basePath}/${apiVersion}/updatePost/${id}`;

    const params = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params) 
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    }) 
    .catch(err => {
        return err;
    });


}