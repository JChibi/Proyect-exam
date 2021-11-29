const express = require('express');
const app = express.Router();
const mysqlconnectin = require('../configurations/db-conf');
const security= require('../security/verifier')


app.get('/clientes', security,(req, res) => {
    console.log('get lista cliente');
    mysqlconnectin.query('select * from cliente', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});


app.get('/clientes/:id',security,(req, res)=>{
    console.log('get cliente');
    mysqlconnectin.query('select * from cliente where id=?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send('error');
        }
    })

});


app.post('/clientes',security,(req, res)=>{
    console.log('crear cliente');
    let est= req.body;
    mysqlconnectin.query('insert into cliente (id_persona, edad, peso_inicial, peso_meta, tallas_inicial, tallas_meta) values (?,?,?,?,?,?)',[est.id_persona, est.edad, est.peso_inicial, est.peso_meta, est.tallas_inicial, est.tallas_meta],(err, result)=>{
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


app.put('/clientes/:id',security,(req, res)=>{
    console.log('actualizar estudiante');
    let est= req.body;
    console.log(est);
    mysqlconnectin.query('update cliente set id_persona=?, edad=?, peso_inicial=?, peso_meta=?, tallas_inicial=?, tallas_meta=? where id=?',[est.id_persona, est.edad, est.peso_inicial, est.peso_meta, est.tallas_inicial, est.tallas_meta, req.params.id],(err, result)=>{
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
     

app.delete('/clientes/:id',security,(req, res)=>{
    console.log('delete clientes');
    mysqlconnectin.query('delete from cliente where id=?',[req.params.id],(err, result)=>{
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