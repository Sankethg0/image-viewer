const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express();

app.use('/uploads',express.static('uploads'));



mongoose.connect('mongodb://127.0.0.1:27017/uploadimage',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log('DB Connected'));


mongoose.connection.on('error',err=>{
    console.log('DB Connection error'+err.message)
})


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended:true,
    })
);


app.use(cors())

app.use('/api',require('./routes/category.route.js'))

app.use((req,res)=>{
    res.status(404).json({
        errors:"Page not found"
    });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`);
});
