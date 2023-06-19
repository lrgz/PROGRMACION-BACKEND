const express = require('express')
const userManager = require('../dao/mongo/userMongo') 


const router = express.Router()

router.post('/register', async (req, res) => {
    try{
        let { first_name, last_name, email, password, date_of_birth } = req.body

        if(!first_name || !last_name || !email || !password || !date_of_birth) return res.send({status: 'error', message: 'Some information fields are missing.' })
    
        email=email.toLowerCase()

        const existsUser = await userManager.getUserByEmail(email)
        if(existsUser) return res.send({status: 'error', message: 'The email is already registered.' })

        const rol = (email == 'admincoder@coder.com') ? 'admin' : 'user'        
        const user = {            
            first_name,
            last_name,
            date_of_birth,
            email,
            password,
            rol
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
        if (!userDB) return res.send({status: 'error', message: 'The user entered does not exist.'})

        req.session.user = {
            
            first_name: userDB.first_name,
            last_name: userDB.last_name,
            email: userDB.email,
            role: userDB.rol
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