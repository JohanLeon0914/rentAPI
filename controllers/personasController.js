const conexion = require('../database/db')


exports.verPersonas = async (req, res) => {
    try {
        conexion.query('SELECT * FROM users', async (err, results) =>{
            res.send(results)
            console.log(results)
        })
    } catch (error) {
        console.log(error)
    }
        
}

exports.editarPersona = async (req, res) => {
    const idPersona = req.params.id
    const data = req.body
    try {
        conexion.query('UPDATE personas set ? where id = ?',[data, idPersona], async (err, results) =>{
            res.send("se edito")
        })
    } catch (error) {
        console.log(error)
    }
        
}

exports.obtenerPersonaPorID = async (req, res) => {
    const idPersona = req.params.id
    try {
        conexion.query('SELECT * FROM users where id = ?',[idPersona], async (err, results) =>{
            res.send(results)
        })
    } catch (error) {
        console.log(error)
    }
        
}

exports.obtenerPersonaPorNombre = async (req, res) => {
    const busqueda = req.params.search
    try {
        
        conexion.query('SELECT * FROM users', async (err, results) =>{
        // let personasBuscadas = results.find(persona => persona.nombre.toUpperCase() == search.toUpperCase())
        // if(personasBuscadas != undefined) {
        //     res.send(personasBuscadas)
        // } else {
        //     res.send(results)
        // }
        let personasBuscadas = []
        for (let index = 0; index < results.length; index++) {
             if(results[index].nombre.toUpperCase().search(busqueda.toUpperCase()) != -1) {
                personasBuscadas.push(results[index])
             }
        }
        res.send(personasBuscadas)
        })
    } catch (error) {
        console.log(error)
    }
        
}
