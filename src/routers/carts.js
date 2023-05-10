/**
 * SECCION IMPORT
 */
const express = require('express')
const CartManager = require('../controller/cartManager') 
const router = express.Router()

/**
 * INIT CARRITO
 */
const cm = new CartManager("./src/storage/carts.json")

/***
* RUTAS
*/
router.get('/:id', async (req, res) => {
    try{
        res.status(200).send({status: 'succes', payload: await cm.getCartById(req.params.cid)})
    }catch(error){  
        res.status(400).send({status: 'error', message: error.message})
    }
})
router.post('/', async (req, res) => {
    try{
        await cm.createCart()
        res.status(200).send({status: 'succes', payload: await cm.getCarts()})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})
router.post('/:id/product/:pid', async (req, res) => {
    try{
        await cm.addProductToCart(req.params.id, req.params.pid)
        res.status(200).send({status: 'succes', payload: await cm.getCarts()})
    }catch (error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

/***
* EXPORTS
*/
module.exports = router;