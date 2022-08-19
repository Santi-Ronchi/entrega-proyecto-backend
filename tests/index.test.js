const assert = require('assert').strict
const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;
const generador = require('../funciones/generador');

describe('test de Productos', () => {
    describe('GET', () => {
        it('debe retornar todos los productos', async () => {
            let response = await request.get('/api/home/OnlyProducts');
            expect(response.status).to.equal(200);
        }).timeout(10000);
    });

    describe('POST', () => {
        it('debe retornar un producto', async () => {
            //let newProd = { id: 4541, nombre: 'AxiosOK', precio: '1000', foto: 'https://www.luisllamas.es/wp-content/uploads/2019/05/axios.png', descripcion: 'AxiosTestProd' };
            let newProd = generador.get();
            let response = await request.post('/api/home/carga').send(newProd);
            expect(response.status).to.equal(200);
        }).timeout(10000);
    }).timeout(10000);

    describe('DELETE', () => {
        it('debe retornar un producto', async () => {
            let response = await request.delete('/api/home/carga/67073560945');
            expect(response.status).to.equal(200);
        }).timeout(10000);
    }).timeout(10000);

    describe('POST', () => {
        it('debe retornar un producto', async () => {
            //let updatedProd = { id: 4541, nombre: 'AxiosUPDATE', precio: '6666', foto: 'https://www.luisllamas.es/wp-content/uploads/2019/05/axios.png', descripcion: 'AxiosTestUpdated'};
            let updatedProd = generador.get();
            let response = await request.put('/api/home/carga/67073560945').send(updatedProd);
            expect(response.status).to.equal(200);
        }).timeout(10000);
    }).timeout(10000);
});