const express = require('express');
const app = express.Router();
const mysqlconnectin = require('../configurations/db-conf');
const security= require('../security/verifier')


app.get('/ejercicios',security, (req, res) => {
    console.log('get lista ejercicios');
    mysqlconnectin.query('select * from ejercicios', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});


app.get('/ejercicios/:id',security,(req, res)=>{
    console.log('get ejerccios');
    mysqlconnectin.query('select * from ejercicios where id=?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send('error');
        }
    })

});


app.post('/ejercicios',security,(req, res)=>{
    console.log('crear ejercicios');
    let est= req.body;
    mysqlconnectin.query('insert into ejercicios (id_rutinas, nombre, descripcion) values (?,?,?)',[est.id_rutinas, est.nombre, est.descripcion],(err, result)=>{
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


app.put('/ejercicios/:id',security,(req, res)=>{
    console.log('actualizar ejercicios');
    let est= req.body;
    console.log(est);
    mysqlconnectin.query('update ejercicios set id_rutinas=?, nombre=?, descripcion=? where id=?',[est.id_rutinas, est.nombre, est.descripcion, req.params.id],(err, result)=>{
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
     

app.delete('/ejercicios/:id',security,(req, res)=>{
    console.log('delete ejercicios');
    mysqlconnectin.query('delete from ejercicios where id=?',[req.params.id],(err, result)=>{
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