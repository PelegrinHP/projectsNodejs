'use strict';

import { Sequelize } from 'sequelize';
import { readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import configData from '../config/config.json' assert { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));  // Obtiene el directorio actual
const basename = 'index.js';
const env = process.env.NODE_ENV || 'development';
const config = configData[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(async (file) => {
    const { default: modelFunc } = await import(join(__dirname, file)); // Cambiar require por import
    const model = modelFunc(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;  // Usar export default
