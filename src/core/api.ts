type METHODS = 'GET' | 'PUT' | 'POST' | 'DELETE';

type Options = {
    method?: METHODS;
    headers?: { [key: string]: string };
    data?: Record<string, unknown> | FormData;
    timeout?: number;
};

function queryStringify(data: Record<string, unknown>) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    return Object.entries(data).reduce((res, [key, value], i) => {
        if (i === 0) return `?${key}=${value}`;
        return `${res}&${key}=${value}`;
    }, '');
}

export class HTTPTransport {
    get = (url: string, options: Options = { method: 'GET' }) => {
        const { data } = options;
        if (data && Object.keys(data).length > 0 && !(data instanceof FormData)) url += queryStringify(data);
        return this.request(url, { ...options, method: 'GET' }, options.timeout);
    };

    put = (url: string, options: Options = { method: 'GET' }) => this.request(url, { ...options, method: 'PUT' }, options.timeout);

    post = (url: string, options: Options = { method: 'POST' }) => this.request(url, { ...options, method: 'POST' }, options.timeout);

    delete = (url: string, options: Options = { method: 'DELETE' }) => this.request(url, {
        ...options,
        method: 'DELETE',
    }, options.timeout);

    request = (url: string, options: Options = { method: 'GET' }, timeout = 5000) => {
        const { method, data, headers = {} } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
            }
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.withCredentials = true;

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (data) {
                if (data instanceof FormData) {
                    xhr.send(data);
                } else {
                    xhr.send(JSON.stringify(data));
                }
            } else {
                xhr.send();
            }
        });
    };
}
