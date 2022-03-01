const express = require('express');
const moment = require('moment');
const fs = require('fs');

const productos = fs.readFileSync('productos.txt', 'utf-8');
const listaProductos = JSON.parse(productos).map(producto => {
    return {
        nombre: producto.title,
        id: producto.id,
        precio: producto.price,
        imagen: producto.thumbnail,
    }
});

const app = express();
const Port = 8080
const server = app.listen(Port, () => {
    console.log(`Servidor http escuchando al puerto ${server.address().port}`);
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

app.get('/productos', (req, res) => {
    res.send(listaProductos);
})

app.get('/productoRandom', (req, res) => {
    const productoRandom = listaProductos[Math.floor(Math.random() * listaProductos.length)];
    res.send(productoRandom);
})

/*otro modo: 
importo desde contenedor
en contenedor.js exporté: module.exports = productosNuevos;
en este archivo importo: const productosNuevos = require('./contenedor.js');
y utilizo async await y método getAll()
*/
const productosNuevos = require('./contenedor');

app.get('/productosNuevos', async (req, res) => {
    const productosAgregados = await productosNuevos.getAll();
    const listaProductosAgregados = productosAgregados.map(producto => {
        return {
            nombre: producto.title,
            id: producto.id,
            precio: producto.price,
            imagen: producto.thumbnail,
        }
    });
    res.send(listaProductosAgregados);
})

app.get('/productoRandomNuevo', async (req, res) => {
    const productos = await productosNuevos.getAll();
    const productoRandom = productos[Math.floor(Math.random() * productos.length)];
    const productoRandomFormateado = {
        nombre: productoRandom.title,
        id: productoRandom.id,
        precio: productoRandom.price,
        imagen: productoRandom.thumbnail,
    }
    res.send({productoRandomFormateado});
})
