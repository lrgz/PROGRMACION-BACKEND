/**
 * SECCION IMPORT
 */
const express = require('express')
const ProductManager = require('../dao/mongo/productMongo')  

/**
 * INIT PRODCUTO
 */
const router = express.Router()


/***
* RUTAS
*/
router.get('/', async(req, res) => {
    
    res.render('home', {        
        products: await ProductManager.getProducts()        
    })
})
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {})
})

router.get('/chat', (req,res) => {
    res.render('chat', {})
})

/***
* EXPORTS
*/
module.exports = router;