class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName(){
        console.log(`Usuario: ${this.nombre} ${this.apellido}`)
    }
    addMascota(newPet){
        this.mascotas.push(newPet)
    }
    countMascotas(){
        console.log(this.mascotas.length)
    }
    addBook(newBook, autorBook){
        this.libros.push({nombre: newBook, autor: autorBook})
    }
    getBookNames(){
        let nameBooks = [];
        this.libros.forEach(libro => {
            nameBooks.push(libro.nombre);
        });
        return nameBooks;
    }
}

const usuario1 = new Usuario('Lucas', 'Luzzani', [{nombre: 'El señor de los anillos', autor: 'no me acuerdo'}, {nombre: 'La ladrona de libros', autor: 'este tampoco'}], ['Fiona']);


usuario1.getFullName();

usuario1.addMascota('Tomi');
console.log(usuario1.mascotas);

usuario1.countMascotas();

console.log(usuario1.libros);
usuario1.addBook('Harry potter y la piedra filosofal', 'J.K. Rowling');

console.log(usuario1.libros);

console.log(usuario1.getBookNames());
