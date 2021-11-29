const express = require('express');
const app = express.Router();
const mysqlconnectin = require('../configurations/db-conf');
const security= require('../security/verifier')


app.get('/progresos',security, (req, res) => {
    console.log('get lista progresos');
    mysqlconnectin.query('select * from progreso', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});


app.get('/progresos/:id',security,(req, res)=>{
    console.log('get progreso');
    mysqlconnectin.query('select * from progreso where id=?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send('error');
        }
    })

});


app.post('/progresos',security,(req, res)=>{
    console.log('crear progreso');
    let est= req.body;
    mysqlconnectin.query('insert into progreso (id_cliente, semana, peso, talla) values (?,?,?,?)',[est.id_cliente, est.semana, est.peso, est.talla],(err, result)=>{
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


app.put('/progresos/:id',security,(req, res)=>{
    console.log('actualizar progreso');
    let est= req.body;
    console.log(est);
    mysqlconnectin.query('update progreso set id_cliente=?, semana=?, peso=?, talla=? where id=?',[est.id_cliente, est.semana, est.peso, est.talla, req.params.id],(err, result)=>{
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
     

app.delete('/progresos/:id',security,(req, res)=>{
    console.log('delete progreso');
    mysqlconnectin.query('delete from progreso where id=?',[req.params.id],(err, result)=>{
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