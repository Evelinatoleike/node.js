import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

//Routeris
app.get('/', function (req, res) {
    //Req - Request Gaunama uzklausa
    //Res - Response, tai ka graziname atgal
    res.sendFile(__dirname + '/templates/index.html') //Nurodome grazinama turini atgal i narsykle
})

app.get('/apie-mus', function (req, res) {
    //Req - Request Gaunama uzklausa
    //Res - Response, tai ka graziname atgal
    res.send('<h1>Apie Mus</h1>') //Nurodome grazinama turini atgal i narsykle
})

app.get('/kontaktai', function (req, res) {
    //Req - Request Gaunama uzklausa
    //Res - Response, tai ka graziname atgal
    res.send('<h1>Kontaktai</h1>') //Nurodome grazinama turini atgal i narsykle
})


app.listen(3001) //Nurodomas portas ir inicijuojamas serveris