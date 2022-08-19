const {conexionMongoDB,disconnectMongoDB} = require('../daos/mongodb');
const schemaUsuario = require('../schemas/usuarios');
let contador = 1

class Usuario {
  async createUsuario(usuario) {
      try {
        await conexionMongoDB();
        const data = await schemaUsuario.create({
          nombre: usuario.nombre,
          email: usuario.email,
          password: usuario.password,
          direccion: usuario.direccion,
          edad: usuario.edad,
          telefono: usuario.telefono,
          foto: usuario.foto
        });
        await disconnectMongoDB();
        return data;
      } catch (error) {
        throw Error(error.message);
      }
  }

  async buscarUsuario(email) {
      try {
        await conexionMongoDB()
        const data = await schemaUsuario.find({email:email})
        await disconnectMongoDB();
        return data[0];
      } catch (error) {
        throw Error(error.message);
    }
  }


  async agregarFoto(nombreFoto,email){
    try {
      await conexionMongoDB()
        await schemaUsuario.findOneAndUpdate({email:email}, {foto:nombreFoto})
      await disconnectMongoDB();
        return;
    } catch (error) {
      throw Error(error.message);
    }
  }

}

module.exports = Usuario;