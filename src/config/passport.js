const passport = require('passport')
const local = require('passport-local')
const userManager = require('../dao/mongo/userMongo')
const { createHash, isValidPassword } = require('../utils/bcrypt')
const GitHubStrategy = require('passport-github2')

const LocalStrategy = local.Strategy
const initPassport = () => {
    passport.use('register', new LocalStrategy({passReqToCallback: true,usernameField: 'email'},
    async (req, username, password, done) => {
        let { first_name, last_name, email, date_of_birth } = req.body

        email=email.toLowerCase()
        
        try{
            
            const existsUser = await userManager.getUserByEmail(username)
            
            if(existsUser) return done(null, false)

            const rol = (email == 'admincoder@coder.com') ? 'admin' : 'user'    

            const newUser = {
                first_name,
                last_name,
                date_of_birth,
                email,
                password: createHash(password),
                rol
            }
            
            let result = await userManager.addUser(newUser)
            return done(null, result)
        }catch(error){
            console.log(error)
            return done(error)
        }
    }))

    passport.use('login', new LocalStrategy({usernameField: 'email'},
    async(username, password, done) => {
        const userDB = await userManager.getUserByEmail(username)
        try{
            if(!userDB) return done(null, false)

            if(!isValidPassword(password, userDB)) return done(null, false)

            return done(null, userDB)
        }catch(error){
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userManager.getUserById(id)
        done(null, user)
    })
}

const initPassportGithub = () => {
    passport.use('github', new GitHubStrategy({ 
        clientID: 'Iv1.a60f51cda4ec8103',
        //TODO ACA SE DEBE REMPLZAR '******' POR EL ClientSecrect
        clientSecret: '******',
        callbackUrl: 'http://localhost:8080/api/sessions/githubcallback' },
    async(accessToken, refreshToken, profile, done) => {
        try{
            let user = await userManager.getUserByEmail(profile._json.email)
            if(!user){
                let newUser = {                    
                    first_name: profile._json.name ,
                    last_name: ' ',
                    date_of_birth: ' ',
                    email: profile._json.email,
                    password: ' ',
                    rol:'user'
                }
                const result = await userManager.addUser(newUser)
                return done(null, result)
            }else{                
                return done(null, user)
            }
        }catch(error){
            done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userManager.getUserById(id)
        done(null, user)
    })
}

module.exports = { initPassport, initPassportGithub }