
const express=require('express');
const app= express();
var cors = require('cors')
app.use(express.json());

app.set('port', process.env.PORT ||3000);

app.use(cors());
app.use(require('./routes/cliente'));
app.use(require('./routes/dieta'));
app.use(require('./routes/ejercicios'));
app.use(require('./routes/entrenador'));
app.use(require('./routes/entrenos'));
app.use(require('./routes/nutricion'));
app.use(require('./routes/persona'));
app.use(require('./routes/progreso'));
app.use(require('./routes/rutinas'));

app.use(require('./routes/security'));

app.get('/', (req, res) =>{
    res.status(200).send('index')
})

app.listen(app.get('port'), () => {
    console.log(`Server en puerto ${app.get('port')}`);
});
