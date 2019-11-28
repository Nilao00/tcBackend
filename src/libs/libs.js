module.exports = (app) => {
 //import cors
 const cors = require('cors');
 //import helmet
 const helmet = require('helmet');
 //import body parser
 const body = require('body-parser');

  //use body parser
  app.use(body.urlencoded({ extended: false }));
  app.use(body.json());
  //habilitar helmet
  app.use(helmet());
  //use cors
  app.use(cors());
}