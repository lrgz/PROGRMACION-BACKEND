/**
 * SECCION IMPORT
 */
const fs = require("fs");

/**
 * ProductManager clase que implementa los siguientes metodos:
 *
 *   - addProduct ( incorporacion de un nuevo producto)
 *   - getProducts ( retorna todos los productos)
 *   - getProductById ( retorna un producto por su id de identificacion)
 *
 * @author  Rodrigo Zerrezuela (RZ)
 * @version 2.0.0
 * @since   2023-04
 */
class ProductManager {
  /**
   * fields  atributo que contiene los campos obligatorios del objeto
   */
  fields = ["title", "description", "price", "thumbnail", "code", "stock"]; //lista de campos obligatorios

  /**
   * Constructor  metodo de inicial del objeto
   * en el cual se inicializa los atributos del objeto
   * @param   file ruta y nombre del archivo donde se almacenaran los productos
   */
  constructor(file) {
    this.products = []; // array de productos
    this.id = 1; // id unico de identificacion de producto autoincremental
    this.path = file; // ruta y nombre del archivo de productos

    managerFS(fs, "INIT", this.path, null); // llamo a la funcion de inicializacion del FileSystem a utilizar

    this.products = managerFS(fs, "READ", this.path, null);
  }

  /**
   * addProduct  metodo para agregar un producto
   * @param product  contiene los datos del producto a agregar
   * @return
   *           - 'This code already exists' - se informo un producto con code ya existente
   *           - 'Fields missing' - esta faltando informar un campo requerido
   *           - 'Product added' - proceso exitoso se agrego el producto
   */
  addProduct(product) {
    /**
     * SECCION DE VERIFICACIONES
     */
    //verifico codigo producto unico
    let verifyCode = this.products.find((p) => p.code === product.code);

    // ya exite un producto con el codigo informado
    if (verifyCode) {
      return "This code already exists";
    }

    //Esta faltando algun campo obligatorio
    if (!checkFiels(product, this.fields)) {
      return "Fields missing";
    }

    /**
     * SECCION DE PROCESO
     */

    let newProduct = { ...product, id: this.id }; // incorporo el id al producto informado
    this.products.push(newProduct); // agrego el producto al listado de productos
    this.id++; // incremento el id

    //grabo en el archivo
    managerFS(fs, "SAVE", this.path, this.products);

    return "Product added";
  }

  /**
   * getProducts  metodo para buscar un producto por el id
   * @return
   *           - product - se retorna el listado de productos
   *           - 'Empty list of products' - en caso de que la lista este vacia
   */
  getProducts() {
    this.products = managerFS(fs, "READ", this.path, null);
    let answer =
      this.products.length === 0
        ? "Empty list of products"
        : JSON.stringify(this.products);
    return answer;
  }

  /**
   * getById  metodo para buscar un producto por el id
   * @param id  es el id del producrto que se desea buscar
   * @return
   *           - 'Not found' - no se encontro un producto con el id informado
   *           - product - se retorna el producto encontrado con el id informado
   */
  getById(id) {
    // leo el archivo y cargo los productos
    let arrayProducts = managerFS(fs, "READ", this.path, null);

    //busco el producto
    let searchProduct = (nameKey, arrayProducts) => {
      for (let i = 0; i < arrayProducts.length; i++) {
        if (arrayProducts[i].id === nameKey) {
          return arrayProducts[i];
        }
      }
      return "Not found";
    };
    return searchProduct(id, arrayProducts);
  }

  /**
   * updateProduct metodo para actualizar un producto por el id
   * @param id  es el id del producrto que se desea buscar
   * @param product  es el nuevo set de datos del producto
   * @return
   *           - 'Not found' - no se encontro un producto con el id informado
   *           - 'Fields missing' - el producto no esta completo en sus atributos
   *           - 'Product update' - proceso exitoso se actualizo el producto
   */
  updateProduct(id, product) {
    //verifico que este bien la informacion del producto
    //Esta faltando algun campo obligatorio
    if (!checkFiels(product, this.fields)) {
      return "Fields missing";
    }

    //busco el index del elemento a modicar
    const indexElement = this.products.findIndex((pr) => pr.id == id);

    //verifo si existe para reralizar elcambio
    if (indexElement >= 0) {
      let newProduct = [...this.products];
      newProduct[indexElement] = { ...product, id: id };
      this.products = newProduct;
      managerFS(fs, "SAVE", this.path, this.products);
      return "Product update";
    } else {
      return "Not found";
    }
  }

  /**
   * deleteProduct  metodo para eliminar un producto por el id
   * @param id  es el id del producrto que se desea eliminar
   * @return
   *           - 'Not found' - no se encontro un producto con el id informado
   *           - 'Product update' - proceso exitoso se actualizo el producto
   */
  deleteProduct(id) {
    console.log(
      "🚀 ~ file: productmanager.js:171 ~ ProductManager ~ this.products:",
      this.products
    );
    //busco el index del elemento a modicar
    let indexElement = this.products.findIndex((pr) => pr.id == id);

    //verifo si existe para reralizar elcambio
    if (indexElement >= 0) {
      // elimino el producto
      this.products.splice(indexElement, 1);
      console.log(
        "🚀 ~ file: productmanager.js:177 ~ ProductManager ~ this.products:",
        this.products
      );
      managerFS(fs, "SAVE", this.path, this.products);

      return "Product delete";
    } else {
      return "Not found";
    }
  }
}

/**
 * SECCION FUNCIONES
 */

/**
 * initFS  metodo para inicializar el filesystem
 */
function managerFS(objFS, accion, path, info) {
  switch (accion) {
    case "INIT":
      // verifico si exite el archivo lo borro y lo inicializo
      console.log("🚀 ~ file: productmanager.js:199 ~ managerFS ~ path:", path);
      if (!objFS.existsSync(path)) {
        objFS.writeFileSync(path, "[]", "utf8");
      }

      break;
    case "SAVE":
      objFS.writeFileSync(path, JSON.stringify(info));
    case "READ":
      let fileContent = objFS.readFileSync(path, "utf8");
      return JSON.parse(fileContent);
      break;
    default:
      break;
  }
}

/**
 * checkFiels  metodo para verificar que el producto informado cuenta con toda la data
 * @param product  contiene el producto a verificar
 * @param fields   contiene los atributos a controlar del producto
 * @return
 *           - true - el producto esta ok
 *           - false - el producto tiene atributos faltantes
 */
function checkFiels(product, fields) {
  for (let x = 0; x < fields.length; x++) {
    if (!Object.keys(product).includes(fields[x])) {
      return false;
    }
  }
  return true;
}

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
 *  GENERO INSTANCIA
 */

const productManager = new ProductManager("products.json");
const productManager2 = new ProductManager("products2.json");

/**
 *  CASO 1
 */
console.log("******************************");
console.log("*** CASO 1 - product1 - OK ***");
console.log("******************************");
console.log(productManager.addProduct(product1) + "\n");

/**
 *  CASO 2
 */
console.log("*******************************");
console.log("*** CASO 2 - product2 - OK  ***");
console.log("*******************************");
console.log(productManager.addProduct(product2) + "\n");

/**
 *  CASO 3
 */
console.log("*******************************");
console.log("*** CASO 3 - product3 - OK  ***");
console.log("*******************************");
console.log(productManager.addProduct(product3) + "\n");

/**
 *  CASO 4
 */
console.log("*******************************");
console.log("*** CASO 4 - product4 - OK  ***");
console.log("*******************************");
console.log(productManager.addProduct(product4) + "\n");

/**
 *  CASO 5
 */
console.log("*******************************");
console.log("*** CASO 5 - product5 - OK  ***");
console.log("*******************************");
console.log(productManager.addProduct(product5) + "\n");

/**
 *  CASO 6
 */
console.log("***********************************************");
console.log("*** CASO 6 - product6 - error false precio  ***");
console.log("***********************************************");
console.log(productManager.addProduct(product6) + "\n");

/**
 *  CASO 7
 */
console.log("**************************************************************");
console.log("*** CASO 7 - producto - ERROR codigo de producto existente ***");
console.log("**************************************************************");
console.log(productManager.addProduct(product7) + "\n");

/**
 *  CASO 8
 */
console.log("**************+++++++++++++++++++++++++++++++++++++++++");
console.log("*** CASO 8 - getProducts - listo todo los productos ***");
console.log("**************+++++++++++++++++++++++++++++++++++++++++");
console.log(productManager.getProducts() + "\n");

/**
 *  CASO 9
 */

console.log("**************++++++++++++++++++++++++++++");
console.log("*** CASO 9 - getProducts - listo vacia ***");
console.log("**************++++++++++++++++++++++++++++");
console.log(productManager2.getProducts() + "\n");

/**
 *  CASO 10
 */

console.log("******************************************************");
console.log("*** CASO 10 - getById - OK listo prodcuto por el id ***");
console.log("******************************************************");
console.log(productManager.getById(2) + "\n");

/**
 *  CASO 11
 */

console.log("************************************************");
console.log("*** CASO 11 - getById - ERROR Codigo invalido ***");
console.log("************************************************");
console.log(productManager.getById(7) + "\n");

/**
 *  CASO 12
 */
console.log("*****************************");
console.log("*** CASO 12 - update  - OK ***");
console.log("*****************************");
console.log(productManager.updateProduct(4, product4M) + "\n");

/**
 *  CASO 13
 */
console.log("*****************************");
console.log("*** CASO 13 - DELETE  - OK ***");
console.log("*****************************");
console.log(productManager.deleteProduct(5) + "\n");
