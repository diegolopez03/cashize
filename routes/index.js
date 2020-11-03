//Importar los módulos requeridos
const express = require("express");
const usuarioController = require("../controllers/usuarioController");
const authController = require("../controllers/authController");
const { check } = require("express-validator");

//Configura y mantiene todos los endpoints en el servidor 
const router = express.Router();

module.exports = () => {
    //Rutas disponibles 
    router.get("/", (req, res, next) => {
        res.send("¡Bienvenido a Cashize!");
    });

    //Rutas para usuario
    router.get("/crear-cuenta", usuarioController.formularioCrearCuenta);

    router.post("/registrarse",
    [
    //Realizar una verificación de los atributos del formulario
    check("nombre", "Debes ingresar tu nombre.")
    .not()
    .isEmpty()
    .escape(),
    check("email", "Debes ingresar un correo electrónico.")
    .not().isEmpty(),
    check("email", "El correo electónico no es válido.")
    .isEmail().normalizeEmail(),
    check("password", "Debes ingresar una contraseña").not().isEmpty(),
    //Validacion de campo de confirmacion de contraseña.
    // check("confirmpassoword", "La contraseña de confirmación es diferente")
    // .custom((value, { req }) => value === req.body.password),
    ],
    usuarioController.crearCuenta);

    router.get("/iniciar-sesion", usuarioController.formularioIniciarSesion);

    router.post("/iniciar-sesion", authController.autenticarUsuario);

    //Rutas de administracion
    router.get("/administrar", (req, res, next)=> {
        res.send("Administración del sitio");
    });

    return router;
}