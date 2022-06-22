const fs = require("fs");

class Container {
  constructor(fileName) {
    this.fileName = fileName;
    this.id = 0;
  }
// Agregar producto a un archivo txt 
  async save(product) {
    let data = await fs.promises.readFile(this.fileName, "utf-8");
    let lastItem = 0;
    try {
      let products = JSON.parse(data);
        let find = products.find(element => element.title === product.title);
        if (find) {
            return;
        }
      if (products.length > 0) {
        lastItem = products[products.length - 1].id;
      }

      console.log(`El ulitmo elemento es: ${lastItem}`);

      product.id = lastItem + 1;

      products.push(product);
      fs.writeFileSync(this.fileName, JSON.stringify(products, null, 4));
      console.log(`El producto ${product.title} se guerdo correctamente`);

    } catch (error) {
        console.log(`Error al leer el archivo: ${error}`);
    }
  }
// Buscar un producto del archivo por su ID
  async getById(number) {
    try{
        let data = await fs.promises.readFile(this.fileName,'utf-8');
        
        let products= JSON.parse(data);
        const product = products.find( producto => producto.id === number);
            if(product){
            return console.log(product)
        }else{
            return console.log('Null')
        }

    }catch(error){
        console.log(`Error al leer el archivo: ${error}`)
    }
  }

  //Obtener todos los productos del archivo
  async getAll(){
    let data = await fs.promises.readFile(this.fileName, "utf-8");
    let products = JSON.parse(data)
        console.log(products);
  }

  //Eliminar un objeto por id

  async deleteById(id) {
    let data = await fs.promises.readFile(this.fileName, "utf-8");
    let products = JSON.parse(data)
    let filtered = products.filter(element => element.id !== id);
    fs.writeFileSync(this.fileName, JSON.stringify(filtered, null, 4));
  }

  //Eliminar todos los productos

  deleteAll(){
    const empty = ''
    fs.writeFileSync(this.fileName, JSON.stringify(empty, null, 4));
    
  }
}


let file = new Container('products.txt');

let product1 = {
    title: 'Pincel',
    price: 100,
    thumbnail: 'https:www.istockpohoto.com/pincel'
}
let product2 = {
    title: 'Papel',
    price: 10,
    thumbnail: 'https:www.istockpohoto.com/papel'
}

file.save(product1);
file.save(product2);

file.getById(3)

file.getAll()

// file.deleteById(3)

// file.deleteAll()
