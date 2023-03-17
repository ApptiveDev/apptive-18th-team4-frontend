import {useState} from 'react'
import axios from 'axios'

export default function Test () {
    const [code, setCode] = useState('');

    const majors = ['정보컴퓨터공학부', '기계공학부', '항공우주공학과', '조선해양공학과']
    const [selectedMajor, setSelectedMajor] = useState('')

    // 생성된 코드 가져와서 div에 보여주기 (api 완성이 안돼서 일단 주석 처리)
    /*function getCode(e) {
        e.preventDefault();
        axios.get("{url}")
        .then(function(response) {
            console.log(response)
            setCode(response)
            //localStorage.setItem('code', code)
            return (
            //아래 코드가 실행 안된다면 {code} 대신 {response} 넣기
            <div className='showCode'>
                {code}
            </div>
            )
        }) .catch(function(error) {
            console.log(error)
        })

    }*/

    const [userDto, setUserDto] = useState({
        major: '',
        keywords: ''
      });

    const { major, keywords } = userDto;
    
    // 사용자가 선택한 학과 추출하기
    function handleMajor(e) {
        setSelectedMajor(e.target.value);
        console.log(e.target.value)
        setUserDto({
          ...userDto,
          major: e.target.value
        })
        //localStorage.setItem('major', major)
      }

    // 사용자가 추가한 키워드 추출하기
    const onChange = (e) => {
        const { value, name } = e.target;
        setUserDto({
          ...userDto,
          [name]: value
        })
        //localStorage.setItem('keywords', keywords)
      };

    // 이미 코드 발급한 적이 있는 경우 사용자에게 입력받은 코드 백엔드에 전달 (api 완성이 안돼서 일단 주석 처리)
    /*function insertCode(e) {
        e.preventDefault();
        axios.post("{url}", code, {headers})
        .then(function(response) {
            console.log(response)
            setCode(response)
        }) .catch(function(error) {
            console.log(error)
        })

        axios.get("{url}")
        .then(function(response) {
            console.log(response)
            // 사용자 정보(학과, 키워드) 가져오는 코드 영역
        }) .catch(function(error) {
            console.log(error)
        })

        //localstorage.getItem(code)
    }*/

    return (
        <div>
            <p>1. 처음 사용하는 경우</p>
            <button>코드 생성</button> {/*getCode 함수 연결시키기 */}
            <div className='selectMajor'>
                <select name={major} onChange={handleMajor} value={selectedMajor} className="major">
                    {majors.map((major) => (
                        <option value={major} key={major}> {major} </option>
                    ))}
                </select>
            </div>
            <input name='keywords' onChange={onChange} value={keywords} className="addKeyword"/>

            <p>2. 이전에 코드 발급한 적이 있는 경우</p>
            <input name='code' onChange={onChange} value={code} className="addKeyword"/>
            <button>코드 입력</button> {/*insertCode 함수 연결시키기 */}
        </div>
    )
}