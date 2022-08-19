const socket = io.connect();
const idCart = document.getElementById('idCart').value
//------------------------------------------------------------------------------------
document.querySelectorAll('.botonCompra').forEach(prod => {
    prod.addEventListener('click', function (event) {
        event.preventDefault();
        
        let valor = prod.value;
        socket.emit('agregarProducto', {idProd: valor,idCart:idCart})
    })
});