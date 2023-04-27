/**
 * SECCION DE IMPORT
 */



const ProductManager = require("./productmanager");

  /**
   *  GENERO INSTANCIA
   */

const productManager = new ProductManager("productos.json");
const productManager2 = new ProductManager("productos2.json");

const main = async () => {

/**
 * SECCION DE PPRUEBAS
 */

const product1 = {
    title: "Producto 1",
    description: "DEsceripcion del producto 1",
    price: 200.51,
    thumbnail: "https://picsum.photos/200/300",
    code: "P2001BCA",
    stock: 17,
  };
  const product2 = {
    title: "Producto 2",
    description: "Descripcion del producto 2",
    price: 3400,
    thumbnail: "https://picsum.photos/200/300",
    code: "P2002BCA",
    stock: 200,
  };
  
  const product3 = {
    title: "Producto 3",
    price: 5400,
    description: "Descripcion del producto 3",
    thumbnail: "https://picsum.photos/200/300",
    code: "P2003BCA",
    stock: 2,
  };
  
  const product4 = {
    title: "Producto 4",
    description: "Descripcion del producto 4",
    price: 3.4,
    thumbnail: "https://picsum.photos/200/300",
    code: "P2004BCA",
    stock: 20,
  };
  
  const product4M = {
    title: "Producto 4 MODIFCA",
    description: "Descripcion del producto 4 MODIFCA",
    price: 3.4,
    thumbnail: "https://picsum.photos/200/300",
    code: "P2004BCA",
    stock: 20,
  };
  
  const product5 = {
    title: "Producto 5",
    description: "Descripcion del producto 5",
    price: 3.4,
    thumbnail: "https://picsum.photos/200/300",
    code: "P2005BCA",
    stock: 20,
  };
  
  const product6 = {
    title: "Producto 6",
    description: "Descripcion del producto 6",
    thumbnail: "https://picsum.photos/200/300",
    code: "P2006BCA",
    stock: 20,
  };
  
  const product7 = {
    title: "Producto 7",
    description: "Descripcion del producto 7",
    price: 3.4,
    thumbnail: "https://picsum.photos/200/300",
    code: "P2001BCA",
    stock: 20,
  };

  /**
   *  CASO 1
   */
  console.log("******************************");
  console.log("*** CASO 1 - product1 - OK ***");
  console.log("******************************");
  console.log(await await productManager.addProduct(product1) + "\n");
  
  
  
  /**
  *  CASO 2
  */
  console.log("*******************************");
  console.log("*** CASO 2 - product2 - OK  ***");
  console.log("*******************************");
  console.log( await productManager.addProduct(product2) + "\n");
  
  /**
  *  CASO 3
  */
  console.log("*******************************");
  console.log("*** CASO 3 - product3 - OK  ***");
  console.log("*******************************");
  console.log( await productManager.addProduct(product3) + "\n");
  
  /**
  *  CASO 4
  */
  console.log("*******************************");
  console.log("*** CASO 4 - product4 - OK  ***");
  console.log("*******************************");
  console.log( await productManager.addProduct(product4) + "\n");
  
  /**
  *  CASO 5
  */
  console.log("*******************************");
  console.log("*** CASO 5 - product5 - OK  ***");
  console.log("*******************************");
  console.log( await productManager.addProduct(product5) + "\n");
  
  /**
  *  CASO 6
  */
  console.log("***********************************************");
  console.log("*** CASO 6 - product6 - error false precio  ***");
  console.log("***********************************************");
  console.log( await productManager.addProduct(product6) + "\n");
  
  /**
  *  CASO 7
  */
  console.log("**************************************************************");
  console.log("*** CASO 7 - producto - ERROR codigo de producto existente ***");
  console.log("**************************************************************");
  console.log( await productManager.addProduct(product7) + "\n");
  
  /**
  *  CASO 8
  */
  console.log("**************+++++++++++++++++++++++++++++++++++++++++");
  console.log("*** CASO 8 - getProducts - listo todo los productos ***");
  console.log("**************+++++++++++++++++++++++++++++++++++++++++");
  console.log( await productManager.getProducts() + "\n");
  
  /**
  *  CASO 9
  */
  
  console.log("**************++++++++++++++++++++++++++++");
  console.log("*** CASO 9 - getProducts - listo vacia ***");
  console.log("**************++++++++++++++++++++++++++++");
  console.log( await productManager2.getProducts() + "\n");
  
  /**
  *  CASO 10
  */
  
  console.log("******************************************************");
  console.log("*** CASO 10 - getById - OK listo prodcuto por el id ***");
  console.log("******************************************************");
  console.log( await productManager.getById(1) + "\n");
  
  /**
  *  CASO 11
  */
  
  console.log("************************************************");
  console.log("*** CASO 11 - getById - ERROR Codigo invalido ***");
  console.log("************************************************");
  console.log( await productManager.getById(7) + "\n");
  
  /**
  *  CASO 12
  */
  console.log("*****************************");
  console.log("*** CASO 12 - update  - OK ***");
  console.log("*****************************");
  console.log( await productManager.updateProduct(4, product4M) + "\n");
  
  /**
  *  CASO 13
  */
  console.log("*****************************");
  console.log("*** CASO 13 - DELETE  - OK ***");
  console.log("*****************************");
  console.log( await productManager.deleteProduct(5) + "\n");
}

main()