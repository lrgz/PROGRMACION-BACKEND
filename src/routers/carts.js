/**
 * SECCION IMPORT
 */
const express = require('express')
const CartManager = require('../dao/mongo/cartMongo') 
const router = express.Router()



/***
* RUTAS
*/
router.get('/:id', async (req, res) => {
    try{
        res.status(200).send({status: 'succes', payload: await CartManager.getCartById(req.params.id)})
    }catch(error){  
        res.status(400).send({status: 'error', message: error.message})
    }
})
router.post('/', async (req, res) => {
    try{
        await CartManager.createCart()
        res.status(200).send({status: 'succes', payload: await CartManager.getCarts()})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})
router.post('/:id/product/:pid', async (req, res) => {
    try{
        await CartManager.addProductToCart(req.params.id, req.params.pid)
        res.status(200).send({status: 'succes', payload: await CartManager.getCarts()})
    }catch (error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

/***
* EXPORTS
*/
module.exports = router;