import axios from 'axios';

// 환경 변수에서 API 서버 URL을 가져옵니다.
// 로컬 테스트 환경이 아닐시 특정 엔드포인트로 설정
const API_SERVER = "http://localhost:8080";


// Axios 인스턴스, application/json 세팅도 추가하였음
const api = axios.create({
  baseURL: API_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
