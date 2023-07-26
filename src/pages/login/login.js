import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import './login.css';
import GradationBox from '../../components/gradation_box/gradation_box';
import { instance } from '../../components/ApiContoller'

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPW] = useState('');
    const [rememberMe, setRememberMe] = useState(false);


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

    useEffect(() => {
        const savedUsername = localStorage.getItem('savedUsername');
        if (savedUsername) {
            setEmail(savedUsername);
            setRememberMe(true);
        }
    }, []);
  
    
    const handleLogin = (e) => {
        e.preventDefault()
        if (email.length === 0) alert("아이디를 입력해주세요")
        else if (password.length === 0) alert("비밀번호를 입력해주세요")
        else {
            instance.post("/auth/login", {
                    username: email, 
                    password: password
                })
            .then(onLoginSuccess) 
            .catch(function(error) {
                //401 코드 추가(네트워크 오류 고려)
                if (error.response && error.response.status === 401) {
                    alert('아이디 또는 비밀번호가 올바르지 않습니다.');
                } else {
                    console.log(error);
                }
            })
            if (rememberMe) {
                // rememberMe가 true일 경우 username을 로컬 스토리지에 저장
                localStorage.setItem('savedUsername', email);
            } else {
                // rememberMe가 false일 경우 savedUsername 항목 삭제
                localStorage.removeItem('savedUsername');
            }
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
    
        instance.post("/auth/reissue", {
                  accessToken: accessToken,
                  refreshToken: refreshToken
                })
        .then(onLoginSuccess) 
        .catch(function(error) {
            // refreshToken이 만료되었거나 잘못된 경우 에러 처리
            if (error.response && error.response.status === 401) {
                
                // refreshToken이 만료되었거나 유효하지 않음
                // 로컬에서 토큰 삭제
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');

                //세션 만료 알림
                alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
                navigate('/login');
            } else {
                console.log(error);
            }
        })
        .finally(() => {
            // 갱신이 완료된 경우에만 다시 자동 갱신 실행
            if (!isRefreshing) {
                onSilentRefresh.timeoutId = setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
            }
        })
      }

    onSilentRefresh.timeoutId = null;

    //동적으로 받아오는 로직 작성해도 좋음
    const JWT_EXPIRY_TIME = 0.5 * 3600 * 1000; // 만료 시간 (30분 밀리 초로 표현)
    
    //onLoginSuccess
    function onLoginSuccess(response) {
        const { accessToken, refreshToken } = response.data;
        // local storage에 at, rt 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken); 
        console.log(accessToken)
        console.log(refreshToken)

        navigate('/');

        // accessToken 설정
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // accessToken 만료하기 1분 전에 로그인 연장
        setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
        console.log(response)
    }
    
    return (
        <div className='login'>
            <GradationBox />
            <div style={{marginLeft: '105px'}}>
                <div className='navbar'>
                    <div><Link to='/' style={{color: '#666666'}}>Home</Link></div>
                    <div><Link to='/login'>Log in</Link></div>
                    <div><Link to='/signUp' style={{color: '#666666'}}>Sign up</Link></div>
                </div>

                <div className='title'>
                    Log In
                </div>

                <div className='enterEmail'>
                    <input name='email' onChange={e => setEmail(e.target.value)} value={email} className="email" placeholder='ID'/>
                </div>

                <div className='enterPW'>
                    <input name='password' onChange={e => setPW(e.target.value)} value={password} className="password" placeholder='Password'/>
                </div>

                <div className='rememberMe' style={{marginBottom: '3.2rem'}}>
                    <input type='checkbox' onChange={() => setRememberMe(!rememberMe)} checked={rememberMe} />
                    <label>아이디 저장하기</label>
                </div>

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button onClick={handleLogin}>Log In</button> 
                </div>

                <div className='link_to_signUp' style={{marginLeft: '60px'}}>
                    <div>아직 회원이 아니라면? <Link to='/signUp'>회원가입</Link></div>
                    <div style={{marginTop: '2px', color: '#AEC0F0'}}>
                        <Link to='/findId'>아이디 찾기 </Link>
                        / 
                        <Link to='/findPW'> 비밀번호 찾기</Link>
                    </div>
                </div>
            </div>
        </div> 
    )
}