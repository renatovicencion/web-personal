import { base_path, api_version } from './config';

export function signUpApi(data) {
    const url = `${base_path}/${api_version}/sign-up`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            if (result.user) {
                return {
                    ok: true,
                    message: "Usuario creado satisfactoriamente"
                };
            } else {
                return {
                    ok: false,
                    message: result.message
                };
            }
        }).catch(err => {
            return {
                ok: false,
                message: err.message
            };
        });
}

export function signInApi(data) {
    const url = `${base_path}/${api_version}/sign-in`;

    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
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

export function getUsersApi(token) {
    const url = `${base_path}/${api_version}/users`;

    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
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
            return err.message;
        });
}

export function getUsersActiveApi(token, status) {
    const url = `${base_path}/${api_version}/users-active?active=${status}`;

    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
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
            return err.message;
        });
}

export function uploadAvatarApi(token, avatar, userId) {
    const url = `${base_path}/${api_version}/upload-avatar/${userId}`;

    const formData = new FormData();
    formData.append("avatar", avatar, avatar.name);

    const params = {
        method: "PUT",
        body: formData,
        headers: {
            Authorization: token
        }
    }

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

export function getAvatarApi(avatarName) {
    const url = `${base_path}/${api_version}/get-avatar/${avatarName}`;

    return fetch(url)
        .then(response => {
            return response.url;
        })
        .catch(err => {
            return err.message;
        });
}

export function updateUserApi(token, user, userId) {
    const url = `${base_path}/${api_version}/update-user/${userId}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(user)
    }

    return fetch(url, params)
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

export function activateUserApi(token, userId, status) {
    const url = `${base_path}/${api_version}/activate-user/${userId}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({
            active: status
        })
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

export function deleteUserApi(token, userId) {
    const url = `${base_path}/${api_version}/delete-user/${userId}`;

    const params = {
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
            return err.message;
        })
}

export function createUserApi(token, data) {
    const url = `${base_path}/${api_version}/create-user`;

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    }

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