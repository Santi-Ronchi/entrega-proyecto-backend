const axios = require('axios');

let url = 'http://localhost:8080/api/home';

axios.get(url + '/home/OnlyProducts')
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    });

axios.post(url + '/carga', {
        id: '4541',
        nombre: 'AxiosOK',
        precio: '1000',
        foto: 'https://www.luisllamas.es/wp-content/uploads/2019/05/axios.png',
        descripcion: 'AxiosTestProd',
    })
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    });

axios.post(url + '/carga/67073560945', {
        nombre: 'Bicicleta',
        precio: '999',
        descripcion: 'Bicicleta Update Test',
        foto: 'urldebicicleta.png'
    })
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    });

axios.delete(url + '/carga/67073560945')
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    });
