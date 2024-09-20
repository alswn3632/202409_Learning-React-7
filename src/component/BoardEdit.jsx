import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BoardEdit = () => {

    const { id } = useParams();

    const [board, setBoard] = useState(null);

    const [inputs, setInputs] = useState({
        title : '',
        contents : ''
    });

    const getEditDate = async () => {
        try{
            const edit = await axios.get(`/detail/${id}`);
            setBoard(edit.data[0]);
            setInputs({
                title : edit.data[0].title,
                contents : edit.data[0].contents
            }); 
        }catch(e){
            console.log(e);
        }
    }
    
    useEffect(()=>{
        getEditDate();
    },[]);

    const {title, contents} = inputs;

    const onChange = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name] : value
        });
    }

    const onEdit = async () => {
        if(title === ''){
            alert('title is null');
            return;
        }
        if(contents === ''){
            alert('contents is null');
            return;
        }
        if(window.confirm('수정하시겠습니까?')){
            try{
                const res = await axios.post(`/update/${id}`, inputs);
                console.log(res.data); // 'OK'
                if(res.data === 'OK'){
                    // 데이터 전송 후 이동
                    window.location.href = `/detail/${id}`;
                }
            }catch(err){
                console.log(err)
            }
        }
    }

    if(board !== null){
        return (
            <div className='boardEdit'>
                <h2>Board Edit Page</h2>
                <div className='tableBox'>
                    <table>
                        <thead>
                            <tr className='title'>
                                <td className='row1'>{board.id}</td>
                                <td className='row2'>제목: <input type="text" name='title' value={title} onChange={onChange}/></td>
                                <td>{board.writer}</td>
                                <td>{board.reg_date.substring(0,board.reg_date.indexOf('T'))}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='content'>
                                <td colSpan={4}><textarea name='contents' value={contents} onChange={onChange}></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='btnBox'>
                    {/* <Link to={'/'} className='btn1' onClick={onEdit}><button>저장</button></Link> */}
                    <button onClick={onEdit}>저장</button>
                </div>
            </div>
        );
    }
};

export default BoardEdit;