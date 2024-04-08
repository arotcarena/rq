import { routes } from "../routes";

export type PathParams = {
    [key: string]: string|number
};

export const generateUrl = (name: string, params: PathParams = {}) => {
    let path = routes.find(route => route.name === name)?.path;
    for(let [key, value] of Object.entries(params)) {
        if(path?.includes(':' + key)) {
            if(typeof value === 'number') {
                value = value.toString();
            }
            path = path.replace(':' + key, value);
        }
    }
    return path ?? '/error404';
}