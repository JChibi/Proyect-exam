const express = require('express');
const app = express.Router();
const mysqlconnectin = require('../configurations/db-conf');
const security= require('../security/verifier')


app.get('/rutinas',security, (req, res) => {
    console.log('get lista rutinas');
    mysqlconnectin.query('select * from rutinas', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});


app.get('/rutinas/:id', security,(req, res)=>{
    console.log('get rutinas');
    mysqlconnectin.query('select * from rutinas where id=?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send('error');
        }
    })

});


app.post('/rutinas',security,(req, res)=>{
    console.log('crear rutinas');
    let est= req.body;
    mysqlconnectin.query('insert into rutinas (nombre, descripcion) values (?,?)',[est.nombre, est.descripcion],(err, result)=>{
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


app.put('/rutinas/:id',security, (req, res)=>{
    console.log('actualizar rutina');
    let est= req.body;
    console.log(est);
    mysqlconnectin.query('update rutinas set nombre=?, descripcion=? where id=?',[est.nombre, est.descripcion, req.params.id],(err, result)=>{
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
     

app.delete('/rutinas/:id',security,(req, res)=>{
    console.log('delete rutinas');
    mysqlconnectin.query('delete from rutinas where id=?',[req.params.id],(err, result)=>{
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