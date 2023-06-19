const express = require('express')
const userManager = require('../dao/mongo/userMongo') 

const router = express.Router()

router.post('/register', async (req, res) => {
    try{
        const { first_name, last_name, email, password, date_of_birth } = req.body

        if(!first_name || !last_name || !email || !password || !date_of_birth) return res.send({status: 'error', message: 'Some information fields are missing.' })
    
        const existsUser = await userManager.getUserByEmail(email)
        if(existsUser) return res.send({status: 'error', message: 'The email is already registered.' })

        const role = (email == 'adminCoder@coder.com') ? 'admin' : 'user'

        const user = {
            first_name,
            last_name,
            date_of_birth,
            email,
            password,
            role
        }
        await userManager.addUser(user)

        res.redirect('/login')        
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body        

        const userDB = await userManager.getUserByLogin(email, password)
        if (!userDB) return res.send({status: 'error', message: 'The user e                                                         ntered does not exist.'})

        req.session.user = {
            first_name: userDB.first_name,
            last_name: userDB.last_name,
            email: userDB.email,
            role: userDB.role
        }
        
        res.redirect('/products')        
    }catch (error){
        res.status(400).send({status: 'error', message: error.message})
    }
})


router.get('/logout', (req, res)=>{
    req.session.destroy(err => {
        if (err) return res.send({status: 'error', message: err})
        res.redirect('/login')
    })
})

module.exports = router;