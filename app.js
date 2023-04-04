const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
const AuthRoute = require('./Routes/Auth.route')
require('./helpers/init_mongodb')


const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT



app.listen(PORT,() => {
	console.log('server running on 2000')
})





app.get('/', (req,res,next) => {
	res.send('hiddd')
})


app.use('/auth', AuthRoute)



app.use(async(req,res,next) => {
	next(createError.NotFound('this route does not exist'))
})


app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})