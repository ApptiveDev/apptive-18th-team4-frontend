import axios from 'axios';

export const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

/*reissue */
/*
export async function postRefreshToken() {
    const response = await publicApi.post('/api/v1/auth/refresh', {
      refreshToken: localStorage.getItem('refreshToken'),
    });
    return response;
}
*/

/*요청에 대한 처리*/
instance.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        //config.headers["Content-Type"] = "application/json; charset=utf-8";
        //config.headers["Authorization"] = localStorage.getItem('accessToken');
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
    /*
    function (error) {
        if (error.response.request.status === 401) {
            //alert("로그인 해주세요");
            window.location.reload();
            localStorage.clear();
        }
        else if(error.response.request.status === 500) {
            alert(error.response.data);
        }
        console.log(error);
        return Promise.reject(error);
    }
    */
);