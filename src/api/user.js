import { basePath, apiVersion } from './config';

export function signUpApi(data) {
    const url = `${basePath}/${apiVersion}/sign-up`;
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(url, params)
    .then(response => {
        return response.json();  
    })
    .then(result => {
        if(result.user) {
            return {
                ok: true,
                status: 200,
                message: 'Usuario creado correctamente'
            }
            //return result;
        }
        return {
            status: 404,
            ok: false,
            message: result.message
        }
    })
    .catch( error => {
        return {
            status: 404,
            ok: false,
            message: error.message
        }
    })
}

export function signInApi(data) {
    const url = `${basePath}/${apiVersion}/sign-in`;
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(url, params) 
    .then(response => {
        return response.json();  
    })
    .then(result => {
        if(!result.token) {
            return {
                status: 400,
                ok: false,
                message: result.message
            };
        }
        return {
            status: 200,
            ok: true,
            data: result 
        };
    })
    .catch(err => {
        return {
            status: 404,
            ok: false,
            message: err.message
        };
    })

}

export function getUsersApi(token) {
    const url = `${basePath}/${apiVersion}/users`;

    const params = {
        method: 'GET',
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