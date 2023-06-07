/**
 * SECCION IMPORT
 */
const express = require('express')
const ProductManager = require('../dao/mongo/productMongo') 
const router = express.Router()




/***
* RUTAS
*/
router.get('/', async (req, res) => {    
    const products = await productManager.getProducts()
    const { limit } = req.query
    limit ? res.status(200).send({status: 'succes', payload: products.slice(0, limit)}) : res.status(200).send({status: 'succes', payload: products})
})
router.get('/:id', async (req, res) => {
    try{        

        const product = await ProductManager.getById(req.params.id)
        res.status(200).send({status: 'succes', payload: product})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})
router.post('/', async (req, res) => {
    try{
        const product = req.body                        
        await ProductManager.addProduct(product)                
        res.status(200).send({status: 'succes', payload: await productManager.getProducts()})
    }catch (error){
        res.status(400).send({status: 'error', message: error.message})
    }
})
router.put('/:id', async (req, res) => {
    try{
        const product = req.body
        await ProductManager.updateProduct(req.params.id, product)
        res.status(200).send({status: 'succes', payload: await productManager.getProducts()})
    }catch (Error){
        res.status(400).send({status: 'error', message: Error.message})
    }
})
router.delete('/:pid', async (req, res) => {
    try{
        await ProductManager.deleteProduct(Number(req.params.pid))
        res.status(200).send({status: 'succes', payload: await productManager.getProducts()})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

/***
* EXPORTS
*/
module.exports = router;
