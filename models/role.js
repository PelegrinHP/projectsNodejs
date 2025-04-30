'use strict';
import { Model ,DataTypes } from 'sequelize';

export default (sequelize) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, { foreignKey: 'roleId' });

    }
  }
  Role.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    status:DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};