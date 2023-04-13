const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route.js');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


const DB = `mongodb+srv://ravisingh007ravi:LRsNndcwQRBXGvBF@cluster0.hz8vozb.mongodb.net/flixMovies?retryWrites=true&w=majority`;
const port = process.env.PORT || 5000;



mongoose.connect(process.env.MONGODB_URI || DB)
    .then(() => console.log("Mongoose is Connected😊😊"))
    .catch((err) => console.log(err));


app.use('/', route);

app.listen(port, () => console.log(`Server is Running Succesfully ${port}💕`));