import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { engine } from 'express-handlebars'
import { faker } from '@faker-js/faker'
import session from 'express-session'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(session({
    secret: 'authentification',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 864000000
    }
}))

//Routeris

app.get('/login', function (req, res) {
    let message = ''

    if (Object.keys(req.query).length > 0) {
        //Tikriname ar suvesti teisingi prisijungimo duomenys
        if (req.query.login != '' &&
            req.query.password != '' &&
            req.query.login === 'admin@inv.lt' &&
            req.query.password === '1234'
        ) {
            req.session.loggedIn = true
            req.session.userName = 'admin@inv.lt'

            res.redirect('http://localhost:3001/people')
            return
        } else {
            message = 'Neteisingi prisijungo duomenys'
        }

    }

    res.render('login', { message })
})

app.get('/people', function (req, res) {

    //Panaikiname sesijos reiksmes individualiai kiekvienam indeksui
    // req.session.loggedIn = null
    // req.session.userName = null

    //Panaikiname visa sesija 
    //req.session.destroy()

    if (req.session.loggedIn) {
        let zmones = []

        for (let i = 0; i < 100; i++) {
            let address = faker.address.streetAddress() + ', ' +
                faker.address.city() + ', ' +
                faker.address.country()

            zmones.push(
                {
                    vardas: faker.name.firstName(),
                    pavarde: faker.name.lastName(),
                    adresas: address,
                    telefonas: faker.phone.phoneNumber(),
                    emailas: faker.internet.email()
                }
            )
        }
        res.render('people', { zmones, user: req.session.userName })

    } else {

        res.redirect('/login')

    }

})

app.listen(3001) //Nurodomas portas ir inicijuojamas serveris