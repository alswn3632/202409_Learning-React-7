// 설치한 라이브러리 변수로 받아오기
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const { useParams } = require('react-router-dom');

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
// 처음에 열리는 화면이 root 경로, 없으면 안됨!

//db 연결
db.connect((err)=>{
    if(!err){
        console.log("seccuss");

    }else{
        console.log("fail");
    }
});

// 내용추가 ----- DB에서 값 가져오기 -----

// '/' : root >> 연결시 보여지는 기본 화면 설정
app.get('/',(req, res)=>{
    res.send("React Server Connect Success!!")
})

// 게시판 목록 페이지
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
});

// 게시판 상세 페이지 : id 이용
// 화면에서 서버로 요청하는 값 : request (req)
// 서버에서 화면으로 보내주는 값 : response (res)
// params.id
app.get('/detail/:id', (req, res)=>{
    const id = req.params.id
    const sql = `select * from board where id = ${id}`;
    db.query(sql, (err, data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log(err);
            res.send('전송오류');
        }
    })
})

// 게시판 글 작성 페이지
app.post('/insert', (req, res)=>{
    // 파라미터 가져오기 - request.body에 객체로 데이터를 담고, 그것을 가져올 수 있다.
    const {title, writer, contents} = req.body;
    const sql = `insert into board (title, writer, contents) value (?,?,?)`;
    // 데이터가 많이 연동될 때 ?로 작성하고 배열로 순서대로 연결함
    db.query(sql, [title,writer,contents], (err,data)=>{
        if(!err){
            res.send("OK");
            // res.sendStatus(200); 
            // res.send(data);
            // 전송잘됨!
        }else{
            console.log(err);
            res.send('전송오류');
        }
    })
})

// 게시판 글 작성 페이지
app.post('/update/:id', (req, res)=>{
    const id = req.params.id
    const {title, contents} = req.body;
    const sql = `update board set title = ?, contents = ? where id = ?`;
    db.query(sql, [title,contents,id], (err,data)=>{
        if(!err){
            res.send("OK");
        }else{
            console.log(sql)
            console.log(err);
            res.send('전송오류');
        }
    })
})

// 게시판 삭제
app.get('/remove/:id', (req, res)=>{
    const id = req.params.id
    const sql = `delete from board where id = ${id}`;
    console.log(id)
    db.query(sql, (err, data)=>{
        if(!err){
            res.send("OK");
        }else{
            console.log(err);
            res.send('전송오류');
        }
    })
})