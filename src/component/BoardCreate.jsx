import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BoardCreate = () => {

    // 글쓰기 페이지에서 입력한 값 받아오기
    const [inputs, setInpust] = useState({
        title : '',
        contents : '',
        writer : ''
    });

    const {title, contents, writer} = inputs;

    const onChange = (e) => {
        const {name,value} = e.target;
        setInpust({
            ...inputs,
            [name] : value
        });
    }

    const onCreate = async () => {
        // board 객체를 서버로 전송
        // board 객체의 내용 중 하나라도 null이면 안됨
        if(title === ''){
            alert('title is null');
            return;
        }
        if(writer === ''){
            alert('writer is null');
            return;
        }
        if(contents === ''){
            alert('contents is null');
            return;
        }
        if(window.confirm('등록하시겠습니까?')){
            try{
                const res = await axios.post('/insert', inputs);
                console.log(res);
                console.log(res.data); // 'OK'
                console.log(res.data[0]); // 0 
                if(res.data === 'OK'){
                    // 데이터 전송 후 이동
                    window.location.href = '/list';
                }
            }catch(err){
                console.log(err)
            }
        }
    }

    const onReset = () => {
        setInpust({
            title : '',
            contents : '',
            writer : ''
        })
    }
    
    return (
        <div className='boardCreate'>
            <h2>Board Create Page</h2>
            <div className='createBox'>
                <table>
                    <thead>
                        <tr className='title'>
                            <td className='txt1'>제목: <input type="text" placeholder='제목을 입력해주세요.' name='title' onChange={onChange} value={title}/></td>
                            <td className='txt2'>작성자: <input type="text" placeholder='작성자명' name='writer' onChange={onChange} value={writer}/></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='content'>
                            <td colSpan={2} className='txt3'><textarea placeholder='내용을 입력해주세요.' onChange={onChange} name='contents' value={contents}></textarea></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='btnBox'>
                <Link to={'/'} className='btn1'><button>목록</button></Link>
                {/* <Link to={'/'} className='btn1'><button onClick={onCreate}>저장</button></Link> */}
                <button onClick={onReset}>리셋</button>
                <button onClick={onCreate}>저장</button>
            </div>
        </div>
    );
};

export default BoardCreate;