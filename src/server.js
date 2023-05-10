/**
 * SECCION IMPORT
 */
const express = require('express')
const productRouter = require('./routers/products')
const cartRouter = require('./routers/carts')


/**
 * DEFINO PUERTO DE LA APP
 */
const PORT = 8080

/**
 * CONFIGURO LA APP
 */
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.use("*", (req, res) => {
    res.status(404).send({status: "Error", message: `Requested path not found`,});
});


/*** 
* ARRANQUE APLICACION
*/
app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})