const express = require('express');
const app = express.Router();
const mysqlconnectin = require('../configurations/db-conf');
const security= require('../security/verifier')


app.get('/entrenos',security, (req, res) => {
    console.log('get lista entrenos');
    mysqlconnectin.query('select * from entrenos', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});


app.get('/entrenos/:id',security,(req, res)=>{
    console.log('get entrenos');
    mysqlconnectin.query('select * from entrenos where id=?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send('error');
        }
    })

});


app.post('/entrenos',security,(req, res)=>{
    console.log('crear entrenos');
    let est= req.body;
    mysqlconnectin.query('insert into entrenos (id_entrenador, id_rutinas) values (?,?)',[est.id_entrenador, est.id_rutinas],(err, result)=>{
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


app.put('/entrenos/:id', security,(req, res)=>{
    console.log('actualizar entrenos');
    let est= req.body;
    console.log(est);
    mysqlconnectin.query('update entrenos set id_entrenador=?, id_rutinas=? where id=?',[est.id_entrenador, est.id_rutinas, req.params.id],(err, result)=>{
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
     

app.delete('/entrenos/:id',security,(req, res)=>{
    console.log('delete entrenos');
    mysqlconnectin.query('delete from entrenos where id=?',[req.params.id],(err, result)=>{
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