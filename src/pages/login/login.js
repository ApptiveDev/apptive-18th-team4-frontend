import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPW] = useState('');

    const getLoginInfo = () => {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        return { accessToken, refreshToken }
    }

    // 컴포넌트에서 로그인 정보를 가져와 상태값을 업데이트하는 useEffect 훅
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    useEffect(() => {
        const { accessToken, refreshToken } = getLoginInfo();
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault()
        if (email.length === 0) alert("아이디를 입력해주세요")
        else if (password.length === 0) alert("비밀번호를 입력해주세요")
        else {
            axios.post("http://3.34.82.40:8080/auth/login", {
                    email: email, 
                    password: password
                }, { headers: { 'Content-Type': 'application/json'} })
            .then({onLoginSuccess}) 
            .catch(function(error) {
                console.log(error)
            })
        }
    }

    function onSilentRefresh() {
        //local storage에 저장된 토큰 값 가져오기
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        let isRefreshing = false;
    
        //이전에 실행된 갱신 중인 경우 중복 실행 방지
        if (onSilentRefresh.timeoutId) {
            clearTimeout(onSilentRefresh.timeoutId);
            isRefreshing = true;
        }
    
        axios.post("http://3.34.82.40:8080/auth/reissue", {
                  accessToken: accessToken,
                  refreshToken: refreshToken
                }, { headers: { 'Content-Type': 'application/json'} })
        .then(onLoginSuccess) 
        .catch(function(error) {
          console.log(error)
        })
        .finally(() => {
            // 갱신이 완료된 경우에만 다시 자동 갱신 실행
            if (!isRefreshing) {
                onSilentRefresh.timeoutId = setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
            }
        })
      }

    onSilentRefresh.timeoutId = null;

    const JWT_EXPIRY_TIME = 0.5 * 3600 * 1000; // 만료 시간 (30분 밀리 초로 표현)

    function onLoginSuccess(response) {
        const { accessToken, refreshToken } = response.data;
        // local storage에 at, rt 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        console.log(accessToken)
        console.log(refreshToken)

        // accessToken 설정
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // accessToken 만료하기 1분 전에 로그인 연장
        setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
        console.log(response)
    }
    
    return (
        <div className='login'>
            <div className='enterEmail'>
                <label htmlFor='email'>아이디</label>
                <input name='email' onChange={e => setEmail(e.target.value)} value={email} className="email"/>
            </div>

            <div className='enterPW'>
                <label htmlFor='password'>비밀번호</label>
                <input name='password' onChange={e => setPW(e.target.value)} value={password} className="password"/>
            </div>

            <div>
                <button onClick={handleLogin}>로그인</button> 
            </div>
        </div> 
    )
}