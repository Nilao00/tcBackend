const Sequelize = require("sequelize");
module.exports = sequelize => {
  const Cars = sequelize.src.conexao.db[1].define("cars", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descricao: {
      type: Sequelize.STRING(150)
    },
    placa: {
      type: Sequelize.STRING(100)
    },
    modelo: {
      type: Sequelize.STRING(100)
    },
    ano: {
      type: Sequelize.INTEGER
    },
    id_marca: {
      type: Sequelize.INTEGER,
      references: {
        model: "marcas",
        key: "id"
      }
    },
    cor: {
      type: Sequelize.STRING(100)
    },
    valor: {
      type: Sequelize.REAL
    },
    kilometragem: {
      type: Sequelize.STRING(150),
      defaultValue: 0
    }
  });
  // Cars.sync({force:true})
  return Cars;
};
