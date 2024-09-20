import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';

const BoardList = () => {
    // db에 저장되어 있는 board 요소를 가져오기 => boardList에 저장
    const [boardList, setBoardList] = useState([]);

    // 비동기로 db에 접속하여 select로 가져오기
    // get : 데이터 가져올 때 (생략 가능.)
    // post : 데이터를 보낼 때 (생략 불가능. 반드시 써야함)
    const getBoardDate = async () => {
        try{
            const boards = await axios.get('/list');
            setBoardList(boards.data);
        }catch(e){
            console.log(e);
        }
    }

    // 컴포넌트가 랜더링될 때 혹은 업데이트될 때 실행되는 hooks
    /* useEffect(()=>{
       function},[deps]);
       - function : 실행시킬 함수
       - deps : 배열 형태로 배열안에서 검사하고자 하는 특정값 */
    useEffect(()=>{
        getBoardDate();
    },[]);

    // >> 요청 응답은 server에서 

    // 서버에서 데이터를 가져오는 것 보다 화면에서 랜더링 되는 속도가 더 빠름
    // 조건을 걸어줘서 error 방지
    if(boardList.length >= 0){
        return (
            <div className='boardList'>
                <h2>Board List Page</h2>
                <table>
                    <thead>
                        <tr>
                            <th className='row1'>번호</th>
                            <th className='row2'>제목</th>
                            <th className='row3'>작성자</th>
                            <th className='row4'>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            boardList.map(b =>(
                                <tr key={b.id}>
                                    <td>{b.id}</td>
                                    <td><Link to={`/detail/${b.id}`}>{b.title}</Link></td>
                                    <td>{b.writer}</td>
                                    <td>{b.reg_date.substring(0,b.reg_date.indexOf('T'))}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className='btnBox'>
                    <Link to={'/create'} className='btn1'><button>작성</button></Link>
                </div>
            </div>
        );
    }

};

export default BoardList;