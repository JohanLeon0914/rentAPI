const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../../database/db')
const { promisify } = require('util') //usando promesas

//Metodo para registrarse

exports.register = async (req, res) => {

    try {
        console.log(req)
        const nombre = req.body.nombre
        const correo = req.body.correo
        const pass = req.body.pass
        const ciudad = req.body.ciudad
        const telefono = req.body.telefono
        const imagen = req.body.imagen
        const precio = req.body.precio
        const edad = req.body.edad
        const genero = req.body.genero
        const descripcion = req.body.descripcion
        let passHash = await bcryptjs.hash(pass, 8)

        const data = {
            nombre: nombre,
            correo:correo,
            ciudad:ciudad,
            telefono:telefono,
            imagen:imagen,
            precio:precio,
            edad:edad,
            genero: genero,
            descripcion:descripcion,
            pass: passHash
        }
        conexion.query('INSERT INTO users SET ?', data, (err, conn) =>{
            if(err) {console.log(err)}
            res.send('Usuario registrado')
        })

    } catch (error) {
        console.log(error);
    }
}

exports.login = async (req, res) => {
    try {
        const correo = req.body.correo
        const pass = req.body.password
            conexion.query('SELECT * FROM users WHERE correo = ?', [correo], async (err, results) =>{
                if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))) {
                    res.send('')
                } else {
                    const usuario = results[0]
                    res.send(usuario)
                }
            })
        
        }
     catch (error) {
        console.log(error);
    }
}

exports.isAuthenticate = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT FROM users WHERE id = ?', [decodificada.id], (error, results) =>{
                if(!results) {return next()}
                req.correo = results[0]
                return next
            })
        } catch (error) {
            console.log(error);
            return next()
        }
    } else {
        res.send('No autentificado')
        next()
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('jwt')
    res.send('logout')
    return res.redirect('/')
}