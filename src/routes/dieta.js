const express = require('express');
const app = express.Router();
const mysqlconnectin = require('../configurations/db-conf');
const security= require('../security/verifier')


app.get('/dietas', security,(req, res) => {
    console.log('get lista dietas');
    mysqlconnectin.query('select * from dieta', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});


app.get('/dietas/:id',security,(req, res)=>{
    console.log('get dieta');
    mysqlconnectin.query('select * from dieta where id=?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send('error');
        }
    })

});


app.post('/dietas',security,(req, res)=>{
    console.log('crear dietas');
    let est= req.body;
    mysqlconnectin.query('insert into dieta (nombre, descripcion) values (?,?)',[est.nombre, est.descripcion],(err, result)=>{
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


app.put('/dietas/:id',security,(req, res)=>{
    console.log('actualizar dieta');
    let est= req.body;
    console.log(est);
    mysqlconnectin.query('update dieta set nombre=?, descripcion=? where id=?',[est.nombre, est.descripcion, req.params.id],(err, result)=>{
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
     

app.delete('/dietas/:id',security,(req, res)=>{
    console.log('delete dietas');
    mysqlconnectin.query('delete from dietas where id=?',[req.params.id],(err, result)=>{
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