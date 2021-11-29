const express = require('express');
const app = express.Router();
const mysqlconnectin = require('../configurations/db-conf');
const security= require('../security/verifier')

app.get('/entrenadores',security, (req, res) => {
    console.log('get lista de entrenador');
    mysqlconnectin.query('Select * from entrenador', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});


app.get('/entrenadores/:id',security, (req, res)=>{
    console.log('get entrenadr');
    mysqlconnectin.query('select * from entrenador where id=?',
    [req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send('error');
        }
    })

});


app.post('/entrenadores',security, (req, res)=>{
    console.log('crear entrenador');
    let est= req.body;
    mysqlconnectin.query('insert into entrenador(id_persona, status) values (?,?)',[est.id_persona, est.status],(err, result)=>{
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


app.put('/entrenadores/:id',security, (req, res)=>{
    console.log('actualizar entrenador');
    let est= req.body;
    console.log(est);
    mysqlconnectin.query('update docente set id_persona=?, status=? where id=?',[est.id_persona, est.status, req.params.id],(err, result)=>{
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
     

app.delete('/entrenadores/:id',security,(req, res)=>{
    console.log('delete entrenador');
    mysqlconnectin.query('delete from entrenador where id=?',[req.params.id],(err, result)=>{
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