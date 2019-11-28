const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const Marca = sequelize.src.conexao.db[1].define('marcas', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome_marca: {
            type: Sequelize.STRING(150)
        },
        
    })
   // Marca.sync({force:true})
    return Marca;
}