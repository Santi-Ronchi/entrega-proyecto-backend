const socket = io.connect();
const idCart = document.getElementById('idCart').value
//------------------------------------------------------------------------------------
document.querySelectorAll('.botonEliminar').forEach(prod => {
    prod.addEventListener('click', function (event) {
        event.preventDefault();
        
        let valor = prod.value;
        socket.emit('eliminarProductos', {idProd: valor,idCart:idCart})
    })
});
