/**
 * SECCION IMPORT
 */
const express = require("express");
const ProductManager = require("./productmanager");

/**
 * ARMO SET DE DATOS PARA PODER RETORNAR INFORMCION
 */

const productManager = new ProductManager("./src/productos.json");

/**
 * PROCESO PARA APLICACION CON EXPRESS
 */


const app = express();
const port = 8080;



/**
 * EndPoint products
 */
app.get("/products", async (req, res) => {
  const registers = req.query.limit;
  const products = await productManager.getProducts() 
  const productArray = JSON.parse(products);

    if (!registers) {      
      return  res.json(products)
    }
    else
    {
      if(productArray.length>=registers)
      {
        const filtro=productArray.slice(0,registers);
                
        return  res.json(filtro)
        
      }else{
        return res.json({      
              error: "Attention, a limit higher than the total number of products was reported",
          })
      }
    }

});

/**
 * EndPoint produts con busqueda por id
 */

app.get("/products/:id", async (req, res) => {
  
  const id = req.params.id;
  
  const productsSearch=await productManager.getById(id)  
  
  if (productsSearch) {
    return res.json(productsSearch);
  } else {
    return res.json({      
      error: "The product with the id : " + id + " was not found",
    });
  }
});

/**
 * LISTEN
 */
app.listen(port, () => {
  console.log(`The app listening on port http://localhost:${port}`);
});
