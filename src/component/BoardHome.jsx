import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './board.css'
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import BoardCreate from './BoardCreate';
import BoardEdit from './BoardEdit';

const BoardHome = () => {
    return (
        <div className='boardHome'>
            <h1>My First React Board Project</h1>
            <hr />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<BoardList/>}/>
                    <Route path='/list' element={<BoardList/>}/>
                    <Route path='/detail/:id' element={<BoardDetail/>}/>
                    <Route path='/create' element={<BoardCreate/>}/>
                    <Route path='/edit/:id' element={<BoardEdit/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default BoardHome;