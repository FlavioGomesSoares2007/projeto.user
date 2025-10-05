import express, { raw } from 'express'
import { engine } from 'express-handlebars'
import conn from './sql/index.js'

import User from './models/User.js'



const ports = 3000
const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/users/add', (req, res) => {
    res.render('addUser')
})

app.get('/health', (req, res) => res.send('ok'));

app.post('/users/create', async (req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if (newsletter === 'on') {
        newsletter = true
    } else{
        newsletter = false
    }

    await User.create({name, occupation,newsletter})
     
    res.redirect('/')
})

app.get('/users/:id', async(req, res) => {
    const id = req.params.id
    const user = await User.findOne({raw: true, where: {id:id}})

    res.render('userview', { user })
})


app.get('/',  async(req, res) =>{

    const users = await User.findAll({raw: true})

    console.log(users)
    res.render('home', {users: users})
})

app.get('/users/delete/:id', async(req, res) => {

    const id = req.params.id

    await User.destroy({ where: {id: id}})

    res.redirect("/")
})


app.get('/users/edit/:id', async(req, res) => {

    const id = req.params.id

    const user = await User.findOne({raw: true, where: {id: id}})

    res.render("edituser", {user})
})

app.post('/users/update/:id', async(req, res) => {

    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if (newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    const userdata = {
        name,
        occupation,
        newsletter
        }

    await User.update(userdata, {raw: true, where: {id: id}})

    res.redirect('/')
})

console.log('banco conectado')
console.log('servidor rodando localhost:' + ports)

conn.sync().then(() => {
    app.listen(ports)
}).catch((err) => {
    console.log(err)
})

