const express = require('express');
const app = express.Router();
const mysqlconnectin = require('../configurations/db-conf');
const security= require('../security/verifier')


app.get('/nutriciones',security, (req, res) => {
    console.log('get lista nutriciones');
    mysqlconnectin.query('select * from nutricion', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});


app.get('/nutriciones/:id',security,(req, res)=>{
    console.log('get nutricion');
    mysqlconnectin.query('select * from nutricion where id=?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send('error');
        }
    })

});


app.post('/nuctriciones',security,(req, res)=>{
    console.log('crear nutricion');
    let est= req.body;
    mysqlconnectin.query('insert into nutricion (id_dieta, fecha_inicial, fecha_final) values (?,?,?)',[est.id_dieta, est.fecha_inicial, est.fecha_final],(err, result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('Creado Correctamente');
        }
        else{
            console.log(err);
            res.send('error' + err);
        }
    });

});


app.put('/nutriciones/:id',security,(req, res)=>{
    console.log('actualizar nutricion');
    let est= req.body;
    console.log(est);
    mysqlconnectin.query('update nutricion set id_dieta=?, fecha_inicial=?, fecha_final=? where id=?',[est.id_dieta, est.fecha_inicial, est.fecha_final, req.params.id],(err, result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Actualizado Correctamente');
        }
        else{
            console.log(err);
            res.send('error' + err);
        }
    });

});
     

app.delete('/nutriciones/:id',security,(req, res)=>{
    console.log('delete nutricion');
    mysqlconnectin.query('delete from nutricion where id=?',[req.params.id],(err, result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Eliminado Correctamente');
        }
        else{
            console.log(err);
            res.send('error');
        }
    })

});

module.exports = app;