# Programacion Backend

Este repositorio contiene las entregas de la _comision 51380_

<br>
<br>

## Primera pre-entrega 🚀

Se debera realizar una clase llamada _ProductManager_ que gestione un conjunto de productos

- Debe crearse desde su constructor con el elemento products, el cual 
  será un arreglo vacío

- Cada producto que gestione debe contar con las propiedades:
        
        - title (nombre del producto)
        - description (descripción del producto)
        - price (precio)
        - thumbnail (ruta de imagen)
        - code (código identificador)
        - stock (número de piezas disponibles)

- Debe contar con un método “addProduct” el cual agregará un producto
  al arreglo de productos inicial

        - Validar que no se repita el campo “code” y que todos los campos
          sean obligatorios
        - Al agregarlo, debe crearse con un id autoincrementable

- Debe contar con un método “getProducts” el cual debe devolver 
  el arreglo con todos los productos creados hasta ese momento

- Debe contar con un método “getProductById” el cual debe buscar en el
  arreglo el producto que coincida con el id

        - En caso de no coincidir ningún id, mostrar en consola un error  
          “Not found”


<br>
<br>

## Segunda pre-entrega 🚀

Se debera realizar una clase llamada _ProductManager_ que gestione un conjunto de productos

- Debe contar con un método _updateProduct_ el cual debe buscar en el
  arreglo el producto que coincida con el id

        - En caso de no coincidir ningún id, mostrar en consola un error  
          “Not found”
        - En caso de estar todo ok se va a mostar en consola el siguiente mensaje
          “Product update”


- Debe contar con un método _deleteProduct_ el cual debe buscar en el
  arreglo el producto que coincida con el id

        - En caso de no coincidir ningún id, mostrar en consola un error  
          “Not found” 
        - En caso de estar todo ok se va a mostar en consola el siguiente mensaje
          “Product delete”

- Se incorpora el manejo de archico para almacenar los productos

<br>
<br>

## Construido con 🛠️

Para la construccion de este proeycto se utilizaron lasssss siguientes herramientas : 

* [Nodejs](https://nodejs.org/en) 
* [ECMAScript](https://tc39.es/ecma262/)
* [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
* [vsCode](https://code.visualstudio.com/)

<br>
<br>

## Autor(es) ✒️


* **Rodrigo Zerrezuela** - *Trabajo Inicial / Proyecto * - [lrgz](https://github.com/lrgz)


<br>
<br>

---
⌨️ por [lrgz](https://github.com/lrgz) 😊