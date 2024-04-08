type Options = {
    method: string,
    headers: Object,
    body?: string
}


export const customFetch = async (
    endpoint: string,
    params: Object = {},
    method: string = 'GET',
    customHeaders: Object = {}
): Promise<any> => {

    let url = endpoint;
    let options: Options = {
        method: method,
        headers: {
            'Accept': 'application/json'
        }
    };

    if(method === 'GET') {
        let urlParams: string[] = [];
        for(const [key, value] of Object.entries(params)) {
            urlParams.push(key + '=' + value);
        }
        if(urlParams.length > 0) {
            url += '?' + urlParams.join('&'); 
        }
    } else {
        options = {
            ...options,
            headers: {
                ...options.headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };
    }

    options.headers = {
        ...options.headers,
        ...customHeaders
    }

    const response = await fetch(url, options as RequestInit);
    const data = await response.json();

    if(response.ok) {
        return data;
    } else {
        throw new CustomFetchError(data, response.status)
    }
}


export class CustomFetchError {
    status: number
    data: any

    constructor(data: any, status: number) {
        this.data = data;
        this.status = status;
    }
}