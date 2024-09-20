import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const BoardDetail = () => {

    const { id } = useParams();
    
    const [board, setBoard] = useState(null);

    const getDetailDate = async () => {
        try{
            const details = await axios.get(`/detail/${id}`);
            // res.data : 데이터가 한개더라도 배열로 들어옴.
            //
            setBoard(details.data[0]);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        getDetailDate();
    },[]);

    const onRemove = async () => {
        if(window.confirm('삭제하시겠습니까?')){
            try{
                const removes = await axios.get(`/remove/${id}`)
                console.log(removes.data)
                if(removes.data === 'OK'){
                    // 데이터 전송 후 이동
                    window.location.href = '/list';
                }
            }catch(e){
                console.log(e)
            }
        }
    }
    
    if(board !== null){
        return (
        <div className='boardDetail'>
            <h2>Board Detail Page</h2>
            <div className='tableBox'>
                <table>
                    <thead>
                        <tr className='title'>
                            <td>{board.id}</td>
                            <td>{board.title}</td>
                            <td>{board.writer}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='date'>
                        <td colSpan={3}>{board.reg_date.substring(0,board.reg_date.indexOf('T'))}</td>
                        </tr>
                        <tr className='content'>
                            <td colSpan={3}>{board.contents}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='btnBox'>
                <Link to={'/'} className='btn1'><button>목록</button></Link>
                <Link to={`/edit/${board.id}`} className='btn1'><button>수정</button></Link>
                <button onClick={onRemove}>삭제</button>
            </div>
        </div>
        );
    }
};

export default BoardDetail;