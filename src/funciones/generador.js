const faker = require('faker');

const get = () => ({
    id: faker.random.number(),
    nombre: faker.commerce.productName(),
    precio: faker.commerce.price(),
    foto: faker.image.imageUrl(),
    descripcion: faker.lorem.sentence(),
});

module.exports = { get }