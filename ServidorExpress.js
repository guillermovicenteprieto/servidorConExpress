const express = require('express');
const moment = require('moment');

const fs = require('fs');
const productos = fs.readFileSync('productos.txt', 'utf-8');


const app = express();
const Port = 8080
const server = app.listen(Port, () => {
    console.log(`Servidor-2 http escuchando al puerto ${server.address().port}`);
})

server.on('error', err => {
    console.log(`error en el servidor ${err}`);
})

app.get('/', (req, res) => {
    res.send(`
    <div style="font-family: Verdana" >
        <h1 style="color:green">Hola mundo </h1>
        <h2 style=" color: blue">Bienvenido al Servidor con Express</h2>
            <div>
                Fecha: ${moment().format('DD/MM/YYYY')} - Hora: ${moment().format('HH:mm:ss')}
            </div>
    </div>
    `)
})

app.get('/productos',  (req, res) => {
    res.send(JSON.parse(productos));
})

app.get('/productoRandom', (req, res) => {
    const productoRandom = JSON.parse(productos)[Math.floor(Math.random() * JSON.parse(productos).length)];
    res.send(productoRandom);
})



