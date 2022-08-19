function chequeoAutentificacion(req,res,next){
    if(req.isAuthenticated()){
        next()
    } else {
        return res.redirect('/api/login')
    }
}

function chequeoAuteExistente(req,res,next){
    if(req.isAuthenticated()){
        res.redirect('/api/home')
    } else {
        next()
    }
}

module.exports = {chequeoAuteExistente,chequeoAutentificacion}