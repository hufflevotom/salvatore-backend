const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 4000);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', function(req, res){
    res.send('Salvatore-Project')
})
app.use("/v1/vehiculo", require('./routes/vehiculo.routes'));
app.use("/v1/usuario", require('./routes/usuario.routes'));
app.use("/v1/responsable", require('./routes/responsable.routes'));
app.use("/v1/folio", require('./routes/folio.routes'));
app.use("/v1/evidencia", require('./routes/evidencia.routes'));
app.use("/v1/tipoRol", require('./routes/tipoRol.routes'));
app.use("/v1/ruta", require('./routes/ruta.routes'));
module.exports = app;