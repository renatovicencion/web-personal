import { base_path, api_version } from './config';

export function getMenusApi() {
    const url = `${base_path}/${api_version}/menus`;

    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        })
}

export function updateMenuApi(token, menuId, data) {
    const url = `${base_path}/${api_version}/update-menu/${menuId}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
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
        })
}

export function activateMenuApi(token, menuId, status) {
    const url = `${base_path}/${api_version}/activate-menu/${menuId}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({ active: status})
    }

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result.message;
        })
        .catch(err => {
            console.log(err);
        });
}

export function addMenuApi(token, menu) {
    const url = `${base_path}/${api_version}/add-menu`;

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(menu)
    }

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result.message;
        })
        .catch(err => {
            console.log(err);
        })
}

export function deleteMenuApi(token, menuId) {
    const url = `${base_path}/${api_version}/delete-menu/${menuId}`;

    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result.message;
        })
        .catch(err => {
            console.log(err);
        });
}