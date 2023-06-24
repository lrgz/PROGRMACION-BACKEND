const express = require('express')
const passport = require('passport')



const router = express.Router()

router.post('/register', passport.authenticate('register', {failureRedirect:'/failregister'}), async (req, res) => {
    try{
        res.redirect('/login')        
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.get('/failregister', async(req, res) => {
    res.send({status: 'error', message: 'Failed register'})
})


router.post('/login',passport.authenticate('login', {failureRedirect:'/faillogin'}), async (req, res) => {
    try{

        if(!req.user) return res.status(400).send({status: 'error', message: 'Invalid credentials'})

        email=req.user.email.toLowerCase()
        const rol = (email == 'admincoder@coder.com') ? 'admin' : 'user' 


        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            date_of_birth: req.user.date_of_birth,
            rol: rol
        }

        res.redirect('/products')       
   
                
    }catch (error){
        res.status(400).send({status: 'error', message: error.message})
    }
})


router.get('/failloing', async(req, res) => {
    res.send({status: 'error', message: 'Failed login'})
})


router.get('/logout', (req, res)=>{
    req.session.destroy(err => {
        if (err) return res.send({status: 'error', message: err})
        res.redirect('/login')
    })
})


router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req, res)=>{})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res)=>{
    

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        date_of_birth: req.user.date_of_birth,
        rol :(req.user.email == 'admincoder@coder.com') ? 'admin' : 'user' 
    }
    res.redirect('/products')
})

module.exports = router;