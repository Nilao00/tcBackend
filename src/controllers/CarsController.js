module.exports = app => {
  //declare version api
  const version = "/v1/";
  //declare model cars
  const cars = app.src.models.cars;
  //model relacionate cars
  const marca = app.src.models.marca;

  //Route listando todos os carros com relacionamento na tabela imagens
  app.route(version + "carros").get((req, res) => {
    cars.belongsTo(marca, {
      foreignKey: "id_marca"
    });
    cars
      .findAndCountAll({ order: [["modelo"]], include: [{ model: marca }] })
      .then(resp => {
        if (resp.count > 0) {
          res.json({
            error: false,
            data: resp
          });
        } else {
          res.json({
            error: true,
            data: "Nenhum carro encontrado"
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

  //Route para cadastrar um carro
  app.route(version + "carros").post((req, res) => {
    const {
      descricao,
      placa,
      modelo,
      ano,
      id_marca,
      cor,
      valor,
      kilometragem
    } = req.body;
    cars
      .findAndCountAll({ where: { placa: placa } })
      .then(result => {
        if (result.count == 0) {
          cars
            .create({
              descricao: descricao,
              placa: placa,
              modelo: modelo,
              ano: ano,
              id_marca: id_marca,
              cor: cor,
              valor: valor,
              kilometragem: kilometragem
            })
            .then(cat => {
              res.status(201).json({
                error: false,
                data: "Carro cadastrado com sucesso"
              });
            })
            .catch(error => {
              res.status(500).json({
                error: true,
                data: error
              });
            });
        } else {
          res.json({
            error: true,
            data: "Esse carro ja esta cadastro em nosso sistema"
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: true,
          data: err
        });
      });
  });
  //Route update cars
  app.route(version + "carros/:id").put((req, res) => {
    let id = req.params.id;
    const {
      descricao,
      modelo,
      ano,
      id_marca,
      cor,
      valor,
      kilometragem
    } = req.body;
    cars.findAndCountAll({ where: { id: id } }).then(resp => {
      if (resp.count > 0) {
        cars
          .update(
            {
              descricao: descricao,
              modelo,
              ano,
              id_marca,
              cor,
              valor,
              kilometragem
            },
            { where: { id: id } }
          )
          .then(() => {
            res.json({
              error: false,
              data: "Dados atualizados com sucesso",
              id: id
            });
          })
          .catch(er => {
            res.json({
              error: true,
              data: er
            });
          });
      } else {
        res.json({
          error: true,
          data: "Carro não encontrado em nosso sistema"
        });
      }
    });
  });
  //Delete cars
  app.route(version + "carros/:id").delete((req, res) => {
    let id = req.params.id;
    cars.findAndCountAll({ where: { id: id } }).then(resp => {
      if (resp.count > 0) {
        cars
          .destroy({
            where: { id: id }
          })
          .then(() => {
            res.json({
              error: false,
              data: "Dados apagados com sucesso",
              id: id
            });
          })
          .catch(er => {
            res.json({
              error: true,
              data: er
            });
          });
      } else {
        res.json({
          error: true,
          data: "Carro não encontrado em nosso sistema"
        });
      }
    });
  });
};
