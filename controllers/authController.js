//Importar los módulos requeridos
const passport = require("passport");
const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuarios");

// Se encarga de autenticar el usuario y de redireccionarlo
exports.autenticarUsuario = passport.authenticate("local", {
    successRedirect: "/administrar",
    failureRedirect: "/iniciar-sesion",
    failureFlash: true,
    badRequestMessage: ["Debes ingresar tus credenciales"],
});

//Cerrar la sesion del usuario
exports.cerrarSesion = (req, res, next) => {
    //Cerrar la sesion 
    req.logout();

    req.flash("succes", ["Has cerrado correctamente tu sesón",]);

    return res.redirect("/iniciar-sesion");
}

