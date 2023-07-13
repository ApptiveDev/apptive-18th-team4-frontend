import axios from 'axios';

export const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    withCredentials: true
})

/*요청에 대한 처리 */
instance.interceptors.request.use(
    function (config) {
        config.headers["Content-Type"] = "application/json; charset=utf-8";
        config.headers["Authorization"] = localStorage.getItem('accessToken');
        return config;
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    }
);

/*응답에 대한 처리 */
instance.interceptors.response.use(
    function (response) {
        if (response.headers['authorization']) {
            const accessToken = response.headers['authorization'];
            localStorage.setItem('accessToken', accessToken);
        }
        return response;
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    }
);