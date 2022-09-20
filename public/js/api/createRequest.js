/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    let url = options.url;
    const formData = new FormData();

    if (options.data) {
        if (options.method === 'GET') {
            url += '?' + Object.entries(options.data).map(
                ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
            } else {
                Object.entries(options.data).forEach(v => formData.append(...v));
            }
    }

    try {
        xhr.open(options.method, url);
        xhr.send(formData);
    } catch (e) {
        options.callback(e, null);
    };
    xhr.onload = () => {
        options.callback(null, xhr.response);
    };
    xhr.onerror = () => {
        options.callback(xhr.statusText, null)
    }
};    
           