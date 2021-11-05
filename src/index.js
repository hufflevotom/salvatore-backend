require('./database');
const app = require('./app');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', client => {
    // client.on('event', data => { /* … */ });
    console.log('Cliente conectado');
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });
});

app.listen(app.get('port'));
server.listen(5000);

console.log('Servidor en el puerto ', app.get('port'));
console.log('Sockets en el puerto ', 5000);