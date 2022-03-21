import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { engine } from 'express-handlebars'
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Routeris
app.get('/', function (req, res) {
    if (Object.keys(req.query).length > 0) {

        res.render('person', {
            pirma: req.query.vardas,
            antra: req.query.pavarde,
            trecia: req.query.adresas,
            ketvirta: req.query.telefonas,
            penkta: req.query.email
        })
        return
    }

    res.sendFile(__dirname + '/templates/index.html')
})

app.get('/login', function (req, res) {
    if (Object.keys(req.query).length > 0) {
        if (req.query.login != '' &&
            req.query.password != '' &&
            req.query.login === 'admin@inv.lt' &&
            req.query.password === '1234'
        ) {
            res.redirect('http://localhost:3001/administratorius')
            return
        } else {
            res.redirect('http://localhost:3001/login')
            return
        }
    }

    let x = 'Labas pasauli'

    //HTML failo perdavimas
    //res.sendFile(__dirname + '/templates/login.html') 

    //Handlebars turinio perdavimas
    res.render('login', { x })
})

app.get('/administratorius', function (req, res) {
    res.sendFile(__dirname + '/templates/admin.html')
})

app.get('/:pirma', function (req, res) {
    let pirma = req.params.pirma
    res.send('<h1>' + pirma + '</h1>') //Nurodome grazinama turini atgal i narsykle
})

app.get('/:pirma/:antra/:trecia/:ketvirta/:penkta', function (req, res) {
    let pirma = req.params.pirma
    let antra = req.params.antra
    let trecia = req.params.trecia
    let ketvirta = req.params.ketvirta
    let penkta = req.params.penkta
    res.render('person', { pirma, antra, trecia, ketvirta, penkta }) //Nurodome grazinama turini atgal i narsykle
})

app.listen(3001) //Nurodomas portas ir inicijuojamas serveris