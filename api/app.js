const express = require('express');
const dbConfig = require('./config/db.config');
const cors = require('cors');
const encomiendasRouter = require('./routes/encomiendas.routes');

//Express config
const app = express();

let corsOptions = {
  origin: 'https://encomiendas-frontend.herokuapp.com',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Database
const { db } = require('./models/index');
// const initialSetup = require('./services/initialSetup');
db.mongoose
  .connect(dbConfig.dbUri, dbConfig.mongooseOptions)
  .then(() => {
    console.log('Conectado a MongoDB.');
    // initialSetup();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

//Routes
app.use('/encomiendas', encomiendasRouter);

//Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto: ${PORT}.`);
});

module.exports = app;
