const express = require('express')
const passport = require('passport')
const { generateToken } = require('../utils/jwt')
const userManager = require('../dao/mongo/userMongo')
const cartModel = require('../dao/mongo/models/cartModel')
const { createHash, isValidPassword } = require('../utils/bcrypt')



const router = express.Router()


const authenticateJWT = passport.authenticate('current', { session: false });

router.get('/current', authenticateJWT, (req, res) => {
    const currentUser = req.user;
    res.send({ status: 'success', payload: currentUser });
  });


router.post('/register',  async(req, res) => {
    const { first_name, last_name, email, password, date_of_birth } = req.body
    try{
        const user = await userManager.getUserByEmail(email)
        if(user) return done(null, false)

        const newUser = {
            first_name,
            last_name,
            date_of_birth,
            email,
            password: createHash(password),
            cart: await cartModel.create({products: []})
        }
        let result = await userManager.addUser(newUser)
        res.send({status: "success", payload: result});
    }catch(error){
        res.send({status: 'error', message: error.message});
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const userDB = await userManager.getUserByEmail(email)
    try{

        if(!userDB) return res.send({status: 'error', message: 'There is not a user with the email: ' + email})

        if(!isValidPassword(userDB, password)) return res.send({status: 'error', message: 'Your user password does not match the entered password'})

        const access_token = generateToken(userDB)
        res.cookie('jwtCookieToken', access_token, {maxAge: 3600000, httpOnly: true})

        res.send({status: "success", payload: access_token});
    }catch(error){
        res.send({status: 'error', message: error.message});
    }
})


router.get('/logout', (req, res)=>{
    res.clearCookie('jwtCookieToken')
    res.send('Successfully logged out.')
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