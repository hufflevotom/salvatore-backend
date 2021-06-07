const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://PSalvatore:P1980sl.@cluster-salvatore.me3xc.mongodb.net/Cluster-Salvatore';
mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then((db) => console.log('Mongo está conectado'))
    .catch((err) => console.error(err));