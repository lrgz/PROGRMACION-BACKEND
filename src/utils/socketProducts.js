/**
 * SECCION IMPORT
 */
const ProductManager = require('../dao/mongo/productMongo') 


/***
 * SECCION DEL SOCKET 
 */
const socketProduct = async (ioSocket) => {

    const products = await ProductManager.getProducts()
    
    ioSocket.on('connection', socket => {

        socket.emit('products', products)

        socket.on('addProduct', async data => {
            await ProductManager.addProduct(data)
        })

        socket.on('deleteProduct', async data => {
            await ProductManager.deleteProduct(data)
        })
    })
}

/***
* EXPORTS
*/
module.exports = socketProduct