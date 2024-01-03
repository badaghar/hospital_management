const express = require('express')

const app = express()
const cors = require('cors')
const puppeteer = require('puppeteer')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get('/',(req,res)=>{


    res.send('completed')
})

app.get('/downloadSaleMedicineBill',(req,res)=>{
    const id = req.query.id

    res.send('adslkda'+id)
})
app.get('/downloadOpdForm',(req,res)=>{
    const id = req.query.id

    res.send('adslkda'+id)
})




app.listen(1000,
    console.log('connected to server ....')
)