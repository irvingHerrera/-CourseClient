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