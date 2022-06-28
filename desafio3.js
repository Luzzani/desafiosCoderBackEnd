const fs = require("fs");
const express = require("express");

class Container {
  constructor(fileName) {
    this.fileName = fileName;
    this.id = 0;
  }

  //Agregar producto al archivo
  async save(product) {
    let data = await fs.promises.readFile(this.fileName, "utf-8");
    let lastItem = 0;
    try {
      let products = JSON.parse(data);
      let find = products.find((prod) => prod.title === product.title);
      if (find) {
        return;
      }
      if (products.length > 0) {
        lastItem = products[products.length - 1].id;
      }

      console.log(`El ultimo producto es: ${lastItem}`);

      product.id = lastItem + 1;

      products.push(product);
      fs.writeFileSync(this.fileName, JSON.stringify(products, null, 4));

      console.log(`El producto ${product.title} se guardo correctamente`);
    } catch (error) {
      console.log(`Error al leer el archivo ${error}`);
    }
  }

  // Buscar un producto del archivo por su ID
  async getById(id) {
    try {
      let data = await fs.promises.readFile(this.fileName, "utf-8");

      let products = JSON.parse(data);
      let product = products.find((prod) => prod.id === id);
      if (product) {
        return console.log(product);
      } else {
        return console.log(`Null`);
      }
    } catch (error) {
      console.log(`Error al leer el archivo ${error}`);
    }
  }

  //Obtener todos los productos del archivo
  async getAll() {
    let data = await fs.promises.readFile(this.fileName, "utf8");
    let products = JSON.parse(data);
    return products;
  }

  //Eliminar un producto por su ID
  async deleteById(id) {
    let data = await fs.promises.readFile(this.fileName, "utf-8");
    let prodcuts = JSON.parse(data);
    let filtered = prodcuts.filter((prod) => prod.id !== id);
    fs.writeFileSync(this.fileName, JSON.stringify(filtered, null, 4));
  }

  //Eliminar todos los productos
  deletAll() {
    const empty = [];
    fs.writeFileSync(this.fileName, JSON.stringify(empty, null, 4));
  }
}

// productos ficticios
let product1 = {
  title: "Pincel",
  price: 100,
  thumbnail: "https:www.istockpohoto.com/pincel",
};

let product2 = {
  title: "Papel",
  price: 10,
  thumbnail: "https:www.istockpohoto.com/papel",
};

let file = new Container("products.txt");

// servidor express

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor Http escuchando en el puerto ${server.address().port}`);
});

app.get("/", (req, res) => {
  res.send(`<h1>Desafio numero 3</h1>`);
});

// todos los productos

const prodList = [];

file.getAll().then((data) => {
  data.forEach((data) => {
    prodList.push(data);
  });
});

console.log(file.getAll());

// -----------Ruta a todos los productos-------------

app.get("/productos", (req, res) => {
  res.send(
    `<div>${prodList.map((prod) => {
      return `
        <p>Nombre: ${prod.title}</p>
        <p>Precio: ${prod.price}</p>
        `;
    })}<div>`
  );
});

// -----------Ruta a un producto random-------------

app.get("/productoRandom", (req, res) => {
  let random = prodList[Math.floor(Math.random() * prodList.length)];
  res.send(`<div>
  <p>Producto: ${random.title}</p>
  <p>Price: ${random.price}</p>
  </div>`);
});
