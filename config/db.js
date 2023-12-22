const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://gede:00127455d@cluster0.k7eo0yx.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('MongoDB Conectado'))
.catch(err => console.log(err))