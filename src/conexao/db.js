const { password } = require("../.env");
module.exports = app => {
  const Sequilize = require("sequelize");
  const sequelize = new Sequilize("tcSistemas", "root", password, {
    port: "3306",
    host: "localhost",
    dialect: "mysql"
  });
  let connect = false;
  //metodo para autenticar
  sequelize
    .authenticate()
    .then(() => {
      connect = true;
    })
    .catch(erro => {
      connect = false;
    });
  return [connect, sequelize];
};
