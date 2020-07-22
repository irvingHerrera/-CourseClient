import { basePath, apiVersion } from './config';

export function getMenuApi() {
    const url = `${basePath}/${apiVersion}/getMenu/`;

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

export function updateMenuApi(token, menuId, data) {
    const url = `${basePath}/${apiVersion}/updateMenu/${menuId}`;

    const params = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result.message;
    })
    .catch(err => {
        return err.message;
    });

}

export function activateMenuApi(token, menuId, data) {
    const url = `${basePath}/${apiVersion}/activateMenu/${menuId}`;

    const params = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
        },
        body: JSON.stringify({ active: data })
    };

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result.message;
    })
    .catch(err => {
        return err.message;
    });

}

export function addMenuApi(token, menu) {
    const url = `${basePath}/${apiVersion}/addmenu`;

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
        },
        body: JSON.stringify(menu)
    };

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result.message;
    })
    .catch(err => {
        return err.message;
    });
}

export function deleteMenuApi(token, menuId) {
    const url = `${basePath}/${apiVersion}/deleteMenu/${menuId}`;

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
        return result.message;
    }) 
    .catch(err => {
        return err.message;
    });

}