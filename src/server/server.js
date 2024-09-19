// 설치한 라이브러리 변수로 받아오기
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

//express 사용하기 위한 app 생성
const app = express();

//express 사용할 서버포트 설정
// const PORT = process.env.PORT || 5000;
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

//DB 접속
const db = mysql.createConnection({
    host : 'localhost',
    user: 'react',
    password: 'mysql',
    port:'3306',
    database:'db_react'
});

// express 접속
app.listen(PORT, ()=>{
    console.log(`server connecting on : http://localhost:${PORT}`);
});

//db 연결
db.connect((err)=>{
    if(!err){
        console.log("seccuss");

    }else{
        console.log("fail");
    }
});

// 내용추가-----------------------------------
// DB에서 값 가져오기 

// /=> root 연결시 보여지는 기본 화면 설정
app.get('/',(req, res)=>{
    res.send("React Server Connect Success!!")
})

//게시글 목록 가져오기
app.get('/list', (req, res)=>{
    console.log('/list');
    const sql = 'select * from board order by id desc';
    db.query(sql, (err, data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log(err);
            res.send('전송오류');
        }
    })
})