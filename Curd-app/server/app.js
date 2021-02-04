const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DATABASE
});
connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('database is connected' + connection);
});

//insert
app.post('/Insert', function (req, res) {
    // console.log(req.body);
    // console.log(req.body.f_name);
    // console.log(req.body.l_name);
    // console.log(req.body.email);
    // console.log(req.body.password);
    const query = "insert into users (name,email,password) Values ('" + req.body.l_name + "','" + req.body.email + "','" + req.body.password + "')";
    connection.query(query, (err, result) => {
        if (err) console.log(err.message);
        else {
            console.log('1 record is addedd');
        }
    })
    res.end('ok');
});
//read
app.get('/getAll', function (req, res) {
    query = "SELECT * FROM users";
    connection.query(query, (err, result) => {
        if (err) console.log(err);
        else {
            res.json({ result });
        }
    })
});


//search
app.get('/search/:id',function (req,res){
    const {id}=req.params;
    //console.log(id);
    query = "SELECT * FROM users WHERE id ='"+ id +"'";
    connection.query(query,(err, result) => {
        if (err) console.log(err);
        else {
            // console.log(result);
            res.json({ result });
        }
    })
});

//delete
app.delete('/delete/:id',function (req,res){
    const {id}=req.params;
    query = "DELETE FROM users WHERE id ='"+id+"'";
    connection.query(query,(err,result) => {
        if (err) console.log(err);
        else {
            // console.log(result);
            res.json({success:true});
        }
    })
});
//update
app.put('/update', function (req, res) {
    console.log(req.body.new_name);
    console.log(req.body.new_mail);
    console.log(req.body.new_password);
    const query ="UPDATE users SET name ='"+req.body.new_name+"',email='"+req.body.new_mail+"',password='"+req.body.new_password+"' WHERE id='"+req.body.id+"';";
    connection.query(query, (err, result) => {
        if (err) console.log(err.message);
        else {
            console.log('1 record is update');
            // console.log(result);
            res.json({success :true});
        }
    })

});
app.listen(process.env.PORT, () => {
    console.log('listening port is 30000');
})