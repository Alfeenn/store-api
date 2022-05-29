require('express-async-errors')

const express = require('express')
const app= express()
const products = require('./routes/products')
const errorHandlerMiddleware=require('./middleware/error-handler')
const NotFound=require('./middleware/not-found')
const connectDB = require('./db/connect')
require('dotenv').config()
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('<h1>STORE API</h1><a href=/api/products>store menu</a>')
})
app.use('/api/products',products)
app.use(errorHandlerMiddleware,NotFound)
const port = process.env.PORT || 3000
const start=async()=>{
try {
 await connectDB(process.env.MONGO_URI) 
 app.listen(port,console.log(`server is listening to port ${port}`))

} catch (error) {
    console.log(error);
}
}
start()


