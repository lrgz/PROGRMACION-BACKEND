/**
 * ProductManager clase que implementa los siguientes metodos:
 *
 *   - addProduct ( incorporacion de un nuevo producto)
 *   - getProducts ( retorna todos los productos)
 *   - getProductById ( retorna un producto por su id de identificacion)
 *
 * @author  Rodrigo Zerrezuela (RZ)
 * @version 1.0
 * @since   2023-04-14
 */
class ProductManager {
    /**
     * fields  atributo que contiene los campos obligatorios del objeto
     */
    fields = ["title", "description", "price", "thumbnail", "code", "stock"]; //lista de campos obligatorios
  
    /**
     * Constructor  metodo de inicial del objeto
     * en el cual se inicializa los atributos del objeto
     */
    constructor() {
      this.products = []; // array de productos
      this.id = 1; // id unico de identificacion de producto autoincremental
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
      let checkFiels = (data, fields) => {
          for (let x = 0; x < fields.length; x++) {
            if (!Object.keys(data).includes(fields[x])) {
              return false;
            }
          }
          return true;
        }
  
      // ya exite un producto con el codigo informado
      if (verifyCode) {
        return "This code already exists";
      }
  
      //Esta faltando algun campo obligatorio
      if (!checkFiels(product,this.fields)) {
        return "Fields missing";
      }
  
      /**
       * SECCION DE PROCESO
       */
  
      let newProduct = { ...product, id: this.id }; // incorporo el id al producto informado
      this.products.push(newProduct); // agrego el producto al listado de productos
      this.id++; // incremento el id
  
      return "Product added";
    }
  
    /**
     * getProducts  metodo para buscar un producto por el id
     * @return
     *           - product - se retorna el listado de productos
     *           - 'Empty list of products' - en caso de que la lista este vacia
     */
    getProducts() {
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
      let searchProduct = (nameKey, myArray) => {
        for (let i = 0; i < myArray.length; i++) {
          if (myArray[i].id === nameKey) {
            return JSON.stringify(myArray[i]);
          }
        }
        return "Not found";
      };
  
      return searchProduct(id, this.products);
    }
  }
  
  
  /**
   * SECCION DE PPRUEBAS
   */
  
  /**
   * defino los productos autilizar en la prueas
   *
   * - product1
   * - product2
   * - product3
   * - product4
   *
   */
  
  const product1 = {
    title: "Prodcuto 1",
    description: "DEsceripcion del producto 1",
    price: 200.51,
    thumbnail: "https://picsum.photos/200/300",
    code: "P100ABC",
    stock: 17,
  };
  const product2 = {
    title: "Prodcuto 2",
    description: "Descripcion del producto 2",
    price: 3400,
    thumbnail: "https://picsum.photos/200/300",
    code: "P2001BCA",
    stock: 200,
  };
  
  const product3 = {
    title: "Prodcuto 3",
    description: "Descripcion del producto 3",
    thumbnail: "https://picsum.photos/200/300",
    code: "P3001BCA",
    stock: 2,
  };
  
  const product4 = {
    title: "Prodcuto 4",
    description: "Descripcion del producto 4",
    price: 3.4,
    thumbnail: "https://picsum.photos/200/300",
    code: "P2001BCA",
    stock: 20,
  };
  
  /**
   *  GENERO INSTANCIA
   */
  
  const productManager = new ProductManager();
  const productManager2 = new ProductManager();
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
  console.log("***********************************************************");
  console.log('*** CASO 3 - product3 - ERROR falta el atributo "price" ***');
  console.log("***********************************************************");
  console.log(productManager.addProduct(product3) + "\n");
  
  /**
   *  CASO 4
   */
  console.log("**************************************************************");
  console.log("*** CASO 4 - producto - ERROR codigo de producto existente ***");
  console.log("**************************************************************");
  console.log(productManager.addProduct(product4) + "\n");
  
  /**
   *  CASO 5
   */
  console.log("**************+++++++++++++++++++++++++++++++++++++++++");
  console.log("*** CASO 5 - getProducts - listo todo los productos ***");
  console.log("**************+++++++++++++++++++++++++++++++++++++++++");
  console.log(productManager.getProducts() + "\n");
  
  /**
   *  CASO 6
   */
  console.log("**************++++++++++++++++++++++++++++");
  console.log("*** CASO 6 - getProducts - listo vacia ***");
  console.log("**************++++++++++++++++++++++++++++");
  console.log(productManager2.getProducts() + "\n");
  
  /**
   *  CASO 7
   */
  console.log("******************************************************");
  console.log("*** CASO 7 - getById - OK listo prodcuto por el id ***");
  console.log("******************************************************");
  console.log(productManager.getById(2) + "\n");
  
  /**
   *  CASO 8
   */
  console.log("************************************************");
  console.log("*** CASO 8 - getById - ERROR Codigo invalido ***");
  console.log("************************************************");
  console.log(productManager.getById(3) + "\n");
  