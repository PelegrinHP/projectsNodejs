'use strict';
import { Model, DataTypes } from 'sequelize';
export default (sequelize) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId'});
    }
  }
  Session.init({
    userId: DataTypes.UUID,
    token: DataTypes.STRING,
    expiration: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
  // TODO: modificar migrations
};