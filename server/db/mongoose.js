var mongoose = require ('mongoose');


mongoose.Promise = global.Promise;

const dbOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auto_reconnect: true,
    useFindAndModify: false,
};


//change the database with yours
mongoose.connect('mongodb+srv://I6:praveen7@cluster0.izu7b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',dbOptions);

module.exports = {mongoose};
