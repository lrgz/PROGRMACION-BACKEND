/**
 * SECCION IMPORT
 */
const express = require('express')
const ProductManager = require('../controller/productmanager')  

/**
 * INIT PRODCUTO
 */
const router = express.Router()
const pm = new ProductManager("./src/storage/products.json")

/***
* RUTAS
*/
router.get('/', async(req, res) => {
    await pm._initFS()
    
    res.render('home', {
        
        products: await pm.getProducts()
    })
})
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {})
})

/***
* EXPORTS
*/
module.exports = router;