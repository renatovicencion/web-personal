import { base_path, api_version } from './config';

export function subscribeNewsletterApi(email) {
    const url = `${base_path}/${api_version}/subscribe-newsletter/${email.toLowerCase()}`;

    const params = {
        method: "POST"
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
}