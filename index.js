require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

app = express()

app.use(morgan('dev'))
app.use(express.static('public'))

app.get('/', (req, res) => {
	console.log('here')
	res.sendFile('index.html')
})

app.listen(process.env.PORT || 3000)
