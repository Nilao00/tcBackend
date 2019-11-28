module.exports = app => {
  //declare version api
  const version = "/v1/";
  //declare model marcas
  const marca = app.src.models.marca;

  //Route listando todas a marcas
  app.route(version + "marcas").get((req, res) => {
    marca
      .findAndCountAll({ order: [["nome_marca"]] })
      .then(resp => {
        if (resp.count > 0) {
          res.json({
            error: false,
            data: resp
          });
        } else {
          res.json({
            error: true,
            data: "Nenhuma montadora encontrada"
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: true,
          data: error
        });
      });
  });
};
